import PublicButton from "../../components/shared/PublicButton";
import { ArrowRight, Phone } from "lucide-react";
import Section from "../../components/public_site/Section";
import SectionHeader from "../../components/public_site/SectionHeader";
import Badge from "../../components/public_site/Badge";
import Card from "../../components/public_site/Card";
import CTASection from "../../components/public_site/CTASection";

import { milestones, values, leadership } from "../../data/aboutData";

const About = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Our Story */}
      <Section variant="white">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center md:text-left lg:pr-8">
            <div className="mb-4">
              <Badge variant="outline">Our Story</Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-college-navy mb-4 md:mb-6 leading-tight">
              A Legacy of <span className="text-college-gold">Excellence</span>
            </h2>
            <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-base md:text-lg">
              Founded in 1985, Best Group of Colleges has been at the forefront
              of educational excellence in Pakistan for nearly four decades.
              What started as a single institution has grown into a network of
              three dynamic campuses, each dedicated to nurturing the next
              generation of leaders.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our commitment to academic rigor, student development, and
              community engagement has shaped thousands of successful careers.
              With programs ranging from intermediate studies to postgraduate
              degrees, we provide a comprehensive educational ecosystem that
              adapts to the evolving needs of society.
            </p>
            <div className="flex justify-center md:justify-start">
              <PublicButton
                icon={ArrowRight}
                to="/campuses/main"
                variant="primary"
                size="md"
                className="font-bold px-8 py-3 rounded uppercase tracking-wider"
                shape="slanted"
              >
                Explore Our Campuses
              </PublicButton>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-college-navy/5 rounded-3xl transform rotate-3" />
            <img
              src="/aboutUs.webp"
              alt="Our Story"
              className="relative rounded-2xl shadow-xl border border-gray-100 w-full object-cover aspect-[4/3]"
              loading="lazy"
            />
          </div>
        </div>
      </Section>

      {/* Journey Timeline */}
      <Section variant="navy">
        <SectionHeader
          badge="Timeline"
          title="Our Journey"
          variant="dark"
          centered
          className="mb-16"
        />

        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-college-gold/30" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
            {milestones.map((milestone) => (
              <div key={milestone.year} className="flex flex-col items-center text-center group relative">
                <div className="relative z-10 mb-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-college-navy border-4 border-college-gold flex items-center justify-center mx-auto group-hover:bg-college-gold transition-all duration-300 cursor-default shadow-[0_0_20px_rgba(197,160,89,0.4)] group-hover:shadow-[0_0_30px_rgba(197,160,89,0.6)]">
                    <milestone.icon className="w-8 h-8 md:w-10 md:h-10 text-college-gold group-hover:text-college-navy transition-colors" />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-college-gold text-college-navy font-bold text-sm md:text-base px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                      {milestone.year}
                    </span>
                  </div>
                </div>
                <div className="pt-4">
                  <h3 className="text-lg md:text-xl font-serif font-bold mb-3 text-white group-hover:text-college-gold transition-colors">
                    {milestone.title}
                  </h3>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed px-2">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Leadership Section */}
      <Section variant="white">
        <SectionHeader
          badge="Leadership"
          title="Meet Our Leadership"
          description="Experienced leaders dedicated to academic excellence"
          variant="light"
          centered
        />

        <div className="max-w-6xl mx-auto space-y-8">
          {leadership.map((leader) => (
            <Card
              key={leader.name}
              hover
              className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0 border-4 border-college-gold/20">
                <img src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-2xl font-serif font-bold text-college-navy mb-1">{leader.name}</h3>
                <p className="text-college-gold font-bold text-sm uppercase tracking-wider mb-4">{leader.role}</p>
                <p className="text-gray-600 leading-relaxed">{leader.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <CTASection
        badge="Join Our Community"
        title="Ready to Start Your"
        highlightedWord="Journey?"
        description="Join thousands of successful students and shape your future with our world-class faculty and dynamic programs."
      >
        <PublicButton
          to="/admissions"
          variant="secondary"
          size="md"
          icon={ArrowRight}
          className="rounded-full shadow-lg"
          shape="slanted"
        >
          Apply Online Now
        </PublicButton>
        <PublicButton
          to="/contact"
          variant="primary"
          size="md"
          icon={Phone}
          className="border-2 border-white/10"
          shape="slanted"
        >
          Contact Admissions
        </PublicButton>
      </CTASection>
    </div>
  );
};

export default About;
