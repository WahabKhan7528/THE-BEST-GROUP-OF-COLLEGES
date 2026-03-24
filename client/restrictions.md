# THE BEST GROUP OF COLLEGES

## Complete RBAC Restrictions and Coverage Documentation

## 1. Objective

This file is the authoritative frontend RBAC reference for the project.

It is based on recursive analysis of all JavaScript and JSX files inside `client/src`.

## 2. Coverage Guarantee

- Total files analyzed: `138`
- Scope: all `src/**/*.js` and `src/**/*.jsx`
- Folders covered: `components`, `context`, `data`, `layouts`, `pages`, `schemas`, root app files
- Hooks folder in current codebase: not present
- Utils folder in current codebase: not present

## 3. Roles and Scope

### Super Admin

- Full administrative access across all campuses.
- Can manage campus, admin allocation, users, classes, courses, subjects, and CMS modules.

### Sub Admin

- Administrative access limited to allocated campus/campuses.
- Can manage operational academic entities in allowed campuses.
- Should not access super-admin governance modules.

### Faculty Member

- Teaching operations only.
- Works on assignments, submissions, materials, results, announcements.
- Correct restriction should be based on ownership (assigned class/subject/assignment), not campus only.

### Student

- Learning operations only.
- Can view assigned resources and own academic artifacts (results/submissions).

### Public User

- Public site browsing and form submission only (admissions/contact).

## 4. Portal and Route Surface

### Public

- Base routes under `RootLayout` and campus pages.
- Login route: `/login/:type`.

### Admin

- Routes under `/admin/*` with `AdminProvider` and `AdminLayout`.
- Includes users, courses, subjects, classes, campus management, CMS news/gallery.

### Faculty

- Routes under `/faculty/*` with `FacultyProvider` and `FacultyLayout`.
- Includes assignments, submissions, materials, results, announcements.

### Student

- Routes under `/student/*` with `StudentProvider` and `StudentLayout`.
- Includes assignments, submissions, materials, results, announcements.

## 5. True Enforcement Model Observed in Frontend

### 5.1 Strongest frontend checks in code

- Context-based role/campus filtering in admin list pages.
- Page-level redirects for some super-admin-only pages (for example news/gallery allocation-related pages).
- UI menu filtering for admin nav items.

### 5.2 Important architectural limitation

- No centralized route guard component enforcing role at route boundary.
- Authorization is primarily context/UI-driven in frontend code.

## 6. Module Map with Actions and Role Permissions

Legend:

- `ALLOW`: explicitly available in current UI flow.
- `ALLOW*`: available with partial restrictions in frontend (campus or context filtering).
- `RESTRICT`: not intended for role in current flow.
- `WEAK`: action exists but ownership/role validation is weak or missing in-page.

