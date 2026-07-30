from fastapi import APIRouter

from backend.services.session_manager import session_store
from backend.models.schemas import SessionCreateResponse, DeleteResponse

router = APIRouter()


@router.post("/session/new", response_model=SessionCreateResponse)
def create_session():
    session_id = session_store.create()
    return {"session_id": session_id}


@router.delete("/session/{session_id}", response_model=DeleteResponse)
def delete_session(session_id: str):
    from rag_core import delte_temp_files

    delte_temp_files()
    session_store.delete(session_id)
    return {"status": "deleted"}
