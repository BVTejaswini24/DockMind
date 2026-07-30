import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.config import CORS_ORIGINS
from backend.routers import sessions, upload, chat
from backend.models.schemas import HealthResponse

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="DocMind AI API", version="1.0.0")


@app.middleware("http")
async def debug_requests(request, call_next):
    print("=" * 80)
    print("REQUEST RECEIVED")
    print("METHOD:", request.method)
    print("PATH:", request.url.path)
    print("=" * 80)
    response = await call_next(request)
    print("RESPONSE STATUS:", response.status_code)
    print("=" * 80)
    return response


app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sessions.router)
app.include_router(upload.router)
app.include_router(chat.router)


@app.get("/health", response_model=HealthResponse)
def health():
    return {"status": "ok"}
