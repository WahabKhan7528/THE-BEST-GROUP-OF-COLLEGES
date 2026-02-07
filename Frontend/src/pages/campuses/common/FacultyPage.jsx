import Hero from "../../../components/ui/Hero";
import Section from "../../../components/ui/Section";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import { Mail, Phone, GraduationCap, Award, Linkedin, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const FacultyPage = () => {
  const departments = [
    {
      name: "Department of Law",
      head: "Dr. Sarah Ahmed",
      members: [
        {
          name: "Dr. Sarah Ahmed",
          designation: "Professor & Dean",
          specialization: "Constitutional Law",
          qualification: "PhD Law, Harvard University",
          email: "sarah.ahmed@tbc.edu.pk",
          image: "https://placehold.co/400x400?text=Sarah+Ahmed",
          awards: ["Best Researcher 2024", "Excellence in Teaching"],
        },
        {
          name: "Mr. Kamran Khan",
          designation: "Associate Professor",
          specialization: "Criminal Law",
          qualification: "LLM, University of London",
          email: "kamran.khan@tbc.edu.pk",
          image: "https://placehold.co/400x400?text=Kamran+Khan",
          awards: ["Distinguished Service Award"],
        },
      ]
    },
    {
      name: "Department of Computer Science",
      head: "Dr. Muhammad Ali",
      members: [
        {
          name: "Dr. Muhammad Ali",
          designation: "HOD & Professor",
          specialization: "Artificial Intelligence",
          qualification: "PhD CS, MIT",
          email: "m.ali@tbc.edu.pk",
          image: "https://placehold.co/400x400?text=Muhammad+Ali",
          awards: ["Top Scientist 2023"],
        },
        {
          name: "Ms. Ayesha Khan",
          designation: "Assistant Professor",
          specialization: "Data Science",
          qualification: "MS Data Science, NUST",
          email: "ayesha.khan@tbc.edu.pk",
          image: "https://placehold.co/400x400?text=Ayesha+Khan",
          awards: [],
        },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Hero
        title="Distinguished Faculty"
        subtitle="Mentors & Visionaries"
        description="Our faculty members are not just teachers; they are researchers, industry experts, and mentors dedicated to shaping the future leaders of tomorrow."
        image="https://placehold.co/1920x800?text=Faculty"
        centered
        className="rounded-3xl"
      />

      {departments.map((dept, dIdx) => (
        <Section key={dept.name} className={dIdx % 2 === 0 ? "bg-white" : "bg-gray-50"} spacing="large">
          <Section.Header
            title={dept.name}
            description={`Led by ${dept.head}`}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dept.members.map((faculty, fIdx) => (
              <motion.div
                key={faculty.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: fIdx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="h-full flex flex-col items-center text-center p-6 rounded-3xl">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-blue-50 shadow-inner">
                    <img src={faculty.image} alt={faculty.name} className="w-full h-full object-cover" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-1">{faculty.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{faculty.designation}</p>

                  <div className="w-full border-t border-gray-100 my-4" />

                  <div className="space-y-3 w-full text-left">
                    <div className="flex items-start gap-3">
                      <GraduationCap className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="block text-sm font-semibold text-gray-700">Qualification</span>
                        <span className="text-sm text-gray-600">{faculty.qualification}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="block text-sm font-semibold text-gray-700">Specialization</span>
                        <span className="text-sm text-gray-600">{faculty.specialization}</span>
                      </div>
                    </div>
                    {faculty.awards && faculty.awards.length > 0 && (
                      <div className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
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
                    <Button size="sm" variant="outline" className="w-full text-gray-600 border-gray-200 hover:border-blue-500 hover:text-blue-600 rounded-full" onClick={() => window.location.href = `mailto:${faculty.email}`}>
                      <Mail className="w-4 h-4 mr-2" /> Contact
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
};

export default FacultyPage;