| Module                      | Actions                                                                                    | Super Admin | Sub Admin | Faculty Member | Student     | Public   |
| --------------------------- | ------------------------------------------------------------------------------------------ | ----------- | --------- | -------------- | ----------- | -------- |
| Authentication (Login page) | Select portal type, submit login form                                                      | ALLOW       | ALLOW     | ALLOW          | ALLOW       | ALLOW    |
| Admin Dashboard             | View stats and quick actions                                                               | ALLOW       | ALLOW\*   | RESTRICT       | RESTRICT    | RESTRICT |
| User Management             | List, filter, create, edit, disable                                                        | ALLOW       | ALLOW\*   | RESTRICT       | RESTRICT    | RESTRICT |
| Campus Management           | List/create/edit/delete campus                                                             | ALLOW       | RESTRICT  | RESTRICT       | RESTRICT    | RESTRICT |
| Admin Allocation            | Allocate sub-admin to campus                                                               | ALLOW       | RESTRICT  | RESTRICT       | RESTRICT    | RESTRICT |
| Courses (Admin)             | List/create/edit/delete                                                                    | ALLOW       | ALLOW\*   | RESTRICT       | RESTRICT    | RESTRICT |
| Subjects (Admin)            | List/create/edit/delete                                                                    | ALLOW       | ALLOW\*   | RESTRICT       | RESTRICT    | RESTRICT |
| Classes (Admin)             | List/create/edit/delete                                                                    | ALLOW       | ALLOW\*   | RESTRICT       | RESTRICT    | RESTRICT |
| CMS News (Admin)            | List/create/edit/delete                                                                    | ALLOW       | RESTRICT  | RESTRICT       | RESTRICT    | RESTRICT |
| CMS Gallery (Admin)         | List/upload/edit/delete                                                                    | ALLOW       | RESTRICT  | RESTRICT       | RESTRICT    | RESTRICT |
| Faculty Dashboard           | View assigned teaching stats                                                               | RESTRICT    | RESTRICT  | ALLOW\*        | RESTRICT    | RESTRICT |
| Faculty Assignments         | List/create/edit/delete, navigate to submissions                                           | RESTRICT    | RESTRICT  | ALLOW, WEAK    | RESTRICT    | RESTRICT |
| Faculty Submissions         | View submissions and mark grading inputs                                                   | RESTRICT    | RESTRICT  | ALLOW, WEAK    | RESTRICT    | RESTRICT |
| Faculty Materials           | List/upload/edit/delete/download                                                           | RESTRICT    | RESTRICT  | ALLOW, WEAK    | RESTRICT    | RESTRICT |
| Faculty Results             | Class selection and grade-entry workflows                                                  | RESTRICT    | RESTRICT  | ALLOW, WEAK    | RESTRICT    | RESTRICT |
| Faculty Announcements       | Post/delete class announcements                                                            | RESTRICT    | RESTRICT  | ALLOW, WEAK    | RESTRICT    | RESTRICT |
| Student Dashboard           | View own summary                                                                           | RESTRICT    | RESTRICT  | RESTRICT       | ALLOW\*     | RESTRICT |
| Student Assignments         | View/submit/edit submission UI state                                                       | RESTRICT    | RESTRICT  | RESTRICT       | ALLOW, WEAK | RESTRICT |
| Student Submissions         | View own submission history and feedback                                                   | RESTRICT    | RESTRICT  | RESTRICT       | ALLOW\*     | RESTRICT |
| Student Materials           | View/download materials                                                                    | RESTRICT    | RESTRICT  | RESTRICT       | ALLOW\*     | RESTRICT |
| Student Results             | View own result details                                                                    | RESTRICT    | RESTRICT  | RESTRICT       | ALLOW\*     | RESTRICT |
| Student Announcements       | View campus/enrollment-filtered announcements                                              | RESTRICT    | RESTRICT  | RESTRICT       | ALLOW\*     | RESTRICT |
| Public Content              | Read informational pages (home/about/faculty/gallery/news/contact/admissions/campus pages) | ALLOW       | ALLOW     | ALLOW          | ALLOW       | ALLOW    |
| Public Forms                | Admissions/contact submission                                                              | ALLOW       | ALLOW     | ALLOW          | ALLOW       | ALLOW    |

## 7. Campus vs Ownership Rules (Required Target)

### 7.1 Campus-bound rules

- Sub Admin operations must remain within allocated campus scope for create/read/update/delete of users, courses, classes, subjects.
- Super Admin can operate across all campuses.

### 7.2 Ownership-bound rules

- Faculty create/edit/delete/grade operations should be validated against ownership (faculty-to-class-subject-assignment relation), not only campus.
- Student access should be tied to own identity and enrollment.

### 7.3 Current mismatch observed

- Multiple faculty workflows are campus-context filtered but do not consistently validate ownership in-page before edit/grade actions.

## 8. Uncovered or Weakly Enforced Areas

1. No centralized route-level role guard in router definitions.
2. Login route behavior is portal-type driven in frontend; robust auth verification is not represented in this frontend layer.
3. Several faculty mutation flows (assignment/material/results/submission grading) are weak on explicit ownership checks.
4. Some admin edit/delete pages rely on list-time filtering and UI restrictions more than hard in-page ownership/campus validation.
5. Role filtering in navigation is useful but remains UI-level control.

## 9. Files Analyzed (Coverage Report)

All files below were traversed and mapped.

