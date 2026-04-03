# Updated Project Status

## What Has Been Done

### Client fixes already applied
- Fixed auth refresh on page reload by bootstrapping `fetchUser()` in the app shell.
- Fixed dark/light toggle state mismatch by syncing Redux theme state with the actual document theme and both stored keys.
- Fixed campus creation so it now persists to the backend instead of only updating local UI state.
- Fixed campus refresh behavior so campuses reload from the server after refresh.

### Server fixes already applied
- Hardened campus creation validation in `adminController.js`.
- Added backend routes for new academic master data and operational tables.
- Added new schema models for the updated university flow.
- Added a seed script for demo academic data.
- Added a package script to run academic seeding.

### Documentation added
- `improvement.md` created with the implementation plan and target schema goals.

## Current Technical Requirements Covered
- Password hashing: `bcryptjs`.
- JWT sessions: already in place for login and refresh tokens.
- Database stack: MongoDB Atlas + Node.js + Express.js.

## New Backend Schema Added
- AcademicSession
- Semester
- AnnualYear
- CourseSemesterMapping
- AnnualYearMapping
- ClassSubject
- StudentEnrollment
- ResultCalculationLog

## Existing Schema Extended
- Course: added semester/year/cross-program metadata.
- Subject: added semester/year, credit hours, and elective flags.
- ClassRoom: added class code, academic session, and annual year support.
- Result: added enrollment, academic session, grade point, and result status fields.
- User: added admission session, current semester/year, CGPA, total credits, phone number, and status.

## API / Route Changes
- Added admin CRUD endpoints for:
  - academic sessions
  - semesters
  - annual years
  - course-semester mappings
  - annual-year mappings
  - class-subject mappings
  - student enrollments
  - result calculation logs

## Seed / Demo Data
- Added `server/utils/seedAcademicData.js`.
- Added `npm run seed:academic` in the server package.
- Seed covers:
  - sessions
  - semesters
  - annual years
  - courses
  - subjects

## What To Do Next
1. Wire result upload logic to calculate SGPA and CGPA automatically.
2. Add promotion logic for semester and annual students.
3. Add enrollment creation logic tied to admission and promotion.
4. Add class-subject assignment flow for faculty teaching.
5. Add result logging so every CGPA update is audited.
6. Add seeding for campuses, classes, faculty, students, enrollments, and sample results.
7. Run server startup validation and fix any remaining runtime errors.
8. Verify frontend admin pages still read the updated backend data correctly.

## Notes
- The UI layout was intentionally kept unchanged.
- Current changes focus on backend correctness, persistence, and long-term data flow support.
