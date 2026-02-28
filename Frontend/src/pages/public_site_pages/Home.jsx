import { useRef } from "react";

import {
  ArrowRight,
  BookOpen,
  Users,
  Trophy,
  GraduationCap,
  CheckCircle,
  Book,
  School,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Hero from "../../components/public_site/Hero";
import Section from "../../components/public_site/Section";
import Card from "../../components/public_site/Card";
import Button from "../../components/shared/Button";
import Stats from "../../components/public_site/Stats";
import TestimonialCard from "../../components/public_site/TestimonialCard";
import Badge from "../../components/public_site/Badge";
import Faq from "../../components/public_site/Faq";
import ContactForm from "../../components/public_site/ContactForm";
import ContactInfo from "../../components/public_site/ContactInfo";

import {
  collegesData,
  testimonials,
  homeStats as stats,
  highlights,
  announcements,
} from "../../data/homeData";

const Home = () => {
  const containerRef = useRef(null);

  const scrollLeft = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <Hero
        title="THE BEST GROUP OF COLLEGES"
        image="/maincampus.webp"
        announcements={announcements}
        className="mb-12 px-8"
      />

      {/* Stats Section */}

      <Section
        background="blue"
        className="-mt-12 relative z-20 border-y border-primary-800"
        spacing="large"
      >
        <div className="text-center text-white">
          <Stats items={stats} variant="dark" />
        </div>
      </Section>

      {/* About Section */}
      <Section background="white" spacing="large">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary-100/50 rounded-3xl transform rotate-2" />
            <img
              src="/aboutUs.webp"
              alt="About Us"
              className="relative rounded-2xl shadow-lg border border-border w-full object-cover aspect-square"
              loading="lazy"
              srcSet="/aboutUs.webp 800w"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Floating Badge */}
            <div className="absolute -bottom-4 right-0 sm:-bottom-6 sm:-right-6 bg-white p-3 sm:p-4 rounded-xl shadow-lg border border-border">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary-700">
                  18+
                </div>
                <div className="text-xs sm:text-sm text-text-secondary">
                  <span className="sm:hidden">Years</span>
                  <span className="hidden sm:inline">Years of Excellence</span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 md:px-0">
            <Badge variant="solid" className="mb-4">
              About Us
            </Badge>
            <h3 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6 leading-tight">
              Excellence in Education Since{" "}
              <span className="text-primary-600">1985</span>
            </h3>
            <div>
              <p className="text-text-secondary mb-4 leading-relaxed text-lg">
                Best Group of Colleges has been at the forefront of educational
                excellence for nearly four decades. Our commitment to academic
                rigor, student development, and community engagement has shaped
                thousands of successful careers.
              </p>
              <p className="text-text-secondary mb-8 leading-relaxed">
                With three dynamic campuses offering diverse programs from FSc
                to postgraduate studies, we provide a comprehensive educational
                ecosystem that nurtures talent and builds leaders.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {highlights.map((highlight, index) => (
                <div
                  key={highlight.text}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors group border border-transparent hover:border-primary-100"
                >
                  <span className="text-text-primary font-medium text-sm">
                    {highlight.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-center md:justify-start">
              <Button icon={ArrowRight} to="/about" variant="primary">
                Learn More About Us
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Campuses Section */}
      <Section background="gray" spacing="large">
        <div className="w-full">
          <Section.Header
            title="Our Campuses"
            description="Explore our three dynamic campuses, each offering unique programs and opportunities"
            badge="Explore"
          />
        </div>

        <div className="space-y-8">
          {collegesData.map((college, index) => (
            <div key={college.name}>
              <Card hover className="overflow-hidden p-0 border border-border">
                <div
                  className={`flex flex-col lg:flex-row ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* College Image */}
                  <div className="w-full lg:w-2/5 relative overflow-hidden h-64 lg:h-auto">
                    <img
                      src={college.image}
                      alt={college.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-primary-900/10" />
                  </div>

                  {/* College Information */}
                  <div className="w-full lg:w-3/5 p-6 md:p-8 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center border border-primary-100">
                        <college.icon className="h-6 w-6 text-primary-700" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-primary-900">
                          {college.name}
                        </h2>
                        <p className="text-sm text-text-secondary">
                          {college.programs.length} Programs Available
                        </p>
                      </div>
                    </div>

                    <p className="text-text-secondary leading-relaxed">
                      {college.description}
                    </p>

                    {/* Programs & Features Grid */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-xl p-4 border border-border">
                        <div className="flex items-center gap-2 mb-3">
                          <Book className="h-4 w-4 text-primary-600" />
                          <span className="font-semibold text-primary-800 text-sm">
                            Programs
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {college.programs.map((program) => (
                            <li
                              key={program}
                              className="flex items-center text-text-secondary text-sm"
                            >
                              <span className="h-1.5 w-1.5 bg-primary-500 rounded-full mr-2" />
                              {program}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4 border border-border">
                        <div className="flex items-center gap-2 mb-3">
                          <Trophy className="h-4 w-4 text-primary-600" />
                          <span className="font-semibold text-primary-800 text-sm">
                            Features
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {college.features.slice(0, 3).map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center text-text-secondary text-sm"
                            >
                              <CheckCircle className="h-3.5 w-3.5 text-primary-600 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Button to={college.path}>View Details</Button>
                      <Button variant="outline" to="/admissions">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
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

        <div className="relative">
          {/* Controls */}
          <div className="flex justify-end gap-3 mb-6 pr-4 relative z-10">
            <button
              onClick={scrollLeft}
              className="p-3 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:text-primary-600 transition-colors shadow-sm focus:outline-none"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="p-3 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:text-primary-600 transition-colors shadow-sm focus:outline-none"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div ref={containerRef} className="overflow-x-auto no-scrollbar">
            <div className="flex gap-6 pb-4 w-max">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-[300px] md:w-[400px] shrink-0">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section background="gray" spacing="large">
        <Section.Header
          title="Get in Touch"
          description="Have questions? We'd love to hear from you"
          badge="Contact Us"
        />

        <ContactInfo />

        <div className="mt-16">
          <ContactForm />
        </div>
      </Section>

      {/* FAQ Section */}
      <Faq limit={4} />
    </div>
  );
};

export default Home;
