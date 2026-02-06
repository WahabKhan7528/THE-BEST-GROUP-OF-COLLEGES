import { useState } from "react";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Hero from "../components/ui/Hero";
import { motion } from "framer-motion";

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
      image: "https://placehold.co/400x400?text=AK",
    },
    {
      name: "Ms. Sarah Ali",
      designation: "Assistant Professor",
      department: "law",
      subject: "Criminal Law",
      education: "LLM, Oxford University",
      image: "https://placehold.co/400x400?text=SA",
    },
    // Science Department
    {
      name: "Dr. Muhammad Usman",
      designation: "Professor",
      department: "science",
      subject: "Physics",
      education: "PhD in Physics, MIT",
      image: "https://placehold.co/400x400?text=MU",
    },
    {
      name: "Dr. Fatima Hassan",
      designation: "Associate Professor",
      department: "science",
      subject: "Chemistry",
      education: "PhD in Chemistry, Stanford University",
      image: "https://placehold.co/400x400?text=FH",
    },
    // Arts Department
    {
      name: "Prof. Zainab Malik",
      designation: "Professor",
      department: "arts",
      subject: "English Literature",
      education: "PhD in Literature, Cambridge University",
      image: "https://placehold.co/400x400?text=ZM",
    },
    {
      name: "Mr. Ali Raza",
      designation: "Assistant Professor",
      department: "arts",
      subject: "Economics",
      education: "MS Economics, LSE",
      image: "https://placehold.co/400x400?text=AR",
    },
  ];

  const departments = [
    { id: "all", name: "All Departments" },
    { id: "law", name: "Law" },
    { id: "science", name: "Science" },
    { id: "arts", name: "Arts" },
  ];

  const filteredFaculty =
    activeTab === "all"
      ? facultyMembers
      : facultyMembers.filter((member) => member.department === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero
        title="Our Faculty"
        description="Meet our distinguished faculty members who are dedicated to excellence in teaching and research"
        image="https://placehold.co/1920x600?text=Faculty"
        actions={[
          {
            children: "Join Our Team",
            variant: "secondary",
          },
          {
            children: "Contact Us",
            variant: "outline",
            className:
              "text-white border-white hover:bg-white hover:text-blue-600",
          },
        ]}
      />

      <Section background="white" spacing="small">
        <div className="flex flex-wrap justify-center gap-4">
          {departments.map((dept) => (
            <Button
              key={dept.id}
              onClick={() => setActiveTab(dept.id)}
              variant={activeTab === dept.id ? "primary" : "secondary"}
              size="md"
              className="rounded-full"
            >
              {dept.name}
            </Button>
          ))}
        </div>
      </Section>

      <Section spacing="large">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFaculty.map((faculty, idx) => (
            <motion.div
              key={faculty.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full">
                <img
                  src={faculty.image}
                  alt={faculty.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <Card.Body>
                  <h3 className="text-xl font-bold mb-2">{faculty.name}</h3>
                  <Badge variant="primary" className="mb-2">
                    {faculty.designation}
                  </Badge>
                  <p className="text-gray-600 mb-1">{faculty.subject}</p>
                  <p className="text-sm text-gray-500">{faculty.education}</p>
                </Card.Body>
                <Card.Footer>
                  <p className="text-sm text-gray-600 flex items-center justify-between">
                    <span>Department of </span>
                    <Badge variant="info" size="sm">
                      {faculty.department}
                    </Badge>
                  </p>
                </Card.Footer>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section background="blue" spacing="large">
        <div className="text-center">
          <Section.Header
            title="Join Our Team"
            description="We're always looking for talented educators to join our faculty. Contact us to learn about current opportunities."
            className="text-white mb-8"
          />
          <div className="flex justify-center gap-4">
            <Button variant="secondary" size="lg">
              View Openings
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Send Resume
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Faculty;
