import Hero from "../../components/public_site/Hero";
import Section from "../../components/public_site/Section";
import Card from "../../components/public_site/Card";
import Badge from "../../components/public_site/Badge";
import Button from "../../components/shared/Button";
import Stats from "../../components/public_site/Stats";

import {
  BookOpen,
  Award,
  Users,
  ArrowRight,
  CheckCircle,
  Laptop,
  Library,
  GraduationCap,
} from "lucide-react";

import { programsData } from "../../data/programsData";

import {
  mainCampusStats as stats,
  mainFacilities as facilities,
} from "../../data/campusData";

const MainCampus = () => {
  const programs = programsData.main[0].items;

  return (
    <div className="min-h-screen bg-white">
      <Hero image="/maincampus.webp" centered className="rounded-3xl" />

      {/* Stats Bar */}
      <Section
        background="blue"
        className="-mt-16 relative z-20"
        spacing="default"
      >
        <div className="container mx-auto">
          <Stats items={stats} variant="dark" />
        </div>
      </Section>

      <Section spacing="large">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <Badge className="mb-3 md:mb-4">Our Vision</Badge>
            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
              Shaping the Future of Education
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-5 md:mb-6">
              To be a premier institution that sets the standard for quality
              higher education in the region. We aim to produce competent
              professionals who are not only academically excellent but also
              ethically grounded.
            </p>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start gap-2.5 md:gap-3">
                <div className="mt-1 p-1 rounded-full bg-primary-100 text-primary-600">
                  <CheckCircle size={16} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Excellence in Teaching
                  </h4>
                  <p className="text-sm text-gray-500">
                    Employing modern methodologies.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 rounded-full bg-primary-100 text-primary-600">
                  <CheckCircle size={16} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Research Focus
                  </h4>
                  <p className="text-sm text-gray-500">
                    Encouraging innovation and discovery.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-primary-600/10 rounded-3xl transform rotate-3 opacity-10"></div>
            <Card className="relative border-0 shadow-xl bg-white/50 backdrop-blur-sm rounded-2xl md:rounded-3xl">
              <div className="p-5 md:p-6">
                <Badge
                  variant="soft"
                  className="mb-3 md:mb-4 border-primary-200 text-primary-700 rounded-full"
                >
                  Our Mission
                </Badge>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900">
                  Inspiring Excellence, Nurturing Leaders
                </h3>
                <p className="text-gray-600 text-sm md:text-base mb-5 md:mb-6">
                  Our mission is to cultivate a dynamic learning environment
                  that fosters academic excellence, ethical values, and the
                  leadership skills necessary to shape a better future for our
                  society and the world.{" "}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      <Section className="bg-gray-50" spacing="large">
        <div>
          <Section.Header
            title="Academic Programs"
            description="Explore our diverse range of undergraduate programs designed to launch your career."
            badge="Academics"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {programs.map((program, idx) => (
            <div key={program.title}>
              <Card
                hover
                className="h-full border-t-3 md:border-t-4 border-t-primary-600 rounded-2xl md:rounded-3xl"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <div className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-primary-50 text-primary-600">
                      <program.icon size={20} className="md:w-6 md:h-6" />
                    </div>
                    <Badge
                      variant="soft"
                      className="rounded-full text-xs md:text-sm"
                    >
                      {program.duration}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow">
                    {program.description}
                  </p>

                  <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-2" />
                      {program.seats} Seats Available
                    </div>
                    <Button to={program.path || "/admissions"}>
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Section>

      <Section spacing="large">
        <div>
          <Section.Header
            title="World-Class Facilities"
            description="We provide the best environment for learning and growth."
          />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility, idx) => (
            <div key={facility.title}>
              <Card
                hover
                className="h-full text-center bg-white border border-gray-100 rounded-3xl"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform duration-300">
                    <facility.icon size={28} />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">
                  {facility.title}
                </h3>
                <p className="text-sm text-gray-500">{facility.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </Section>

      <Section className="text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Us?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Take the first step towards a bright future. Applications are open
            for the upcoming session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" icon={ArrowRight} to="/admissions">
              Start Application
            </Button>
            <Button size="lg" variant="outline" to="/contact">
              Contact Admissions
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default MainCampus;
