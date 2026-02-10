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
  Microscope,
  Cpu,
  Calculator,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  FlaskConical,
  GraduationCap
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HalaCampus = () => {
  const navigate = useNavigate();

  const stats = [
    {
      icon: Users,
      value: "1500+",
      label: "Students",
    },
    {
      icon: GraduationCap,
      value: "98%",
      label: "Pass Percentage",
    },
    {
      icon: Award,
      value: "50+",
      label: "Position Holders",
    },
    {
      icon: Users,
      value: "50+",
      label: "Expert Faculty",
    },
  ];

  const programs = [
    {
      title: "FSc Pre-Medical",
      description: "Comprehensive study of Biology, Physics, and Chemistry. Ideal for aspiring doctors and medical professionals.",
      duration: "2 Years",
      seats: 150,
      icon: Microscope,
      color: "cyan",
    },
    {
      title: "FSc Pre-Engineering",
      description: "A rigorous foundation in Mathematics, Physics, and Chemistry. Prepares students for top engineering universities.",
      duration: "2 Years",
      seats: 150,
      icon: Calculator,
      color: "blue",
    },
    {
      title: "ICS",
      description: "Information & Computer Science. Perfect blend of computer science with mathematics or physics for future tech leaders.",
      duration: "2 Years",
      seats: 100,
      icon: Cpu,
      color: "sky",
    },
    {
      title: "I.Com",
      description: "Intermediate in Commerce. Building strong fundamentals in accounting, banking, and business finance.",
      duration: "2 Years",
      seats: 100,
      icon: TrendingUp,
      color: "slate",
    },
  ];

  const facilities = [
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

  return (
    <div className="min-h-screen bg-white">
      <Hero
        image="https://placehold.co/1920x800?text=Hala+Campus"
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
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Foundations for Success</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              To be the leading intermediate institution in the region, known for fostering academic excellence, moral values, and personal growth in every student.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 rounded-full bg-blue-100 text-blue-600">
                  <CheckCircle size={16} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Concept-Based Learning</h4>
                  <p className="text-sm text-gray-500">Focusing on deep understanding, not just rote memorization.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 rounded-full bg-blue-100 text-blue-600">
                  <CheckCircle size={16} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Career Guidance</h4>
                  <p className="text-sm text-gray-500">Helping students choose the right professional path.</p>
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
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-3xl transform -rotate-3 opacity-10"></div>
            <Card className="relative border-0 shadow-xl bg-white/50 backdrop-blur-sm rounded-3xl">
              <div className="p-6">
                <Badge variant="outline" className="mb-4 border-blue-200 text-blue-700 rounded-full">Our Mission</Badge>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Nurturing Talent</h3>
                <p className="text-gray-600 mb-6">
                  To provide high-quality intermediate education that empowers students to achieve top positions in board exams and secure admissions in prestigious universities.
                </p>
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0 hover:bg-transparent" onClick={() => navigate("/faculty-info")}>
                  View Faculty Members <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>

      <Section className="bg-gray-50 from-gray-50 to-white bg-gradient-to-b" spacing="large">
        <Section.Header
          title="Intermediate Programs"
          description="Choose the right path for your future career."
          badge="Admissions Open"
        />
        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program, idx) => {
            const colorClasses = {
              cyan: { border: "border-t-cyan-500", bg: "bg-cyan-50", text: "text-cyan-600" },
              blue: { border: "border-t-blue-500", bg: "bg-blue-50", text: "text-blue-600" },
              sky: { border: "border-t-sky-500", bg: "bg-sky-50", text: "text-sky-600" },
              slate: { border: "border-t-slate-500", bg: "bg-slate-50", text: "text-slate-600" },
            };
            const colors = colorClasses[program.color] || colorClasses.blue;

            return (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className={`h-full border-t-4 ${colors.border} rounded-3xl`}>
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-2xl ${colors.bg} ${colors.text}`}>
                        <program.icon size={24} />
                      </div>
                      <Badge variant="secondary" className="rounded-full">{program.duration}</Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{program.title}</h3>
                    <p className="text-gray-600 mb-6 flex-grow">{program.description}</p>

                    <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="w-4 h-4 mr-2" />
                        {program.seats} Seats
                      </div>
                      <Button size="sm" onClick={() => navigate("/admissions")}>
                        Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Section>

      <Section spacing="large">
        <Section.Header
          title="Campus Facilities"
          description="Everything you need for a complete learning experience."
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

      <Section background="gradient" className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6">Invest in Your Future</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join the best intermediate college in Hala. Limited seats available for the upcoming session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" icon={ArrowRight} iconPosition="right" onClick={() => navigate("/admissions")}>
              Apply Online
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/contact")}>
              Visit Campus
            </Button>
          </div>
        </motion.div>
      </Section>
    </div>
  );
};

export default HalaCampus;
