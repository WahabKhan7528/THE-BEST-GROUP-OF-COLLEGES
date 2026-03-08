import { Laptop, Target, Lightbulb, BookOpen, Scale, Scroll, Microscope, Calculator, Cpu, TrendingUp, GraduationCap, Award } from "lucide-react";

export const programsData = {
    main: [
        {
            category: "Undergraduate Programs",
            description: "Build a strong foundation for your future with our diverse range of bachelor's degrees.",
            items: [
                {
                    title: "BS Computer Science",
                    description: "A comprehensive four-year program designed to mold future tech leaders. Covers algorithms, software engineering, AI, and more.",
                    duration: "4 Years",
                    seats: 120,
                    credits: "136 Credit Hours",
                    icon: Laptop,
                    color: "blue",
                    features: ["State-of-the-art Labs", "Industry Projects", "Expert Faculty"]
                },
                {
                    title: "Bachelor of Business Admin",
                    description: "Develop strong management and leadership skills. Focuses on marketing, finance, human resources, and entrepreneurship.",
                    duration: "4 Years",
                    seats: 100,
                    credits: "132 Credit Hours",
                    icon: Target,
                    color: "purple",
                    features: ["Case Studies", "Internships", "Entrepreneurship"]
                },
                {
                    title: "BS Mathematics",
                    description: "Explore the world of numbers and logic. Prepares students for careers in data science, research, and academia.",
                    duration: "4 Years",
                    seats: 60,
                    credits: "130 Credit Hours",
                    icon: Lightbulb,
                    color: "amber",
                    features: ["Analytical Research", "Mathematical Modeling"]
                },
                {
                    title: "BS English",
                    description: "Master the art of communication and literature. Ideal for aspiring writers, editors, and educators.",
                    duration: "4 Years",
                    seats: 80,
                    credits: "130 Credit Hours",
                    icon: BookOpen,
                    color: "pink",
                    features: ["Creative Workshops", "Seminars", "Cultural Studies"]
                },
            ]
        },
        {
            category: "Graduate Programs",
            description: "Advance your career and expertise with our specialized master's and doctoral programs.",
            items: [
                {
                    title: "Master of Science (MS)",
                    description: "Advanced studies with a strong research component. Ideal for students aiming for academic careers or specialized industry roles.",
                    duration: "2 Years",
                    seats: 40,
                    credits: "36 Credit Hours",
                    icon: GraduationCap,
                    color: "indigo",
                    features: ["Thesis Research", "Advanced Electives", "Conference Funding"]
                },
                {
                    title: "PhD Programs",
                    description: "Contribute to knowledge creation through original research. Our PhD programs are mentored by leading scholars in the field.",
                    duration: "3-5 Years",
                    seats: 10,
                    credits: "72 Credit Hours",
                    icon: Award,
                    color: "blue",
                    features: ["Full Funding Options", "Research Grants", "Global Collaborations"]
                }
            ]
        }
    ],
    law: [
        {
            category: "Professional Law Degrees",
            description: "Approved by HEC and Pakistan Bar Council.",
            items: [
                {
                    title: "LLB (5 Years)",
                    description: "A comprehensive five-year degree program recognized by the Pakistan Bar Council. Covers civil, criminal, and corporate law in depth.",
                    duration: "5 Years",
                    seats: 100,
                    credits: "160+ Credit Hours",
                    icon: Scale,
                    color: "blue",
                    features: ["Moot Court Training", "Court Visits", "Legal Aid Clinics"]
                },
                {
                    title: "LLM",
                    description: "Advanced Master of Laws program for specialization in International Law, Corporate Law, or Human Rights.",
                    duration: "2 Years",
                    seats: 50,
                    credits: "36 Credit Hours",
                    icon: Scroll,
                    color: "purple",
                    features: ["Specialized Research", "Advanced Jurisprudence", "Expert Mentors"]
                },
            ]
        }
    ],
    hala: [
        {
            category: "Intermediate Programs",
            description: "Choose the right path for your future career.",
            items: [
                {
                    title: "FSc Pre-Medical",
                    description: "Comprehensive study of Biology, Physics, and Chemistry. Ideal for aspiring doctors and medical professionals.",
                    duration: "2 Years",
                    seats: 150,
                    credits: "Part 1 & 2",
                    icon: Microscope,
                    color: "cyan",
                    features: ["Science Workshops", "Digital Labs", "Guidance Sessions"]
                },
                {
                    title: "FSc Pre-Engineering",
                    description: "A rigorous foundation in Mathematics, Physics, and Chemistry. Prepares students for top engineering universities.",
                    duration: "2 Years",
                    seats: 150,
                    credits: "Part 1 & 2",
                    icon: Calculator,
                    color: "blue",
                    features: ["Practical Training", "Engineering Workshops"]
                },
                {
                    title: "ICS",
                    description: "Information & Computer Science. Perfect blend of computer science with mathematics or physics for future tech leaders.",
                    duration: "2 Years",
                    seats: 100,
                    credits: "Part 1 & 2",
                    icon: Cpu,
                    color: "sky",
                    features: ["Coding Bootcamps", "Tech Seminars"]
                },
                {
                    title: "I.Com",
                    description: "Intermediate in Commerce. Building strong fundamentals in accounting, banking, and business finance.",
                    duration: "2 Years",
                    seats: 100,
                    credits: "Part 1 & 2",
                    icon: TrendingUp,
                    color: "slate",
                    features: ["Business Skills", "Financial Literacy"]
                },
            ]
        }
    ]
};
