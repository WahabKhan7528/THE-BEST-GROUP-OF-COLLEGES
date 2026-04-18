# The Best Group Of Colleges Frontend

## Local Setup

```bash
cd client
npm install
npm run dev
```

Copy `.env.example` to `.env` for local development.

## Vercel Deployment

Project settings:

- Framework preset: `Vite`
- Root directory: `client`
- Build command: `npm run build`
- Output directory: `dist`

Required environment variables in Vercel:

- `VITE_BACKEND_API=https://your-backend-service.onrender.com`
- `VITE_EMAILJS_SERVICE_ID` (optional)
- `VITE_EMAILJS_APPLICATION_TEMPLATE` (optional)
- `VITE_EMAILJS_PUBLIC_KEY` (optional)

Notes:

- `vercel.json` includes an SPA rewrite so React Router routes work on refresh.
- `VITE_BACKEND_API` should not include `/api/v1` because the app appends it automatically.
