import Section from "../../../components/ui/Section";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import { BookOpen, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { programsData } from "../../../data/programsData";

const AcademicsPage = () => {
  const location = useLocation();

  // Extract campus (main / law / hala)
  const campus = location.pathname.split("/")[2] || "main";
  const campusData = programsData[campus] || programsData.main;

  return (
    <div className="min-h-screen bg-white">
      {campusData.map((category, idx) => (
        <Section key={category.category} background={idx % 2 === 0 ? "white" : "gray"} spacing="large">
          <Section.Header
            title={category.category}
            description={category.description}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {category.items.map((program, pIdx) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: pIdx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="h-full flex flex-col border-t-3 md:border-t-4 border-t-primary-600 rounded-2xl md:rounded-3xl overflow-hidden">
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <div className="p-1.5 md:p-2 rounded-xl md:rounded-2xl bg-primary-100 text-primary-600">
                      <program.icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <Badge variant="outline" className="rounded-full">{program.duration}</Badge>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold mb-2.5 md:mb-3 text-gray-900">{program.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base mb-5 md:mb-6 flex-grow">{program.description}</p>

                  <div className="space-y-2.5 md:space-y-3 mb-5 md:mb-6">
                    {program.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center text-xs md:text-sm text-gray-500">
                        <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 md:pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center text-xs md:text-sm font-medium text-gray-500">
                      <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2" />
                      {program.credits}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>
      ))}

      <Section className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Start Your Academic Journey</h2>
          <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
            Ready to take the next step? Explore our admission requirements and apply today.
          </p>
          <Button size="lg" icon={ArrowRight} iconPosition="right" to="/admissions">
            View Admissions
          </Button>
        </motion.div>
      </Section>
    </div>
  );
};

export default AcademicsPage;
