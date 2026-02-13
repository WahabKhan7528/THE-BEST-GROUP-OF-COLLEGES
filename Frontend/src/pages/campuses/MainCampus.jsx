import Hero from "../../components/ui/Hero";
import Section from "../../components/ui/Section";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Stats from "../../components/ui/Stats";
import {
  BookOpen,
  Award,
  Users,
  Clock,
  Target,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Laptop,
  Library,
  GraduationCap
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { programsData } from "../../data/programsData";

const MainCampus = () => {
  const navigate = useNavigate();

  const stats = [
    {
      icon: Users,
      value: "5000+",
      label: "Students",
    },
    {
      icon: BookOpen,
      value: "25+",
      label: "Programs",
    },
    {
      icon: Award,
      value: "95%",
      label: "Success Rate",
    },
    {
      icon: GraduationCap,
      value: "100+",
      label: "Expert Faculty",
    },
  ];

  const programs = programsData.main[0].items;

  const facilities = [
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

  return (
    <div className="min-h-screen bg-white">
      <Hero
        image="https://placehold.co/1920x800?text=Main+Campus+View"
        centered
        className="rounded-3xl"
      />

      {/* Stats Bar */}
      <Section
        className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 -mt-16 relative z-20"
        spacing="default"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <Stats items={stats} variant="dark" />
        </motion.div>
      </Section>

      <Section spacing="large">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4">Our Vision</Badge>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Shaping the Future of Education</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              To be a premier institution that sets the standard for quality higher education in the region. We aim to produce competent professionals who are not only academically excellent but also ethically grounded.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 rounded-full bg-blue-100 text-blue-600">
                  <CheckCircle size={16} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Excellence in Teaching</h4>
                  <p className="text-sm text-gray-500">Employing modern methodologies.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 rounded-full bg-blue-100 text-blue-600">
                  <CheckCircle size={16} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Research Focus</h4>
                  <p className="text-sm text-gray-500">Encouraging innovation and discovery.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-3xl transform rotate-3 opacity-10"></div>
            <Card className="relative border-0 shadow-xl bg-white/50 backdrop-blur-sm rounded-3xl">
              <div className="p-6">
                <Badge variant="outline" className="mb-4 border-blue-200 text-blue-700 rounded-full">Our Mission</Badge>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Inspiring Excellence, Nurturing Leaders</h3>
                <p className="text-gray-600 mb-6">
                  Our mission is to cultivate a dynamic learning environment that fosters academic excellence, ethical values, and the leadership skills necessary to shape a better future for our society and the world.                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>

      <Section className="bg-gray-50 from-gray-50 to-white bg-gradient-to-b" spacing="large">
        <Section.Header
          title="Academic Programs"
          description="Explore our diverse range of undergraduate programs designed to launch your career."
          badge="Academics"
        />
        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program, idx) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full border-t-4 border-t-blue-500 rounded-3xl">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
                      <program.icon size={24} />
                    </div>
                    <Badge variant="secondary" className="rounded-full">{program.duration}</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{program.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{program.description}</p>

                  <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-2" />
                      {program.seats} Seats Available
                    </div>
                    <Button size="sm" onClick={() => navigate("/admissions")}>
                      Apply
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section spacing="large">
        <Section.Header
          title="World-Class Facilities"
          description="We provide the best environment for learning and growth."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility, idx) => (
            <motion.div
              key={facility.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full text-center bg-white border border-gray-100 rounded-3xl">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
                    <facility.icon size={28} />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{facility.title}</h3>
                <p className="text-sm text-gray-500">{facility.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Join Us?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Take the first step towards a bright future. Applications are open for the upcoming session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" icon={ArrowRight} iconPosition="right" onClick={() => navigate("/admissions")}>
              Start Application
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/contact")}>
              Contact Admissions
            </Button>
          </div>
        </motion.div>
      </Section>
    </div>
  );
};

export default MainCampus;
