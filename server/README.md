# The Best College Server

Complete backend for the `client` frontend using:

- Node.js + Express.js
- MongoDB Atlas (Mongoose)
- JWT access/refresh tokens
- bcrypt password hashing
- Cloudinary for image/file storage

## 1) Setup

```bash
cd server
npm install
```

Create `.env` from `.env.example` and fill all values.

## 2) Run

```bash
npm run dev
```

Health check:

- `GET /api/v1/health`

## 3) Seed First Super Admin

```bash
node utils/seedSuperAdmin.js
```

Optional env overrides:

- `SEED_SUPER_ADMIN_ID`
- `SEED_SUPER_ADMIN_EMAIL`
- `SEED_SUPER_ADMIN_PASSWORD`

## 4) Authentication Flow (Postman)

1. `POST /api/v1/auth/login`
2. Use returned `accessToken` in header:
   - `Authorization: Bearer <accessToken>`
3. Refresh when expired:
   - `POST /api/v1/auth/refresh` with `refreshToken`
4. Logout:
   - `POST /api/v1/auth/logout`

## 5) Core API Modules

### Public

- `GET /api/v1/public/campuses`
- `GET /api/v1/public/courses`
- `GET /api/v1/public/faculty?q=&page=&limit=`
- `GET /api/v1/public/news-events?type=news|event`
- `GET /api/v1/public/gallery?category=`

### Auth

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`

### Admin (super_admin/admin)

- Users: `POST/GET /api/v1/admin/users`, `PUT /api/v1/admin/users/:id`, `DELETE /api/v1/admin/users/:id` (deactivate only)
- Campuses: `POST/GET /api/v1/admin/campuses`, `PUT/DELETE /api/v1/admin/campuses/:id`
- Courses: `POST/GET /api/v1/admin/courses`, `PUT/DELETE /api/v1/admin/courses/:id`
- Classes: `POST/GET /api/v1/admin/classes`, `PUT/DELETE /api/v1/admin/classes/:id`
- Subjects: `POST/GET /api/v1/admin/subjects`, `PUT/DELETE /api/v1/admin/subjects/:id`
- News/Events: `POST/GET /api/v1/admin/news-events`, `PUT/DELETE /api/v1/admin/news-events/:id`
- Gallery: `POST /api/v1/admin/gallery`, `PUT/DELETE /api/v1/admin/gallery/:id`

### Portal (faculty/student/admin)

- Announcements: `POST/GET /api/v1/portal/announcements`
- Assignments: `POST/GET /api/v1/portal/assignments`, `PUT /api/v1/portal/assignments/:id`
- Materials: `POST/GET /api/v1/portal/materials`, `PUT /api/v1/portal/materials/:id`
- Submissions:
  - Student submit: `POST /api/v1/portal/submissions`
  - Student own list: `GET /api/v1/portal/submissions`
  - Faculty by assignment: `GET /api/v1/portal/submissions/assignment/:assignmentId`
  - Grade: `PUT /api/v1/portal/submissions/:id/grade`
- Results: `POST/GET /api/v1/portal/results`

## 6) File Upload Fields (form-data)

- Campus image: field `image`
- News/Event image: field `image`
- Gallery image: field `image`
- Announcement attachment: field `attachment`
- Assignment attachment: field `attachment`
- Material file: field `file`
- Student submission file: field `file`

## 7) Architecture Notes

- Layered modular design: models, controllers, routes, middleware, services, utils
- Refresh tokens are persisted and rotated on refresh
- Expired refresh tokens are auto-removed by a MongoDB TTL index; revoked refresh tokens are purged by a scheduled cleanup task after a retention window
- Role-based route authorization for admin/faculty/student workflows
- Cloudinary stores all large media/documents to keep app servers stateless
- Mongoose relational refs ensure clean linkages across portals and CMS modules

## 8) Render Deployment

Service settings:

- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`

Required environment variables in Render:

- `NODE_ENV=production`
- `PORT` (Render provides this automatically)
- `MONGO_URI`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `ACCESS_TOKEN_EXPIRE` (example: `15m`)
- `REFRESH_TOKEN_EXPIRE_DAYS` (example: `7`)
- `REFRESH_TOKEN_REVOKED_RETENTION_DAYS` (example: `30`)
- `REFRESH_TOKEN_CLEANUP_INTERVAL_HOURS` (example: `24`)
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `FRONTEND_URL` (comma-separated allowed origins, include your Vercel domain)
- `FRONTEND_URL_REGEX` (optional; useful for Vercel preview deployments)
- `COOKIE_SECURE` (optional; set `true` to force `Secure` + `SameSite=None` cookies)
- `SERVER_PUBLIC_URL` (optional; Render also injects `RENDER_EXTERNAL_URL`)

Example production CORS values:

- `FRONTEND_URL=https://your-frontend.vercel.app,https://www.yourcustomdomain.com`
- `FRONTEND_URL_REGEX=^https://your-project-name-.*\.vercel\.app$`
