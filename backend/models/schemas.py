from pydantic import BaseModel
from typing import Optional


class SessionCreateResponse(BaseModel):
    session_id: str


class UploadResponse(BaseModel):
    status: str
    vector_store_name: str
    num_documents: int


class ChatRequest(BaseModel):
    session_id: str
    prompt: str
    llm_provider: str = "OpenAI"


class SourceDocument(BaseModel):
    content: str
    source: str
    page: Optional[int] = None


class ChatResponse(BaseModel):
    answer: str
    source_documents: list[SourceDocument]


class DeleteResponse(BaseModel):
    status: str


class HealthResponse(BaseModel):
    status: str
