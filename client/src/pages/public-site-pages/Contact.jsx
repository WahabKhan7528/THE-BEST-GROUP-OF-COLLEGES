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

import Section from "../../components/public-site/Section";
import SectionHeader from "../../components/public-site/SectionHeader";
import Card from "../../components/shared/Card";
import ContactForm from "../../components/public-site/ContactForm";
import FAQ from "../../components/public-site/FAQ";

const Contact = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const campuses = [
        {
      name: "Main Campus",
      description: "Home to our engineering and research labs.",
      image:
        "maincampus.webp",
      link: "/campuses/main",
    },
    {
      name: "Law Campus",
      description: "specializes in legal studies and criminology.",
      image:
        "/Law.webp",
      link: "/campuses/law",
    },
    {
      name: "Hala Campus",
      description: "Focused on intermediate and commerce programs.",
      image: "/campus-hala.webp",
      link: "/campuses/hala",
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
              <Card variant="navy" hover className="group p-8 flex flex-col items-center text-center relative overflow-hidden border border-white/5">
                {/* Decorative Background Glows */}
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-college-gold/20 rounded-full blur-3xl group-hover:bg-college-gold/30 transition-all duration-700"></div>
                <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
                
                {/* Icon Container */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-college-gold group-hover:scale-110 group-hover:bg-college-gold group-hover:text-college-navy transition-all duration-500 shadow-lg">
                  <Phone className="w-7 h-7" />
                </div>
                
                {/* Content */}
                <h3 className="relative z-10 font-serif font-bold text-xl mb-2 text-white group-hover:text-college-gold transition-colors duration-300">Phone</h3>
                <p className="relative z-10 text-sm text-white/70 mb-5 flex-grow">Mon-Fri from 8am to 5pm</p>
                
                {/* Action Link */}
                <a className="relative z-10 inline-flex items-center justify-center w-full text-college-gold font-semibold hover:text-white transition-colors duration-300 group/link" href="tel:+13032254880">
                  <span className="break-words"> (303) 225-4880 </span>
                  <ArrowRight className="w-4 h-4 ml-1 flex-shrink-0 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
                </a>
              </Card>

              <Card variant="navy" hover className="group p-8 flex flex-col items-center text-center relative overflow-hidden border border-white/5">
                {/* Decorative Background Glows */}
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-college-gold/20 rounded-full blur-3xl group-hover:bg-college-gold/30 transition-all duration-700"></div>
                <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>

                {/* Icon Container */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-college-gold group-hover:scale-110 group-hover:bg-college-gold group-hover:text-college-navy transition-all duration-500 shadow-lg">
                  <Mail className="w-7 h-7" />
                </div>
                
                {/* Content */}
                <h3 className="relative z-10 font-serif font-bold text-xl mb-2 text-white group-hover:text-college-gold transition-colors duration-300">Email</h3>
                <p className="relative z-10 text-sm text-white/70 mb-5 flex-grow">Our friendly team is here to help.</p>
                
                {/* Action Link */}
                <a className="relative z-10 inline-flex items-center justify-center w-full text-college-gold font-semibold hover:text-white transition-colors duration-300 group/link" href="mailto:thebestcollege2008@gmail.com">
                  <span className="break-all line-clamp-1 group-hover/link:line-clamp-none transition-all duration-300">thebestcollege2008@gmail.com</span>
                  <ArrowRight className="w-4 h-4 ml-1 flex-shrink-0 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
                </a>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d630.3431626060637!2d71.65714818430672!3d29.384731780443882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b973046059161%3A0x669fb3aa9d937d83!2sYounus%20Shaheed%20Rd%2C%20Bahawalpur%2C%20Pakistan!5e1!3m2!1sen!2s!4v1773946823517!5m2!1sen!2s"
                className="absolute inset-0 w-full h-full transition-all duration-500"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location"
              />
              <div className="absolute bottom-6 right-6 max-w-[280px] bg-college-navy p-5 rounded-xl shadow-2xl border-l-4 border-college-gold z-10">
                <h4 className="font-serif font-bold text-white">Main Administration Office</h4>
                <p className="text-sm text-white/70 mt-1">Younus Shaheed Rd, Bahawalpur, Pakistan</p>
              </div>
            </div>

            {/* Our Campuses */}
            <div>
              <h3 className="text-xl font-serif font-bold mb-4 text-college-navy border-b border-gray-200 pb-2">Our Campuses</h3>
              <div className="space-y-4">
                {campuses.map((campus) => (
                  <Card key={campus.name} variant="navy" hover className="p-4">
                    <div className="flex items-start space-x-4">
                      <img alt={campus.name} className="w-20 h-20 object-cover rounded-sm flex-shrink-0" src={campus.image} />
                      <div>
                        <h4 className="font-bold text-white">{campus.name}</h4>
                        <p className="text-sm text-white/70 mt-1">{campus.description}</p>
                        <Link className="text-college-gold text-sm font-medium mt-2 inline-flex items-center hover:underline" to={campus.link}>
                          Online Visit<ArrowRight className="w-4 h-4 ml-1" />
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

