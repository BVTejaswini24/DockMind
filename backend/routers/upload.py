import logging
from typing import Optional

from fastapi import APIRouter, UploadFile, File, Form, HTTPException

from rag_core import build_rag_pipeline
from backend.services.session_manager import session_store
from backend.models.schemas import UploadResponse
from backend.config import GOOGLE_API_KEY

logger = logging.getLogger(__name__)

router = APIRouter()


class _FileAdapter:
    def __init__(self, upload_file: UploadFile):
        self.name = upload_file.filename
        self._file = upload_file

    def read(self):
        return self._file.file.read()


@router.post("/upload", response_model=UploadResponse)
def upload_documents(
    session_id: str = Form(...),
    files: list[UploadFile] = File(...),
    llm_provider: str = Form("OpenAI"),
    api_key_openai: Optional[str] = Form(""),
    api_key_google: Optional[str] = Form(""),
    api_key_hf: Optional[str] = Form(""),
    api_key_cohere: Optional[str] = Form(""),
    selected_model: str = Form("gpt-3.5-turbo-0125"),
    temperature: float = Form(0.5),
    top_p: float = Form(0.95),
    retriever_type: str = Form("Cohere reranker"),
    vector_store_name: str = Form(...),
    assistant_language: str = Form("english"),
):
    session = session_store.get(session_id)
    if session is None:
        raise HTTPException(status_code=404, detail="Session not found")

    adapted_files = [_FileAdapter(f) for f in files]

    
    

    try:
                # Use Gemini key from .env if frontend does not send keys
        if GOOGLE_API_KEY and not api_key_google and not api_key_openai:
            llm_provider = "Google"
            api_key_google = GOOGLE_API_KEY
            selected_model = "gemini-2.0-flash"

        if retriever_type == "Cohere reranker" and not api_key_cohere:
            retriever_type = "Contextual compression"
            logger.info("Changed retriever to Contextual compression because Cohere key is missing")
        result = build_rag_pipeline(
            llm_provider=llm_provider,
            api_key_openai=api_key_openai,
            api_key_google=api_key_google,
            api_key_hf=api_key_hf,
            api_key_cohere=api_key_cohere,
            selected_model=selected_model,
            temperature=temperature,
            top_p=top_p,
            retriever_type=retriever_type,
            uploaded_files=adapted_files,
            vector_store_name=vector_store_name,
            assistant_language=assistant_language,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.exception("Unexpected error during RAG pipeline build")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please check server logs.")

    session_store.update(
        session_id,
        chain=result["chain"],
        memory=result["memory"],
        vector_store=result["vector_store"],
        retriever=result["retriever"],
        vector_store_name=vector_store_name,
        llm_provider=llm_provider,
        selected_model=selected_model,
        temperature=temperature,
        top_p=top_p,
        retriever_type=retriever_type,
        assistant_language=assistant_language,
    )

    num_documents = len(result["vector_store"].get()["ids"])

    return UploadResponse(
        status="success",
        vector_store_name=vector_store_name,
        num_documents=num_documents,
    )
