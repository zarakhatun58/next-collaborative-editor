# Collaborative Editor

A modern real-time collaborative document editor built with **Next.js**, **TypeScript**, **PostgreSQL**, **Prisma**, **Socket.IO**, **Dexie (Offline Storage)**, and **Google Gemini AI**.

---

## Features

### Authentication

* JWT Authentication
* User Registration & Login
* Protected Routes
* Role-based Access

---

### Collaborative Editor

* Rich Text Editor (Tiptap)
* Real-time Collaboration
* Live Typing Indicator
* Live Cursor Sharing
* Online Presence
* Autosave
* Version History
* Document Sharing

---

### Offline Synchronization

* Offline Editing
* Local Queue using Dexie
* Background Synchronization
* Conflict Detection
* Conflict Resolution
* Merge Engine

---

### AI Assistant (Gemini)

* Improve Writing
* Rewrite Content
* Summarize Text
* Translate Text
* Explain Content
* Continue Writing
* Grammar Fix
* Tone Change
* Generate Title
* Bullet Point Generation

---

## Tech Stack

### Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* Tiptap Editor
* Framer Motion
* Socket.IO Client
* Dexie

### Backend

* Next.js API Routes
* Prisma ORM
* PostgreSQL (Neon)
* JWT Authentication
* Socket.IO
* Google Gemini API

---

## Project Structure

```text
src/
 ├── app/
 ├── components/
 ├── controllers/
 ├── services/
 ├── middleware/
 ├── hooks/
 ├── validators/
 ├── store/
 ├── config/
 ├── lib/
 └── types/

socket-server/
 ├── server.ts
 ├── socket.ts
 ├── auth.ts
 ├── package.json
 └── tsconfig.json
```

---

## Installation

Clone the repository.

```bash
git clone <repository-url>
```

Install frontend dependencies.

```bash
npm install
```

Install socket server dependencies.

```bash
cd socket-server
npm install
```

---

## Environment Variables

### Frontend (.env.local)

```env
DATABASE_URL=

JWT_SECRET=

NEXTAUTH_SECRET=

NEXTAUTH_URL=https://next-collaborative-editor-m2yp.vercel.app

NEXT_PUBLIC_API_URL=https://next-collaborative-editor-m2yp.vercel.app/api

NEXT_PUBLIC_SOCKET_URL=https://collaborative-editor-np61.onrender.com/

GEMINI_API_KEY=
```

---

### Socket Server (.env)

```env
JWT_SECRET=
```

---

## Database

Generate Prisma Client.

```bash
npx prisma generate
```

Run migrations.

```bash
npx prisma migrate deploy
```

or during development

```bash
npx prisma migrate dev
```

---

## Run Development

### Frontend

```bash
npm run dev
```

Runs on:

```
http://localhost:3000
```

---

### Socket Server

```bash
cd socket-server

npm run dev
```

Runs on:

```
http://localhost:4000
```

---

## Production Deployment

### Frontend

Deploy using **Vercel**.

Environment Variables:

```
DATABASE_URL
JWT_SECRET
NEXTAUTH_SECRET
NEXTAUTH_URL
NEXT_PUBLIC_API_URL
NEXT_PUBLIC_SOCKET_URL
GEMINI_API_KEY
```

---

### Socket Server

Deploy using **Render**.

Configuration:

* Runtime: Node
* Root Directory: `socket-server`
* Build Command:

```bash
npm install
npm run build
```

* Start Command:

```bash
npm start
```

Environment Variables:

```
JWT_SECRET
```

---

## API Endpoints

### Authentication

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

---

### Documents

```
GET    /api/documents
POST   /api/documents
GET    /api/documents/:id
PATCH  /api/documents/:id
DELETE /api/documents/:id
```

---

### Version History

```
GET  /api/versions
POST /api/versions
POST /api/versions/:id/restore
```

---

### Synchronization

```
POST  /api/sync
GET   /api/sync/queue
POST  /api/sync/process
GET   /api/sync/conflict
POST  /api/sync/conflict
PATCH /api/sync/conflict
```

---

### AI

```
POST /api/ai/improve
POST /api/ai/rewrite
POST /api/ai/summarize
POST /api/ai/translate
POST /api/ai/explain
POST /api/ai/continue
POST /api/ai/title
POST /api/ai/grammar
POST /api/ai/tone
POST /api/ai/bullets
```

---

## Main Functionalities

* JWT Authentication
* Rich Text Editing
* Real-time Collaboration
* Socket.IO Communication
* Live Cursor
* Typing Indicator
* Presence System
* Offline Sync Queue
* Conflict Detection
* Merge Engine
* Version History
* AI Writing Assistant

---

## License

This project is created for educational and assessment purposes.
