import Hero from "../components/ui/Hero";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import {
  Star,
  BookOpen,
  Shield,
  Users,
  Target,
  Heart,
  Award,
  Lightbulb,
  GraduationCap,
  Building,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

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
      {/* Hero Section */}
      <Hero
        title="About Best Group of Colleges"
        description="Dedicated to providing quality education and shaping future leaders since 1985"
        image="https://placehold.co/1920x800?text=About+TBC"
        centered
      />

      {/* Stats Bar */}
      <Section
        className="bg-gradient-to-r from-primary-700 via-primary-600 to-accent-600 -mt-16 relative z-20"
        spacing="default"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Vision & Mission */}
      <Section background="white" spacing="large">
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card hover className="h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-transparent rounded-bl-full opacity-50" />
              <Card.Body className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To be the leading educational institution in Pakistan,
                  recognized for academic excellence, innovation, and the success
                  of our graduates in their chosen fields. We aim to create a
                  learning environment that inspires creativity, critical thinking,
                  and lifelong learning.
                </p>
              </Card.Body>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card hover className="h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-100 to-transparent rounded-bl-full opacity-50" />
              <Card.Body className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mb-6">
                  <GraduationCap className="w-7 h-7 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To provide quality education that empowers students with
                  knowledge, skills, and values necessary for professional success
                  and personal growth while contributing positively to society.
                  We are committed to nurturing talent through innovative teaching
                  and state-of-the-art facilities.
                </p>
              </Card.Body>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Our Story */}
      <Section background="gray" spacing="large">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="primary" className="mb-4">Our Story</Badge>
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
            <Button
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate("/campuses/main")}
            >
              Explore Our Campuses
            </Button>
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
              src="https://placehold.co/600x500?text=Our+Story"
              alt="Our Story"
              className="relative rounded-2xl shadow-2xl w-full"
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
                <Card.Body>
                  <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-600 transition-colors">
                    <value.icon className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </Card.Body>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Journey Timeline */}
      <Section background="gradient" spacing="large">
        <Section.Header
          title="Our Journey"
          description="Key milestones that have shaped our institution"
          badge="Timeline"
        />

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-primary-400 to-accent-400 transform -translate-y-1/2 rounded-full" />

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
                  <Card.Body>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <milestone.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="primary" solid className="mb-3">{milestone.year}</Badge>
                    <h3 className="text-lg font-bold mb-2 text-gray-900">{milestone.title}</h3>
                    <p className="text-gray-600 text-sm">{milestone.description}</p>
                  </Card.Body>
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
              <Card hover>
                <Card.Body className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <milestone.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <Badge variant="primary" solid className="mb-2">{milestone.year}</Badge>
                    <h3 className="text-lg font-bold mb-1 text-gray-900">{milestone.title}</h3>
                    <p className="text-gray-600 text-sm">{milestone.description}</p>
                  </div>
                </Card.Body>
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
              iconPosition="right"
              onClick={() => navigate("/admissions")}
            >
              Apply Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/contact")}
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
