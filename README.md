

````markdown
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
````

---

# 🔄 RAG Pipeline

The core of DocMind is the Retrieval-Augmented Generation pipeline.

```text
              PDF DOCUMENT
                    │
                    ▼
             ┌──────────────┐
             │ Document     │
             │ Loading      │
             └──────┬───────┘
                    │
                    ▼
             ┌──────────────┐
             │ Text         │
             │ Extraction   │
             └──────┬───────┘
                    │
                    ▼
             ┌──────────────┐
             │ Text         │
             │ Chunking     │
             └──────┬───────┘
                    │
                    ▼
             ┌──────────────┐
             │ Gemini       │
             │ Embeddings   │
             └──────┬───────┘
                    │
                    ▼
             ┌──────────────┐
             │ ChromaDB     │
             │ Vector Store │
             └──────┬───────┘
                    │
                    │
USER QUESTION ──────┤
                    ▼
             ┌──────────────┐
             │ Similarity   │
             │ Retrieval    │
             └──────┬───────┘
                    │
                    ▼
             ┌──────────────┐
             │ Relevant     │
             │ Context      │
             └──────┬───────┘
                    │
                    ▼
             ┌──────────────┐
             │ Gemini LLM   │
             │ / Ollama     │
             └──────┬───────┘
                    │
                    ▼
             ┌──────────────┐
             │ Final Answer │
             └──────────────┘
```

---

# 🧩 How It Works

## 1. Upload

The user uploads one or more PDF documents.

The frontend sends the documents to the FastAPI `/upload` endpoint.

## 2. Document Processing

The backend loads the PDF using a PDF document loader.

The extracted text is divided into smaller chunks so that relevant sections can be retrieved efficiently.

## 3. Embedding Generation

Each document chunk is converted into a vector representation using Google's embedding model.

These vectors represent the semantic meaning of the text.

## 4. Vector Storage

The embeddings are stored in **ChromaDB**.

This creates a searchable semantic representation of the uploaded document.

## 5. User Question

When the user asks a question, DocMind searches the vector store for the most relevant document chunks.

## 6. Retrieval

The retriever identifies relevant context from the uploaded document.

The project also supports contextual compression retrieval to improve the relevance of retrieved information.

## 7. Generation

The retrieved context is passed to the configured language model.

The model generates an answer using the retrieved document information.

## 8. Response

The generated answer is returned through the FastAPI backend and displayed in the React chat interface.

---

# 🛠️ Tech Stack

## Frontend

* React
* TypeScript
* Vite
* Axios
* React Router
* Modern responsive UI

## Backend

* Python
* FastAPI
* Uvicorn
* Pydantic

## AI / RAG

* LangChain
* Google Gemini
* Google Generative AI
* Ollama
* Retrieval-Augmented Generation

## Embeddings

* Google Generative AI Embeddings
* `gemini-embedding-001`

## Vector Database

* ChromaDB

## Document Processing

* PyPDF
* LangChain document loaders
* Text chunking

## Deployment

* Vercel — Frontend
* Render — Backend
* GitHub — Source Control

---

# 📁 Project Structure

```text
RAG/
│
├── backend/
│   ├── main.py
│   ├── config.py
│   ├── rag_core.py
│   │
│   ├── models/
│   │   └── schemas.py
│   │
│   └── routers/
│       ├── chat.py
│       ├── upload.py
│       └── sessions.py
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── contexts/
│       ├── services/
│       └── ...
│
├── requirements.txt
├── .env.example
└── README.md
```

---

# 🔌 API Architecture

DocMind exposes a FastAPI backend for communication between the frontend and the RAG pipeline.

### Health Check

```http
GET /health
```

Used to verify that the backend is running.

### Create Session

```http
POST /session/new
```

Creates a new chat session.

### Upload Documents

```http
POST /upload
```

Handles PDF uploads and initializes the RAG pipeline.

### Chat

```http
POST /chat
```

Processes a user's question using the document retrieval and LLM pipeline.

---

# 🔐 Configuration

The backend uses environment variables for sensitive configuration.

Example:

```env
GOOGLE_API_KEY=your_google_api_key
CORS_ORIGINS=http://localhost:5173
HOST=0.0.0.0
PORT=8000
```

For local Ollama experimentation, the corresponding Ollama environment configuration can also be provided according to the local Ollama setup.

> **Never commit real API keys or secrets to GitHub.**

---

# 🚀 Local Development

## 1. Clone the repository

```bash
git clone https://github.com/BVTejaswini24/DockMind.git
cd DockMind
```

## 2. Create a virtual environment

### Windows

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

## 3. Install dependencies

```bash
pip install -r requirements.txt
```

