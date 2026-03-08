import { Mail, ArrowRight } from "lucide-react";
import PublicButton from "../../components/shared/PublicButton";
import PageHero from "../../components/public_site/PageHero";
import FacultyGrid from "../../components/public_site/FacultyGrid";
import CTASection from "../../components/public_site/CTASection";

const Faculty = ({ filterCampus }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <PageHero
        badge="Faculty"
        title="Our Distinguished"
        highlightedWord="Faculty"
        description="Meet the world-class educators and researchers shaping the future of our students across all campuses."
      />

      <FacultyGrid filterCampus={filterCampus} />

      <CTASection
        badge="Academic Excellence"
        title="Learn from the"
        highlightedWord="Best in the Field"
        description="Our faculty members are not just teachers; they are industry leaders and academic pioneers. Connect with them today to transform your educational journey into a path for success."
      >
        <PublicButton
          to="/admissions"
          variant="secondary"
          size="md"
          icon={ArrowRight}
          shape="slanted"
        >
          Start My Application
        </PublicButton>
        <PublicButton
          to="/contact"
          variant="outline"
          size="md"
          icon={Mail}
          shape="slanted"
        >
          Talk to an Advisor
        </PublicButton>
      </CTASection>
    </div>
  );
};

export default Faculty;
