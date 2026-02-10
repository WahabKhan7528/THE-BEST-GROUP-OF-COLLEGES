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
import Faq from "../components/Faq";
import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";

const Contact = () => {






  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];





  return (
    <div className="min-h-screen bg-white">
      {/* Contact Info Cards */}
      <Section background="white" spacing="large">
        <div className="text-center mb-12 mt-16">
          <h2 className="text-4xl md:text-8xl font-bold text-gray-900 mb-6 leading-tight">
            CONTACT <span className="text-gradient">US</span>
          </h2>
          <p className="text-gray-600">Get in touch with us for any queries about admissions, programs, or general information</p>
        </div>
        <ContactInfo />
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
            <ContactForm />
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
      <Faq />
    </div>
  );
};

export default Contact;
