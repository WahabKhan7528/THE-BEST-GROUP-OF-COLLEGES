import Hero from "../../components/ui/Hero";
import Section from "../../components/ui/Section";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import { BookOpen, Award, Users, Clock } from "lucide-react";
import { motion } from "framer-motion";

const LawCollege = () => {
  const programs = [
    {
      title: "LLB (5 Years)",
      description:
        "Bachelor of Laws program designed for intermediate graduates",
      duration: "5 Years",
      seats: 100,
    },
    {
      title: "LLM",
      description: "Master of Laws program for specialized legal education",
      duration: "2 Years",
      seats: 50,
    },
  ];

  const facilities = [
    {
      icon: BookOpen,
      title: "Law Library",
      description:
        "Extensive collection of legal resources and research materials",
    },
    {
      icon: Users,
      title: "Moot Court",
      description: "State-of-the-art moot court for practical training",
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero
        title="Law College"
        subtitle="Excellence in Legal Education"
        centered
      />

      <Section>
        <Section.Header
          title="About Our Law College"
          description="Our Law College is dedicated to producing competent legal professionals through quality education, practical training, and exposure to real-world legal scenarios."
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
                To be a leading institution in legal education, producing
                skilled legal professionals who contribute to justice and
                society.
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
                To provide quality legal education through innovative teaching
                methods and practical exposure to legal proceedings.
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

export default LawCollege;
