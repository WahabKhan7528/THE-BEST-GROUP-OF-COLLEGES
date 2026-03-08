import { useLocation } from "react-router-dom";
import Section from "../../../components/public_site/Section";
import SectionHeader from "../../../components/public_site/SectionHeader";
import GSAPReveal from "../../../components/shared/GSAPReveal";
import FacultyGrid from "../../../components/public_site/FacultyGrid";
import CampusCta from "../../../components/public_site/CampusCta";

const FacultyPage = () => {
  const location = useLocation();
  const path = location.pathname;

  let campusName = "";
  if (path.includes("/main")) campusName = "Main Campus";
  else if (path.includes("/law")) campusName = "Law College";
  else if (path.includes("/hala")) campusName = "Hala Campus";

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-college-navy text-white pt-32 pb-20 rounded-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <GSAPReveal>
            <SectionHeader
              badge={campusName || "Faculty"}
              title="Our Faculty"
              description="Meet the dedicated educators who shape the future of our students."
              variant="dark"
              centered
              className="max-w-4xl mx-auto !mb-0"
            />
          </GSAPReveal>
        </div>
      </section>
      <FacultyGrid filterCampus={campusName} />

      <CampusCta
        badge="JOIN OUR FACULTY"
        title={<>Shape the <br /></>}
        highlightedWord="Future"
        description="Are you passionate about education? Join our world-class faculty and help us nurture the next generation of leaders."
        image="/maincampus.webp"
        primaryButton={{ text: "VIEW OPENINGS", to: "/contact" }}
        secondaryButton={{ text: "TALK TO US", to: "/contact" }}
      />
    </div>
  );
};

export default FacultyPage;