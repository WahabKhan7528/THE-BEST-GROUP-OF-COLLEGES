import Hero from "../components/ui/Hero";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { Star, BookOpen, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const milestones = [
    {
      year: "1990",
      title: "Foundation",
      description: "Established as a premier educational institution",
    },
    {
      year: "2000",
      title: "Expansion",
      description: "Launched degree programs in multiple disciplines",
    },
    {
      year: "2010",
      title: "Innovation",
      description: "Introduced modern teaching methodologies and facilities",
    },
    {
      year: "2020",
      title: "Excellence",
      description: "Recognized as one of the top educational institutions",
    },
  ];

  const values = [
    {
      title: "Excellence",
      description: "Commitment to maintaining high academic standards",
    },
    {
      title: "Innovation",
      description: "Embracing modern teaching methods and technologies",
    },
    {
      title: "Integrity",
      description: "Upholding ethical practices in education",
    },
    {
      title: "Inclusivity",
      description: "Providing equal opportunities for all students",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Hero
        title="About Us"
        subtitle="Dedicated to providing quality education and shaping future leaders since 1990"
        className="bg-gray-900 text-white h-10"
        centered
      />

      <Section>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card>
              <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-600">
                To be the leading educational institution in Pakistan,
                recognized for academic excellence, innovation, and the success
                of our graduates in their chosen fields.
              </p>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <Star className="w-12 h-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600">
                To provide quality education that empowers students with
                knowledge, skills, and values necessary for professional success
                and personal growth while contributing positively to society.
              </p>
            </Card>
          </motion.div>
        </div>
      </Section>

      <Section className="bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, idx) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <Shield className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
                <div className="mt-4">
                  <Badge>{value.title}</Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {milestones.map((milestone, idx) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="text-center">
                <Badge className="mb-4">{milestone.year}</Badge>
                <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                <p className="text-gray-600">{milestone.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default About;
