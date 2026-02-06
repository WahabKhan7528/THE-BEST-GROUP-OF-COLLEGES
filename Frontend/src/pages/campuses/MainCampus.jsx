import Hero from "../../components/ui/Hero";
import Section from "../../components/ui/Section";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import { BookOpen, Award, Users, Clock } from "lucide-react";
import { motion } from "framer-motion";

const MainCampus = () => {
  const programs = [
    {
      title: "BS Computer Science",
      description:
        "Four-year bachelor program in computer science and programming",
      duration: "4 Years",
      seats: 120,
    },
    {
      title: "BBA",
      description: "Bachelor of Business Administration",
      duration: "4 Years",
      seats: 100,
    },
    {
      title: "BS Mathematics",
      description: "Bachelor of Science in Mathematics",
      duration: "4 Years",
      seats: 60,
    },
    {
      title: "BS English",
      description: "Bachelor of Science in English Language and Literature",
      duration: "4 Years",
      seats: 80,
    },
  ];

  const facilities = [
    {
      icon: BookOpen,
      title: "Modern Library",
      description:
        "Extensive collection of books, journals, and digital resources",
    },
    {
      icon: Users,
      title: "Computer Labs",
      description:
        "State-of-the-art computer laboratories with latest software",
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero title="Main Campus" subtitle="Shaping Future Leaders" centered />

      <Section>
        <Section.Header
          title="About Our Main Campus"
          description="Our Main Campus offers comprehensive undergraduate programs designed to prepare students for successful careers and advanced studies."
        />
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card>
              <h3 className="text-xl font-bold mb-4">Vision</h3>
              <p className="text-gray-600">
                To be a premier institution providing quality higher education
                and producing competent professionals.
              </p>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <h3 className="text-xl font-bold mb-4">Mission</h3>
              <p className="text-gray-600">
                To empower students with knowledge, skills, and values through
                quality education and practical learning experiences.
              </p>
            </Card>
          </motion.div>
        </div>
      </Section>

      <Section className="bg-gray-50">
        <Section.Header title="Our Programs" />
        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program, idx) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <Award className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge>
                    <Clock className="w-4 h-4 mr-1" />
                    {program.duration}
                  </Badge>
                  <Badge>
                    <Users className="w-4 h-4 mr-1" />
                    {program.seats} seats
                  </Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <Section.Header title="Our Facilities" />
        <div className="grid md:grid-cols-2 gap-8">
          {facilities.map((facility, idx) => (
            <motion.div
              key={facility.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <facility.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{facility.title}</h3>
                <p className="text-gray-600">{facility.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default MainCampus;
