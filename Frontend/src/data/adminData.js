import { Users, Layers, BookOpen, GraduationCap, Image, Newspaper, Book } from "lucide-react";

// Mock admin user
export const mockAdminUser = {
    id: "U-001",
    name: "System Admin",
    email: "admin@best.edu",
    adminRole: "Super Admin",
    allocatedCampuses: ["main", "law", "hala"],
};

// Mock campuses
export const mockCampuses = [
    { id: "main", name: "Main Campus", code: "MC", location: "Islamabad" },
    { id: "law", name: "Law Campus", code: "LC", location: "Islamabad" },
    { id: "hala", name: "Hala Campus", code: "HC", location: "Hala" },
];

// Dashboard stats by campus
export const mockAllStats = {
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

// Dashboard quick actions
export const adminQuickActions = [
    { title: "Add Classes", icon: GraduationCap, color: "bg-primary-50 text-primary-600", desc: "Create new class sections", path: "/admin/classes/create" },
    { title: "Add Subjects", icon: Book, color: "bg-primary-50 text-primary-600", desc: "Register new subjects", path: "/admin/subjects/create" },
    { title: "News & Events", icon: Newspaper, color: "bg-primary-50 text-primary-600", desc: "Publish latest updates", path: "/admin/cms/news/create" },
    { title: "Add Gallery", icon: Image, color: "bg-primary-50 text-primary-600", desc: "Upload campus photos", path: "/admin/cms/gallery/upload" },
    { title: "Add Courses", icon: BookOpen, color: "bg-primary-50 text-primary-600", desc: "Launch new academic programs", path: "/admin/courses/create" },
];

// Users list mock data
export const mockUsersData = [
    { id: "U-001", name: "System Admin", email: "admin@best.edu", role: "Super Admin", adminRole: "Super Admin", department: "Administration", allocatedCampuses: ["main", "law", "hala"] },
    { id: "U-002", name: "Ahmed Khan", email: "ahmed.khan@best.edu", role: "Sub-Admin", adminRole: "Sub-Admin", department: "Administration", allocatedCampuses: ["law"] },
    { id: "U-003", name: "Fatima Ali", email: "fatima.ali@best.edu", role: "Sub-Admin", adminRole: "Sub-Admin", department: "Administration", allocatedCampuses: ["main", "hala"] },
    { id: "F-102", name: "Prof. Ahmed Raza", email: "ahmed.raza@best.edu", role: "Faculty", adminRole: null, department: "CS", allocatedCampuses: ["main"] },
    { id: "F-103", name: "Dr. Sarah Ahmed", email: "sarah.ahmed@best.edu", role: "Faculty", adminRole: null, department: "Law", allocatedCampuses: ["law"] },
    { id: "F-104", name: "Prof. Hassan Raza", email: "hassan.raza@best.edu", role: "Faculty", adminRole: null, department: "Business", allocatedCampuses: ["main", "hala"] },
    { id: "S-220", name: "Ayesha Khan", email: "ayesha.khan@best.edu", role: "Student", adminRole: null, department: "BSCS-5A", allocatedCampuses: ["main"] },
    { id: "S-221", name: "Ali Hassan", email: "ali.hassan@best.edu", role: "Student", adminRole: null, department: "LLB-3A", allocatedCampuses: ["law"] },
    { id: "S-222", name: "Maria Ahmed", email: "maria.ahmed@best.edu", role: "Student", adminRole: null, department: "BBA-2A", allocatedCampuses: ["hala"] },
];

// Subjects list mock data
export const mockSubjectsData = [
    { id: "s1", name: "Operating Systems", code: "CS-312", class: "BSCS - 3rd", faculty: "Prof. Ahmed", offeredAt: ["main", "law"] },
    { id: "s2", name: "Database Systems", code: "CS-215", class: "BSCS - 3rd", faculty: "Prof. Sara", offeredAt: ["main"] },
    { id: "s3", name: "Linear Algebra", code: "MTH-205", class: "BSCS - 3rd", faculty: "Prof. Bilal", offeredAt: ["main", "hala"] },
    { id: "s4", name: "Constitutional Law", code: "LAW-101", class: "LLB - 1st", faculty: "Dr. Fatima", offeredAt: ["law"] },
    { id: "s5", name: "Business Ethics", code: "BBA-305", class: "BBA - 3rd", faculty: "Prof. Hassan", offeredAt: ["hala"] },
];

// Courses list mock data
export const mockCoursesData = [
    { id: "c101", title: "BS Computer Science", duration: "4 years", eligibility: "Intermediate", fee: "$1200", type: "semester", offeredAt: ["main", "law"] },
    { id: "c102", title: "BS Information Technology", duration: "4 years", eligibility: "Intermediate", fee: "$1100", type: "semester", offeredAt: ["main"] },
    { id: "c103", title: "Bachelor of Law (LLB)", duration: "5 years", eligibility: "Intermediate", fee: "$900", type: "semester", offeredAt: ["law"] },
    { id: "c104", title: "Bachelor of Business Admin", duration: "4 years", eligibility: "Intermediate", fee: "$800", type: "semester", offeredAt: ["hala"] },
];

// Classes list mock data
export const mockClassesData = [
    { id: "c1", name: "BSCS - 3rd Semester", sections: ["A", "B"], subjects: ["OS", "DBMS", "DSA"], faculty: "Ahmed, Sara", campus: "main", students: 120 },
    { id: "c2", name: "BSIT - 2nd Semester", sections: ["A"], subjects: ["Programming", "Discrete Math"], faculty: "Bilal", campus: "main", students: 45 },
    { id: "c3", name: "LLB - 1st Semester", sections: ["A", "B"], subjects: ["Constitutional Law", "Intro to Law"], faculty: "Fatima", campus: "law", students: 80 },
    { id: "c4", name: "BBA - 4th Semester", sections: ["A"], subjects: ["Marketing", "Finance"], faculty: "Hassan", campus: "hala", students: 35 },
];

// Campus admins mock data
export const mockCampusAdminsData = [
    { id: "U-001", name: "System Admin", email: "admin@best.edu", role: "Super Admin", allocatedCampuses: ["main", "law", "hala"] },
    { id: "U-002", name: "Ahmed Khan", email: "ahmed.khan@best.edu", role: "Sub-Admin", allocatedCampuses: ["law"] },
    { id: "U-003", name: "Fatima Ali", email: "fatima.ali@best.edu", role: "Sub-Admin", allocatedCampuses: ["main", "hala"] },
    { id: "U-004", name: "Zainab Bibi", email: "zainab@best.edu", role: "Sub-Admin", allocatedCampuses: ["main"] },
];

// All admins for allocation
export const mockAllAdmins = [
    { id: "U-002", name: "Ahmed Khan", email: "ahmed.khan@best.edu", adminRole: "Sub-Admin" },
    { id: "U-003", name: "Fatima Ali", email: "fatima.ali@best.edu", adminRole: "Sub-Admin" },
    { id: "U-004", name: "Hassan Raza", email: "hassan.raza@best.edu", adminRole: "Sub-Admin" },
    { id: "U-005", name: "Sara Ahmed", email: "sara.ahmed@best.edu", adminRole: "Sub-Admin" },
];

// Admin gallery images
export const adminGalleryImages = [
    { id: "g1", title: "Campus lawn", date: "Sept 5, 2025", album: "Campus Life", url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000" },
    { id: "g2", title: "Computer lab", date: "Sept 2, 2025", album: "Facilities", url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000" },
    { id: "g3", title: "Library hall", date: "Aug 30, 2025", album: "Facilities", url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1000" },
    { id: "g4", title: "Annual Sports Day", date: "Aug 25, 2025", album: "Events", url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1000" },
    { id: "g5", title: "Convocation Ceremony", date: "Aug 20, 2025", album: "Events", url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1000" },
    { id: "g6", title: "Science Exhibition", date: "Aug 15, 2025", album: "Academic", url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000" },
];
