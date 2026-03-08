import { Users, BookOpen, Award, GraduationCap, Library, Laptop, Gavel, Scale, Landmark, FlaskConical, Cpu } from "lucide-react";

// Main Campus
export const mainCampusStats = [
    { icon: Users, value: "5000+", label: "Students" },
    { icon: BookOpen, value: "25+", label: "Programs" },
    { icon: Award, value: "95%", label: "Success Rate" },
    { icon: GraduationCap, value: "100+", label: "Expert Faculty" },
];

export const mainFacilities = [
    {
        icon: Library,
        title: "Modern Library",
        description: "Access to thousands of books, international journals, and digital resources in a quiet, conducive environment.",
    },
    {
        icon: Laptop,
        title: "Advanced Computer Labs",
        description: "High-performance computing centers equipped with the latest software and high-speed internet for practical learning.",
    },
    {
        icon: Users,
        title: "Student Center",
        description: "A vibrant space for relaxation, socialization, and co-curricular activities, fostering a strong community spirit.",
    },
    {
        icon: Award,
        title: "Sports Complex",
        description: "Indoor and outdoor sports facilities to promote physical well-being and team spirit among students.",
    },
];

// Law Campus
export const lawCampusStats = [
    { icon: Users, value: "800+", label: "Law Students" },
    { icon: Gavel, value: "50+", label: "Moot Court Wins" },
    { icon: Award, value: "100%", label: "Bar Council Recognized" },
    { icon: Scale, value: "20+", label: "Legal Experts" },
];

export const lawFacilities = [
    {
        icon: Gavel,
        title: "Moot Court Room",
        description: "A realistic courtroom setting for students to practice advocacy, case presentation, and trial procedures.",
    },
    {
        icon: Library,
        title: "Law Library",
        description: "Extensive collection of legal manuscripts, law journals, case files, and digital legal databases.",
    },
    {
        icon: Landmark,
        title: "Legal Aid Clinic",
        description: "A community service initiative where senior students provide free legal guidance under faculty supervision.",
    },
    {
        icon: Users,
        title: "Seminar Hall",
        description: "Dedicated space for guest lectures by senior judges, lawyers, and legal scholars.",
    },
];

// Hala Campus
export const halaCampusStats = [
    { icon: Users, value: "1500+", label: "Students" },
    { icon: GraduationCap, value: "98%", label: "Pass Percentage" },
    { icon: Award, value: "50+", label: "Position Holders" },
    { icon: Users, value: "50+", label: "Expert Faculty" },
];

export const halaFacilities = [
    {
        icon: FlaskConical,
        title: "Science Laboratories",
        description: "Fully equipped Physics, Chemistry, and Biology labs for practical experimentation and learning.",
    },
    {
        icon: Cpu,
        title: "Computer Labs",
        description: "Modern computer labs with high-speed internet and latest software tools for ICS students.",
    },
    {
        icon: BookOpen,
        title: "Academic Library",
        description: "A rich collection of textbooks, reference materials, and study guides in a quiet environment.",
    },
    {
        icon: Award,
        title: "Student Transport",
        description: "Safe and reliable transport facility covering all major routes of Hala and surrounding areas.",
    },
];
