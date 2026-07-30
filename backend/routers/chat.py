import logging
from datetime import datetime

from fastapi import APIRouter, HTTPException

from rag_core import get_answer, rebuild_chain_from_store
from backend.services.session_manager import session_store
from backend.models.schemas import ChatRequest, ChatResponse, SourceDocument
from backend.config import GOOGLE_API_KEY

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    logger.info(f"[{datetime.now().isoformat()}] /chat: START session_id={request.session_id}, prompt_len={len(request.prompt)}, llm_provider={request.llm_provider}")

    session = session_store.get(request.session_id)
    if session is None:
        logger.warning(f"/chat: session {request.session_id} not found")
        raise HTTPException(status_code=404, detail="Session not found")

    logger.info(f"/chat: session data keys={list(session.keys())}")

    chain = session.get("chain")
    if chain is None:
        logger.info("/chat: chain not in session, rebuilding from store")
        vector_store_name = session.get("vector_store_name")
        if not vector_store_name:
            logger.warning("/chat: vector_store_name not in session")
            raise HTTPException(
                status_code=400,
                detail="Please upload documents first before chatting.",
            )
        logger.info(f"/chat: rebuilding chain for vector_store={vector_store_name}")
        try:
            rebuilt = rebuild_chain_from_store(
                vector_store_name=vector_store_name,
                llm_provider=session.get("llm_provider", "Google"),
                google_api_key=GOOGLE_API_KEY,
                selected_model=session.get("selected_model", "gemini-2.5-flash"),
                temperature=session.get("temperature", 0.5),
                top_p=session.get("top_p", 0.95),
                retriever_type=session.get("retriever_type", "Contextual compression"),
                assistant_language=session.get("assistant_language", "english"),
            )
            logger.info("/chat: chain rebuilt successfully")
        except Exception as e:
            logger.exception(f"/chat: rebuild_chain_from_store failed: {e}")
            raise HTTPException(status_code=500, detail=f"Failed to rebuild chain: {str(e)}")
        chain = rebuilt["chain"]
        session_store.update(request.session_id, **rebuilt)
        logger.info("/chat: rebuilt chain saved to session")
    else:
        logger.info(f"/chat: chain found in session, type={type(chain).__name__}")

    logger.info("/chat: calling get_answer...")
    try:
        result = get_answer(chain, request.prompt, request.llm_provider)
        logger.info("/chat: get_answer returned successfully")
    except Exception as e:
        logger.exception("Error during answer generation")
        raise HTTPException(status_code=500, detail="An error occurred while generating the answer.")

    source_docs = [
        SourceDocument(
            content=doc["content"],
            source=doc["source"],
            page=doc["page"],
        )
        for doc in result["source_documents"]
    ]

    logger.info(f"/chat: DONE, answer_len={len(result['answer'])}, source_docs={len(source_docs)}")
    return ChatResponse(answer=result["answer"], source_documents=source_docs)
