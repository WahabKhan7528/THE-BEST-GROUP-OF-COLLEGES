import { useState, useRef } from "react";
import {
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";

import Section from "../../components/public_site/Section";
import Card from "../../components/public_site/Card";
import Faq from "../../components/public_site/Faq";
import ContactForm from "../../components/public_site/ContactForm";
import ContactInfo from "../../components/public_site/ContactInfo";

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
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-8xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            CONTACT <span className="text-gradient">US</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base">Get in touch with us for any queries about admissions, programs, or general information</p>
        </div>
        <ContactInfo />
      </Section>

      {/* Contact Form and Map */}
      <Section background="gray" spacing="large">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <div
          >
            <ContactForm />
          </div>

          {/* Map & Social */}
          <div
            className="space-y-6"
          >
            <Card shadow="xl" className="p-5 md:p-8">
              <div className="flex items-center gap-2.5 md:gap-3 mb-5 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Our Location</h2>
                  <p className="text-gray-500 text-sm">Find us on the map</p>
                </div>
              </div>

              <div className="h-[250px] md:h-[300px] bg-gray-100 rounded-xl overflow-hidden">
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
            </Card>

            {/* Social Links */}
            <Card shadow="xl" className="p-5 md:p-6">
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">Connect With Us</h3>
              <div className="flex items-center gap-2.5 md:gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-600 hover:text-white transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Faq limit={6} />
    </div>
  );
};

export default Contact;
