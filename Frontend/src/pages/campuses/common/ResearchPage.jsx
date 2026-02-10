import Hero from "../../../components/ui/Hero";
import Section from "../../../components/ui/Section";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import { Microscope, BookOpen, Users, Award, FlaskConical, Database, Atom, Globe } from "lucide-react";
import { motion } from "framer-motion";

const ResearchPage = () => {
  const researchAreas = [
    {
      title: "Science & Technology",
      icon: Atom,
      projects: [
        {
          name: "Artificial Intelligence in Healthcare",
          description: "Leveraging machine learning algorithms for early detection of chronic diseases and personalized treatment plans.",
          researchers: 5,
          publications: 12,
          status: "Ongoing"
        },
        {
          name: "Sustainable Energy Solutions",
          description: "Developing cost-effective solar cells and energy storage systems for rural electrification.",
          researchers: 3,
          publications: 8,
          status: "Funded"
        },
      ],
    },
    {
      title: "Social Sciences",
      icon: Globe,
      projects: [
        {
          name: "Urban Development & Policy",
          description: "Analyzing the impact of rapid urbanization on social infrastructure and community well-being.",
          researchers: 4,
          publications: 7,
          status: "Completed"
        },
        {
          name: "Digital Literacy Initiative",
          description: "Assessing the gap in digital skills among rural populations and proposing educational interventions.",
          researchers: 6,
          publications: 10,
          status: "Ongoing"
        },
      ],
    },
  ];

  const facilities = [
    {
      name: "Genomics Lab",
      description: "Equipped with next-generation sequencing tools.",
      icon: Microscope,
      items: ["DNA Sequencer", "PCR Machines"]
    },
    {
      name: "Big Data Center",
      description: "High-performance computing for complex data analysis.",
      icon: Database,
      items: ["GPU Clusters", "Cloud Server Farm"]
    },
    {
      name: "Chemical Analysis Lab",
      description: "Advanced spectroscopy and chromatography instruments.",
      icon: FlaskConical,
      items: ["NMR Spectrometer", "HPLC Systems"]
    },
    {
      name: "Social Research Hub",
      description: "Digital archives and focus group observation rooms.",
      icon: Users,
      items: ["Recording Studio", "Data Analysis Software"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Section spacing="large">
        <Section.Header
          title="Current Research Projects"
          description="Explore some of the groundbreaking work being done by our faculty and students."
        />

        <div className="space-y-12">
          {researchAreas.map((area, aIdx) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: aIdx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-2xl bg-primary-100 text-primary-700">
                  <area.icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{area.title}</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {area.projects.map((project, pIdx) => (
                  <Card key={project.name} hover className="h-full border-l-4 border-l-primary-500 rounded-3xl">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={project.status === "Ongoing" ? "default" : "secondary"}>
                        {project.status}
                      </Badge>
                      <div className="flex items-center text-gray-400 text-sm">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {project.publications} Pubs
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-2 text-gray-900">{project.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="pt-4 border-t border-gray-100 flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-2" />
                      {project.researchers} Researchers Involved
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="bg-gray-50" spacing="large">
        <Section.Header
          title="World-Class Infrastructure"
          description="Providing researchers with the tools they need to succeed."
          centered
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility, fIdx) => (
            <motion.div
              key={facility.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: fIdx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full text-center rounded-3xl">
                <div className="mx-auto w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-primary-600 mb-4 border border-gray-100">
                  <facility.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold mb-2">{facility.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{facility.description}</p>
                <div className="flex flex-wrap justify-center gap-1">
                  {facility.items.map(item => (
                    <Badge key={item} variant="outline" className="text-xs border-gray-200">
                      {item}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default ResearchPage;