```text
App.jsx
components/admin/CampusFilter.jsx
components/faculty/ResultEntryTable.jsx
components/portal-shared/AnnouncementCard.jsx
components/portal-shared/AssignmentCard.jsx
components/portal-shared/DarkModeToggle.jsx
components/portal-shared/MaterialCard.jsx
components/portal-shared/PortalForm.jsx
components/portal-shared/PortalNavbar.jsx
components/portal-shared/PortalPageHeader.jsx
components/portal-shared/PortalSidebar.jsx
components/portal-shared/PortalStatsCard.jsx
components/portal-shared/SubmissionCard.jsx
components/portal-shared/Table.jsx
components/public_site/AdmissionForm.jsx
components/public_site/CampusCard.jsx
components/public_site/CampusCta.jsx
components/public_site/CampusHero.jsx
components/public_site/ContactForm.jsx
components/public_site/CTASection.jsx
components/public_site/EventCard.jsx
components/public_site/FacilityCard.jsx
components/public_site/FacultyGrid.jsx
components/public_site/FAQ.jsx
components/public_site/FilterBar.jsx
components/public_site/Footer.jsx
components/public_site/Navbar.jsx
components/public_site/NewsCard.jsx
components/public_site/NewsEventPopover.jsx
components/public_site/PageHero.jsx
components/public_site/Pagination.jsx
components/public_site/PortalSelector.jsx
components/public_site/ProgramCard.jsx
components/public_site/Section.jsx
components/public_site/SectionHeader.jsx
components/public_site/StatsGrid.jsx
components/public_site/TestimonialSlider.jsx
components/shared/Badge.jsx
components/shared/Button.jsx
components/shared/Card.jsx
components/shared/ErrorBoundary.jsx
components/shared/FormInput.jsx
components/shared/PageLoader.jsx
components/shared/PublicButton.jsx
components/student/ResultTable.jsx
context/AdminContext.jsx
context/ConfirmContext.jsx
context/FacultyContext.jsx
context/StudentContext.jsx
context/ThemeContext.jsx
context/ToastContext.jsx
data/aboutData.js
data/adminData.js
data/admissionsData.js
data/campusData.js
data/facultyMembersData.js
data/facultyPortalData.js
data/faqData.js
data/galleryData.js
data/homeData.js
data/navigationData.js
data/newsEventsData.js
data/programsData.js
data/studentPortalData.js
layouts/AdminLayout.jsx
layouts/CampusLayout.jsx
layouts/FacultyLayout.jsx
layouts/RootLayout.jsx
layouts/StudentLayout.jsx
main.jsx
pages/admin/campus/AllocateAdmin.jsx
pages/admin/campus/CampusAdminsList.jsx
pages/admin/campus/CampusManagement.jsx
pages/admin/campus/CreateCampus.jsx
pages/admin/campus/EditCampus.jsx
pages/admin/classes/ClassesList.jsx
pages/admin/classes/CreateClass.jsx
pages/admin/classes/EditClass.jsx
pages/admin/cms/gallery/EditGalleryImage.jsx
pages/admin/cms/gallery/Gallery.jsx
pages/admin/cms/gallery/UploadImage.jsx
pages/admin/cms/news/CreateNews.jsx
pages/admin/cms/news/EditNews.jsx
pages/admin/cms/news/NewsList.jsx
pages/admin/courses/CourseList.jsx
pages/admin/courses/CreateCourse.jsx
pages/admin/courses/EditCourse.jsx
pages/admin/Dashboard.jsx
pages/admin/subjects/CreateSubject.jsx
pages/admin/subjects/EditSubject.jsx
pages/admin/subjects/SubjectsList.jsx
pages/admin/users/CreateUser.jsx
pages/admin/users/EditUser.jsx
pages/admin/users/UsersList.jsx
pages/campuses/CampusPage.jsx
pages/campuses/common/AcademicsPage.jsx
pages/campuses/common/FacilitiesPage.jsx
pages/campuses/common/FacultyPage.jsx
pages/campuses/common/StudentLifePage.jsx
pages/faculty/Announcements.jsx
pages/faculty/Assignments.jsx
pages/faculty/CreateAssignment.jsx
pages/faculty/Dashboard.jsx
pages/faculty/EditAssignment.jsx
pages/faculty/EditMaterial.jsx
pages/faculty/Materials.jsx
pages/faculty/Results.jsx
pages/faculty/Submissions.jsx
pages/faculty/UploadMaterial.jsx
pages/public_site_pages/About.jsx
pages/public_site_pages/Admissions.jsx
pages/public_site_pages/Contact.jsx
pages/public_site_pages/Faculty.jsx
pages/public_site_pages/Gallery.jsx
pages/public_site_pages/Home.jsx
pages/public_site_pages/Login.jsx
pages/public_site_pages/NewsAndEvents.jsx
pages/public_site_pages/NotFound.jsx
pages/student/Announcements.jsx
pages/student/Assignments.jsx
pages/student/Dashboard.jsx
pages/student/Materials.jsx
pages/student/News.jsx
pages/student/Results.jsx
pages/student/Submissions.jsx
schemas/admissionSchema.js
schemas/announcementSchema.js
schemas/assignmentSchema.js
schemas/campusSchema.js
schemas/classSchema.js
schemas/contactSchema.js
schemas/courseSchema.js
schemas/gallerySchema.js
schemas/loginSchema.js
schemas/materialSchema.js
schemas/newsSchema.js
schemas/subjectSchema.js
schemas/userSchema.js
```

