import uuid
import json
import os
from pathlib import Path
from typing import Optional, Any

SESSION_FILE = Path(__file__).resolve().parent.parent.parent / "data" / "sessions.json"


class SessionStore:
    def __init__(self):
        self._sessions: dict[str, dict[str, Any]] = {}
        self._load()

    def _path(self) -> str:
        return str(SESSION_FILE)

    def _load(self) -> None:
        try:
            with open(self._path(), "r") as f:
                raw = json.load(f)
                for sid, data in raw.items():
                    self._sessions[sid] = {
                        k: v for k, v in data.items()
                        if k in ("vector_store_name", "llm_provider", "selected_model",
                                 "temperature", "top_p", "retriever_type", "assistant_language")
                    }
        except (FileNotFoundError, json.JSONDecodeError):
            self._sessions = {}

    def _save(self) -> None:
        os.makedirs(os.path.dirname(self._path()), exist_ok=True)
        serializable = {}
        for sid, data in self._sessions.items():
            serializable[sid] = {
                k: v for k, v in data.items()
                if k in ("vector_store_name", "llm_provider", "selected_model",
                         "temperature", "top_p", "retriever_type", "assistant_language")
            }
        with open(self._path(), "w") as f:
            json.dump(serializable, f, indent=2)

    def create(self) -> str:
        session_id = str(uuid.uuid4())
        self._sessions[session_id] = {}
        self._save()
        return session_id

    def get(self, session_id: str) -> Optional[dict[str, Any]]:
        return self._sessions.get(session_id)

    def update(self, session_id: str, **fields: Any) -> None:
        if session_id not in self._sessions:
            raise KeyError(f"Session {session_id} not found")
        self._sessions[session_id].update(fields)
        self._save()

    def delete(self, session_id: str) -> None:
        self._sessions.pop(session_id, None)
        self._save()


session_store = SessionStore()
