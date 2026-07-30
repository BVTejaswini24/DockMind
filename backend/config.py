import os
from pathlib import Path

from dotenv import load_dotenv

dotenv_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=dotenv_path)

CORS_ORIGINS = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:3000,http://localhost:3004,http://localhost:3006,http://localhost:3007,http://localhost:5173"
).split(",")

HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))

LOG_LEVEL = os.getenv("LOG_LEVEL", "info")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")