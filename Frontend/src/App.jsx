import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import PageLoader from "./components/shared/PageLoader";

// All time neccessary imports
import RootLayout from "./layouts/RootLayout";
import CampusLayout from "./layouts/CampusLayout";
import AdminLayout from "./layouts/AdminLayout";
import FacultyLayout from "./layouts/FacultyLayout";
import StudentLayout from "./layouts/StudentLayout";
import { AdminProvider } from "./context/AdminContext";
import { FacultyProvider } from "./context/FacultyContext";
import { StudentProvider } from "./context/StudentContext";

// Public pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Admissions = lazy(() => import("./pages/Admissions"));
const Faculty = lazy(() => import("./pages/Faculty"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const NewsAndEvents = lazy(() => import("./pages/NewsAndEvents"));
const Login = lazy(() => import("./pages/Login"));

// Campus pages 
const MainCampus = lazy(() => import("./pages/campuses/MainCampus"));
const LawCampus = lazy(() => import("./pages/campuses/LawCampus"));
const HalaCampus = lazy(() => import("./pages/campuses/HalaCampus"));
const AcademicsPage = lazy(() => import("./pages/campuses/common/AcademicsPage"));
const FacultyPage = lazy(() => import("./pages/campuses/common/FacultyPage"));
const StudentLifePage = lazy(() => import("./pages/campuses/common/StudentLifePage"));
const FacilitiesPage = lazy(() => import("./pages/campuses/common/FacilitiesPage"));

// Admin pages
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const UsersList = lazy(() => import("./pages/admin/users/UsersList"));
const CreateUser = lazy(() => import("./pages/admin/users/CreateUser"));
const EditUser = lazy(() => import("./pages/admin/users/EditUser"));
const CourseList = lazy(() => import("./pages/admin/courses/CourseList"));
const CreateCourse = lazy(() => import("./pages/admin/courses/CreateCourse"));
const EditCourse = lazy(() => import("./pages/admin/courses/EditCourse"));
const CampusManagement = lazy(() => import("./pages/admin/campus/CampusManagement"));
const CreateCampus = lazy(() => import("./pages/admin/campus/CreateCampus"));
const EditCampus = lazy(() => import("./pages/admin/campus/EditCampus"));
const CampusAdminsList = lazy(() => import("./pages/admin/campus/CampusAdminsList"));
const AllocateAdmin = lazy(() => import("./pages/admin/campus/AllocateAdmin"));
const ClassesList = lazy(() => import("./pages/admin/classes/ClassesList"));
const CreateClass = lazy(() => import("./pages/admin/classes/CreateClass"));
const EditClass = lazy(() => import("./pages/admin/classes/EditClass"));
const SubjectsList = lazy(() => import("./pages/admin/subjects/SubjectsList"));
const CreateSubject = lazy(() => import("./pages/admin/subjects/CreateSubject"));
const EditSubject = lazy(() => import("./pages/admin/subjects/EditSubject"));
const NewsList = lazy(() => import("./pages/admin/cms/news/NewsList"));
const CreateNews = lazy(() => import("./pages/admin/cms/news/CreateNews"));
const EditNews = lazy(() => import("./pages/admin/cms/news/EditNews"));
const GalleryManager = lazy(() => import("./pages/admin/cms/gallery/Gallery"));
const UploadImage = lazy(() => import("./pages/admin/cms/gallery/UploadImage"));
const EditGalleryImage = lazy(() => import("./pages/admin/cms/gallery/EditGalleryImage"));

// Faculty pages 
const FacultyDashboard = lazy(() => import("./pages/faculty/Dashboard"));
const FacultyAssignments = lazy(() => import("./pages/faculty/Assignments"));
const CreateAssignment = lazy(() => import("./pages/faculty/CreateAssignment"));
const EditAssignment = lazy(() => import("./pages/faculty/EditAssignment"));
const FacultySubmissions = lazy(() => import("./pages/faculty/Submissions"));
const FacultyMaterials = lazy(() => import("./pages/faculty/Materials"));
const UploadMaterial = lazy(() => import("./pages/faculty/UploadMaterial"));
const FacultyResults = lazy(() => import("./pages/faculty/Results"));
const FacultyAnnouncements = lazy(() => import("./pages/faculty/Announcements"));

// Student pages 
const StudentDashboard = lazy(() => import("./pages/student/Dashboard"));
const StudentAssignments = lazy(() => import("./pages/student/Assignments"));
const StudentMaterials = lazy(() => import("./pages/student/Materials"));
const StudentResults = lazy(() => import("./pages/student/Results"));
const StudentAnnouncements = lazy(() => import("./pages/student/Announcements"));



function App() {
  return (
    <Router>
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
            <Route path="login/:type" element={<Login />} />

            {/* Campus Routes */}
            <Route path="campuses" element={<CampusLayout />}>
              <Route path="main" element={<MainCampus />} />
              <Route path="main/academics" element={<AcademicsPage />} />
              <Route path="main/faculty" element={<FacultyPage />} />
              <Route path="main/student-life" element={<StudentLifePage />} />
              <Route path="main/facilities" element={<FacilitiesPage />} />

              <Route path="law" element={<LawCampus />} />
              <Route path="law/academics" element={<AcademicsPage />} />
              <Route path="law/faculty" element={<FacultyPage />} />
              <Route path="law/student-life" element={<StudentLifePage />} />
              <Route path="law/facilities" element={<FacilitiesPage />} />

              <Route path="hala" element={<HalaCampus />} />
              <Route path="hala/academics" element={<AcademicsPage />} />
              <Route path="hala/faculty" element={<FacultyPage />} />
              <Route path="hala/student-life" element={<StudentLifePage />} />
              <Route path="hala/facilities" element={<FacilitiesPage />} />
            </Route>
          </Route>

          {/* Admin Portal Routes */}
          <Route
            path="/admin/*"
            element={
              <AdminProvider>
                <AdminLayout />
              </AdminProvider>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UsersList />} />
            <Route path="users/create" element={<CreateUser />} />
            <Route path="users/edit/:id" element={<EditUser />} />
            <Route path="courses" element={<CourseList />} />
            <Route path="courses/create" element={<CreateCourse />} />
            <Route path="courses/edit/:id" element={<EditCourse />} />

            {/* Campus Management */}
            <Route path="campus" element={<CampusManagement />} />
            <Route path="campus/create" element={<CreateCampus />} />
            <Route path="campus/:id/edit" element={<EditCampus />} />
            <Route path="campus/:id/admins" element={<CampusAdminsList />} />
            <Route path="campus/allocate" element={<AllocateAdmin />} />

            {/* Academic Management */}
            <Route path="classes" element={<ClassesList />} />
            <Route path="classes/create" element={<CreateClass />} />
            <Route path="classes/edit/:id" element={<EditClass />} />
            <Route path="subjects" element={<SubjectsList />} />
            <Route path="subjects/create" element={<CreateSubject />} />
            <Route path="subjects/edit/:id" element={<EditSubject />} />

            {/* CMS Management */}
            <Route path="cms/news" element={<NewsList />} />
            <Route path="cms/news/create" element={<CreateNews />} />
            <Route path="cms/news/edit/:id" element={<EditNews />} />
            <Route path="cms/gallery" element={<GalleryManager />} />
            <Route path="cms/gallery/upload" element={<UploadImage />} />
            <Route path="cms/gallery/edit/:id" element={<EditGalleryImage />} />
          </Route>

          {/* Faculty Portal Routes */}
          <Route
            path="/faculty/*"
            element={
              <FacultyProvider>
                <FacultyLayout />
              </FacultyProvider>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<FacultyDashboard />} />
            <Route path="assignments" element={<FacultyAssignments />} />
            <Route path="assignments/create" element={<CreateAssignment />} />
            <Route path="assignments/edit/:id" element={<EditAssignment />} />
            <Route path="submissions/:assignmentId" element={<FacultySubmissions />} />
            <Route path="materials" element={<FacultyMaterials />} />
            <Route path="materials/upload" element={<UploadMaterial />} />
            <Route path="results" element={<FacultyResults />} />
            <Route path="announcements" element={<FacultyAnnouncements />} />
          </Route>

          {/* Student Portal Routes */}
          <Route
            path="/student/*"
            element={
              <StudentProvider>
                <StudentLayout />
              </StudentProvider>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="assignments" element={<StudentAssignments />} />
            <Route path="materials" element={<StudentMaterials />} />
            <Route path="results" element={<StudentResults />} />
            <Route path="announcements" element={<StudentAnnouncements />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
