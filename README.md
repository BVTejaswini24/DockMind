# 🧠 DockMind — AI-Powered Document Intelligence & RAG Chatbot

<p align="center">
  <strong>Upload documents. Understand them. Chat with them.</strong>
</p>

<p align="center">
  A full-stack Retrieval-Augmented Generation (RAG) application that allows users to upload documents and interact with their content using AI-powered semantic search and conversational question answering.
</p>

<p align="center">

![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Backend-Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![LangChain](https://img.shields.io/badge/RAG-LangChain-1C3C3C?style=for-the-badge)
![ChromaDB](https://img.shields.io/badge/Vector_DB-ChromaDB-FF6F00?style=for-the-badge)
![Google Gemini](https://img.shields.io/badge/LLM-Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Ollama](https://img.shields.io/badge/Local%20LLM-Ollama-black?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)

</p>

---

## 🌐 Live Demo

> 🚀 **Production deployment:**  
> `https://dock-mind-git-main-tejaswinis-projects-ba64286e.vercel.app/`

The application is deployed as a full-stack system:

- **Frontend:** Vercel
- **Backend:** Render
- **LLM:** Google Gemini
- **Embeddings:** Google Generative AI Embeddings
- **Vector Database:** ChromaDB
- **RAG Framework:** LangChain

---

# ✨ What is DockMind?

DockMind is an AI-powered document intelligence application built around the concept of **Retrieval-Augmented Generation (RAG)**.

Instead of sending an entire document directly to an AI model, DockMind:

1. Accepts uploaded documents.
2. Extracts their text.
3. Splits the content into manageable chunks.
4. Converts those chunks into vector embeddings.
5. Stores the embeddings inside a vector database.
6. Retrieves the most relevant document sections for a user's question.
7. Sends the retrieved context to an LLM.
8. Generates a context-aware conversational answer.

This allows users to ask questions about their own documents without manually searching through hundreds of pages.

---

# 🎯 Core Features

## 📄 Document Upload

Users can upload documents through the web interface.

The backend processes the uploaded documents using a document loading and text-processing pipeline.

### Processing flow

```text
Document
   ↓
Document Loader
   ↓
Text Extraction
   ↓
Text Chunking
   ↓
Embedding Generation
   ↓
Chroma Vector Store
