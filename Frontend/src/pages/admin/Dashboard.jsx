import { Link } from "react-router-dom";
import {
  Users,
  ClipboardList,
  FileText,
  Layers,
  BookOpen,
  GraduationCap,
  Image,
  Newspaper,
  Book,
} from "lucide-react";
import { useAdminContext } from "../../context/AdminContext";
import StatsCard from "../../components/admin/StatsCard";

// Mock data
const mockAllStats = {
  all: {
    users: { value: "2,430", hint: "+12% from last month" },
    classes: { value: "125", hint: "Active classes" },
    subjects: { value: "84", hint: "Active subjects" },
    courses: { value: "42", hint: "Active courses" },
  },
  main: {
    users: { value: "1,200", hint: "Main Campus" },
    classes: { value: "60", hint: "Main Campus" },
    subjects: { value: "40", hint: "Main Campus" },
    courses: { value: "24", hint: "Main Campus" },
  },
  law: {
    users: { value: "650", hint: "Law Campus" },
    classes: { value: "35", hint: "Law Campus" },
    subjects: { value: "24", hint: "Law Campus" },
    courses: { value: "12", hint: "Law Campus" },
  },
  hala: {
    users: { value: "580", hint: "Hala Campus" },
    classes: { value: "30", hint: "Hala Campus" },
    subjects: { value: "20", hint: "Hala Campus" },
    courses: { value: "6", hint: "Hala Campus" },
  },
};

const Dashboard = () => {
  const {
    selectedCampusFilter,
    getCurrentCampusContext,
    isSuperAdmin,
  } = useAdminContext();

  const currentCampus = getCurrentCampusContext();
  const campusKey = currentCampus ? currentCampus.id : "all";
  const campusLabel = currentCampus ? currentCampus.name : "All Campuses";

  const currentStats = mockAllStats[campusKey] || mockAllStats.all;

  const stats = [
    { title: "Total Users", value: currentStats.users.value, hint: currentStats.users.hint, icon: Users, tone: "primary" },
    { title: "Active Classes", value: currentStats.classes.value, hint: currentStats.classes.hint, icon: GraduationCap, tone: "primary" },
    { title: "Active Subjects", value: currentStats.subjects.value, hint: currentStats.subjects.hint, icon: Book, tone: "primary" },
    { title: "Active Courses", value: currentStats.courses.value, hint: currentStats.courses.hint, icon: Layers, tone: "primary" },
  ];

  const quickActions = [
    { title: "Add Classes", icon: GraduationCap, color: "bg-primary-50 text-primary-600", desc: "Create new class sections", path: "/admin/classes/create" },
    { title: "Add Subjects", icon: Book, color: "bg-primary-50 text-primary-600", desc: "Register new subjects", path: "/admin/subjects/create" },
    { title: "News & Events", icon: Newspaper, color: "bg-primary-50 text-primary-600", desc: "Publish latest updates", path: "/admin/cms/news/create" },
    { title: "Add Gallery", icon: Image, color: "bg-primary-50 text-primary-600", desc: "Upload campus photos", path: "/admin/cms/gallery/upload" },
    { title: "Add Courses", icon: BookOpen, color: "bg-primary-50 text-primary-600", desc: "Launch new academic programs", path: "/admin/courses/create" },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary-900 tracking-tight">System Dashboard</h1>
          <p className="text-text-secondary mt-1">Real-time overview of your educational ecosystem</p>
        </div>

        {/* Context Badge */}
        <div className="flex items-center gap-3">
          {(!isSuperAdmin || selectedCampusFilter !== "all") && (
            <div className="px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-semibold shadow-sm flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
              </span>
              {isSuperAdmin ? campusLabel : "Allocated Campuses"}
            </div>
          )}
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <StatsCard key={item.title} {...item} />
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-primary-900">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.path}
              className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-lg hover:border-primary-300 transition-all duration-300 group relative overflow-hidden"
            >
              <div className={`p-4 rounded-xl ${action.color} group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                <action.icon size={28} strokeWidth={1.5} />
              </div>
              <div className="relative z-10 space-y-1">
                <h3 className="font-bold text-primary-900 group-hover:text-primary-600 transition-colors">{action.title}</h3>
                <p className="text-xs text-text-secondary line-clamp-2">{action.desc}</p>
              </div>

              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
