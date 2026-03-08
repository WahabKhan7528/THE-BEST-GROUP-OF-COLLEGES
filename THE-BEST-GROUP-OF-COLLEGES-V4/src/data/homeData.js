import { BookOpen, Users, Trophy, GraduationCap, School } from "lucide-react";

export const collegesData = [
    {
        name: "Law Campus",
        icon: GraduationCap,
        programs: ["Bachelor of Laws (LLB)", "Master of Laws (LLM)"],
        description:
            "Our Law Campus provides comprehensive legal education with a focus on both theoretical knowledge and practical skills. Students benefit from mock courts, legal clinics, and expert faculty.",
        features: [
            "State-of-the-art Law Library",
            "Moot Court Facility",
            "Legal Aid Clinic",
            "Distinguished Faculty",
        ],
        image: "/Law.webp",
        path: "/campuses/law",
    },
    {
        name: "Main Campus",
        icon: BookOpen,
        programs: [
            "Bachelor of Science (BS)",
            "Master of Arts (MA)",
            "Bachelor of Arts (BA)",
        ],
        description:
            "The Main Campus offers a wide range of undergraduate and graduate programs in sciences and arts. Our focus is on providing quality education with modern facilities.",
        features: [
            "Well-equipped Laboratories",
            "Research Facilities",
            "Digital Library",
            "Career Counseling",
        ],
        image: "/maincampus.webp",
        path: "/campuses/main",
    },
    {
        name: "Hala Campus",
        icon: School,
        programs: [
            "FSc (Pre-Medical)",
            "FSc (Pre-Engineering)",
            "FA (Arts)",
            "ICS (Computer Science)",
        ],
        description:
            "Our Hala Campus prepares students for higher education with strong foundation in sciences and arts. We focus on both academic excellence and personal growth.",
        features: [
            "Modern Science Labs",
            "Computer Labs",
            "Sports Facilities",
            "Experienced Faculty",
        ],
        image: "/campus-hala.webp",
        path: "/campuses/hala",
    },
];

export const testimonials = [
    {
        name: "Sarah Ahmed",
        role: "Law Graduate 2024",
        content:
            "The faculty and resources at Best Law College helped me achieve my dream of becoming a lawyer. The practical training was exceptional.",
        image: "https://placehold.co/100x100?text=SA",
        rating: 5,
    },
    {
        name: "Muhammad Ali",
        role: "BS Computer Science Student",
        content:
            "The practical approach to education at the Degree College has prepared me well for my career. Amazing learning environment!",
        image: "https://placehold.co/100x100?text=MA",
        rating: 5,
    },
    {
        name: "Fatima Khan",
        role: "FSc Pre-Medical",
        content:
            "Outstanding teachers and modern labs make learning engaging and effective. I'm confident about my future in medicine.",
        image: "https://placehold.co/100x100?text=FK",
        rating: 4,
    },
    {
        name: "Fatima Khan",
        role: "FSc Pre-Medical",
        content:
            "Outstanding teachers and modern labs make learning engaging and effective. I'm confident about my future in medicine.",
        image: "https://placehold.co/100x100?text=FK",
        rating: 4,
    },
    {
        name: "Fatima Khan",
        role: "FSc Pre-Medical",
        content:
            "Outstanding teachers and modern labs make learning engaging and effective. I'm confident about my future in medicine.",
        image: "https://placehold.co/100x100?text=FK",
        rating: 4,
    },
];

export const homeStats = [
    {
        icon: BookOpen,
        value: "50+",
        label: "Programs",
    },
    {
        icon: Users,
        value: "5000+",
        label: "Students",
    },
    {
        icon: Trophy,
        value: "95%",
        label: "Success Rate",
    },
    {
        icon: GraduationCap,
        value: "200+",
        label: "Faculty Members",
    },
];

export const highlights = [
    { text: "Expert faculty with industry experience", icon: Users },
    { text: "Modern facilities and laboratories", icon: BookOpen },
    { text: "International accreditation and partnerships", icon: Trophy },
    { text: "Career counseling and placement support", icon: GraduationCap },
];

export const announcements = [
    {
        id: 1,
        title: "Admissions Open for Spring 2024",
        date: "February 10, 2024",
        description: "Applications are now being accepted for the Spring 2024 semester across all our campuses. Early bird discount available until March 1st."
    },
    {
        id: 2,
        title: "Annual Sports Gala",
        date: "February 8, 2024",
        description: "Join us for our annual inter-campus sports competition featuring cricket, football, and athletics. Registration deadline: February 20th."
    },
    {
        id: 3,
        title: "Career Fair 2024",
        date: "February 5, 2024",
        description: "Top companies will be visiting our Main Campus for recruitment. Prepare your CVs and register through the student portal by February 15th."
    },
    {
        id: 4,
        title: "Scholarship Program Announced",
        date: "February 3, 2024",
        description: "Merit-based scholarships covering up to 100% tuition fee are now available. Apply through our online portal before February 28th."
    },
    {
        id: 5,
        title: "Science Exhibition 2024",
        date: "February 1, 2024",
        description: "Students from all campuses are invited to showcase their innovative projects. Prize money worth Rs. 500,000 for top 3 winners."
    },
    {
        id: 6,
        title: "Mid-Term Exams Schedule Released",
        date: "January 28, 2024",
        description: "Mid-term examinations will commence from March 10th, 2024. Students can download date sheets from the student portal."
    },
    {
        id: 7,
        title: "Guest Lecture Series",
        date: "January 25, 2024",
        description: "Distinguished professionals from various industries will be delivering guest lectures every Friday. Check the events calendar for details."
    },
];