## 10. File-to-Module Mapping (All Files Covered)

### 10.1 Core application and layout files

- `App.jsx`, `main.jsx`
- `layouts/AdminLayout.jsx`, `layouts/CampusLayout.jsx`, `layouts/FacultyLayout.jsx`, `layouts/RootLayout.jsx`, `layouts/StudentLayout.jsx`

Module association:

- Routing, app bootstrapping, portal shell boundaries
  Roles:
- System, Public, Admin, Faculty, Student
  Actions:
- Route composition, page outlet rendering, nav visibility

### 10.2 Context files

- `context/AdminContext.jsx`, `context/ConfirmContext.jsx`, `context/FacultyContext.jsx`, `context/StudentContext.jsx`, `context/ThemeContext.jsx`, `context/ToastContext.jsx`

Module association:

- Permission context and shared UX context
  Roles:
- All portal roles
  Actions:
- Role state, campus filter state, modal/confirm/toast/theme behavior

### 10.3 Admin pages and supporting admin component

- `components/admin/CampusFilter.jsx`
- `pages/admin/Dashboard.jsx`
- `pages/admin/users/CreateUser.jsx`, `pages/admin/users/EditUser.jsx`, `pages/admin/users/UsersList.jsx`
- `pages/admin/courses/CourseList.jsx`, `pages/admin/courses/CreateCourse.jsx`, `pages/admin/courses/EditCourse.jsx`
- `pages/admin/classes/ClassesList.jsx`, `pages/admin/classes/CreateClass.jsx`, `pages/admin/classes/EditClass.jsx`
- `pages/admin/subjects/SubjectsList.jsx`, `pages/admin/subjects/CreateSubject.jsx`, `pages/admin/subjects/EditSubject.jsx`
- `pages/admin/campus/CampusManagement.jsx`, `pages/admin/campus/CreateCampus.jsx`, `pages/admin/campus/EditCampus.jsx`, `pages/admin/campus/CampusAdminsList.jsx`, `pages/admin/campus/AllocateAdmin.jsx`
- `pages/admin/cms/news/NewsList.jsx`, `pages/admin/cms/news/CreateNews.jsx`, `pages/admin/cms/news/EditNews.jsx`
- `pages/admin/cms/gallery/Gallery.jsx`, `pages/admin/cms/gallery/UploadImage.jsx`, `pages/admin/cms/gallery/EditGalleryImage.jsx`

Module association:

- Governance and academic administration
  Roles:
- Super Admin, Sub Admin
  Actions:
- Create/read/update/delete/filter/allocate/manage

### 10.4 Faculty pages and supporting faculty component

- `components/faculty/ResultEntryTable.jsx`
- `pages/faculty/Dashboard.jsx`
- `pages/faculty/Assignments.jsx`, `pages/faculty/CreateAssignment.jsx`, `pages/faculty/EditAssignment.jsx`
- `pages/faculty/Submissions.jsx`
- `pages/faculty/Materials.jsx`, `pages/faculty/UploadMaterial.jsx`, `pages/faculty/EditMaterial.jsx`
- `pages/faculty/Results.jsx`
- `pages/faculty/Announcements.jsx`

Module association:

- Teaching and assessment workflows
  Roles:
- Faculty Member
  Actions:
