import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

// Import pages
import Home from "./pages/Home";
import About from "./pages/About";
// import Colleges from "./pages/Colleges";
import Admissions from "./pages/Admissions";
import Faculty from "./pages/Faculty";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import NewsAndEvents from "./pages/NewsAndEvents";
import Login from "./pages/Login";

// Import layouts
import CampusLayout from "./layouts/CampusLayout";
import AdminLayout from "./layouts/AdminLayout";
import FacultyLayout from "./layouts/FacultyLayout";
import StudentLayout from "./layouts/StudentLayout";

// Import Context Providers
import { AdminProvider } from "./context/AdminContext";
import { FacultyProvider } from "./context/FacultyContext";
import { StudentProvider } from "./context/StudentContext";

// Import campus pages
import MainCampus from "./pages/campuses/MainCampus";
import LawCollege from "./pages/campuses/LawCollege";
import HalaCampus from "./pages/campuses/HalaCampus";

// Import common campus pages
import AcademicsPage from "./pages/campuses/common/AcademicsPage";
import LegalPage from "./pages/campuses/common/LegalPage";
import FacultyPage from "./pages/campuses/common/FacultyPage";
import ResearchPage from "./pages/campuses/common/ResearchPage";
import StudentLifePage from "./pages/campuses/common/StudentLifePage";
import FacilitiesPage from "./pages/campuses/common/FacilitiesPage";

// Import Portal Dashboards
import AdminDashboard from "./pages/admin/Dashboard";
import FacultyDashboard from "./pages/faculty/Dashboard";
import StudentDashboard from "./pages/student/Dashboard";

// Import Admin Sub-pages
import UsersList from "./pages/admin/users/UsersList";
import CreateUser from "./pages/admin/users/CreateUser";
import EditUser from "./pages/admin/users/EditUser";
import CourseList from "./pages/admin/courses/CourseList";
import CreateCourse from "./pages/admin/courses/CreateCourse";
import EditCourse from "./pages/admin/courses/EditCourse";
import CampusManagement from "./pages/admin/campus/CampusManagement";
import CreateCampus from "./pages/admin/campus/CreateCampus";
import EditCampus from "./pages/admin/campus/EditCampus";
import CampusAdminsList from "./pages/admin/campus/CampusAdminsList";
import AllocateAdmin from "./pages/admin/campus/AllocateAdmin";
import ClassesList from "./pages/admin/classes/ClassesList";
import CreateClass from "./pages/admin/classes/CreateClass";
import EditClass from "./pages/admin/classes/EditClass";
import SubjectsList from "./pages/admin/subjects/SubjectsList";
import CreateSubject from "./pages/admin/subjects/CreateSubject";
import EditSubject from "./pages/admin/subjects/EditSubject";
import NewsList from "./pages/admin/cms/news/NewsList";
import CreateNews from "./pages/admin/cms/news/CreateNews";
import EditNews from "./pages/admin/cms/news/EditNews";
import GalleryManager from "./pages/admin/cms/gallery/Gallery";
import UploadImage from "./pages/admin/cms/gallery/UploadImage";
import EditGalleryImage from "./pages/admin/cms/gallery/EditGalleryImage";

// Import Faculty Sub-pages
import FacultyAssignments from "./pages/faculty/Assignments";
import CreateAssignment from "./pages/faculty/CreateAssignment";
import EditAssignment from "./pages/faculty/EditAssignment";
import FacultySubmissions from "./pages/faculty/Submissions";
import FacultyMaterials from "./pages/faculty/Materials";
import UploadMaterial from "./pages/faculty/UploadMaterial";
import FacultyResults from "./pages/faculty/Results";
import FacultyAnnouncements from "./pages/faculty/Announcements";

// Import Student Sub-pages
import StudentAssignments from "./pages/student/Assignments";
import StudentMaterials from "./pages/student/Materials";
import StudentResults from "./pages/student/Results";
import StudentAnnouncements from "./pages/student/Announcements";

function App() {
  return (
    <Router>
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
            {/* Main Campus Routes */}
            <Route path="main" element={<MainCampus />} />
            <Route path="main/academics" element={<AcademicsPage />} />
            <Route path="main/legal" element={<LegalPage />} />
            <Route path="main/faculty" element={<FacultyPage />} />
            <Route path="main/research" element={<ResearchPage />} />
            <Route path="main/student-life" element={<StudentLifePage />} />
            <Route path="main/facilities" element={<FacilitiesPage />} />

            {/* Law Campus Routes */}
            <Route path="law" element={<LawCollege />} />
            <Route path="law/academics" element={<AcademicsPage />} />
            <Route path="law/legal" element={<LegalPage />} />
            <Route path="law/faculty" element={<FacultyPage />} />
            <Route path="law/research" element={<ResearchPage />} />
            <Route path="law/student-life" element={<StudentLifePage />} />
            <Route path="law/facilities" element={<FacilitiesPage />} />

            {/* Hala Campus Routes */}
            <Route path="hala" element={<HalaCampus />} />
            <Route path="hala/academics" element={<AcademicsPage />} />
            <Route path="hala/legal" element={<LegalPage />} />
            <Route path="hala/faculty" element={<FacultyPage />} />
            <Route path="hala/research" element={<ResearchPage />} />
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
    </Router>
  );
}

export default App;
