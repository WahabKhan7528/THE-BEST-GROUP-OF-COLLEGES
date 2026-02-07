import { useState, useRef } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  ChevronDown,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "../components/ui/Hero";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Education Road", "City, Province", "Pakistan"],
      color: "from-blue-500 to-cyan-500",
      action: "Get Directions",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+92 123 456 7890", "+92 098 765 4321"],
      color: "from-emerald-500 to-green-500",
      action: "Call Now",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@bestcolleges.edu", "admissions@bestcolleges.edu"],
      color: "from-purple-500 to-pink-500",
      action: "Send Email",
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Mon - Fri: 8:00 AM - 4:00 PM", "Saturday: 9:00 AM - 1:00 PM"],
      color: "from-amber-500 to-orange-500",
      action: "Schedule Visit",
    },
  ];

  const faqs = [
    {
      question: "What are the admission requirements?",
      answer: "Admission requirements vary by program. Generally, you need a minimum of 50% marks in your previous qualification, along with the required documents. Visit our Admissions page for detailed program-specific requirements.",
    },
    {
      question: "How can I apply for admission?",
      answer: "You can apply online through our admissions portal or visit our campus for in-person application submission. The online application process is simple and takes about 15-20 minutes to complete.",
    },
    {
      question: "What scholarships are available?",
      answer: "We offer merit-based scholarships, need-based financial aid, and sports scholarships. Top performers in board exams may qualify for up to 100% tuition fee waiver.",
    },
    {
      question: "Is hostel accommodation available?",
      answer: "Yes, we have separate hostel facilities for male and female students at all our campuses. The hostels are fully furnished with all modern amenities.",
    },
    {
      question: "What is the fee structure?",
      answer: "Fee structure varies by program and campus. Please contact our admissions office or visit our Fee Structure page for detailed information about tuition and other charges.",
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      alert("Message sent successfully ✅");
      e.target.reset();
    } catch (error) {
      console.error(error);
      alert("Failed to send message ❌");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <Hero
        title="Contact Us"
        description="Get in touch with us for any queries about admissions, programs, or general information"
        image="https://placehold.co/1920x800?text=Contact+Us"
        centered
      />

      {/* Contact Info Cards */}
      <Section background="white" spacing="large">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, idx) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full group">
                <Card.Body className="p-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mb-5 group-hover:bg-primary-500 transition-colors">
                    <info.icon className="h-6 w-6 text-primary-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{info.title}</h3>
                  <div className="space-y-1.5">
                    {info.details.map((detail) => (
                      <p key={detail} className="text-gray-600 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Contact Form and Map */}
      <Section background="gray" spacing="large">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card shadow="xl">
              <Card.Body className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                    <p className="text-gray-500 text-sm">We'll get back to you within 24 hours</p>
                  </div>
                </div>

                <form
                  ref={formRef}
                  onSubmit={handleContactSubmit}
                  className="space-y-5"
                >
                  <input type="hidden" name="_subject" value="New Contact Form Submission" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                      placeholder="+92 XXX XXXXXXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="admissions">Admissions Inquiry</option>
                      <option value="programs">Program Information</option>
                      <option value="fees">Fee Structure</option>
                      <option value="scholarships">Scholarships</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      name="message"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    variant="gradient"
                    size="lg"
                    className="w-full"
                    icon={Send}
                    iconPosition="right"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>

                </form>
              </Card.Body>
            </Card>
          </motion.div>

          {/* Map & Social */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card shadow="xl">
              <Card.Body className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Our Location</h2>
                    <p className="text-gray-500 text-sm">Find us on the map</p>
                  </div>
                </div>

                <div className="h-[300px] bg-gray-100 rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3461.1234567890123!2d74.12345678901234!3d31.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDA3JzIz4oCdTiA3NMKwMDcnMjPigJ1F!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Our Location"
                  ></iframe>
                </div>
              </Card.Body>
            </Card>

            {/* Social Links */}
            <Card shadow="xl">
              <Card.Body className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Connect With Us</h3>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gradient-to-br hover:from-primary-500 hover:to-accent-500 flex items-center justify-center text-gray-600 hover:text-white transition-all"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section background="white" spacing="large">
        <Section.Header
          title="Frequently Asked Questions"
          description="Find quick answers to common questions about our institution"
          badge="FAQs"
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === idx ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-6 text-gray-600">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Contact;