## 4. Configure environment variables

Create:

```text
backend/.env
```

Add:

```env
GOOGLE_API_KEY=your_google_api_key
```

Configure additional variables if required by your environment.

## 5. Start the backend

```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:

```text
http://localhost:8000
```

## 6. Start the frontend

Navigate to the frontend directory and install the frontend dependencies:

```bash
cd frontend
npm install
npm run dev
```

The frontend will normally be available through the Vite development server.

---

# ☁️ Deployment

DocMind uses a separated deployment architecture.

```text
                    GitHub Repository
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
        ┌───────────┐             ┌───────────┐
        │  Vercel   │             │   Render  │
        │ Frontend  │────────────▶│  Backend  │
        └───────────┘    API      └─────┬─────┘
                                        │
                                        ▼
                                ┌──────────────┐
                                │ Google Gemini│
                                └──────────────┘
```

### Frontend

Hosted on Vercel.

### Backend

Hosted on Render.

### AI

The deployed backend uses Google Gemini through the configured Google API key.

---

# 🦙 Ollama Support

DocMind includes an Ollama integration for local LLM experimentation.

The architecture allows the application to work with a locally hosted model instead of relying exclusively on a cloud-based LLM.

Conceptually:

```text
User
 │
 ▼
FastAPI
 │
 ▼
RAG Retriever
 │
 ▼
Relevant Document Context
 │
 ▼
Ollama
 │
 ▼
Local LLM
 │
 ▼
Answer
```

This makes Ollama useful for experimenting with local inference, privacy-oriented workflows, and reducing dependency on cloud LLM generation during development.

The current deployed production configuration uses Google Gemini.

---

# 🎯 Why RAG?

A traditional LLM may not have access to the information contained inside a user's private documents.

RAG solves this by giving the model relevant information from the user's documents at query time.

Instead of:

```text
Question → LLM → Answer
```

DocMind uses:

```text
Question
   ↓
Retrieve relevant document sections
   ↓
Add retrieved context
   ↓
LLM
   ↓
Context-aware answer
```

This makes the chatbot better suited for document-based question answering.

---

# 🧠 Key Engineering Concepts Demonstrated

This project demonstrates practical implementation of:

* Retrieval-Augmented Generation
* Semantic search
* Vector embeddings
* Vector databases
* Conversational AI
* Contextual retrieval
* LLM integration
* REST API development
* Session management
* Frontend/backend integration
* Environment-based configuration
* Cloud deployment
* Local LLM integration
* AI application architecture

---

# 🧪 Development & Debugging

During development, the project included debugging and deployment validation for:

* FastAPI CORS configuration
* Vercel → Render communication
* PDF upload pipeline
* Google API authentication
* Gemini model compatibility
* ChromaDB retrieval
* LangChain conversational retrieval
* Frontend API configuration
* Production deployment logs

The production configuration was updated to use an available Gemini generation model after validating the available models through the Google Generative AI API.

---

# 📊 Application Flow

```text
┌─────────────────┐
│   Open DocMind  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Create Session  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Upload PDF      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Extract Text    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Split Chunks    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Create Vectors  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Store ChromaDB  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Ask Question    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Retrieve Context│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Gemini / Ollama │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ AI Answer       │
└─────────────────┘
```

---

# 🌟 What Makes DocMind Different?

DocMind is not simply a chatbot connected to an LLM.

It demonstrates a complete AI application pipeline:

```text
Documents
    ↓
Processing
    ↓
Chunking
    ↓
Embeddings
    ↓
Vector Database
    ↓
Retrieval
    ↓
Context
    ↓
LLM
    ↓
Conversational Answer
```

This makes it a practical example of building and deploying a **production-style Retrieval-Augmented Generation application**.

---

# 🔮 Future Improvements

Potential future improvements include:

* Support for additional document formats
* Multi-document conversations
* Improved citation/source display
* Streaming AI responses
* Advanced conversation memory
* Better retrieval evaluation
* Hybrid keyword + semantic search
* User authentication
* Persistent user sessions
* Additional LLM providers
* Improved local Ollama workflows
* RAG evaluation and benchmarking

---

# 📸 Live Application

Try the deployed application:

## 🚀 [Launch DocMind AI](https://dock-mind-git-main-tejaswinis-projects-ba64286e.vercel.app/)

Upload a PDF, ask questions about the document, and interact with the RAG-powered assistant.

---

# 👩‍💻 Author

**Tejaswini BV**

Built as an AI/ML portfolio project focused on understanding and implementing Retrieval-Augmented Generation systems using modern LLM, vector database, and full-stack technologies.

---

# 📄 License

This project is available under the MIT License.

---


```
