# 🧠 DocMind AI

> **Upload your documents. Ask questions. Get intelligent answers grounded in your own content.**

🌐 **Live Demo:**  
https://dock-mind-git-main-tejaswinis-projects-ba64286e.vercel.app/

---

## 📌 Overview

**DocMind AI** is an AI-powered **Retrieval-Augmented Generation (RAG)** chatbot that allows users to upload PDF documents and interact with them using natural-language questions.

Instead of sending an entire document directly to an AI model, DocMind processes the document, splits it into meaningful chunks, converts those chunks into vector embeddings, stores them in a vector database, retrieves the most relevant information for each question, and then uses an LLM to generate a context-aware answer.

The project combines:

- **React + TypeScript** for the frontend
- **FastAPI** for the backend API
- **LangChain** for the RAG pipeline
- **Google Gemini** for embeddings and LLM generation
- **ChromaDB** for vector storage
- **Ollama** integration for local LLM experimentation

The application is deployed using **Vercel** for the frontend and **Render** for the backend.

---

# ✨ Features

## 📄 Document Upload

Upload PDF documents directly through the web interface.

DocMind processes the uploaded documents automatically and prepares them for semantic retrieval.

## 🔎 Semantic Search

Documents are converted into vector embeddings so that the system can retrieve information based on **meaning**, rather than only exact keyword matches.

## 🧠 Retrieval-Augmented Generation

DocMind uses a RAG architecture:

1. Documents are loaded.
2. Text is extracted.
3. Documents are split into chunks.
4. Chunks are converted into embeddings.
5. Embeddings are stored in ChromaDB.
6. Relevant chunks are retrieved when a user asks a question.
7. Retrieved context is provided to the LLM.
8. The LLM generates the final answer.

## 💬 Conversational Chat

Users can ask multiple questions about their uploaded documents and continue the conversation through a session-based chat interface.

## 🤖 Google Gemini Integration

The deployed application uses Google's Gemini models for:

- Document embeddings
- Conversational response generation

The current production configuration uses a Gemini model supported by the configured Google API environment.

## 🦙 Ollama Integration

The project also contains an Ollama-based LLM integration for local experimentation and development.

This allows the project to be extended toward locally hosted language models without requiring the production application to depend on Ollama.

## 🗃️ ChromaDB Vector Store

ChromaDB stores document embeddings and enables efficient similarity-based retrieval.

## 🔗 LangChain

LangChain connects the major RAG components together, including:

- Document processing
- Retrieval
- Contextual compression
- Vector stores
- LLM integration
- Conversational retrieval

## 🌐 Full-Stack Deployment

The application is deployed as a separate frontend and backend:

**Frontend**
→ Vercel

**Backend**
→ Render

---

# 🏗️ System Architecture

```text
                         ┌───────────────────────┐
                         │        USER           │
                         │     Web Browser       │
                         └───────────┬───────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │   React + TypeScript  │
                         │       Frontend        │
                         │        Vercel         │
                         └───────────┬───────────┘
                                     │
                              HTTP / REST API
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │    FastAPI Backend    │
                         │        Render         │
                         └───────────┬───────────┘
                                     │
                    ┌────────────────┴────────────────┐
                    │                                 │
                    ▼                                 ▼
          ┌───────────────────┐             ┌───────────────────┐
          │   Document Upload │             │    Chat Request   │
          └─────────┬─────────┘             └─────────┬─────────┘
                    │                                 │
                    ▼                                 ▼
          ┌───────────────────┐             ┌───────────────────┐
          │    PDF Loader     │             │     Retriever     │
          │    PyPDFLoader    │             │ LangChain + Chroma│
          └─────────┬─────────┘             └─────────┬─────────┘
                    │                                 │
                    ▼                                 │
          ┌───────────────────┐                       │
          │  Text Chunking    │                       │
          │  LangChain        │                       │
          └─────────┬─────────┘                       │
                    │                                 │
                    ▼                                 │
          ┌───────────────────┐                       │
          │ Gemini Embeddings │◄──────────────────────┘
          │ gemini-embedding  │
          └─────────┬─────────┘
                    │
                    ▼
          ┌───────────────────┐
          │     ChromaDB      │
          │   Vector Store    │
          └─────────┬─────────┘
                    │
                    │ Relevant Context
                    ▼
          ┌────────────────────────────┐
          │   Conversational RAG Chain │
          │         LangChain          │
          └────────────┬───────────────┘
                       │
              ┌────────┴─────────┐
              │                  │
              ▼                  ▼
     ┌────────────────┐  ┌────────────────┐
     │  Google Gemini │  │     Ollama     │
     │  Production LLM│  │ Local LLM Path │
     └───────┬────────┘  └───────┬────────┘
             │                   │
             └─────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │   AI Response    │
              │   to the User    │
              └──────────────────┘
