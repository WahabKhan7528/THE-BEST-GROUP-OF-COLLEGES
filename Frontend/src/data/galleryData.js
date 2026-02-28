import { Camera, Building, Calendar, Users, Laptop } from "lucide-react";

export const galleryFilters = [
    { id: "all", name: "All Photos", icon: Camera, count: 12 },
    { id: "campus", name: "Campus", icon: Building, count: 3 },
    { id: "events", name: "Events", icon: Calendar, count: 3 },
    { id: "students", name: "Students", icon: Users, count: 3 },
    { id: "facilities", name: "Facilities", icon: Laptop, count: 3 },
];

export const galleryImages = [
    {
        id: 1,
        category: "campus",
        title: "Main Campus Building",
        description: "The iconic main building of our institution",
        src: "https://placehold.co/800x600/E0F2FE/E0F2FE",
    },
    {
        id: 2,
        category: "events",
        title: "Graduation Ceremony 2024",
        description: "Celebrating the achievements of our graduating class",
        src: "https://placehold.co/800x600/DBEAFE/DBEAFE",
    },
    {
        id: 3,
        category: "facilities",
        title: "Law Library",
        description: "Our extensive law library with thousands of resources",
        src: "https://placehold.co/800x600/E0F2FE/E0F2FE",
    },
    {
        id: 4,
        category: "students",
        title: "Student Life",
        description: "Students enjoying campus activities",
        src: "https://placehold.co/800x600/EFF6FF/EFF6FF",
    },
    {
        id: 5,
        category: "campus",
        title: "Sports Ground",
        description: "State-of-the-art sports facilities",
        src: "https://placehold.co/800x600/DBEAFE/DBEAFE",
    },
    {
        id: 6,
        category: "facilities",
        title: "Science Laboratory",
        description: "Modern equipped science labs",
        src: "https://placehold.co/800x600/E0F2FE/E0F2FE",
    },
    {
        id: 7,
        category: "events",
        title: "Annual Sports Day",
        description: "Annual inter-campus sports competition",
        src: "https://placehold.co/800x600/EFF6FF/EFF6FF",
    },
    {
        id: 8,
        category: "students",
        title: "Class Activities",
        description: "Interactive classroom sessions",
        src: "https://placehold.co/800x600/DBEAFE/DBEAFE",
    },
    {
        id: 9,
        category: "facilities",
        title: "Computer Lab",
        description: "High-tech computer facilities",
        src: "https://placehold.co/800x600/E0F2FE/E0F2FE",
    },
    {
        id: 10,
        category: "events",
        title: "Cultural Festival",
        description: "Celebrating diversity through culture",
        src: "https://placehold.co/800x600/EFF6FF/EFF6FF",
    },
    {
        id: 11,
        category: "campus",
        title: "Campus Gardens",
        description: "Beautiful green spaces around campus",
        src: "https://placehold.co/800x600/DBEAFE/DBEAFE",
    },
    {
        id: 12,
        category: "students",
        title: "Study Groups",
        description: "Collaborative learning sessions",
        src: "https://placehold.co/800x600/E0F2FE/E0F2FE",
    },
];
