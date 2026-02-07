import {
  ArrowRight,
  BookOpen,
  Users,
  Trophy,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Book,
  School,
  Sparkles,
  Send,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Hero from "../components/ui/Hero";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Stats from "../components/ui/Stats";
import TestimonialCard from "../components/ui/TestimonialCard";
import Slider from "../components/ui/Slider";
import Badge from "../components/ui/Badge";

const Home = () => {
  const navigate = useNavigate();

  const collegesData = [
    {
      name: "Law Campus",
      icon: GraduationCap,
      programs: ["Bachelor of Laws (LLB)", "Master of Laws (LLM)"],
      description:
        "Our Law Campus provides comprehensive legal education with a focus on both theoretical knowledge and practical skills. Students benefit from mock courts, legal clinics, and expert faculty.",
      features: [
        "State-of-the-art Law Library",
        "Moot Court Facility",
        "Legal Aid Clinic",
        "Distinguished Faculty",
      ],
      image: "https://placehold.co/800x400?text=Law+Campus",
      path: "/campuses/law",
      color: "from-amber-500 to-orange-600",
    },
    {
      name: "Main Campus",
      icon: BookOpen,
      programs: [
        "Bachelor of Science (BS)",
        "Master of Arts (MA)",
        "Bachelor of Arts (BA)",
      ],
      description:
        "The Main Campus offers a wide range of undergraduate and graduate programs in sciences and arts. Our focus is on providing quality education with modern facilities.",
      features: [
        "Well-equipped Laboratories",
        "Research Facilities",
        "Digital Library",
        "Career Counseling",
      ],
      image: "https://placehold.co/800x400?text=Main+Campus",
      path: "/campuses/main",
      color: "from-primary-500 to-primary-700",
    },
    {
      name: "Hala Campus",
      icon: School,
      programs: [
        "FSc (Pre-Medical)",
        "FSc (Pre-Engineering)",
        "FA (Arts)",
        "ICS (Computer Science)",
      ],
      description:
        "Our Hala Campus prepares students for higher education with strong foundation in sciences and arts. We focus on both academic excellence and personal growth.",
      features: [
        "Modern Science Labs",
        "Computer Labs",
        "Sports Facilities",
        "Experienced Faculty",
      ],
      image: "https://placehold.co/800x400?text=Hala+Campus",
      path: "/campuses/hala",
      color: "from-emerald-500 to-teal-600",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "Law Graduate 2024",
      content:
        "The faculty and resources at Best Law College helped me achieve my dream of becoming a lawyer. The practical training was exceptional.",
      image: "https://placehold.co/100x100?text=SA",
      rating: 5,
    },
    {
      name: "Muhammad Ali",
      role: "BS Computer Science Student",
      content:
        "The practical approach to education at the Degree College has prepared me well for my career. Amazing learning environment!",
      image: "https://placehold.co/100x100?text=MA",
      rating: 5,
    },
    {
      name: "Fatima Khan",
      role: "FSc Pre-Medical",
      content:
        "Outstanding teachers and modern labs make learning engaging and effective. I'm confident about my future in medicine.",
      image: "https://placehold.co/100x100?text=FK",
      rating: 5,
    },
  ];

  const stats = [
    {
      icon: BookOpen,
      value: "50+",
      label: "Programs",
    },
    {
      icon: Users,
      value: "5000+",
      label: "Students",
    },
    {
      icon: Trophy,
      value: "95%",
      label: "Success Rate",
    },
    {
      icon: GraduationCap,
      value: "200+",
      label: "Faculty Members",
    },
  ];

  const highlights = [
    { text: "Expert faculty with industry experience", icon: Users },
    { text: "Modern facilities and laboratories", icon: BookOpen },
    { text: "International accreditation and partnerships", icon: Trophy },
    { text: "Career counseling and placement support", icon: GraduationCap },
  ];

  const faqs = [
    {
      question: "What programs are offered?",
      answer: "We offer 50+ programs ranging from FSc and FA to BA, BS, MA, LLB, and LLM across our three campuses.",
    },
    {
      question: "How do I apply for admission?",
      answer: "You can apply online through our admissions portal or visit our campuses directly. Our admission counselors will guide you through the process.",
    },
    {
      question: "What are the campus facilities?",
      answer: "All campuses feature modern laboratories, libraries, computer labs, sports facilities, and recreational areas for student development.",
    },
    {
      question: "Do you offer scholarships?",
      answer: "Yes, we offer merit-based and need-based scholarships. Contact our financial aid office for more information.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Empowering Futures through Quality Education"
        description="Join Pakistan's leading educational institution with 35+ years of academic excellence. Shape your tomorrow with us."
        image="https://placehold.co/1920x800?text=Campus+View"
        actions={[
          {
            variant: "gradient",
            size: "lg",
            icon: ArrowRight,
            iconPosition: "right",
            onClick: () => navigate("/admissions"),
            children: "Apply Now",
          },
          {
            children: "Explore Campuses",
            variant: "outline",
            size: "lg",
            className: "border-white text-white hover:bg-white hover:text-primary-700",
            onClick: () => navigate("/colleges"),
          },
        ]}
        centered
      />

      {/* Stats Section */}
      <Section
        className="bg-gradient-to-r from-primary-700 via-primary-600 to-accent-600 -mt-12 relative z-20"
        spacing="large"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <Stats items={stats} variant="dark" />
        </motion.div>
      </Section>

      {/* Mission Section */}
      <Section background="gradient" spacing="large">
        <div className="text-center max-w-4xl mx-auto py-12">
          <Section.Header
            title="Our Mission"
            description="At Best Group of Colleges, we are committed to providing quality education that empowers students to excel in their chosen fields. Through innovative teaching methods, state-of-the-art facilities, and dedicated faculty, we prepare our students for successful careers and meaningful contributions to society."
            gradient
            className="mb-0"
          />
        </div>
      </Section>

      {/* About Section */}
      <Section background="white" spacing="large">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-100 to-accent-100 rounded-3xl transform rotate-2" />
            <img
              src="https://placehold.co/600x500?text=About+Us"
              alt="About Us"
              className="relative rounded-2xl shadow-2xl w-full"
            />
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">35+</div>
                <div className="text-sm text-gray-600">Years of Excellence</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="primary" className="mb-4">About Us</Badge>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Excellence in Education Since <span className="text-gradient">1985</span>
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed text-lg">
              Best Group of Colleges has been at the forefront of educational
              excellence for nearly four decades. Our commitment to academic
              rigor, student development, and community engagement has shaped
              thousands of successful careers.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              With three dynamic campuses offering diverse programs from FSc to
              postgraduate studies, we provide a comprehensive educational
              ecosystem that nurtures talent and builds leaders.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <highlight.icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm">{highlight.text}</span>
                </motion.div>
              ))}
            </div>

            <Button
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate("/about")}
            >
              Learn More About Us
            </Button>
          </motion.div>
        </div>
      </Section>

      {/* Campuses Section */}
      <Section background="gray" spacing="large">
        <Section.Header
          title="Our Campuses"
          description="Explore our three dynamic campuses, each offering unique programs and opportunities"
          badge="Explore"
        />

        <div className="space-y-8">
          {collegesData.map((college, index) => (
            <motion.div
              key={college.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="overflow-hidden p-0">
                <div
                  className={`flex flex-col lg:flex-row ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                >
                  {/* College Image */}
                  <div className="w-full lg:w-2/5 relative overflow-hidden">
                    <img
                      src={college.image}
                      alt={college.name}
                      className="w-full h-64 lg:h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${college.color} opacity-20`} />
                  </div>

                  {/* College Information */}
                  <div className="w-full lg:w-3/5 p-6 md:p-8 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${college.color} flex items-center justify-center`}>
                        <college.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {college.name}
                        </h2>
                        <p className="text-sm text-gray-500">{college.programs.length} Programs Available</p>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                      {college.description}
                    </p>

                    {/* Programs & Features Grid */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Book className="h-4 w-4 text-primary-600" />
                          <span className="font-semibold text-gray-900 text-sm">Programs</span>
                        </div>
                        <ul className="space-y-2">
                          {college.programs.map((program) => (
                            <li key={program} className="flex items-center text-gray-600 text-sm">
                              <span className="h-1.5 w-1.5 bg-primary-500 rounded-full mr-2" />
                              {program}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Trophy className="h-4 w-4 text-primary-600" />
                          <span className="font-semibold text-gray-900 text-sm">Features</span>
                        </div>
                        <ul className="space-y-2">
                          {college.features.slice(0, 3).map((feature) => (
                            <li key={feature} className="flex items-center text-gray-600 text-sm">
                              <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Button onClick={() => navigate(college.path)}>
                        View Details
                      </Button>
                      <Button variant="outline" onClick={() => navigate("/admissions")}>
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section background="white" spacing="large">
        <Section.Header
          title="What Our Students Say"
          description="Hear from our students and alumni about their experience"
          badge="Testimonials"
        />
        <Slider>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="min-w-[320px] md:min-w-[380px] p-2"
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </Slider>
      </Section>

      {/* Contact Section */}
      <Section background="gradient" spacing="large">
        <Section.Header
          title="Get in Touch"
          description="Have questions? We'd love to hear from you"
          badge="Contact Us"
        />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {[
            { icon: MapPin, title: "Address", content: "123 Education Street, Islamabad, Pakistan" },
            { icon: Phone, title: "Phone", content: "+92 51 1234 5678" },
            { icon: Mail, title: "Email", content: "info@bestcolleges.edu.pk" },
          ].map((contact, index) => (
            <motion.div
              key={contact.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="text-center h-full">
                <Card.Body>
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                      <contact.icon className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <Card.Title>{contact.title}</Card.Title>
                  <p className="text-gray-600 mt-2">{contact.content}</p>
                </Card.Body>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="max-w-3xl mx-auto" shadow="xl">
            <Card.Body className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Send us a Message
              </h3>
              <form
                className="grid md:grid-cols-2 gap-6"
                action="https://formsubmit.co/thebestcollege2008@gmail.com"
                method="POST"
              >
                <div>
                  <label htmlFor="home-name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    id="home-name"
                    name="Full Name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="home-email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="home-email"
                    name="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="home-subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    id="home-subject"
                    name="Subject"
                    type="text"
                    placeholder="Inquiry about admissions"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="home-message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="home-message"
                    name="Message"
                    placeholder="Tell us how we can help you..."
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none bg-gray-50 hover:bg-white"
                  />
                </div>
                <Button
                  className="md:col-span-2 w-full"
                  size="lg"
                  icon={Send}
                  iconPosition="right"
                >
                  Send Message
                </Button>
              </form>
            </Card.Body>
          </Card>
        </motion.div>
      </Section>

      {/* FAQ Section */}
      <Section background="white" spacing="large">
        <Section.Header
          title="Frequently Asked Questions"
          description="Find answers to common questions about our colleges and programs"
          badge="FAQ"
        />
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="h-full">
                <Card.Body>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-primary-600" />
                      </div>
                    </div>
                    <div>
                      <Card.Title className="text-lg mb-2">
                        {faq.question}
                      </Card.Title>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Home;
