
# 🧠 AI Medical Voice Agent

A real-time, AI-powered medical voice assistant built using Next.js, React, TypeScript, AssemblyAI, Clerk for auth, and Neon DB for persistent storage. This app allows users to engage in voice-based medical conversations where speech is transcribed, analyzed, and responded to instantly.

---

## 🔧 Tech Stack

- **Framework**: Next.js (App Router)
- **Frontend**: React, TypeScript, TailwindCSS
- **Voice API**: AssemblyAI (Real-Time Streaming)
- **Authentication**: Clerk
- **Database**: Neon (PostgreSQL)
- **Deployment**: Vercel

---

## 🚀 Features

- 🎙️ Real-time voice-to-text transcription
- 💬 AI-generated medical responses
- 🔐 User authentication and session management
- 📁 Transcript storage per user in PostgreSQL
- 📊 Dashboard with call summaries


---

## 📦 Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/Shivansh-08/ai-medical-agent
   cd ai-medical-voice-agent


2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file and add:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   NEXT_PUBLIC_VAPI_API_KEY=your_key

   NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID=your_key
   

   DATABASE_URL=your_neon_db_connection_url

   OPENAI_API_KEY=your_openai_key 
   ```

4. **Run the app**

   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000)

---

## 🧠 How It Works

1. User authenticates via Clerk
2. Upon clicking the mic button, the app:

   * Streams audio to AssemblyAI
   * Displays real-time transcription
   * Sends transcript to an AI model
   * Renders and speaks the AI's response
3. Transcripts are saved in Neon DB

---

## 🌐 Deployment

The app is ready for deployment on [Vercel](https://ai-medical-agent-chi.vercel.app)


Set your environment variables in the Vercel dashboard for production.

---