- Create/update/delete/upload/grade/post/view

### 10.5 Student pages and supporting student component

- `components/student/ResultTable.jsx`
- `pages/student/Dashboard.jsx`
- `pages/student/Assignments.jsx`
- `pages/student/Submissions.jsx`
- `pages/student/Materials.jsx`
- `pages/student/Results.jsx`
- `pages/student/Announcements.jsx`
- `pages/student/News.jsx`

Module association:

- Learning and personal academic tracking
  Roles:
- Student
  Actions:
- View/download/submit/track

### 10.6 Public site pages and public components

- `pages/public_site_pages/Home.jsx`, `About.jsx`, `Admissions.jsx`, `Faculty.jsx`, `Gallery.jsx`, `NewsAndEvents.jsx`, `Contact.jsx`, `Login.jsx`, `NotFound.jsx`
- `pages/campuses/CampusPage.jsx`
- `pages/campuses/common/AcademicsPage.jsx`, `FacilitiesPage.jsx`, `FacultyPage.jsx`, `StudentLifePage.jsx`
- `components/public_site/AdmissionForm.jsx`, `CampusCard.jsx`, `CampusCta.jsx`, `CampusHero.jsx`, `ContactForm.jsx`, `CTASection.jsx`, `EventCard.jsx`, `FacilityCard.jsx`, `FacultyGrid.jsx`, `FAQ.jsx`, `FilterBar.jsx`, `Footer.jsx`, `Navbar.jsx`, `NewsCard.jsx`, `NewsEventPopover.jsx`, `PageHero.jsx`, `Pagination.jsx`, `PortalSelector.jsx`, `ProgramCard.jsx`, `Section.jsx`, `SectionHeader.jsx`, `StatsGrid.jsx`, `TestimonialSlider.jsx`

Module association:

- Public information and lead forms
  Roles:
- Public (also visible to authenticated users)
  Actions:
- View/filter/search/submit forms

### 10.7 Shared portal components

- `components/portal-shared/AnnouncementCard.jsx`, `AssignmentCard.jsx`, `DarkModeToggle.jsx`, `MaterialCard.jsx`, `PortalForm.jsx`, `PortalNavbar.jsx`, `PortalPageHeader.jsx`, `PortalSidebar.jsx`, `PortalStatsCard.jsx`, `SubmissionCard.jsx`, `Table.jsx`

Module association:

- Reusable portal interaction patterns
  Roles:
- Admin, Faculty, Student
  Actions:
- Render action UI for create/edit/delete/grade/view paths

### 10.8 Shared generic UI components

- `components/shared/Badge.jsx`, `Button.jsx`, `Card.jsx`, `ErrorBoundary.jsx`, `FormInput.jsx`, `PageLoader.jsx`, `PublicButton.jsx`

Module association:

- Shared presentational and control primitives
  Roles:
- All
  Actions:
- UI composition only (security depends on parent usage)

### 10.9 Data files

- `data/aboutData.js`, `adminData.js`, `admissionsData.js`, `campusData.js`, `facultyMembersData.js`, `facultyPortalData.js`, `faqData.js`, `galleryData.js`, `homeData.js`, `navigationData.js`, `newsEventsData.js`, `programsData.js`, `studentPortalData.js`

Module association:

- Mock content and seeded state models
  Roles:
- System support for all
  Actions:
- Read/list/filter source data

### 10.10 Schema files

- `schemas/admissionSchema.js`, `announcementSchema.js`, `assignmentSchema.js`, `campusSchema.js`, `classSchema.js`, `contactSchema.js`, `courseSchema.js`, `gallerySchema.js`, `loginSchema.js`, `materialSchema.js`, `newsSchema.js`, `subjectSchema.js`, `userSchema.js`

Module association:

- Form validation contract layer
  Roles:
- All role flows indirectly
  Actions:
- Validate inputs

## 11. Unmapped Files

None.

All 138 analyzed files are mapped either to a direct business module or to infrastructure support categories (`shared`, `context`, `data`, `schemas`, `layout`, `core`).

## 12. Final Governance Note

This document reflects true frontend behavior as implemented. For production-grade security, backend authorization must enforce the same matrix, and frontend route-level guards should be added to align UX and security boundaries.
