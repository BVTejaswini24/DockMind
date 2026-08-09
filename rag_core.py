import os, glob
import logging
import traceback
from datetime import datetime
from pathlib import Path

logger = logging.getLogger(__name__)

def _log(msg):
    logger.info(f"[{datetime.now().isoformat()}] {msg}")

from langchain_community.embeddings import HuggingFaceEmbeddings

from langchain_community.document_loaders import (
    PyPDFLoader,
    TextLoader,
    DirectoryLoader,
    CSVLoader,
    Docx2txtLoader,
)

from langchain_text_splitters import (
    RecursiveCharacterTextSplitter,
    CharacterTextSplitter,
)

from langchain_community.vectorstores import Chroma

from langchain.retrievers.document_compressors import DocumentCompressorPipeline
from langchain_community.document_transformers import (
    EmbeddingsRedundantFilter,
    LongContextReorder,
)
from langchain.retrievers.document_compressors import EmbeddingsFilter
from langchain.retrievers import ContextualCompressionRetriever

from langchain.retrievers.document_compressors import CohereRerank

from langchain_community.embeddings import HuggingFaceInferenceAPIEmbeddings

from langchain_core.prompts import PromptTemplate, ChatPromptTemplate
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory, ConversationSummaryBufferMemory

from langchain_community.llms import HuggingFaceHub

from langchain_core.language_models.llms import LLM

try:
    import ollama
except ImportError:
    ollama = None


class OllamaLLM(LLM):
    model: str = "llama3.2"
    temperature: float = 0.5

    def _call(self, prompt, stop=None, run_manager=None, **kwargs):
        if ollama is None:
            raise ImportError(
                "The 'ollama' package is not installed. Install it to use the Ollama provider."
            )
        response = ollama.chat(
            model=self.model,
            messages=[{"role": "user", "content": prompt}],
        )
        return response["message"]["content"]

    @property
    def _llm_type(self):
        return "ollama"


def ollama_generate(prompt, model="llama3.2", temperature=0.5):
    if ollama is None:
        raise ImportError(
            "The 'ollama' package is not installed. Install it to use the Ollama provider."
        )
    response = ollama.chat(
        model=model,
        messages=[{"role": "user", "content": prompt}],
    )
    return response["message"]["content"]

from langchain_core.output_parsers import StrOutputParser



TMP_DIR = Path(__file__).resolve().parent.joinpath("data", "tmp")
LOCAL_VECTOR_STORE_DIR = Path(__file__).resolve().parent.joinpath("data", "vector_stores")

list_retriever_types = [
    "Cohere reranker",
    "Contextual compression",
    "Vectorstore backed retriever",
]


def delte_temp_files():
    files = glob.glob(TMP_DIR.as_posix() + "/*")
    for f in files:
        try:
            os.remove(f)
        except:
            pass


def langchain_document_loader():
    documents = []
    txt_loader = DirectoryLoader(
        TMP_DIR.as_posix(), glob="**/*.txt", loader_cls=TextLoader, show_progress=True
    )
    documents.extend(txt_loader.load())

    pdf_loader = DirectoryLoader(
        TMP_DIR.as_posix(), glob="**/*.pdf", loader_cls=PyPDFLoader, show_progress=True
    )
    documents.extend(pdf_loader.load())

    csv_loader = DirectoryLoader(
        TMP_DIR.as_posix(), glob="**/*.csv", loader_cls=CSVLoader, show_progress=True,
        loader_kwargs={"encoding":"utf8"}
    )
    documents.extend(csv_loader.load())

    doc_loader = DirectoryLoader(
        TMP_DIR.as_posix(),
        glob="**/*.docx",
        loader_cls=Docx2txtLoader,
        show_progress=True,
    )
    documents.extend(doc_loader.load())
    return documents


def split_documents_to_chunks(documents):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1600, chunk_overlap=200)
    chunks = text_splitter.split_documents(documents)
    return chunks


