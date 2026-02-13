import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, GraduationCap, Award } from "lucide-react";
import Section from "./ui/Section";
import Card from "./ui/Card";
import Button from "./ui/Button";

const facultyData = [
    // Main Campus
    {
        id: 1,
        name: "Dr. Muhammad Usman",
        designation: "Professor",
        campus: "Main Campus",
        subject: "Physics",
        education: "PhD in Physics, MIT",
        experience: "18 years",
        image: "https://placehold.co/400x400?text=MU",
        email: "m.usman@tbc.edu.pk",
        awards: ["Best Researcher 2022"]
    },
    {
        id: 2,
        name: "Dr. Fatima Hassan",
        designation: "Associate Professor",
        campus: "Main Campus",
        subject: "Chemistry",
        education: "PhD in Chemistry, Stanford University",
        experience: "12 years",
        image: "https://placehold.co/400x400?text=FH",
        email: "fatima.hassan@tbc.edu.pk",
        awards: []
    },
    {
        id: 3,
        name: "Mr. Bilal Ahmed",
        designation: "Lecturer",
        campus: "Main Campus",
        subject: "Mathematics",
        education: "MS Mathematics, LUMS",
        experience: "5 years",
        image: "https://placehold.co/400x400?text=BA",
        email: "bilal.ahmed@tbc.edu.pk",
        awards: []
    },
    {
        id: 4,
        name: "Dr. Muhammad Ali",
        designation: "HOD & Professor",
        campus: "Main Campus",
        subject: "Artificial Intelligence",
        education: "PhD CS, MIT",
        experience: "15 years",
        image: "https://placehold.co/400x400?text=Muhammad+Ali",
        email: "m.ali@tbc.edu.pk",
        awards: ["Top Scientist 2023"]
    },
    {
        id: 5,
        name: "Ms. Ayesha Khan",
        designation: "Assistant Professor",
        campus: "Main Campus",
        subject: "Data Science",
        education: "MS Data Science, NUST",
        experience: "6 years",
        image: "https://placehold.co/400x400?text=Ayesha+Khan",
        email: "ayesha.khan@tbc.edu.pk",
        awards: []
    },

    // Law College
    {
        id: 6,
        name: "Dr. Ahmed Khan",
        designation: "Professor",
        campus: "Law College",
        subject: "Constitutional Law",
        education: "PhD in Law, Harvard University",
        experience: "20+ years",
        image: "https://placehold.co/400x400?text=AK",
        email: "ahmed.khan@tbc.edu.pk",
        awards: []
    },
    {
        id: 7,
        name: "Ms. Sarah Ali",
        designation: "Assistant Professor",
        campus: "Law College",
        subject: "Criminal Law",
        education: "LLM, Oxford University",
        experience: "8 years",
        image: "https://placehold.co/400x400?text=SA",
        email: "sarah.ali@tbc.edu.pk",
        awards: []
    },
    {
        id: 8,
        name: "Dr. Sarah Ahmed",
        designation: "Professor & Dean",
        campus: "Law College",
        subject: "Constitutional Law",
        education: "PhD Law, Harvard University",
        experience: "18 years",
        image: "https://placehold.co/400x400?text=Sarah+Ahmed",
        email: "sarah.ahmed@tbc.edu.pk",
        awards: ["Best Researcher 2024", "Excellence in Teaching"]
    },
    {
        id: 9,
        name: "Mr. Kamran Khan",
        designation: "Associate Professor",
        campus: "Law College",
        subject: "Criminal Law",
        education: "LLM, University of London",
        experience: "10 years",
        image: "https://placehold.co/400x400?text=Kamran+Khan",
        email: "kamran.khan@tbc.edu.pk",
        awards: ["Distinguished Service Award"]
    },

    // Hala Campus
    {
        id: 10,
        name: "Prof. Zainab Malik",
        designation: "Professor",
        campus: "Hala Campus",
        subject: "English Literature",
        education: "PhD in Literature, Cambridge University",
        experience: "22 years",
        image: "https://placehold.co/400x400?text=ZM",
        email: "zainab.malik@tbc.edu.pk",
        awards: []
    },
    {
        id: 11,
        name: "Mr. Ali Raza",
        designation: "Assistant Professor",
        campus: "Hala Campus",
        subject: "Economics",
        education: "MSc Economics, LSE",
        experience: "7 years",
        image: "https://placehold.co/400x400?text=AR",
        email: "ali.raza@tbc.edu.pk",
        awards: []
    },
    {
        id: 12,
        name: "Dr. Hina Shah",
        designation: "Associate Professor",
        campus: "Hala Campus",
        subject: "Psychology",
        education: "PhD Psychology, Columbia University",
        experience: "14 years",
        image: "https://placehold.co/400x400?text=HS",
        email: "hina.shah@tbc.edu.pk",
        awards: []
    }
];

