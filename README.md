# Level 4 — Week 2: Playlists API
### This README is a working outline

REST API built with Express for managing playlists and songs.

This project is part of the Codex Academy Level 4 backend course.

The API starts with in-memory storage (Phase 1) and will later migrate to Supabase Postgres using Prisma ORM (Phase 2).

---

## Features (Phase 1)
- User authentication (JWT)
- Playlists (primary resource)
- Songs inside playlists (one-to-many relationship)
- Ownership rules (only creator can modify/delete)
- Duplicate song prevention per playlist
- Pagination with limit & offset
- Global response envelope
- Global error handler
- Request ID tracking
- Automated tests (Vitest + Supertest)

---

## Tech Stack
- Node.js
- Express
- Vitest + Supertest
- JWT Authentication
- In-memory data storage (Phase 1)

---

## Getting Started

### Install
```bash
npm install
```
### Run dev server
`npm run dev`

### Server runs at:
http://localhost:3000
### Health Check
GET /health
### Response
```json
{
  "ok": true,
  "data": { "status": "ok" }
}
```
## API Response Format
### Success
```json
{
  "ok": true,
  "data": {},
  "meta": {}
}
```
### Error
```json
{
  "ok": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": null,
    "requestId": "uuid"
  }
}
```
## Resources
## Primary Resource
`/playlist`
### Related Resource
`/playlists/:id/songs`

## Authentication
protected routes require:
```
Authorization: Bearer <token>
```

### Status Codes Used
- 200 OK
- 201 Created
- 204 No Content
- 400 Valitdation Error
- 401 Forbidden
- 404 Not Found
- 409 Conflict
  
### Project Phases
### Phase 1

In-memory API with full functionality

### Phase 2

Prisma ORM + Supabase Postgres integration

