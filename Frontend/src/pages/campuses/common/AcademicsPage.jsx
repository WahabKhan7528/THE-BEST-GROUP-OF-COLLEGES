import Section from "../../../components/ui/Section";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import { GraduationCap, Clock, BookOpen } from "lucide-react";
import Slider from "../../../components/ui/Slider";
import { motion } from "framer-motion";

const AcademicsPage = () => {
  const programs = [
    {
      title: "Undergraduate Programs",
      courses: [
        {
          name: "Bachelor of Science",
          duration: "4 Years",
          credits: "136 Credit Hours",
          description:
            "Comprehensive program covering core sciences and specialized subjects.",
        },
        {
          name: "Bachelor of Arts",
          duration: "4 Years",
          credits: "130 Credit Hours",
          description:
            "Liberal arts education with focus on humanities and social sciences.",
        },
      ],
    },
    {
      title: "Graduate Programs",
      courses: [
        {
          name: "Master of Science",
          duration: "2 Years",
          credits: "36 Credit Hours",
          description:
            "Advanced studies with research opportunities in specialized fields.",
        },
        {
          name: "PhD Programs",
          duration: "4-5 Years",
          credits: "72 Credit Hours",
          description: "Doctoral research programs in various disciplines.",
        },
      ],
    },
  ];

  return (
    <div>
      <Section>
        <Section.Header
          title="Academic Programs"
          description="Explore our comprehensive range of academic programs"
        />
        <div className="space-y-12">
          {programs.map((program, idx) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6">{program.title}</h2>
              <Slider>
                {program.courses.map((course) => (
                  <Card
                    key={course.name}
                    className="min-w-[300px] md:min-w-[400px]"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-6 h-6 text-blue-600" />
                        <h3 className="text-xl font-bold">{course.name}</h3>
                      </div>
                      <p className="text-gray-600">{course.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {course.duration}
                        </Badge>
                        <Badge className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          {course.credits}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </Slider>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default AcademicsPage;
