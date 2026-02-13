import Hero from "../../components/ui/Hero";
import Section from "../../components/ui/Section";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Stats from "../../components/ui/Stats";
import {
  Scale,
  Gavel,
  BookOpen,
  Award,
  Users,
  Clock,
  ArrowRight,
  CheckCircle,
  Scroll,
  Landmark,
  Library
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { programsData } from "../../data/programsData";

const LawCollege = () => {
  const navigate = useNavigate();

  const stats = [
    {
      icon: Users,
      value: "800+",
      label: "Law Students",
    },
    {
      icon: Gavel,
      value: "50+",
      label: "Moot Court Wins",
    },
    {
      icon: Award,
      value: "100%",
      label: "Bar Council Recognized",
    },
    {
      icon: Scale,
      value: "20+",
      label: "Legal Experts",
    },
  ];

  const programs = programsData.law[0].items;

  const facilities = [
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

  return (
    <div className="min-h-screen bg-white">
      <Hero
        image="https://placehold.co/1920x800?text=Law+College"
        centered
        className="rounded-3xl"
      />

      {/* Stats Bar */}
      <Section
        background="blue"
        className="-mt-16 relative z-20"
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
            <Badge className="mb-4">Dean's Message</Badge>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Excellence in Legal Education</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              "Law is not just a profession; it is a calling to serve justice. At our Law College, we ensure that every student is equipped with the knowledge and moral courage to make a difference."
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 rounded-full bg-primary-100 text-primary-600">
                  <CheckCircle size={16} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Practical Training</h4>
                  <p className="text-sm text-gray-500">Regular court visits and moot court sessions.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 rounded-full bg-primary-100 text-primary-600">
                  <CheckCircle size={16} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Expert Faculty</h4>
                  <p className="text-sm text-gray-500">Learn from serving judges and senior advocates.</p>
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
            <div className="absolute inset-0 bg-primary-600/10 rounded-3xl transform rotate-3 opacity-10"></div>
            <Card className="relative border-0 shadow-xl bg-white/50 backdrop-blur-sm rounded-3xl">
              <div className="p-6">
                <Badge variant="outline" className="mb-4 border-primary-200 text-primary-700 rounded-full">Our Vision</Badge>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Upholding the Rule of Law</h3>
                <p className="text-gray-600 mb-6">
                  To be a premier center of legal learning that produces competent professionals capable of interpreting and applying the law for the betterment of society.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>

      <Section className="bg-gray-50" spacing="large">
        <Section.Header
          title="Legal Programs"
          description="Approved by HEC and Pakistan Bar Council."
          badge="Admissions Open"
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
              <Card hover className="h-full border-t-4 border-t-primary-600 rounded-3xl">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-primary-50 text-primary-600">
                      <program.icon size={24} />
                    </div>
                    <Badge variant="secondary" className="rounded-full">{program.duration}</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{program.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{program.description}</p>

                  <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-end">
                    <Button size="sm" onClick={() => navigate("/admissions")}>
                      Ask Criteria
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
          title="Law Campus Facilities"
          description="Resources designed to sharpen your legal acumen."
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
                  <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform duration-300">
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
          <h2 className="text-3xl font-bold mb-6">Pursue a Career in Law</h2>
          <p className="text-lg text-gray-600 mb-8">
            Become a part of our prestigious legal community. Apply now for the upcoming session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" icon={ArrowRight} iconPosition="right" onClick={() => navigate("/admissions")}>
              Apply Now
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/contact")}>
              Contact Us
            </Button>
          </div>
        </motion.div>
      </Section>
    </div>
  );
};

export default LawCollege;
