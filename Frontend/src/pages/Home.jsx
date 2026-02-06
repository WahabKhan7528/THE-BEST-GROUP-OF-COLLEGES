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
  Building,
  Book,
  School,
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
    },
  ];

  const colleges = [
    {
      name: "Main Campus",
      description:
        "Comprehensive higher education offering BS, MA, BA, and specialized programs",
      image: "https://placehold.co/600x400?text=Main+Campus",
      path: "/campuses/main",
    },
    {
      name: "Law Campus",
      description:
        "Premier institution for legal education offering LLB and LLM programs",
      image: "https://placehold.co/600x400?text=Law+Campus",
      path: "/campuses/law",
    },
    {
      name: "Hala Campus",
      description:
        "Excellence in FSc, FA, ICS education and specialized programs",
      image: "https://placehold.co/600x400?text=Hala+Campus",
      path: "/campuses/hala",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "Law Graduate 2024",
      content:
        "The faculty and resources at Best Law College helped me achieve my dream of becoming a lawyer.",
      image: "https://placehold.co/100x100?text=SA",
    },
    {
      name: "Muhammad Ali",
      role: "BS Computer Science Student",
      content:
        "The practical approach to education at the Degree College has prepared me well for my career.",
      image: "https://placehold.co/100x100?text=MA",
    },
    {
      name: "Fatima Khan",
      role: "FSc Pre-Medical",
      content:
        "Outstanding teachers and modern labs make learning engaging and effective.",
      image: "https://placehold.co/100x100?text=FK",
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
    "Expert faculty with industry experience",
    "Modern facilities and laboratories",
    "International accreditation and partnerships",
    "Career counseling and placement support",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Hero
        title="Empowering Futures through Quality Education"
        description="Join Pakistan's leading educational institution for a brighter tomorrow"
        image="https://placehold.co/1920x600?text=Campus+View"
        actions={[
          {
            size: "lg",
            className: "gap-2",
            onClick: () => navigate("/admissions"),
            children: <>Apply Now</>,
          },
          {
            children: "Learn More",
            variant: "outline",
            size: "lg",
            className:
              "border-white text-white hover:bg-white hover:text-primary-700",
          },
        ]}
      />

      <Section
        className="bg-gradient-to-r from-primary-700 to-primary-600"
        spacing="large"
      >
        <div className="text-center text-white">
          <Stats items={stats} variant="dark" />
        </div>
      </Section>

      <Section background="white">
        <Section.Header
          title="Our Mission"
          description="At Best Group of Colleges, we are committed to providing quality education that empowers students to excel in their chosen fields. Through innovative teaching methods, state-of-the-art facilities, and dedicated faculty, we prepare our students for successful careers and meaningful contributions to society."
        />
      </Section>

      <Section background="white">
        <Section.Header
          title="About Us"
          description="Discover what makes Best Group of Colleges a leader in educational excellence"
        />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://placehold.co/500x400?text=About+Us"
              alt="About Us"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-primary-700 mb-4">
              Excellence in Education Since 1985
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
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
            <div className="space-y-3">
              {highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-3 group">
                  <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-700 font-medium">{highlight}</span>
                </div>
              ))}
            </div>
            <Button className="mt-8" onClick={() => navigate("/about")}>
              Learn More About Us
            </Button>
          </div>
        </div>
      </Section>

      <Section spacing="large">
        <div className="space-y-20">
          {collegesData.map((college, index) => (
            <motion.div
              key={college.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden">
                <div
                  className={`flex flex-col lg:flex-row gap-12 ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* College Image */}
                  <div className="w-full lg:w-1/2">
                    <img
                      src={college.image}
                      alt={college.name}
                      className="rounded-lg shadow-lg w-full"
                    />
                  </div>

                  {/* College Information */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <div className="flex items-center gap-3">
                      <college.icon className="h-8 w-8 text-primary-600" />
                      <h2 className="text-3xl font-bold text-gray-900">
                        {college.name}
                      </h2>
                    </div>

                    <p className="text-gray-600 text-lg">
                      {college.description}
                    </p>

                    {/* Programs */}
                    <Card className="bg-gray-50">
                      <Card.Title className="flex items-center gap-2">
                        <Book className="h-5 w-5 text-primary-600" />
                        Programs Offered
                      </Card.Title>
                      <Card.Body>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {college.programs.map((program) => (
                            <li
                              key={program}
                              className="flex items-center text-gray-600"
                            >
                              <span className="h-2 w-2 bg-primary-600 rounded-full mr-2"></span>
                              {program}
                            </li>
                          ))}
                        </ul>
                      </Card.Body>
                    </Card>

                    {/* Features */}
                    <Card className="bg-gray-50">
                      <Card.Title className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-primary-600" />
                        Key Features
                      </Card.Title>
                      <Card.Body>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {college.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center text-gray-600"
                            >
                              <span className="h-2 w-2 bg-primary-600 rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </Card.Body>
                    </Card>

                    {/* Actions */}
                    <div className="flex gap-4">
                      <Button size="lg">View Details</Button>
                      <Button variant="outline" size="lg">
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

      <Section background="white">
        <Section.Header title="Student Testimonials" />
        <Slider>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="min-w-[300px] md:min-w-[350px]"
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </Slider>
      </Section>

      <Section background="gray">
        <Section.Header
          title="Contact Us"
          description="Get in touch with us for admissions, inquiries, or more information"
        />
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center hover">
            <Card.Body>
              <div className="flex justify-center mb-4">
                <div className="bg-primary-100 p-4 rounded-full">
                  <MapPin className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <Card.Title>Address</Card.Title>
              <p className="text-gray-600 text-sm">
                123 Education Street, Islamabad, Pakistan
              </p>
            </Card.Body>
          </Card>

          <Card className="text-center hover">
            <Card.Body>
              <div className="flex justify-center mb-4">
                <div className="bg-primary-100 p-4 rounded-full">
                  <Phone className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <Card.Title>Phone</Card.Title>
              <p className="text-gray-600 text-sm">+92 51 1234 5678</p>
            </Card.Body>
          </Card>

          <Card className="text-center hover">
            <Card.Body>
              <div className="flex justify-center mb-4">
                <div className="bg-primary-100 p-4 rounded-full">
                  <Mail className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <Card.Title>Email</Card.Title>
              <p className="text-gray-600 text-sm">info@bestcolleges.edu.pk</p>
            </Card.Body>
          </Card>
        </div>

        <Card>
          <Card.Body>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h3>
            <form className="grid md:grid-cols-2 gap-6" action="https://formsubmit.co/thebestcollege2008@gmail.com" method="POST">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" name="Full Name">
                  Full Name
                </label>
                <input
                  name="Full Name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" name="Email Address">
                  Email Address
                </label>
                <input
                  name="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2" name="Subject">
                  Subject
                </label>
                <input
                  name="Subject"
                  type="text"
                  placeholder="Inquiry about admissions"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2" name="Message">
                  Message
                </label>
                <textarea
                  name="Message"
                  placeholder="Tell us how we can help you..."
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition resize-none"
                ></textarea>
              </div>
              {/* <input type="hidden" name="_captcha" value="false"></input>
              <input type="hidden" name="_template" value="table"></input> */}
              <Button className="md:col-span-2 w-full" size="lg">
                Send Message
              </Button>
            </form>
          </Card.Body>
        </Card>
      </Section>

      <Section background="white">
        <Section.Header
          title="Frequently Asked Questions"
          description="Find answers to common questions about our colleges and programs"
        />
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="hover">
            <Card.Body>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary-600 mt-1" />
                </div>
                <div>
                  <Card.Title className="text-lg mb-2">
                    What programs are offered?
                  </Card.Title>
                  <p className="text-gray-600 text-sm">
                    We offer 50+ programs ranging from FSc and FA to BA, BS, MA,
                    LLB, and LLM across our three campuses.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="hover">
            <Card.Body>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary-600 mt-1" />
                </div>
                <div>
                  <Card.Title className="text-lg mb-2">
                    How do I apply for admission?
                  </Card.Title>
                  <p className="text-gray-600 text-sm">
                    You can apply online through our admissions portal or visit
                    our campuses directly. Our admission counselors will guide
                    you through the process.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="hover">
            <Card.Body>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary-600 mt-1" />
                </div>
                <div>
                  <Card.Title className="text-lg mb-2">
                    What are the campus facilities?
                  </Card.Title>
                  <p className="text-gray-600 text-sm">
                    All campuses feature modern laboratories, libraries,
                    computer labs, sports facilities, and recreational areas for
                    student development.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="hover">
            <Card.Body>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary-600 mt-1" />
                </div>
                <div>
                  <Card.Title className="text-lg mb-2">
                    Do you offer scholarships?
                  </Card.Title>
                  <p className="text-gray-600 text-sm">
                    Yes, we offer merit-based and need-based scholarships.
                    Contact our financial aid office for more information.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="hover">
            <Card.Body>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary-600 mt-1" />
                </div>
                <div>
                  <Card.Title className="text-lg mb-2">
                    What is the student-to-faculty ratio?
                  </Card.Title>
                  <p className="text-gray-600 text-sm">
                    We maintain a favorable student-to-faculty ratio to ensure
                    personalized attention and quality education for every
                    student.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="hover">
            <Card.Body>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary-600 mt-1" />
                </div>
                <div>
                  <Card.Title className="text-lg mb-2">
                    Are there international partnerships?
                  </Card.Title>
                  <p className="text-gray-600 text-sm">
                    Yes, we have partnerships with international universities
                    for exchange programs, collaborations, and accreditation.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Section>
    </div>
  );
};

export default Home;
