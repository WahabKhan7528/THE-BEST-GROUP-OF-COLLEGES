import { useLocation } from "react-router-dom";
import PublicButton from "../../../components/shared/PublicButton";
import SectionHeader from "../../../components/public_site/SectionHeader";

import { programsData } from "../../../data/programsData";
import ProgramCard from "../../../components/public_site/ProgramCard";
import CampusCta from "../../../components/public_site/CampusCta";

const AcademicsPage = () => {
  const location = useLocation();
  const campus = location.pathname.split("/")[2] || "main";
  const campusData = programsData[campus] || programsData.main;

  // Simple helper to capitalize campus name for the badge
  const campusLabel = campus.charAt(0).toUpperCase() + campus.slice(1) + " Campus";

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Page Header*/}
      <section className="relative overflow-hidden bg-college-navy text-white pt-16 sm:pt-24 pb-12 sm:pb-20 rounded-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge="Academics"
            title={<>Academic <span className="text-college-gold">Programs</span></>}
            description={`Discover our comprehensive range of programs at ${campusLabel}, designed to empower the next generation of leaders and professionals.`}
            variant="dark"
            centered
            className="max-w-4xl mx-auto !mb-0"
          />
        </div>
      </section>

      {campusData.map((category, idx) => (
        <section
          key={category.category}
          className={`relative overflow-hidden ${idx % 2 === 0 ? "bg-white text-college-navy" : "bg-gray-50 text-college-navy"} py-12 md:py-16`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-10 text-center">
              <SectionHeader
                badge={campusLabel}
                title={category.category}
                description={category.description}
                variant="light"
                centered
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {category.items.map((program) => (
                <ProgramCard key={program.title} program={program} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <CampusCta
        title="Start Your"
        highlightedWord="Journey"
        description="Take the first step towards a bright future. Explore our admission requirements and apply today for the upcoming academic session."
        primaryButton={{ text: "Apply Online", to: "/admissions" }}
        secondaryButton={{ text: "Request Information", to: "/contact" }}
      />
    </div>
  );
};

export default AcademicsPage;