import { BookOpen, ClipboardCheck, FileText, Award, Users, GraduationCap } from "lucide-react";

export const admissionSteps = [
    {
        title: "Choose Your Program",
        description: "Browse through our offered programs and select the one that aligns with your career goals.",
        icon: BookOpen,
    },
    {
        title: "Check Eligibility",
        description: "Review the admission requirements and ensure you meet the criteria for your chosen program.",
        icon: ClipboardCheck,
    },
    {
        title: "Submit Application",
        description: "Fill out the online application form and submit all required documents.",
        icon: FileText,
    },
    {
        title: "Entrance Test",
        description: "Take the entrance test for your selected program (if applicable).",
        icon: Award,
    },
    {
        title: "Interview",
        description: "Attend an interview with the admission committee (for selected programs).",
        icon: Users,
    },
    {
        title: "Admission Decision",
        description: "Receive your admission decision and further instructions if accepted.",
        icon: GraduationCap,
    },
];

export const requirements = {
    documents: [
        "Completed application form",
        "Academic transcripts",
        "CNIC/B-Form copy",
        "Passport size photographs (4)",
        "Migration certificate (if applicable)",
    ],
    eligibility: [
        "Minimum 60% marks in previous degree/certificate",
        "Pass in entrance test (where applicable)",
        "No third division in academic career",
        "Good moral character",
        "Medical fitness certificate",
    ],
};

export const importantDates = [
    { event: "Applications Open", date: "January 15, 2025" },
    { event: "Application Deadline", date: "March 31, 2025" },
    { event: "Entrance Test", date: "April 15, 2025" },
    { event: "Results Announcement", date: "April 30, 2025" },
    { event: "Classes Begin", date: "August 1, 2025" },
];