def select_embeddings_model(provider, openai_api_key="", google_api_key="", hf_api_key=""):
    _log(f"select_embeddings_model: provider={provider}, has_openai_key={bool(openai_api_key)}, has_google_key={bool(google_api_key)}, has_hf_key={bool(hf_api_key)}")
    if provider == "OpenAI":
        from langchain_openai import OpenAIEmbeddings
        embeddings = OpenAIEmbeddings(api_key=openai_api_key)
    if provider == "Google":
        from langchain_google_genai import GoogleGenerativeAIEmbeddings
        embeddings = GoogleGenerativeAIEmbeddings(
            model="models/embedding-001", google_api_key=google_api_key
        )
    if provider == "HuggingFace":
        embeddings = HuggingFaceInferenceAPIEmbeddings(
            api_key=hf_api_key, model_name="thenlper/gte-large"
        )
    _log(f"select_embeddings_model: done, type={type(embeddings).__name__}")
    return embeddings


def create_retriever(
    vector_store,
    embeddings,
    retriever_type="Contextual compression",
    base_retriever_search_type="semilarity",
    base_retriever_k=16,
    compression_retriever_k=20,
    cohere_api_key="",
    cohere_model="rerank-multilingual-v2.0",
    cohere_top_n=10,
):
    _log(f"create_retriever: type={retriever_type}, search_type={base_retriever_search_type}, k={base_retriever_k}")
    base_retriever = Vectorstore_backed_retriever(
        vectorstore=vector_store,
        search_type=base_retriever_search_type,
        k=base_retriever_k,
        score_threshold=None,
    )
    _log(f"create_retriever: base_retriever created, type={type(base_retriever).__name__}")
    if retriever_type == "Vectorstore backed retriever":
        _log("create_retriever: returning base_retriever")
        return base_retriever
    elif retriever_type == "Contextual compression":
        _log("create_retriever: building compression retriever")
        compression_retriever = create_compression_retriever(
            embeddings=embeddings,
            base_retriever=base_retriever,
            k=compression_retriever_k,
        )
        _log(f"create_retriever: compression retriever done, type={type(compression_retriever).__name__}")
        return compression_retriever
    elif retriever_type == "Cohere reranker":
        _log("create_retriever: building Cohere reranker")
        cohere_retriever = CohereRerank_retriever(
            base_retriever=base_retriever,
            cohere_api_key=cohere_api_key,
            cohere_model=cohere_model,
            top_n=cohere_top_n,
        )
        _log(f"create_retriever: Cohere reranker done, type={type(cohere_retriever).__name__}")
        return cohere_retriever
    else:
        pass


def Vectorstore_backed_retriever(
    vectorstore, search_type="similarity", k=4, score_threshold=None
):
    _log(f"Vectorstore_backed_retriever: search_type={search_type}, k={k}")
    search_kwargs = {}
    if k is not None:
        search_kwargs["k"] = k
    if score_threshold is not None:
        search_kwargs["score_threshold"] = score_threshold
    retriever = vectorstore.as_retriever(
        search_type=search_type, search_kwargs=search_kwargs
    )
    _log(f"Vectorstore_backed_retriever: done, type={type(retriever).__name__}")
    return retriever


def create_compression_retriever(
    embeddings, base_retriever, chunk_size=500, k=16, similarity_threshold=None
):
    _log(f"create_compression_retriever: chunk_size={chunk_size}, k={k}")
    splitter = CharacterTextSplitter(
        chunk_size=chunk_size, chunk_overlap=0, separator=". "
    )
    _log("create_compression_retriever: splitter created")
    redundant_filter = EmbeddingsRedundantFilter(embeddings=embeddings)
    _log("create_compression_retriever: redundant_filter created")
    relevant_filter = EmbeddingsFilter(
        embeddings=embeddings, k=k, similarity_threshold=similarity_threshold
    )
    _log("create_compression_retriever: relevant_filter created")
    reordering = LongContextReorder()
    _log("create_compression_retriever: reordering created")
    pipeline_compressor = DocumentCompressorPipeline(
        transformers=[splitter, redundant_filter, relevant_filter, reordering]
    )
    _log("create_compression_retriever: pipeline_compressor created")
    compression_retriever = ContextualCompressionRetriever(
        base_compressor=pipeline_compressor, base_retriever=base_retriever
    )
    _log(f"create_compression_retriever: done, type={type(compression_retriever).__name__}")
    return compression_retriever


