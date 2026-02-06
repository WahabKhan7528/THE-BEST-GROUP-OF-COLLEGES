import Section from "../../../components/ui/Section";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import { Microscope, BookOpen, Users, Award } from "lucide-react";
import Slider from "../../../components/ui/Slider";
import { motion } from "framer-motion";

const ResearchPage = () => {
  const researchAreas = [
    {
      title: "Computer Science",
      projects: [
        {
          name: "Artificial Intelligence in Healthcare",
          description: "Developing AI solutions for early disease detection",
          researchers: 5,
          publications: 12,
        },
        {
          name: "Cybersecurity Systems",
          description: "Advanced security protocols for digital infrastructure",
          researchers: 3,
          publications: 8,
        },
      ],
    },
    {
      title: "Medical Research",
      projects: [
        {
          name: "Cancer Research",
          description: "Innovative approaches to cancer treatment",
          researchers: 8,
          publications: 15,
        },
        {
          name: "Drug Development",
          description: "New drug development for chronic diseases",
          researchers: 6,
          publications: 10,
        },
      ],
    },
    {
      title: "Legal Studies",
      projects: [
        {
          name: "Constitutional Law Analysis",
          description: "Study of constitutional amendments and their impacts",
          researchers: 4,
          publications: 7,
        },
        {
          name: "Human Rights Law",
          description: "Research on human rights protection mechanisms",
          researchers: 3,
          publications: 5,
        },
      ],
    },
  ];

  const researchFacilities = [
    {
      name: "Advanced Computing Lab",
      equipment: [
        "High-Performance Computers",
        "GPU Clusters",
        "AI Development Tools",
      ],
    },
    {
      name: "Medical Research Center",
      equipment: [
        "Electron Microscopes",
        "Cell Culture Facility",
        "Clinical Trial Units",
      ],
    },
    {
      name: "Legal Research Library",
      equipment: [
        "Digital Law Libraries",
        "Case Study Databases",
        "Legal Documentation Center",
      ],
    },
  ];

  return (
    <div>
      <Section>
        <Section.Header
          title="Research Programs"
          description="Explore our cutting-edge research initiatives"
        />
        <div className="space-y-12">
          {researchAreas.map((area, areaIdx) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: areaIdx * 0.2 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-2xl font-bold mb-6">{area.title}</h2>
                <Slider>
                  {area.projects.map((project, projIdx) => (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: projIdx * 0.1 }}
                      viewport={{ once: true }}
                      className="min-w-[300px] md:min-w-[400px]"
                    >
                      <Card className="h-full">
                        <Microscope className="w-12 h-12 text-blue-600 mb-4" />
                        <h3 className="text-xl font-bold mb-2">
                          {project.name}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {project.researchers} Researchers
                          </Badge>
                          <Badge className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            {project.publications} Publications
                          </Badge>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </Slider>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="bg-gray-50">
        <Section.Header
          title="Research Facilities"
          description="State-of-the-art facilities supporting our research"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {researchFacilities.map((facility, idx) => (
            <motion.div
              key={facility.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <h3 className="text-xl font-bold mb-4">{facility.name}</h3>
                <ul className="space-y-2">
                  {facility.equipment.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default ResearchPage;
