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
import Faq from "../components/Faq";
import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";

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

  const announcements = [
    {
      id: 1,
      title: "Admissions Open for Spring 2024",
      date: "February 10, 2024",
      description: "Applications are now being accepted for the Spring 2024 semester across all our campuses. Early bird discount available until March 1st."
    },
    {
      id: 2,
      title: "Annual Sports Gala",
      date: "February 8, 2024",
      description: "Join us for our annual inter-campus sports competition featuring cricket, football, and athletics. Registration deadline: February 20th."
    },
    {
      id: 3,
      title: "Career Fair 2024",
      date: "February 5, 2024",
      description: "Top companies will be visiting our Main Campus for recruitment. Prepare your CVs and register through the student portal by February 15th."
    },
    {
      id: 4,
      title: "Scholarship Program Announced",
      date: "February 3, 2024",
      description: "Merit-based scholarships covering up to 100% tuition fee are now available. Apply through our online portal before February 28th."
    },
    {
      id: 5,
      title: "Science Exhibition 2024",
      date: "February 1, 2024",
      description: "Students from all campuses are invited to showcase their innovative projects. Prize money worth Rs. 500,000 for top 3 winners."
    },
    {
      id: 6,
      title: "Mid-Term Exams Schedule Released",
      date: "January 28, 2024",
      description: "Mid-term examinations will commence from March 10th, 2024. Students can download date sheets from the student portal."
    },
    {
      id: 7,
      title: "Guest Lecture Series",
      date: "January 25, 2024",
      description: "Distinguished professionals from various industries will be delivering guest lectures every Friday. Check the events calendar for details."
    },
  ];



  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero
        title="THE BEST GROUP OF COLLEGES"
        image="/landing-img.png"
        announcements={announcements}
        className="mb-12 pl-8 pr-8 "
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

        <ContactInfo />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <ContactForm />
        </motion.div>
      </Section>

      {/* FAQ Section */}
      <Faq limit={4} />

    </div>
  );
};

export default Home;