def CohereRerank_retriever(
    base_retriever, cohere_api_key, cohere_model="rerank-multilingual-v2.0", top_n=10
):
    _log(f"CohereRerank_retriever: model={cohere_model}, top_n={top_n}")
    compressor = CohereRerank(
        cohere_api_key=cohere_api_key, model=cohere_model, top_n=top_n
    )
    _log("CohereRerank_retriever: compressor created")
    retriever_Cohere = ContextualCompressionRetriever(
        base_compressor=compressor, base_retriever=base_retriever
    )
    _log(f"CohereRerank_retriever: done, type={type(retriever_Cohere).__name__}")
    return retriever_Cohere


def create_memory(model_name="gpt-3.5-turbo", openai_api_key="", memory_max_token=None):
    _log(f"create_memory: model_name={model_name}, has_openai_key={bool(openai_api_key)}")
    if model_name == "gpt-3.5-turbo":
        if memory_max_token is None:
            memory_max_token = 1024
        from langchain_openai import ChatOpenAI
        memory = ConversationSummaryBufferMemory(
            max_token_limit=memory_max_token,
            llm=ChatOpenAI(
                model_name="gpt-3.5-turbo",
                openai_api_key=openai_api_key,
                temperature=0.1,
            ),
            return_messages=True,
            memory_key="chat_history",
            output_key="answer",
            input_key="question",
        )
        _log(f"create_memory: ConversationSummaryBufferMemory created")
    else:
        memory = ConversationBufferMemory(
            return_messages=True,
            memory_key="chat_history",
            output_key="answer",
            input_key="question",
        )
        _log(f"create_memory: ConversationBufferMemory created")
    return memory


def answer_template(language="english"):
    template = f"""Answer the question at the end, using only the provided document context below.

Rules:
- Answer in clear natural English.
- Never output HTML. Never output &lt;table&gt;, &lt;tr&gt;, &lt;td&gt;, &lt;div&gt;, or any HTML tags.
- Never use Markdown tables.
- Use headings, paragraphs and bullet points only.
- Make answers easy to understand.

If summarizing a document:
- Start with a short overview.
- Then provide key points as bullet points.
- End with a brief conclusion if appropriate.

Use only the provided document context. If the information is not found, say:
"I couldn't find that information in the uploaded documents."

<context>
{{chat_history}}

{{context}} 
</context>

Question: {{question}}

Language: {language}.
"""
    return template


