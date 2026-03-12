import { Link } from "react-router-dom";
import { ArrowRight, Bell } from "lucide-react";
import PublicButton from "../../components/shared/PublicButton";
import StatsGrid from "../../components/public_site/StatsGrid";
import Section from "../../components/public_site/Section";
import SectionHeader from "../../components/public_site/SectionHeader";
import Badge from "../../components/shared/Badge";
import CampusCard from "../../components/public_site/CampusCard";
import TestimonialSlider from "../../components/public_site/TestimonialSlider";
import ContactForm from "../../components/public_site/ContactForm";
import FAQ from "../../components/public_site/FAQ";

import {
  collegesData,
  testimonials,
  homeStats as stats,
  announcements,
} from "../../data/homeData";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/maincampus.webp"
            alt="THE BEST GROUP OF COLLEGES"
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchpriority="high"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-college-navy/70" />

        <div className="container mx-auto px-6 py-20 relative z-10 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">
            <div className="lg:col-span-7 flex flex-col justify-center space-y-4 md:space-y-6 text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white uppercase leading-tight tracking-wider">
                THE BEST GROUP OF COLLEGES
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-white/90 font-sans max-w-2xl">
                Empowering Futures Through Quality Education Since 1985.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <PublicButton
                  to="/admissions"
                  variant="secondary"
                  size="none"
                  className="px-8 py-3.5 text-base font-bold uppercase tracking-wider shadow-lg rounded-sm"
                  shape="slanted"
                >
                  Apply Now
                </PublicButton>
                <PublicButton
                  to="/about"
                  variant="primary"
                  size="none"
                  className="px-8 py-3.5 text-base font-bold uppercase tracking-wider text-white rounded-sm"
                  shape="slanted"
                >
                  Explore Campuses
                </PublicButton>
              </div>
            </div>

            {announcements?.length > 0 && (
              <div className="lg:col-span-5 h-full flex flex-col justify-center lg:items-end w-full">
                <div className="w-full lg:max-w-lg xl:max-w-xl bg-college-navy shadow-2xl border border-college-gold/30 p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-college-gold flex items-center justify-center">
                      <Bell className="w-5 h-5 text-college-navy" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-white">News & Updates</h2>
                  </div>
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                    {announcements.map((announcement, index) => (
                      <div key={announcement.id || index} className="group border-b border-white/20 pb-4 last:border-0 last:pb-0">
                        <h3 className="text-lg font-bold text-college-gold mb-1 transition-colors">{announcement.title}</h3>
                        <p className="text-xs text-white/70 mb-2 uppercase tracking-wider">{announcement.date}</p>
                        <p className="text-white/90 text-sm leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">{announcement.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 border-b border-gray-200">
        <StatsGrid stats={stats} />
      </section>

      {/* About Section */}
      <Section variant="navy">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-3 md:gap-4 relative">
            <img src="/campus-hala.webp" alt="Campus Life" className="rounded-2xl shadow-md w-full h-36 sm:h-48 md:h-64 object-cover transform translate-y-6 md:translate-y-8" loading="lazy" />
            <img src="/maincampus.webp" alt="Main Campus" className="rounded-2xl shadow-md w-full h-36 sm:h-48 md:h-64 object-cover" loading="lazy" />
            <img src="/Law.webp" alt="Law Campus" className="rounded-2xl shadow-md w-full h-36 sm:h-48 md:h-64 object-cover transform translate-y-6 md:translate-y-8" loading="lazy" />
            <div className="rounded-2xl shadow-md w-full h-36 sm:h-48 md:h-64 bg-college-gold flex items-center justify-center p-4 md:p-6 text-center">
              <h4 className="text-college-navy font-serif font-bold text-base sm:text-xl md:text-2xl leading-tight">
                Empowering Leaders Since <span className="text-white">1985</span>
              </h4>
            </div>
          </div>

          <div className="px-0 md:px-0 lg:pl-8">
            <div className="mb-4">
              <Badge variant="gold">About Us</Badge>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight">
              Excellence Since <span className="text-college-gold">1985</span>
            </h3>
            <p className="text-white/80 mb-4 md:mb-6 leading-relaxed text-base md:text-lg">
              Best Group of Colleges has been at the forefront of educational
              excellence for nearly four decades. Our commitment to academic
              rigor, student development, and community engagement has shaped
              thousands of successful careers.
            </p>
            <h4 className="text-2xl font-serif font-bold text-white mb-4">Dynamic Programs</h4>
            <p className="text-white/80 mb-8 leading-relaxed">
              With three dynamic campuses offering diverse programs from FSc
              to postgraduate studies, we provide a comprehensive educational
              ecosystem that nurtures talent.
            </p>
            <div className="flex justify-center md:justify-start">
              <PublicButton icon={ArrowRight} to="/about" variant="secondary" size="lg" shape="slanted">
                Learn More About Us
              </PublicButton>
            </div>
          </div>
        </div>
      </Section>

      {/* Campuses Section */}
      <Section variant="gray">
        <SectionHeader
          badge="Explore"
          title="Our Campuses"
          variant="light"
          centered
        />
        <div className="grid md:grid-cols-3 gap-8">
          {collegesData.map((college) => (
            <CampusCard key={college.name} college={college} />
          ))}
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section variant="navy">
        <SectionHeader
          badge="Testimonials"
          title="What Our Students Say"
          variant="dark"
          centered
        />
        <TestimonialSlider testimonials={testimonials} />
      </Section>

      {/* Contact & FAQ Section */}
      <Section variant="white">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Contact Form */}
          <div>
            <SectionHeader
              badge="Contact"
              title="Get in Touch"
              variant="light"
              centered={false}
            />
            <ContactForm />
          </div>

          {/* Right: FAQ */}
          <FAQ limit={9} />
        </div>
      </Section>
    </div>
  );
};

export default Home;