const FacultyComponent = ({ filterCampus }) => {
    const [activeTab, setActiveTab] = useState("All Campuses");

    // Get unique campuses for tabs
    const campuses = useMemo(() => {
        return ["All Campuses", "Main Campus", "Law College", "Hala Campus"];
    }, []);

    // Filter data logic
    const displayedData = useMemo(() => {
        let data = facultyData;

        // 1. If filterCampus prop exists, show ONLY that campus data
        if (filterCampus) {
            return { [filterCampus]: data.filter(f => f.campus === filterCampus) };
        }

        // 2. If viewing via Tab system
        if (activeTab === "All Campuses") {
            // Group by Campus
            return data.reduce((acc, faculty) => {
                if (!acc[faculty.campus]) {
                    acc[faculty.campus] = [];
                }
                acc[faculty.campus].push(faculty);
                return acc;
            }, {});
        } else {
            // Show single campus
            return { [activeTab]: data.filter(f => f.campus === activeTab) };
        }

    }, [filterCampus, activeTab]);

    return (
        <div className="min-h-screen bg-white">
            {/* Show Tabs ONLY if not filtering by specific campus prop */}
            {!filterCampus && (
                <Section className="bg-neutral-50 border-b border-gray-200" spacing="small">
                    <div className="flex justify-center">
                        <div className="inline-flex p-1 bg-white rounded-2xl border border-gray-200 shadow-sm">
                            {campuses.map((campus) => (
                                <button
                                    key={campus}
                                    onClick={() => setActiveTab(campus)}
                                    className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === campus
                                        ? "bg-primary-600 text-white shadow-md"
                                        : "text-gray-500 hover:text-primary-600 hover:bg-gray-50"
                                        }`}
                                >
                                    {campus}
                                </button>
                            ))}
                        </div>
                    </div>
                </Section>
            )}

            {/* Render Faculty Groups (Key will be Campus Name) */}
            {Object.entries(displayedData).map(([campusName, members], cIdx) => (
                <Section key={campusName} className={cIdx % 2 === 0 ? "bg-white" : "bg-gray-50"} spacing="large">
                    {/* Show header only if showing All Campuses view, to separate the sections */}
                    {!filterCampus && activeTab === "All Campuses" && (
                        <Section.Header
                            title={campusName}
                            description={`Distinguished faculty members of ${campusName}.`}
                            centered
                        />
                    )}

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {members.map((faculty, fIdx) => (
                                <motion.div
                                    key={faculty.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: fIdx * 0.1 }}
                                >
                                    <Card hover className="h-full flex flex-col items-center text-center p-6 rounded-3xl border-t-4 border-t-primary-600">
                                        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-primary-50 shadow-inner">
                                            <img src={faculty.image} alt={faculty.name} className="w-full h-full object-cover" />
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{faculty.name}</h3>
                                        <p className="text-primary-600 font-medium mb-4">{faculty.designation}</p>

                                        <div className="w-full border-t border-gray-100 my-4" />

                                        <div className="space-y-3 w-full text-left flex-grow">
                                            <div className="flex items-start gap-3">
                                                <GraduationCap className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <span className="block text-sm font-semibold text-gray-700">Qualification</span>
                                                    <span className="text-sm text-gray-600">{faculty.education}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Award className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <span className="block text-sm font-semibold text-gray-700">Specialization</span>
                                                    <span className="text-sm text-gray-600">{faculty.subject}</span>
                                                </div>
                                            </div>
                                            {faculty.awards && faculty.awards.length > 0 && (
                                                <div className="flex items-start gap-3">
                                                    <Award className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                                                    <div>
                                                        <span className="block text-sm font-semibold text-gray-700">Awards</span>
                                                        <ul className="list-disc list-inside text-sm text-gray-600">
                                                            {faculty.awards.map((award, idx) => (
                                                                <li key={idx}>{award}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-6 flex justify-center gap-3 w-full">
                                            <Button size="sm" variant="outline" className="w-full text-gray-600 border-gray-200 hover:border-primary-600 hover:text-primary-600 rounded-full" onClick={() => window.location.href = `mailto:${faculty.email}`}>
                                                <Mail className="w-4 h-4 mr-2" /> Contact
                                            </Button>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </Section>
            ))}
        </div>
    );
};

export default FacultyComponent;
