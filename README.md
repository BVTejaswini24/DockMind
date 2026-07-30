# 🧠 DocMind AI

> An intelligent AI-powered document analysis platform that lets users upload documents, chat with them using Retrieval-Augmented Generation (RAG), manage conversations, and extract insights with source citations.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![FastAPI](https://img.shields.io/badge/FastAPI-0.116-009688?logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.11-yellow?logo=python)
![LangChain](https://img.shields.io/badge/LangChain-RAG-success)
![ChromaDB](https://img.shields.io/badge/VectorDB-ChromaDB-purple)

---

## 📖 Overview

DocMind AI is an AI-powered knowledge assistant built using **Retrieval-Augmented Generation (RAG)**.

Instead of relying only on an LLM's training data, DocMind AI allows users to upload their own documents and ask natural language questions. Relevant document chunks are retrieved using vector search and provided to the AI model to generate accurate, context-aware responses.

The application includes a premium modern dashboard, conversation management, document organization, citations, and export functionality.

---

# ✨ Features

## 📄 Smart Document Management

- Upload PDF, DOCX and TXT documents
- Search uploaded documents
- Grid/List view
- Upload progress tracking
- Persistent document storage

---

## 💬 AI Chat

- Retrieval-Augmented Generation (RAG)
- Context-aware conversations
- Streaming AI responses
- Source citations
- Conversation history
- Automatic conversation titles

---

## 📚 Conversation Management

- Rename conversations
- Delete conversations
- Pin important conversations
- Search conversations
- Group conversations

Categories include:

- Today
- Yesterday
- Last 7 Days
- Older

---

## 📤 Export Conversations

Export conversations as:

- PDF
- Markdown (.md)
- Text (.txt)

---

## 📊 Dashboard

Real-time dashboard showing:

- Total Documents
- Total Conversations
- Total Questions
- Pinned Conversations
- Last Upload Date
- Recent Activity

---

## 👍 AI Feedback

Users can provide feedback on responses using:

- 👍 Like
- 👎 Dislike

---

## 📑 Expandable Citations

Each AI response includes:

- Document name
- Page number
- Confidence score
- Expandable source preview
- Full retrieved context

---

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Lucide React

---

## Backend

- FastAPI
- Python
- LangChain
- ChromaDB
- OpenAI API
- Google Generative AI
- Sentence Transformers

---

# ⚙️ Project Structure

```
DocMind/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routers/
│   ├── services/
│   ├── models/
│   └── main.py
│
├── rag_core.py
├── requirements.txt
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/BVTejaswini24/DockMind.git

cd DockMind
```

---

## Backend

```bash
cd backend

pip install -r ../requirements.txt

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```
http://localhost:3000
```

---

# 📷 Screenshots

Add screenshots here:

- Landing Page
- Dashboard
- Chat Interface
- Documents Page
- Conversations
- Settings

---

# Future Improvements

- Multi-document chat
- Authentication with OAuth
- Cloud storage integration
- Shared workspaces
- Voice interaction
- Dark/Light themes
- AI summaries
- Mobile optimization

---

# 👩‍💻 Developer

**Tejaswini BV**

GitHub

https://github.com/BVTejaswini24

---

# 📄 License

This project is developed for educational and portfolio purposes.
