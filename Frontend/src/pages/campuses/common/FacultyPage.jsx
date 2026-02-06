import Section from "../../../components/ui/Section";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import { Mail, Phone, GraduationCap, Award } from "lucide-react";
import Slider from "../../../components/ui/Slider";
import { motion } from "framer-motion";

const FacultyPage = () => {
  const facultyMembers = [
    {
      name: "Dr. Sarah Ahmed",
      designation: "Professor & Department Head",
      specialization: "Constitutional Law",
      qualification: "PhD Law, Harvard University",
      email: "sarah.ahmed@college.edu",
      phone: "+92-300-1234567",
      awards: ["Excellence in Teaching 2024", "Research Award 2023"],
    },
    {
      name: "Dr. Muhammad Ali",
      designation: "Associate Professor",
      specialization: "Computer Science",
      qualification: "PhD Computer Science, MIT",
      email: "muhammad.ali@college.edu",
      phone: "+92-300-7654321",
      awards: ["Best Researcher 2024"],
    },
    {
      name: "Dr. Fatima Khan",
      designation: "Assistant Professor",
      specialization: "Medicine",
      qualification: "MBBS, FCPS Medicine",
      email: "fatima.khan@college.edu",
      phone: "+92-300-1112223",
      awards: ["Clinical Excellence Award 2024"],
    },
    {
      name: "Prof. Zainab Hassan",
      designation: "Professor",
      specialization: "Physics",
      qualification: "PhD Physics, Stanford",
      email: "zainab.hassan@college.edu",
      phone: "+92-300-3334445",
      awards: ["Innovation Award 2023"],
    },
  ];

  return (
    <div>
      <Section>
        <Section.Header
          title="Our Faculty"
          description="Meet our distinguished faculty members"
        />
        <Slider>
          {facultyMembers.map((faculty, idx) => (
            <motion.div
              key={faculty.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="min-w-[300px] md:min-w-[400px]"
            >
              <Card className="flex flex-col gap-4 h-full">
                <div>
                  <h3 className="text-xl font-bold">{faculty.name}</h3>
                  <p className="text-blue-600 font-medium">
                    {faculty.designation}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-gray-600" />
                    <span>{faculty.qualification}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <span>{faculty.email}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <span>{faculty.phone}</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {faculty.awards.map((award) => (
                    <Badge key={award} className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {award}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </Slider>
      </Section>
    </div>
  );
};

export default FacultyPage;
