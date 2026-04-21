import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import PageLoader from "./components/shared/PageLoader";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import { fetchUser } from "./store/slices/authSlice";

let hasBootstrappedAuth = false;

// All time neccessary imports
import RootLayout from "./layouts/RootLayout";
import CampusLayout from "./layouts/CampusLayout";
import AdminLayout from "./layouts/AdminLayout";
import FacultyLayout from "./layouts/FacultyLayout";
import StudentLayout from "./layouts/StudentLayout";
import ProtectedRoute from "./components/shared/ProtectedRoute";

// Public pages
const Home = lazy(() => import("./pages/public-site-pages/Home"));
const About = lazy(() => import("./pages/public-site-pages/About"));
const Admissions = lazy(() => import("./pages/public-site-pages/Admissions"));
const Faculty = lazy(() => import("./pages/public-site-pages/Faculty"));
const Gallery = lazy(() => import("./pages/public-site-pages/Gallery"));
const Contact = lazy(() => import("./pages/public-site-pages/Contact"));
const NewsAndEvents = lazy(
  () => import("./pages/public-site-pages/NewsAndEvents"),
);
const Login = lazy(() => import("./pages/public-site-pages/Login"));
const NotFound = lazy(() => import("./pages/public-site-pages/NotFound"));

// Campus pages
const CampusPage = lazy(() => import("./pages/campuses/CampusPage"));
const AcademicsPage = lazy(
  () => import("./pages/campuses/common/AcademicsPage"),
);
const FacultyPage = lazy(() => import("./pages/campuses/common/FacultyPage"));
const StudentLifePage = lazy(
  () => import("./pages/campuses/common/StudentLifePage"),
);
const FacilitiesPage = lazy(
  () => import("./pages/campuses/common/FacilitiesPage"),
);

// Admin pages
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const UsersList = lazy(() => import("./pages/admin/users/UsersList"));
const CreateUser = lazy(() => import("./pages/admin/users/CreateUser"));
const EditUser = lazy(() => import("./pages/admin/users/EditUser"));
const CourseList = lazy(() => import("./pages/admin/courses/CourseList"));
const CreateCourse = lazy(() => import("./pages/admin/courses/CreateCourse"));
const EditCourse = lazy(() => import("./pages/admin/courses/EditCourse"));
const CampusManagement = lazy(
  () => import("./pages/admin/campus/CampusManagement"),
);
const CreateCampus = lazy(() => import("./pages/admin/campus/CreateCampus"));
const EditCampus = lazy(() => import("./pages/admin/campus/EditCampus"));
const CampusAdminsList = lazy(
  () => import("./pages/admin/campus/CampusAdminsList"),
);
const AllocateAdmin = lazy(() => import("./pages/admin/campus/AllocateAdmin"));
const ClassesList = lazy(() => import("./pages/admin/classes/ClassesList"));
const CreateClass = lazy(() => import("./pages/admin/classes/CreateClass"));
const EditClass = lazy(() => import("./pages/admin/classes/EditClass"));
const SubjectsList = lazy(() => import("./pages/admin/subjects/SubjectsList"));
const CreateSubject = lazy(
  () => import("./pages/admin/subjects/CreateSubject"),
);
const EditSubject = lazy(() => import("./pages/admin/subjects/EditSubject"));
const NewsList = lazy(() => import("./pages/admin/cms/news/NewsList"));
const CreateNews = lazy(() => import("./pages/admin/cms/news/CreateNews"));
const EditNews = lazy(() => import("./pages/admin/cms/news/EditNews"));
const GalleryManager = lazy(() => import("./pages/admin/cms/gallery/Gallery"));
const UploadImage = lazy(() => import("./pages/admin/cms/gallery/UploadImage"));
const EditGalleryImage = lazy(
  () => import("./pages/admin/cms/gallery/EditGalleryImage"),
);