def create_ConversationalRetrievalChain(
    retriever,
    chain_type="stuff",
    language="english",
    llm_provider="OpenAI",
    openai_api_key="",
    google_api_key="",
    hf_api_key="",
    selected_model="gpt-3.5-turbo-0125",
    temperature=0.5,
    top_p=0.95,
):
    _log(f"create_ConversationalRetrievalChain: llm_provider={llm_provider}, model={selected_model}, chain_type={chain_type}")
    _log(f"  has_openai_key={bool(openai_api_key)}, has_google_key={bool(google_api_key)}, has_hf_key={bool(hf_api_key)}")

    condense_question_prompt = PromptTemplate(
        input_variables=["chat_history", "question"],
        template="""Given the following conversation and a follow up question, 
rephrase the follow up question to be a standalone question, in its original language.\n\n
Chat History:\n{chat_history}\n
Follow Up Input: {question}\n
Standalone question:""",
    )
    _log("create_ConversationalRetrievalChain: condense_question_prompt created")

    answer_prompt = ChatPromptTemplate.from_template(answer_template(language=language))
    _log("create_ConversationalRetrievalChain: answer_prompt created")

    memory = create_memory(model_name=selected_model, openai_api_key=openai_api_key)
    _log(f"create_ConversationalRetrievalChain: memory created, type={type(memory).__name__}")

    if llm_provider == "OpenAI":
        _log("create_ConversationalRetrievalChain: creating OpenAI LLMs")
        from langchain_openai import ChatOpenAI
        standalone_query_generation_llm = ChatOpenAI(
            api_key=openai_api_key,
            model=selected_model,
            temperature=0.1,
        )
        response_generation_llm = ChatOpenAI(
            api_key=openai_api_key,
            model=selected_model,
            temperature=temperature,
            model_kwargs={"top_p": top_p},
        )
    if llm_provider == "Google":
        _log("create_ConversationalRetrievalChain: creating Ollama LLM")
        standalone_query_generation_llm = OllamaLLM(model="llama3.2", temperature=0.1)
        response_generation_llm = OllamaLLM(model="llama3.2", temperature=temperature)

    if llm_provider == "HuggingFace":
        _log("create_ConversationalRetrievalChain: creating HuggingFace LLMs")
        standalone_query_generation_llm = HuggingFaceHub(
            repo_id=selected_model,
            huggingfacehub_api_token=hf_api_key,
            model_kwargs={
                "temperature": 0.1,
                "top_p": 0.95,
                "do_sample": True,
                "max_new_tokens": 1024,
            },
        )
        response_generation_llm = HuggingFaceHub(
            repo_id=selected_model,
            huggingfacehub_api_token=hf_api_key,
            model_kwargs={
                "temperature": temperature,
                "top_p": top_p,
                "do_sample": True,
                "max_new_tokens": 1024,
            },
        )

    _log(f"create_ConversationalRetrievalChain: LLMs created: condense={type(standalone_query_generation_llm).__name__}, response={type(response_generation_llm).__name__}")

    _log("create_ConversationalRetrievalChain: building ConversationalRetrievalChain.from_llm")
    try:
        chain = ConversationalRetrievalChain.from_llm(
            condense_question_prompt=condense_question_prompt,
            combine_docs_chain_kwargs={"prompt": answer_prompt},
            condense_question_llm=standalone_query_generation_llm,
            llm=response_generation_llm,
            memory=memory,
            retriever=retriever,
            chain_type=chain_type,
            verbose=False,
            return_source_documents=True,
        )
        _log(f"create_ConversationalRetrievalChain: chain built successfully, type={type(chain).__name__}")
    except Exception as e:
        _log(f"create_ConversationalRetrievalChain: FAILED to build chain: {e}")
        logger.error(traceback.format_exc())
        raise

    return chain, memory


def build_rag_pipeline(
    llm_provider="OpenAI",
    api_key_openai="",
    api_key_google="",
    api_key_hf="",
    api_key_cohere="",
    selected_model="gpt-3.5-turbo-0125",
    temperature=0.5,
    top_p=0.95,
    retriever_type="Cohere reranker",
    uploaded_files=None,
    vector_store_name="",
    assistant_language="english",
    persist_base_dir=None,
) -> dict:
    _log(f"build_rag_pipeline: START llm_provider={llm_provider}, model={selected_model}, retriever_type={retriever_type}")

    errors = []
    if not api_key_openai and not api_key_google and not api_key_hf:
        errors.append(f"insert your {llm_provider} API key")
    if retriever_type == list_retriever_types[0] and not api_key_cohere:
        errors.append("insert your Cohere API key")
    if not uploaded_files:
        errors.append("select documents to upload")
    if not vector_store_name:
        errors.append("provide a Vectorstore name")

    if len(errors) == 1:
        raise ValueError("Please " + errors[0] + ".")
    elif len(errors) > 1:
        raise ValueError("Please " + ", ".join(errors[:-1]) + ", and " + errors[-1] + ".")

     # Delete old temp files
    delte_temp_files()
    _log("build_rag_pipeline: temp files deleted")

    # Create folders if they don't exist
    os.makedirs(TMP_DIR, exist_ok=True)
    os.makedirs(LOCAL_VECTOR_STORE_DIR, exist_ok=True)

    for f in uploaded_files:
        path = os.path.join(TMP_DIR.as_posix(), f.name)

        with open(path, "wb") as tmp:
            tmp.write(f.read())
    _log(f"build_rag_pipeline: uploaded {len(uploaded_files)} files to tmp dir")

    documents = langchain_document_loader()
    _log(f"build_rag_pipeline: loaded {len(documents)} documents")
    chunks = split_documents_to_chunks(documents)
    _log(f"build_rag_pipeline: split into {len(chunks)} chunks")
    embeddings = select_embeddings_model(llm_provider, api_key_openai, api_key_google, api_key_hf)

    persist_dir = (Path(persist_base_dir) if persist_base_dir else LOCAL_VECTOR_STORE_DIR).as_posix() + "/" + vector_store_name
    _log(f"build_rag_pipeline: creating Chroma vector store at {persist_dir}")
    vector_store = Chroma.from_documents(documents=chunks, embedding=embeddings, persist_directory=persist_dir)
    _log(f"build_rag_pipeline: vector store created")

    retriever = create_retriever(
        vector_store=vector_store,
        embeddings=embeddings,
        retriever_type=retriever_type,
        base_retriever_search_type="similarity",
        base_retriever_k=16,
        compression_retriever_k=20,
        cohere_api_key=api_key_cohere,
        cohere_model="rerank-multilingual-v2.0",
        cohere_top_n=10,
    )
    _log(f"build_rag_pipeline: retriever created")

    chain, memory = create_ConversationalRetrievalChain(
        retriever=retriever,
        chain_type="stuff",
        language=assistant_language,
        llm_provider=llm_provider,
        openai_api_key=api_key_openai,
        google_api_key=api_key_google,
        hf_api_key=api_key_hf,
        selected_model=selected_model,
        temperature=temperature,
        top_p=top_p,
    )
    _log("build_rag_pipeline: chain and memory created")

    _log("build_rag_pipeline: DONE")
    return {
        "vector_store": vector_store,
        "retriever": retriever,
        "chain": chain,
        "memory": memory,
    }


