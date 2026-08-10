````markdown
# 🚢 DockMind

> **AI-powered document intelligence and RAG chatbot for asking questions about your documents.**

🌐 **Live Demo:** https://dock-mind-git-main-tejaswinis-projects-ba64286e.vercel.app/

---

## 📌 About

DockMind is an AI-powered **Retrieval-Augmented Generation (RAG)** application that allows users to upload documents and interact with them through a conversational AI assistant.

Instead of relying only on the model's existing knowledge, DockMind retrieves relevant information from the uploaded documents and uses it as context to generate grounded answers.

The project combines document processing, vector search, semantic retrieval, and Large Language Models into a complete end-to-end AI application.

---

## ✨ Features

- 📄 Upload and process PDF documents
- 🔍 Semantic document retrieval
- 🧠 Retrieval-Augmented Generation (RAG)
- 💬 Conversational chatbot for document Q&A
- 🗂️ Vector storage using ChromaDB
- 🔗 Contextual compression retrieval
- 🤖 Google Gemini integration
- 🦙 Ollama support for local LLM experimentation
- 🌐 React frontend with deployed FastAPI backend
- 🔐 Environment-based API key configuration
- ⚡ FastAPI backend for document processing and chat

---

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │      React UI       │
                    │   Vite + TypeScript │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │     FastAPI API     │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
                ▼                             ▼
       ┌─────────────────┐          ┌─────────────────┐
       │ Document Loader │          │  Chat Request   │
       │   PDF / PyPDF   │          │                 │
       └────────┬────────┘          └────────┬────────┘
                │                            │
                ▼                            │
       ┌─────────────────┐                   │
       │ Text Chunking   │                   │
       └────────┬────────┘                   │
                │                            │
                ▼                            │
       ┌─────────────────┐                   │
       │ Gemini          │                   │
       │ Embeddings      │                   │
       └────────┬────────┘                   │
                │                            │
                ▼                            │
       ┌─────────────────┐                   │
       │   ChromaDB      │◄──────────────────┘
       │ Vector Store     │
       └────────┬────────┘
                │
                ▼
       ┌─────────────────────┐
       │ Contextual          │
       │ Compression         │
       │ Retriever           │
       └──────────┬──────────┘
                  │
                  ▼
       ┌─────────────────────┐
       │   Google Gemini     │
       │      / Ollama       │
       │       LLM           │
       └──────────┬──────────┘
                  │
                  ▼
          ┌───────────────┐
          │ AI Response   │
          └───────────────┘
````

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Axios

### Backend

* Python
* FastAPI
* LangChain

### AI / RAG

* Google Gemini
* Ollama
* Google Generative AI Embeddings
* LangChain Retrieval
* Conversational RAG

### Vector Database

* ChromaDB

### Document Processing

* PyPDF

### Deployment

* Vercel — Frontend
* Render — Backend

---

## 🔄 How It Works

### 1. Upload

The user uploads a PDF document through the React frontend.

### 2. Process

The FastAPI backend loads the document and splits it into smaller chunks.

### 3. Embed

The document chunks are converted into vector embeddings using Google's embedding model.

### 4. Store

The embeddings are stored in ChromaDB for efficient semantic retrieval.

### 5. Retrieve

When the user asks a question, DockMind searches the vector store for the most relevant document chunks.

### 6. Generate

The retrieved context is passed to the selected LLM, which generates the final answer.

### 7. Respond

The generated answer is returned to the React frontend and displayed in the conversation.

---

## 🦙 Ollama Support

DockMind also includes an Ollama-based LLM integration for local experimentation.

This allows the project to be extended to locally hosted models without depending entirely on cloud-based LLM providers.

The application architecture keeps the LLM provider layer separate from document ingestion, retrieval, and vector storage.

---

## 📂 Project Structure

```text
RAG/
│
├── backend/
│   ├── routers/
│   │   ├── chat.py
│   │   ├── upload.py
│   │   └── sessions.py
│   │
│   ├── config.py
│   ├── main.py
│   ├── rag_core.py
│   └── session_manager.py
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── ...
│
├── requirements.txt
└── README.md
```

---

## 🚀 Run Locally

### Clone the repository

```bash
git clone https://github.com/BVTejaswini24/DockMind.git
cd DockMind
```

### Create virtual environment

```bash
python -m venv venv
```

### Activate it

**Windows:**

```powershell
.\venv\Scripts\Activate.ps1
```

### Install dependencies

```bash
pip install -r requirements.txt
```

### Configure environment variables

Create a `.env` file in the backend configuration location and add your required API configuration:

```env
GOOGLE_API_KEY=your_google_api_key
```

### Start the backend

```bash
uvicorn backend.main:app --reload
```

### Start the frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Live Demo

**Try DockMind:**
[https://dock-mind-git-main-tejaswinis-projects-ba64286e.vercel.app/](https://dock-mind-git-main-tejaswinis-projects-ba64286e.vercel.app/)

---

## 🎯 Why I Built DockMind

DockMind was built to explore how modern **RAG systems** can turn static documents into interactive knowledge sources.

The project focuses on the complete AI pipeline:

**Document → Chunking → Embeddings → Vector Database → Retrieval → LLM → Answer**

It demonstrates practical experience with **LLMs, LangChain, vector databases, semantic retrieval, API development, and full-stack deployment.**

---

## 👩‍💻 Author

**Tejaswini BV**

GitHub:
[https://github.com/BVTejaswini24](https://github.com/BVTejaswini24)

---

