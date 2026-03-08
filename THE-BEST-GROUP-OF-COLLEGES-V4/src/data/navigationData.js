import {
    School,
    BookOpen,
    Building,
    ShieldCheck,
    GraduationCap,
    Users,
    LayoutDashboard,
    ClipboardList,
    PlusCircle,
    FolderOpen,
    Upload,
    BarChart3,
    Megaphone,
    Image,
    Layers,
    Building2,
    LogOut,
} from "lucide-react";

// Public site navbar links
export const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Admissions", path: "/admissions" },
    { name: "Faculty", path: "/faculty-info" },
    { name: "Gallery", path: "/gallery" },
    { name: "News & Events", path: "/news-events" },
    { name: "Contact", path: "/contact" },
];

// Public site campus dropdown items
export const campuses = [
    { name: "Main Campus", path: "/campuses/main", icon: School },
    { name: "Law Campus", path: "/campuses/law", icon: Building },
    { name: "Hala Campus", path: "/campuses/hala", icon: BookOpen },
];

// Portal selector options
export const portals = [
    { title: "Admin Portal", description: "Manage college system and operations", icon: ShieldCheck, path: "/login/admin" },
    { title: "Faculty Portal", description: "Access teaching resources and manage classes", icon: GraduationCap, path: "/login/faculty" },
    { title: "Student Portal", description: "View courses, grades, and campus resources", icon: Users, path: "/login/student" },
];

// Admin sidebar navigation items
export const adminNavItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    {
        to: "/admin/campus",
        label: "Campus Management",
        icon: Building2,
        superAdminOnly: true,
    },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/classes", label: "Classes", icon: GraduationCap },
    { to: "/admin/subjects", label: "Subjects", icon: BookOpen },
    { to: "/admin/cms/news", label: "News & Events", icon: Megaphone },
    { to: "/admin/cms/gallery", label: "Gallery", icon: Image },
    { to: "/admin/courses", label: "Courses", icon: Layers },
];

// Faculty sidebar navigation items
export const facultyNavItems = [
    { to: "/faculty/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/faculty/assignments", label: "Assignments", icon: ClipboardList },
    {
        to: "/faculty/assignments/create",
        label: "Create Assignment",
        icon: PlusCircle,
    },
    { to: "/faculty/submissions/123", label: "Submissions", icon: ClipboardList },
    { to: "/faculty/materials", label: "Materials", icon: FolderOpen },
    { to: "/faculty/materials/upload", label: "Upload Material", icon: Upload },
    { to: "/faculty/results", label: "Results", icon: BarChart3 },
    { to: "/faculty/announcements", label: "Announcements", icon: Megaphone },
];

// Student sidebar navigation items
export const studentNavItems = [
    { to: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/student/materials", label: "Materials", icon: FolderOpen },
    { to: "/student/assignments", label: "Assignments", icon: ClipboardList },
    { to: "/student/results", label: "Results", icon: BarChart3 },
    { to: "/student/announcements", label: "Class Announcements", icon: Megaphone },
];
