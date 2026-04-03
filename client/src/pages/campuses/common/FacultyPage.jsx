import { useMemo } from "react";
import { useParams } from "react-router-dom";
import SectionHeader from "../../../components/public-site/SectionHeader";
import CampusCta from "../../../components/public-site/CampusCta";
import FacultyGrid from "../../../components/public-site/FacultyGrid";

const FacultyPage = () => {
  const { campus } = useParams();
  const campusName = useMemo(() => {
    if (campus === "main") return "Main Campus";
    if (campus === "law") return "Law Campus";
    if (campus === "hala") return "Hala Campus";
    return "Campus";
  }, [campus]);

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-college-navy text-white pt-32 pb-20 rounded-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge={campusName || "Faculty"}
            title="Our Faculty"
            description="Meet the dedicated educators who shape the future of our students."
            variant="dark"
            centered
            className="max-w-4xl mx-auto !mb-0"
          />
        </div>
      </section>

      <FacultyGrid filterCampus={campus} />

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
