import { ClipboardList, FolderOpen, Megaphone, PlusCircle } from "lucide-react";

// Mock faculty user
export const mockFacultyUser = {
    id: "F-001",
    name: "Prof. Ahmed Raza",
    email: "ahmed.raza@best.edu",
    department: "Computer Science",
    campus: "main",
    designation: "Associate Professor",
    specialization: "Operating Systems",
    phoneNumber: "+92-321-XXXX-XXX",
    officeNumber: "CS-301",
};

// Mock classes by campus
export const mockClasses = {
    main: [
        { id: "cls-001", code: "CS-312", name: "Operating Systems", section: "A", students: 42, semester: "5th" },
        { id: "cls-002", code: "CS-312", name: "Operating Systems", section: "B", students: 38, semester: "5th" },
        { id: "cls-003", code: "MTH-205", name: "Linear Algebra", section: "A", students: 40, semester: "2nd" },
    ],
    law: [
        { id: "cls-004", code: "LAW-201", name: "Constitutional Law", section: "A", students: 35, semester: "3rd" },
        { id: "cls-005", code: "LAW-302", name: "Criminal Law", section: "A", students: 32, semester: "5th" },
    ],
    hala: [
        { id: "cls-006", code: "BBA-101", name: "Business Management", section: "A", students: 30, semester: "1st" },
    ],
};

// Mock assignment stats by campus
export const mockAssignmentStats = {
    main: { totalAssignments: 24, pendingSubmissions: 6, reviewed: 18, averageScore: "82%" },
    law: { totalAssignments: 12, pendingSubmissions: 3, reviewed: 9, averageScore: "78%" },
    hala: { totalAssignments: 8, pendingSubmissions: 2, reviewed: 6, averageScore: "85%" },
};

// Mock attendance by campus
export const mockFacultyAttendanceStats = {
    main: "89%",
    law: "92%",
    hala: "88%",
};

// Campus name map
export const campusNames = {
    main: "Main Campus",
    law: "Law Campus",
    hala: "Hala Campus",
};

// Dashboard quick actions
export const facultyQuickActions = [
    { title: "Create Assignment", icon: PlusCircle, path: "/faculty/assignments/create", bgColor: "bg-primary-50 text-primary-600" },
    { title: "Upload Material", icon: FolderOpen, path: "/faculty/materials/upload", bgColor: "bg-primary-50 text-primary-600" },
    { title: "View Submissions", icon: ClipboardList, path: "/faculty/assignments", bgColor: "bg-primary-50 text-primary-600" },
    { title: "Announcements", icon: Megaphone, path: "/faculty/announcements", bgColor: "bg-primary-50 text-primary-600" },
];

// Recent announcements
export const recentAnnouncements = [
    { title: "Mid-term exam instructions", date: "Sept 12, 2025" },
    { title: "Project milestone feedback posted", date: "Sept 10, 2025" },
];

// Mock submissions
export const mockSubmissions = [
    {
        studentId: "STU-0145",
        studentName: "Ayesha Khan",
        submittedAt: "Sept 12, 2025 • 9:30 AM",
        file: "#",
        status: "On-time",
        remarks: "Well structured",
    },
    {
        studentId: "STU-0172",
        studentName: "Bilal Ahmed",
        submittedAt: "Sept 12, 2025 • 10:05 AM",
        file: "#",
        status: "On-time",
    },
    {
        studentId: "STU-0198",
        studentName: "Sara Malik",
        submittedAt: "Sept 13, 2025 • 8:10 AM",
        file: "#",
        status: "Late",
    },
];
