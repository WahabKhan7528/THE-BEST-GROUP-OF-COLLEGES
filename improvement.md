# Improvement Plan

## Goal
Bring the backend schema in line with the updated university data model while keeping the existing React UI unchanged.

## Core Requirements Already Present
- Password hashing: `bcryptjs` is already used in `server/models/User.js`.
- JWT session tokens: already implemented in `server/utils/token.js` and `server/services/authService.js`.
- MongoDB Atlas + Node.js + Express.js: already wired in `server/database/db.js`, `server/app.js`, and `server/server.js`.

## Target Data Model Additions
- Academic sessions
- Semester master records
- Annual year master records
- Course-to-semester mappings
- Course-to-annual-year mappings
- Class-subject-faculty mappings
- Student enrollment history
- Result calculation logs
- Admission application records

## Constraints
- Do not change the UI structure or design.
- Keep existing API routes working for the current frontend.
- Extend the backend with backward-compatible fields where possible.

## Implementation Phases
1. Add missing Mongoose models for the academic flow.
2. Extend existing models to support both semester and annual systems.
3. Add service/controller logic for enrollment, result logging, and promotion.
4. Seed demo data for sessions, courses, subjects, faculty, and students.
5. Validate auth, persistence, and current admin/public APIs.

## Current Status
- Existing auth flow is already using bcrypt and JWT.
- Campus persistence and refresh behavior were fixed on the client.
- Dark/light toggle state was synchronized on the client.
- Backend schema expansion is now the next major step.
