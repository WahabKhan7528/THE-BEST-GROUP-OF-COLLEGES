import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import PublicButton from "../../components/shared/PublicButton";
import Section from "../../components/public_site/Section";
import SectionHeader from "../../components/public_site/SectionHeader";
import Card from "../../components/public_site/Card";
import ContactForm from "../../components/public_site/ContactForm";
import FAQ from "../../components/public_site/FAQ";

const Contact = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const campuses = [
    {
      name: "Law Campus",
      description: "specializes in legal studies and criminology.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAbyeQPgadU1R9RYQEF6JE59OxOtO6zkp7gx8LXLpCoizummXxVg1bDcUjKmoYClvnEzCOs-OPfX8MIj2gMUQ5CH57J6YVv-6HaBvtohJ1yUeAAPSOCDZW1BXM13gWwLfEZtYu5AJbBSAtWndj6Oyfe8npuc6iLCAKGlJMgtrKEOppk9Y2chdmaSyRyzzMl3Z_zbfOdawWAvBeZEgWctEoniNLxut34ewiYTL3vNduzFyqOo50pkQsQDH58A9KTd4Lh3mQ6rxouMaay",
      link: "/campuses/law",
    },
    {
      name: "Main Science Campus",
      description: "Home to our engineering and research labs.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBb3B2RT-CyOJJozZUvyeu2HK_-sIfCGyMlP0gsiJfxQ4OIyRfMsznNTd2Fo5ltiGoNWHGYuc814EnBBHel-9B_AvfHGj1fPZZDGJIb4Wx3XdAZsUwpoMIbF2V1pm1fTS46QK1lS2zcWqsyfURoLjIz3WgDV9jg14gbLZWsU77aRsE7bQ1nplBdg85jJqrMGgxxYm7n_vXJg66IzxDvEra07iD4bmJemDfpxDv5OPoJHn-yvERecPWIyksAAD2N2qY7Ov79CtywgYAu",
      link: "/campuses/main",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Main Content */}
      <Section variant="gray">
        <SectionHeader
          badge="Get in Touch"
          title="Contact Us"
          description="Have questions? We'd love to hear from you. Reach out to us and we'll respond as soon as we can."
          variant="light"
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="space-y-12">
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="navy" hover className="p-6 md:p-8 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg mb-2 text-white">Phone</h3>
                <p className="text-sm text-white/70 mb-2">Mon-Fri from 8am to 5pm</p>
                <a className="text-college-gold font-medium hover:underline" href="tel:+13032254880">(303) 225-4880</a>
              </Card>

              <Card variant="navy" hover className="p-6 md:p-8 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg mb-2 text-white">Email</h3>
                <p className="text-sm text-white/70 mb-2">Our friendly team is here to help.</p>
                <a className="text-college-gold font-medium hover:underline" href="mailto:admissions@reefcollege.edu">admissions@reefcollege.edu</a>
              </Card>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>

          {/* Right Column */}
          <div className="space-y-8 flex flex-col h-full">
            {/* Map */}
            <div className="flex-grow min-h-[400px] bg-gray-200 rounded-lg overflow-hidden shadow-lg border border-gray-200 relative group">
              <iframe
                allowFullScreen=""
                className="absolute inset-0 w-full h-full transition-all duration-500"
                style={{ border: 0, filter: "grayscale(20%) contrast(1.2) opacity(0.9)" }}
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1839485764047!2d-73.98773192348575!3d40.75797873479743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1715638423491!5m2!1sen!2sus"
                width="100%"
                title="Our Location"
              />
              <div className="absolute bottom-6 right-6 max-w-[280px] bg-college-navy p-5 rounded-xl shadow-2xl border-l-4 border-college-gold z-10">
                <h4 className="font-serif font-bold text-white">Main Administration Office</h4>
                <p className="text-sm text-white/70 mt-1">123 Academic Avenue, Knowledge City, ST 90210</p>
              </div>
            </div>

            {/* Our Campuses */}
            <div>
              <h3 className="text-xl font-serif font-bold mb-4 text-college-navy border-b border-gray-200 pb-2">Our Campuses</h3>
              <div className="space-y-4">
                {campuses.map((campus) => (
                  <Card key={campus.name} variant="navy" hover className="p-4">
                    <div className="flex items-start space-x-4">
                      <img alt={campus.name} className="w-20 h-20 object-cover rounded-md flex-shrink-0" src={campus.image} />
                      <div>
                        <h4 className="font-bold text-white">{campus.name}</h4>
                        <p className="text-sm text-white/70 mt-1">{campus.description}</p>
                        <Link className="text-college-gold text-sm font-medium mt-2 inline-flex items-center hover:underline" to={campus.link}>
                          Get Directions <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Card variant="navy" hover={false} className="p-6 md:p-8 text-center shadow-md">
              <h3 className="font-serif font-bold text-white text-lg mb-4">Connect on Social Media</h3>
              <div className="flex justify-center space-x-6">
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.href} className="text-white/80 hover:text-college-gold transition-colors transform hover:scale-110" aria-label={social.label}>
                    <social.icon className="w-6 h-6 text-white/70 hover:text-college-gold" />
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <section className="bg-gray-100 py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQ
            limit={4}
            centered={true}
            description="Have questions? We'd love to hear from you. Reach out to us and we'll respond as soon as we can."
          />
        </div>
      </section>
    </div>
  );
};

export default Contact;