// Faculty pages
const FacultyDashboard = lazy(() => import("./pages/faculty/Dashboard"));
const FacultyAssignments = lazy(() => import("./pages/faculty/Assignments"));
const CreateAssignment = lazy(() => import("./pages/faculty/CreateAssignment"));
const EditAssignment = lazy(() => import("./pages/faculty/EditAssignment"));
const FacultySubmissions = lazy(() => import("./pages/faculty/Submissions"));
const FacultyMaterials = lazy(() => import("./pages/faculty/Materials"));
const UploadMaterial = lazy(() => import("./pages/faculty/UploadMaterial"));
const EditMaterial = lazy(() => import("./pages/faculty/EditMaterial"));
const FacultyResults = lazy(() => import("./pages/faculty/Results"));
const FacultySemesterDetail = lazy(() => import("./pages/faculty/SemesterDetail"));
const FacultyAnnouncements = lazy(
  () => import("./pages/faculty/Announcements"),
);

// Student pages
const StudentDashboard = lazy(() => import("./pages/student/Dashboard"));
const StudentAssignments = lazy(() => import("./pages/student/Assignments"));
const StudentMaterials = lazy(() => import("./pages/student/Materials"));
const StudentResults = lazy(() => import("./pages/student/Results"));
const StudentAnnouncements = lazy(
  () => import("./pages/student/Announcements"),
);
const StudentSubmissions = lazy(() => import("./pages/student/Submissions"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (hasBootstrappedAuth) return;

    const isLoginRoute = typeof window !== "undefined" && window.location.pathname.startsWith("/login");
    if (isLoginRoute) {
      hasBootstrappedAuth = true;
      return;
    }

    hasBootstrappedAuth = true;
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Website Routes */}
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="admissions" element={<Admissions />} />
              <Route path="faculty-info" element={<Faculty />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="news-events" element={<NewsAndEvents />} />
              <Route path="contact" element={<Contact />} />

              {/* Campus Routes */}
              <Route path="campuses" element={<CampusLayout />}>
                <Route path=":campus" element={<CampusPage />} />
                <Route path=":campus/academics" element={<AcademicsPage />} />
                <Route path=":campus/faculty" element={<FacultyPage />} />
                <Route
                  path=":campus/student-life"
                  element={<StudentLifePage />}
                />
                <Route
                  path=":campus/facilities"
                  element={<FacilitiesPage />}
                />
              </Route>
            </Route>

            {/* Login Route (outside RootLayout) */}
            <Route path="/login/:type" element={<Login />} />

            {/* Admin Portal Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRoles={["super_admin", "admin"]}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route
                path="users"
                element={
                  <ProtectedRoute allowedRoles={["super_admin", "admin"]} redirectTo="/admin/dashboard">
                    <UsersList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="users/create"
                element={
                  <ProtectedRoute allowedRoles={["super_admin", "admin"]} redirectTo="/admin/dashboard">
                    <CreateUser />
                  </ProtectedRoute>
                }
              />
              <Route
                path="users/edit/:id"
                element={
                  <ProtectedRoute allowedRoles={["super_admin", "admin"]} redirectTo="/admin/dashboard">
                    <EditUser />
                  </ProtectedRoute>
                }
              />
              <Route
                path="courses"
                element={
                  <ProtectedRoute allowedRoles={["super_admin", "admin"]} redirectTo="/admin/dashboard">
                    <CourseList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="courses/create"
                element={
                  <ProtectedRoute allowedRoles={["admin"]} redirectTo="/admin/dashboard">
                    <CreateCourse />
                  </ProtectedRoute>
                }
              />
              <Route
                path="courses/edit/:id"
                element={
                  <ProtectedRoute allowedRoles={["admin"]} redirectTo="/admin/dashboard">
                    <EditCourse />
                  </ProtectedRoute>
                }
              />

              {/* Campus Management */}
              <Route
                path="campus"
                element={
                  <ProtectedRoute allowedRoles={["super_admin"]} redirectTo="/admin/dashboard">
                    <CampusManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="campus/create"
                element={
                  <ProtectedRoute allowedRoles={["super_admin"]} redirectTo="/admin/dashboard">
                    <CreateCampus />
                  </ProtectedRoute>
                }
              />
              <Route
                path="campus/:id/edit"
                element={
                  <ProtectedRoute allowedRoles={["super_admin"]} redirectTo="/admin/dashboard">
                    <EditCampus />
                  </ProtectedRoute>
                }
              />
              <Route
                path="campus/:id/admins"
                element={
                  <ProtectedRoute allowedRoles={["super_admin"]} redirectTo="/admin/dashboard">
                    <CampusAdminsList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="campus/allocate"
                element={
                  <ProtectedRoute allowedRoles={["super_admin"]} redirectTo="/admin/dashboard">
                    <AllocateAdmin />
                  </ProtectedRoute>
                }
              />

              {/* Academic Management */}
              <Route
                path="classes"
                element={
                  <ProtectedRoute allowedRoles={["super_admin", "admin"]} redirectTo="/admin/dashboard">
                    <ClassesList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="classes/create"
                element={
                  <ProtectedRoute allowedRoles={["admin"]} redirectTo="/admin/dashboard">
                    <CreateClass />
                  </ProtectedRoute>
                }
              />
              <Route
                path="classes/edit/:id"
                element={
                  <ProtectedRoute allowedRoles={["admin"]} redirectTo="/admin/dashboard">
                    <EditClass />
                  </ProtectedRoute>
                }
              />
              <Route
                path="subjects"
                element={
                  <ProtectedRoute allowedRoles={["super_admin", "admin"]} redirectTo="/admin/dashboard">
                    <SubjectsList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="subjects/create"
                element={
                  <ProtectedRoute allowedRoles={["admin"]} redirectTo="/admin/dashboard">
                    <CreateSubject />
                  </ProtectedRoute>
                }
              />
              <Route
                path="subjects/edit/:id"
                element={
                  <ProtectedRoute allowedRoles={["admin"]} redirectTo="/admin/dashboard">
                    <EditSubject />
                  </ProtectedRoute>
                }
              />

              {/* CMS Management */}
              <Route
                path="cms/news"
                element={
                  <ProtectedRoute allowedRoles={["super_admin"]} redirectTo="/admin/dashboard">
                    <NewsList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="cms/news/create"
                element={
                  <ProtectedRoute allowedRoles={["super_admin"]} redirectTo="/admin/dashboard">
                    <CreateNews />
                  </ProtectedRoute>
                }
              />
              <Route
                path="cms/news/edit/:id"
                element={
                  <ProtectedRoute allowedRoles={["super_admin"]} redirectTo="/admin/dashboard">
                    <EditNews />
                  </ProtectedRoute>
                }
              />
              <Route
                path="cms/gallery"
                element={
                  <ProtectedRoute allowedRoles={["super_admin"]} redirectTo="/admin/dashboard">
                    <GalleryManager />
                  </ProtectedRoute>
                }
              />
              <Route
                path="cms/gallery/upload"
                element={
                  <ProtectedRoute allowedRoles={["super_admin"]} redirectTo="/admin/dashboard">
                    <UploadImage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="cms/gallery/edit/:id"
                element={
                  <ProtectedRoute allowedRoles={["super_admin"]} redirectTo="/admin/dashboard">
                    <EditGalleryImage />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Faculty Portal Routes */}
            <Route
              path="/faculty/*"
              element={
                <ProtectedRoute allowedRoles={["faculty"]}>
                  <FacultyLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<FacultyDashboard />} />
              <Route path="assignments" element={<FacultyAssignments />} />
              <Route
                path="assignments/create"
                element={<CreateAssignment />}
              />
              <Route
                path="assignments/edit/:id"
                element={<EditAssignment />}
              />
              <Route
                path="submissions/:assignmentId"
                element={<FacultySubmissions />}
              />
              <Route path="materials" element={<FacultyMaterials />} />
              <Route path="materials/upload" element={<UploadMaterial />} />
              <Route path="materials/edit/:id" element={<EditMaterial />} />
              <Route path="results" element={<FacultyResults />} />
              <Route path="results/:classId/:termNumber" element={<FacultySemesterDetail />} />
              <Route
                path="announcements"
                element={<FacultyAnnouncements />}
              />
            </Route>

            {/* Student Portal Routes */}
            <Route
              path="/student/*"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="assignments" element={<StudentAssignments />} />
              <Route path="submissions" element={<StudentSubmissions />} />
              <Route path="materials" element={<StudentMaterials />} />
              <Route path="results" element={<StudentResults />} />
              <Route
                path="announcements"
                element={<StudentAnnouncements />}
              />
            </Route>

            {/* 404 Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
