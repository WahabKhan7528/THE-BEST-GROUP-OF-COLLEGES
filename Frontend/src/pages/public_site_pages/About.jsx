import Section from "../../components/public_site/Section";
import Card from "../../components/public_site/Card";
import Badge from "../../components/public_site/Badge";
import Button from "../../components/shared/Button";
import {
  Star,
  BookOpen,
  Shield,
  Heart,
  Award,
  Lightbulb,
  Building,
  ArrowRight
} from "lucide-react";


import { milestones, values, aboutStats as stats } from "../../data/aboutData";

const About = () => {

  return (
    <div className="min-h-screen bg-white">
      {/* Our Story */}
      <Section background="gray" spacing="large">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            className="text-center md:text-left"
          >
            <Badge variant="solid" className="mb-4">Our Story</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              A Legacy of <span className="text-gradient">Educational Excellence</span>
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              Founded in 1985, Best Group of Colleges has been at the forefront of
              educational excellence in Pakistan for nearly four decades. What started
              as a single institution has grown into a network of three dynamic campuses,
              each dedicated to nurturing the next generation of leaders.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our commitment to academic rigor, student development, and community
              engagement has shaped thousands of successful careers. With programs
              ranging from intermediate studies to postgraduate degrees, we provide
              a comprehensive educational ecosystem that adapts to the evolving needs
              of society.
            </p>
            <div className="flex justify-center md:justify-start">
              <Button
                  icon={ArrowRight}
                  to="/campuses/main"
                >
                  Explore Our Campuses
                </Button>

            </div>
          </div>

          <div
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-100 to-accent-100 rounded-3xl transform rotate-3" />
            <img
              src="/our-story.webp"
              alt="Our Story"
              className="relative rounded-2xl shadow-2xl w-full"
              loading="lazy"
              srcSet="/our-story.webp 800w"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </Section>

      {/* Core Values */}
      <Section background="white" spacing="large">
        <div className="w-full">
          <Section.Header
            title="Our Core Values"
            description="The principles that guide everything we do"
            badge="Values"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => (
            <div
              key={value.title}
            >
              <Card hover className="h-full text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-600 transition-colors">
                  <value.icon className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </Section>

      {/* Journey Timeline */}
      <Section background="gradient" spacing="large">
        <div className="w-full">
          <div className="flex justify-center mb-4">
            <Badge variant="solid">Timeline</Badge>
          </div>
          <Section.Header
            title="Our Journey"
            description="Key milestones that have shaped our institution"
          />
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-primary-800 transform -translate-y-1/2 rounded-full" />

          <div className="grid grid-cols-4 gap-8 relative">
            {milestones.map((milestone, idx) => (
              <div
                key={milestone.year}
                className={`flex flex-col ${idx % 2 === 0 ? 'items-center' : 'items-center'}`}
              >
                <Card hover className="w-full text-center relative">
                  <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-600 transition-colors">
                    <milestone.icon className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" />
                  </div>
                  <Badge variant="solid" className="mb-3">{milestone.year}</Badge>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{milestone.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{milestone.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-6">
          {milestones.map((milestone, idx) => (
            <div
              key={milestone.year}
            >
              <Card hover className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 transition-colors">
                  <milestone.icon className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <Badge variant="solid" className="mb-2">{milestone.year}</Badge>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{milestone.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{milestone.description}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="white" spacing="large">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Join thousands of successful alumni who started their journey with us.
            Apply now and become part of the Best Group of Colleges family.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="gradient"
              size="lg"
              icon={ArrowRight}
              to="/admissions"
            >
              Apply Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              to="/contact"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default About;
