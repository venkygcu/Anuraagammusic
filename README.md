# Anuraagam Music App

A production-ready music streaming web app.

## Stack
- **Frontend**: React (Vite), TypeScript, Redux Toolkit, MUI
- **Backend**: Node.js / Express

## Dev Setup
1. From the app folder:
   - `npm run dev:server` → Backend on `http://localhost:5000`
   - `npm run dev` → Frontend (Vite) on `http://localhost:5174` by default
2. Vite proxies `/api`, `/auth`, `/otp`, `/download` to the backend (`http://localhost:5000`). Ensure backend `PORT=5000`.

## Environment Variables
- `PORT` (default `5000`)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`

## Build & Run (Production)
1. `npm run build`
2. `npm run server` (serves built frontend and APIs on one port)

## Notes
- Local media files are served from `/download` with streaming headers.
- Songs metadata is provided by `/api/songs`.