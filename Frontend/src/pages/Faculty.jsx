import { useState } from "react";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Hero from "../components/ui/Hero";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Award,
  Users,
  Mail,
  Linkedin,
  Scale,
  FlaskConical,
  Palette
} from "lucide-react";

const Faculty = () => {
  const [activeTab, setActiveTab] = useState("all");

  const facultyMembers = [
    // Law Department
    {
      name: "Dr. Ahmed Khan",
      designation: "Professor",
      department: "law",
      subject: "Constitutional Law",
      education: "PhD in Law, Harvard University",
      experience: "20+ years",
      image: "https://placehold.co/400x400?text=AK",
      email: "ahmed.khan@bestcolleges.edu.pk",
    },
    {
      name: "Ms. Sarah Ali",
      designation: "Assistant Professor",
      department: "law",
      subject: "Criminal Law",
      education: "LLM, Oxford University",
      experience: "8 years",
      image: "https://placehold.co/400x400?text=SA",
      email: "sarah.ali@bestcolleges.edu.pk",
    },
    {
      name: "Dr. Hassan Raza",
      designation: "Associate Professor",
      department: "law",
      subject: "Corporate Law",
      education: "PhD in Law, Yale University",
      experience: "15 years",
      image: "https://placehold.co/400x400?text=HR",
      email: "hassan.raza@bestcolleges.edu.pk",
    },
    // Science Department
    {
      name: "Dr. Muhammad Usman",
      designation: "Professor",
      department: "science",
      subject: "Physics",
      education: "PhD in Physics, MIT",
      experience: "18 years",
      image: "https://placehold.co/400x400?text=MU",
      email: "m.usman@bestcolleges.edu.pk",
    },
    {
      name: "Dr. Fatima Hassan",
      designation: "Associate Professor",
      department: "science",
      subject: "Chemistry",
      education: "PhD in Chemistry, Stanford University",
      experience: "12 years",
      image: "https://placehold.co/400x400?text=FH",
      email: "fatima.hassan@bestcolleges.edu.pk",
    },
    {
      name: "Mr. Bilal Ahmed",
      designation: "Lecturer",
      department: "science",
      subject: "Mathematics",
      education: "MS Mathematics, LUMS",
      experience: "5 years",
      image: "https://placehold.co/400x400?text=BA",
      email: "bilal.ahmed@bestcolleges.edu.pk",
    },
    // Arts Department
    {
      name: "Prof. Zainab Malik",
      designation: "Professor",
      department: "arts",
      subject: "English Literature",
      education: "PhD in Literature, Cambridge University",
      experience: "22 years",
      image: "https://placehold.co/400x400?text=ZM",
      email: "zainab.malik@bestcolleges.edu.pk",
    },
    {
      name: "Mr. Ali Raza",
      designation: "Assistant Professor",
      department: "arts",
      subject: "Economics",
      education: "MS Economics, LSE",
      experience: "10 years",
      image: "https://placehold.co/400x400?text=AR",
      email: "ali.raza@bestcolleges.edu.pk",
    },
    {
      name: "Dr. Amna Siddiqui",
      designation: "Associate Professor",
      department: "arts",
      subject: "Psychology",
      education: "PhD Psychology, Columbia University",
      experience: "14 years",
      image: "https://placehold.co/400x400?text=AS",
      email: "amna.siddiqui@bestcolleges.edu.pk",
    },
  ];

  const departments = [
    { id: "all", name: "All Departments", icon: Users },
    { id: "law", name: "Law", icon: Scale },
    { id: "science", name: "Science", icon: FlaskConical },
    { id: "arts", name: "Arts", icon: Palette },
  ];

  const stats = [
    { value: "200+", label: "Faculty Members", icon: Users },
    { value: "50+", label: "PhDs", icon: GraduationCap },
    { value: "100+", label: "Publications", icon: BookOpen },
    { value: "25+", label: "Awards", icon: Award },
  ];

  const filteredFaculty =
    activeTab === "all"
      ? facultyMembers
      : facultyMembers.filter((member) => member.department === activeTab);



  const getDepartmentBadge = (dept) => {
    const labels = {
      law: "Law Department",
      science: "Science Department",
      arts: "Arts Department",
    };
    return labels[dept] || dept;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero
        title="Our Distinguished Faculty"
        description="Meet our world-class educators who are dedicated to excellence in teaching, research, and mentoring the next generation of leaders"
        image="https://placehold.co/1920x800?text=Faculty"
        centered
      />

      {/* Stats Bar */}
      <Section
        className="bg-gradient-to-r from-primary-700 via-primary-600 to-accent-600 -mt-16 relative z-20"
        spacing="default"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <stat.icon className="w-8 h-8 mb-3 opacity-80" />
              <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Department Filter */}
      <Section background="white" spacing="default">
        <div className="flex flex-wrap justify-center gap-3">
          {departments.map((dept) => {
            const isActive = activeTab === dept.id;
            return (
              <motion.button
                key={dept.id}
                onClick={() => setActiveTab(dept.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${isActive
                  ? "bg-gray-900 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                <dept.icon className="w-4 h-4" />
                {dept.name}
              </motion.button>
            );
          })}
        </div>
      </Section>

      {/* Faculty Grid */}
      <Section background="gray" spacing="large">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredFaculty.map((faculty, idx) => (
              <motion.div
                key={faculty.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <Card hover className="h-full overflow-hidden group">
                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                    <img
                      src={faculty.image}
                      alt={faculty.name}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <div className="flex gap-3">
                        <a
                          href={`mailto:${faculty.email}`}
                          aria-label={`Email ${faculty.name}`}
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all"
                        >
                          <Mail className="w-5 h-5" />
                        </a>
                        <a
                          href="#"
                          aria-label={`LinkedIn profile of ${faculty.name}`}
                          onClick={(e) => e.preventDefault()}
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                    {/* Department Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium text-white bg-gray-900/80 backdrop-blur-sm">
                      {getDepartmentBadge(faculty.department)}
                    </div>
                  </div>

                  <Card.Body>
                    <h3 className="text-xl font-bold mb-1 text-gray-900">{faculty.name}</h3>
                    <p className="text-primary-600 font-medium mb-3">{faculty.designation}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <span>{faculty.subject}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <GraduationCap className="w-4 h-4 text-gray-400" />
                        <span>{faculty.education}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Award className="w-4 h-4 text-gray-400" />
                        <span>{faculty.experience} Experience</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredFaculty.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">No faculty members found</h3>
            <p className="text-gray-500">Try selecting a different department</p>
          </div>
        )}
      </Section>
    </div>
  );
};

export default Faculty;
