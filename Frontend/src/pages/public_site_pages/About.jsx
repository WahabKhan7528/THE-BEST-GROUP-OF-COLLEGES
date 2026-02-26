import Section from "../../components/public_site/Section";
import Card from "../../components/public_site/Card";
import Badge from "../../components/public_site/Badge";
import Button from "../../components/shared/Button";
import {
  Star,
  BookOpen,
  Shield,
  Heart,
  Award,
  Lightbulb,
  Building,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

const About = () => {

  const milestones = [
    {
      year: "1985",
      title: "Foundation",
      description: "Established as a premier educational institution in Pakistan",
      icon: Building,
    },
    {
      year: "2000",
      title: "Expansion",
      description: "Launched degree programs and opened Law Campus",
      icon: BookOpen,
    },
    {
      year: "2010",
      title: "Innovation",
      description: "Introduced modern teaching methodologies and digital labs",
      icon: Lightbulb,
    },
    {
      year: "2024",
      title: "Excellence",
      description: "Recognized as one of the top educational institutions",
      icon: Award,
    },
  ];

  const values = [
    {
      title: "Excellence",
      description: "Commitment to maintaining high academic standards and continuous improvement",
      icon: Star,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Innovation",
      description: "Embracing modern teaching methods, technologies, and creative solutions",
      icon: Lightbulb,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Integrity",
      description: "Upholding ethical practices, honesty, and transparency in education",
      icon: Shield,
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "Inclusivity",
      description: "Providing equal opportunities and embracing diversity in learning",
      icon: Heart,
      color: "from-pink-500 to-rose-500",
    },
  ];

  const stats = [
    { value: "35+", label: "Years of Excellence" },
    { value: "5000+", label: "Students Enrolled" },
    { value: "200+", label: "Expert Faculty" },
    { value: "95%", label: "Success Rate" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Our Story */}
      <Section background="gray" spacing="large">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <Badge variant="solid" className="mb-4">Our Story</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              A Legacy of <span className="text-gradient">Educational Excellence</span>
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              Founded in 1985, Best Group of Colleges has been at the forefront of
              educational excellence in Pakistan for nearly four decades. What started
              as a single institution has grown into a network of three dynamic campuses,
              each dedicated to nurturing the next generation of leaders.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our commitment to academic rigor, student development, and community
              engagement has shaped thousands of successful careers. With programs
              ranging from intermediate studies to postgraduate degrees, we provide
              a comprehensive educational ecosystem that adapts to the evolving needs
              of society.
            </p>
            <div className="flex justify-center md:justify-start">
              <Button
                icon={ArrowRight}
                to="/campuses/main"
              >
                Explore Our Campuses
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-100 to-accent-100 rounded-3xl transform rotate-3" />
            <img
              src="/our-story.webp"
              alt="Our Story"
              className="relative rounded-2xl shadow-2xl w-full"
              loading="lazy"
              srcSet="/our-story.webp 800w"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </Section>

      {/* Core Values */}
      <Section background="white" spacing="large">
        <Section.Header
          title="Our Core Values"
          description="The principles that guide everything we do"
          badge="Values"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-600 transition-colors">
                  <value.icon className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Journey Timeline */}
      <Section background="gradient" spacing="large">
        <div className="flex justify-center mb-4">
          <Badge variant="solid">Timeline</Badge>
        </div>
        <Section.Header
          title="Our Journey"
          description="Key milestones that have shaped our institution"
        />

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-primary-800 transform -translate-y-1/2 rounded-full" />

          <div className="grid grid-cols-4 gap-8 relative">
            {milestones.map((milestone, idx) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className={`flex flex-col ${idx % 2 === 0 ? 'items-center' : 'items-center'}`}
              >
                <Card hover className="w-full text-center relative">
                  <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-600 transition-colors">
                    <milestone.icon className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" />
                  </div>
                  <Badge variant="solid" className="mb-3">{milestone.year}</Badge>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{milestone.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{milestone.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-6">
          {milestones.map((milestone, idx) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 transition-colors">
                  <milestone.icon className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <Badge variant="solid" className="mb-2">{milestone.year}</Badge>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{milestone.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{milestone.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="white" spacing="large">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Join thousands of successful alumni who started their journey with us.
            Apply now and become part of the Best Group of Colleges family.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="gradient"
              size="lg"
              icon={ArrowRight}
              to="/admissions"
            >
              Apply Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              to="/contact"
            >
              Contact Us
            </Button>
          </div>
        </motion.div>
      </Section>
    </div>
  );
};

export default About;
