import Hero from "../../../components/ui/Hero";
import Section from "../../../components/ui/Section";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import { GraduationCap, Clock, BookOpen, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AcademicsPage = () => {
  const navigate = useNavigate();

  const programs = [
    {
      title: "Undergraduate Programs",
      description: "Build a strong foundation for your future with our diverse range of bachelor's degrees.",
      courses: [
        {
          name: "Bachelor of Science (BS)",
          duration: "4 Years",
          credits: "136 Credit Hours",
          description:
            "A rigorous program offering specializations in Computer Science, Mathematics, and Physics. Designed to foster analytical thinking and technical expertise.",
          features: ["State-of-the-art Labs", "Industry Projects", "Expert Faculty"]
        },
        {
          name: "Bachelor of Arts (BA)",
          duration: "4 Years",
          credits: "130 Credit Hours",
          description:
            "A comprehensive liberal arts education focusing on Humanities, English Literature, and Economics. Encourages critical thinking and creativity.",
          features: ["Creative Workshops", "Seminars", "Cultural Studies"]
        },
        {
          name: "Bachelor of Business Admin (BBA)",
          duration: "4 Years",
          credits: "132 Credit Hours",
          description: "Develop the leadership and management skills needed to thrive in the corporate world. Covers Finance, Marketing, and HR.",
          features: ["Case Studies", "Internships", "Entrepreneurship"]
        }
      ],
    },
    {
      title: "Graduate Programs",
      description: "Advance your career and expertise with our specialized master's and doctoral programs.",
      courses: [
        {
          name: "Master of Science (MS)",
          duration: "2 Years",
          credits: "36 Credit Hours",
          description:
            "Advanced studies with a strong research component. Ideal for students aiming for academic careers or specialized industry roles.",
          features: ["Thesis Research", "Advanced Electives", "Conference Funding"]
        },
        {
          name: "PhD Programs",
          duration: "3-5 Years",
          credits: "72 Credit Hours",
          description: "Contribute to knowledge creation through original research. Our PhD programs are mentored by leading scholars in the field.",
          features: ["Full Funding Options", "Research Grants", "Global Collaborations"]
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {programs.map((program, idx) => (
        <Section key={program.title} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"} spacing="large">
          <Section.Header
            title={program.title}
            description={program.description}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {program.courses.map((course, cIdx) => (
              <motion.div
                key={course.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: cIdx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="h-full flex flex-col border-t-4 border-t-primary-500 rounded-3xl overflow-hidden">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-2xl bg-primary-100 text-primary-600">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <Badge variant="outline" className="rounded-full">{course.duration}</Badge>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-gray-900">{course.name}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{course.description}</p>

                  <div className="space-y-3 mb-6">
                    {course.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center text-sm font-medium text-gray-500">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {course.credits}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>
      ))}

      <Section background="gradient" className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6">Start Your Academic Journey</h2>
          <p className="text-lg text-gray-600 mb-8">
            Ready to take the next step? Explore our admission requirements and apply today.
          </p>
          <Button size="lg" icon={ArrowRight} iconPosition="right" onClick={() => navigate("/admissions")}>
            View Admissions
          </Button>
        </motion.div>
      </Section>
    </div>
  );
};

export default AcademicsPage;
