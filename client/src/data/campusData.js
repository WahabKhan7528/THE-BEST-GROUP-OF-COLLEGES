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

// Campus page content configuration for CampusPage component
export const campusPageConfig = {
    main: {
        hero: { title: "Main Campus", image: "/maincampus.webp" },
        stats: mainCampusStats,
        facilities: mainFacilities,
        vision: {
            badge: "Our Foundation",
            heading: "Shaping the",
            headingHighlight: "Future",
            paragraph: "To be a premier institution that sets the standard for quality higher education, witnessing the transformation of students into global leaders.",
            items: [
                { title: "Academic Excellence", desc: "Rigorous curriculum paired with innovative research initiatives." },
                { title: "Innovation Hub", desc: "Fostering a culture of discovery and creative problem solving." },
            ],
            card: {
                badge: "Our Vision",
                headingLine1: "Inspiring Excellence,",
                headingLine2: "Nurturing",
                headingHighlight: "Visionaries",
                description: "Cultivating a dynamic learning environment that fuses high-tech resources with ethical values to shape a better tomorrow.",
                buttonText: "Explore Programs",
                buttonShape: "slanted",
            },
        },
        programs: {
            badge: "Programs",
            title: "Academic Excellence",
            description: "Explore our curated range of undergraduate programs designed for the global stage.",
        },
        facilitiesSection: {
            badge: "Facilities",
            title: "Futuristic Campus",
            description: "World-class infrastructure designed to inspire and facilitate cutting-edge learning.",
        },
        cta: {
            badge: "ADMISSIONS OPEN 2026",
            title: "Architect Your",
            highlightedWord: "Ambition",
            description: "Don't just witness history, create it. Join a community of innovators redefining the educational landscape of Pakistan.",
            image: "/maincampus.webp",
            primaryButton: { text: "BOOK A TOUR", to: "/admissions" },
            secondaryButton: { text: "INQUIRE", to: "/contact" },
        },
    },
    law: {
        hero: { title: "Law College", image: "/Law.webp" },
        stats: lawCampusStats,
        facilities: lawFacilities,
        vision: {
            badge: "Legal Excellence",
            heading: "Justice &",
            headingHighlight: "Leadership",
            paragraph: "To be a leading center for legal education that produces advocates of integrity, dedicated to the rule of law and social justice.",
            items: [
                { title: "Advocacy & Ethics", desc: "Training the next generation of legal professionals with a focus on ethical practice." },
                { title: "Clinical Education", desc: "Hands-on experience through moot courts and legal aid clinics." },
            ],
            card: {
                badge: "Our Mission",
                headingLine1: "Defending Rights,",
                headingLine2: "Building",
                headingHighlight: "Careers",
                description: "Providing a rigorous legal education that combines theoretical knowledge with practical skills to serve the legal needs of our society.",
                buttonText: "View Law Programs",
            },
        },
        programs: {
            badge: "Academia",
            title: "Legal Programs",
            description: "Our specialized law programs are designed to provide a comprehensive understanding of the legal system.",
        },
        facilitiesSection: {
            badge: "Facilities",
            title: "Professional Infrastructure",
            description: "Specialized facilities designed to simulate real-world legal environments.",
        },
        cta: {
            badge: "ADMISSIONS IN PROGRESS",
            title: "Your Path to",
            highlightedWord: "Justice",
            description: "Join Pakistan's premier law college and embark on a journey to become a defender of truth and a leader in the legal fraternity.",
            image: "/lawcampus.webp",
            primaryButton: { text: "ENROLL NOW", to: "/admissions" },
            secondaryButton: { text: "GET IN TOUCH", to: "/contact" },
        },
    },
    hala: {
        hero: { title: "Hala Campus", image: "/campus-hala.webp" },
        stats: halaCampusStats,
        facilities: halaFacilities,
        vision: {
            badge: "Regional Excellence",
            heading: "Innovation &",
            headingHighlight: "Growth",
            paragraph: "Empowering the youth of Hala with world-class education and modern skills to drive regional development and personal success.",
            items: [
                { title: "Modern Pedagogy", desc: "Interactive learning models tailored for the evolving job market." },
                { title: "Career Readiness", desc: "Focused mentorship and internship programs for every student." },
            ],
            card: {
                badge: "Our Vision",
                headingLine1: "Bridging Gaps,",
                headingLine2: "Building",
                headingHighlight: "Futures",
                description: "To be a beacon of light in the region, providing accessible yet premium education that transforms lives and communities.",
                buttonText: "Explore Academics",
                buttonShape: "slanted",
            },
        },
        programs: {
            badge: "Programs",
            title: "Academic Excellence",
            description: "Explore our specialized programs designed to meet the unique needs of the Hala campus.",
        },
        facilitiesSection: {
            badge: "Facilities",
            title: "Regional Hub",
            description: "State-of-the-art facilities that bring city-standard education to the heart of Hala.",
        },
        cta: {
            badge: "ADMISSIONS OPEN FOR ALL",
            title: "Elevate Your",
            highlightedWord: "Potential",
            description: "Experience premium education in your own city. Join Hala Campus and let's build a brighter future for the region together.",
            image: "/halacampus.webp",
            primaryButton: { text: "JOIN US", to: "/admissions" },
            secondaryButton: { text: "TALK TO US", to: "/contact" },
        },
    },
};
