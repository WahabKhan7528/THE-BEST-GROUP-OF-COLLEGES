import {
  CheckCircle,
  AlertCircle,
  FileText,
  ClipboardCheck,
  GraduationCap,
  Send,
  Phone,
  Mail,
  Calendar,
  Award,
  Users,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Hero from "../components/ui/Hero";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";


const Admissions = () => {
  const navigate = useNavigate();
  const admissionSteps = [
    {
      title: "Choose Your Program",
      description: "Browse through our offered programs and select the one that aligns with your career goals.",
      icon: BookOpen,
    },
    {
      title: "Check Eligibility",
      description: "Review the admission requirements and ensure you meet the criteria for your chosen program.",
      icon: ClipboardCheck,
    },
    {
      title: "Submit Application",
      description: "Fill out the online application form and submit all required documents.",
      icon: FileText,
    },
    {
      title: "Entrance Test",
      description: "Take the entrance test for your selected program (if applicable).",
      icon: Award,
    },
    {
      title: "Interview",
      description: "Attend an interview with the admission committee (for selected programs).",
      icon: Users,
    },
    {
      title: "Admission Decision",
      description: "Receive your admission decision and further instructions if accepted.",
      icon: GraduationCap,
    },
  ];

  const requirements = {
    documents: [
      "Completed application form",
      "Academic transcripts",
      "CNIC/B-Form copy",
      "Passport size photographs (4)",
      "Character certificate",
      "Migration certificate (if applicable)",
    ],
    eligibility: [
      "Minimum 60% marks in previous degree/certificate",
      "Pass in entrance test (where applicable)",
      "No third division in academic career",
      "Good moral character",
      "Medical fitness certificate",
    ],
  };

  const programs = [
    { value: "llb", label: "Bachelor of Laws (LLB)", campus: "Law Campus" },
    { value: "llm", label: "Master of Laws (LLM)", campus: "Law Campus" },
    { value: "bs", label: "Bachelor of Science (BS)", campus: "Main Campus" },
    { value: "ba", label: "Bachelor of Arts (BA)", campus: "Main Campus" },
    { value: "ma", label: "Master of Arts (MA)", campus: "Main Campus" },
    { value: "fsc-pre-med", label: "FSc (Pre-Medical)", campus: "Hala Campus" },
    { value: "fsc-pre-eng", label: "FSc (Pre-Engineering)", campus: "Hala Campus" },
    { value: "ics", label: "ICS (Computer Science)", campus: "Hala Campus" },
    { value: "fa", label: "FA (Arts)", campus: "Hala Campus" },
  ];

  const importantDates = [
    { event: "Applications Open", date: "January 15, 2025" },
    { event: "Application Deadline", date: "March 31, 2025" },
    { event: "Entrance Test", date: "April 15, 2025" },
    { event: "Results Announcement", date: "April 30, 2025" },
    { event: "Classes Begin", date: "August 1, 2025" },
  ];

  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_APPLICATION_TEMPLATE,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      alert("Application submitted successfully 🎓");
      e.target.reset();
    } catch (error) {
      console.error(error);
      alert("Application submission failed ❌");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero
        title="Admissions Open 2025"
        description="Take the first step towards your future. Join Pakistan's leading educational institution and shape your tomorrow."
        image="https://placehold.co/1920x800?text=Admissions"
        centered
      />

      {/* Quick Stats */}
      <Section
        className="bg-gradient-to-r from-primary-700 via-primary-600 to-accent-600 -mt-16 relative z-20"
        spacing="default"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { value: "50+", label: "Programs" },
            { value: "3", label: "Campuses" },
            { value: "95%", label: "Placement Rate" },
            { value: "5000+", label: "Students" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Admission Process */}
      <Section background="white" spacing="large">
        <Section.Header
          title="Admission Process"
          description="Follow these simple steps to begin your educational journey with us"
          badge="How to Apply"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {admissionSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full relative overflow-hidden">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-end justify-start pb-4 pl-4 opacity-10" />
                <Card.Body>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Important Dates */}
      <Section background="gray" spacing="large">
        <Section.Header
          title="Important Dates"
          description="Mark your calendar with these key admission dates"
          badge="Timeline"
        />
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <div className="divide-y divide-gray-100">
              {importantDates.map((item, index) => (
                <motion.div
                  key={item.event}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-gray-50 transition-colors gap-3 sm:gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary-600" />
                    </div>
                    <span className="font-medium text-gray-900">{item.event}</span>
                  </div>
                  <Badge variant="primary">{item.date}</Badge>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* Requirements Section */}
      <Section background="white" spacing="large">
        <Section.Header
          title="Admission Requirements"
          description="Ensure you have all the necessary documents and meet the eligibility criteria"
          badge="Requirements"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Required Documents */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card hover className="h-full">
              <Card.Body>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Required Documents</h3>
                    <p className="text-sm text-gray-500">What you need to submit</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {requirements.documents.map((doc) => (
                    <li key={doc} className="flex items-center gap-3 text-gray-600">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </motion.div>

          {/* Eligibility Criteria */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card hover className="h-full">
              <Card.Body>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-primary-100 flex items-center justify-center">
                    <ClipboardCheck className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Eligibility Criteria</h3>
                    <p className="text-sm text-gray-500">Requirements you must meet</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {requirements.eligibility.map((criterion) => (
                    <li key={criterion} className="flex items-center gap-3 text-gray-600">
                      <AlertCircle className="h-5 w-5 text-primary-500 flex-shrink-0" />
                      <span>{criterion}</span>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Application Form */}
      <Section background="gradient" spacing="large">
        <Section.Header
          title="Apply Now"
          description="Fill out the form below to start your application"
          badge="Application Form"
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="max-w-3xl mx-auto" shadow="xl">
            <Card.Body className="p-8">
              <form
                ref={formRef}
                onSubmit={handleApplicationSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      name="fullname"
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                      placeholder="+92 300 1234567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      CNIC Number
                    </label>
                    <input
                      name="cnic"
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                      placeholder="12345-1234567-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Program *
                  </label>
                  <select
                    name="program"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                  >
                    <option value="">Choose a program</option>
                    {programs.map((program) => (
                      <option key={program.value} value={program.value}>
                        {program.label} - {program.campus}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Previous Education
                  </label>
                  <input
                    name="previous_education"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                    placeholder="e.g., Matric with 85% marks"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Message
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none bg-gray-50 hover:bg-white"
                    placeholder="Any additional information you'd like to share..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  variant="gradient"
                  icon={Send}
                  iconPosition="right"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </Button>


                <p className="text-center text-sm text-gray-500">
                  By submitting this form, you agree to our terms and conditions.
                </p>
              </form>
            </Card.Body>
          </Card>
        </motion.div>
      </Section>

      {/* Contact CTA */}
      <Section background="white" spacing="large">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            Need Help with Your Application?
          </h2>
          <p className="text-gray-600 mb-8">
            Our admissions team is here to assist you. Feel free to reach out with any questions.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a href="tel:+92511234567" className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary-600" />
              </div>
              <span>+92 51 1234 567</span>
            </a>
            <a href="mailto:admissions@bestcolleges.edu.pk" className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary-600" />
              </div>
              <span>admissions@bestcolleges.edu.pk</span>
            </a>
          </div>
          <Button
            variant="outline"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigate('/contact')}
          >
            Visit Contact Page
          </Button>
        </div>
      </Section>
    </div>
  );
};

export default Admissions;