def get_answer(chain, prompt, llm_provider="OpenAI"):
    print("=" * 60)
    print("STEP 1: Entered get_answer()")
    print(f"Prompt: {prompt}")

    print("STEP 2: Calling chain.invoke()...")
    response = chain.invoke({"question": prompt})
    print("STEP 3: chain.invoke() finished successfully")

    answer = response["answer"]
    print("STEP 4: Answer extracted")

    if llm_provider == "HuggingFace":
        answer = answer[answer.find("\nAnswer: ") + len("\nAnswer: "):]

    source_documents = []

    print("STEP 5: Processing source documents")
    for doc in response["source_documents"]:
        page = doc.metadata.get("page", None)
        source_documents.append({
            "content": doc.page_content,
            "source": doc.metadata["source"],
            "page": page,
        })

    print("STEP 6: Returning response")
    print("=" * 60)

    return {
        "answer": answer,
        "source_documents": source_documents,
    }


def rebuild_chain_from_store(
    vector_store_name: str,
    llm_provider: str = "Google",
    google_api_key: str = "",
    selected_model: str = "gemini-2.5-flash",
    temperature: float = 0.5,
    top_p: float = 0.95,
    retriever_type: str = "Contextual compression",
    assistant_language: str = "english",
):
    _log(f"rebuild_chain_from_store: START, vector_store_name={vector_store_name}, llm_provider={llm_provider}, model={selected_model}")
    persist_dir = LOCAL_VECTOR_STORE_DIR.as_posix() + "/" + vector_store_name
    _log(f"rebuild_chain_from_store: loading Chroma from {persist_dir}")
    embeddings = select_embeddings_model(llm_provider, "", google_api_key, "")
    _log("rebuild_chain_from_store: embeddings created")
    vector_store = Chroma(
        persist_directory=persist_dir,
        embedding_function=embeddings,
    )
    _log(f"rebuild_chain_from_store: vector_store loaded, type={type(vector_store).__name__}")
    retriever = create_retriever(
        vector_store=vector_store,
        embeddings=embeddings,
        retriever_type=retriever_type,
        base_retriever_search_type="similarity",
        base_retriever_k=16,
        compression_retriever_k=20,
        cohere_api_key="",
        cohere_model="rerank-multilingual-v2.0",
        cohere_top_n=10,
    )
    _log("rebuild_chain_from_store: retriever created")
    chain, memory = create_ConversationalRetrievalChain(
        retriever=retriever,
        chain_type="stuff",
        language=assistant_language,
        llm_provider=llm_provider,
        openai_api_key="",
        google_api_key=google_api_key,
        hf_api_key="",
        selected_model=selected_model,
        temperature=temperature,
        top_p=top_p,
    )
    _log("rebuild_chain_from_store: DONE")
    return {
        "chain": chain,
        "memory": memory,
        "vector_store": vector_store,
        "retriever": retriever,
    }
