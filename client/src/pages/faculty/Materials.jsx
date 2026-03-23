import { Link } from "react-router-dom";
import { useFacultyContext } from "../../context/FacultyContext";
import MaterialCard from "../../components/portal-shared/MaterialCard";
import PortalPageHeader from "../../components/portal-shared/PortalPageHeader";
import Badge from "../../components/shared/Badge";
import { UploadCloud } from "lucide-react";
import PublicButton from "../../components/shared/PublicButton";

// Mock materials data by campus
const materialsByCampus = {
  main: [
    {
      id: "m1",
      classSection: "BSCS - A",
      subject: "Operating Systems",
      title: "Lecture 07 Slides",
      type: "Slides",
      uploadDate: "Sept 11, 2025",
      link: "#",
    },
    {
      id: "m2",
      classSection: "BSCS - B",
      subject: "Database Systems",
      title: "Normalization Cheatsheet",
      type: "PDF",
      uploadDate: "Sept 10, 2025",
      link: "#",
    },
    {
      id: "m3",
      classSection: "BSCS - A",
      subject: "Operating Systems",
      title: "Lab Demo Recording",
      type: "Video",
      uploadDate: "Sept 9, 2025",
      link: "#",
    },
  ],
  law: [
    {
      id: "m4",
      classSection: "LLB - A",
      subject: "Constitutional Law",
      title: "Indian Constitution Overview",
      type: "Slides",
      uploadDate: "Sept 12, 2025",
      link: "#",
    },
    {
      id: "m5",
      classSection: "LLB - A",
      subject: "Criminal Law",
      title: "Criminal Procedure Code Summary",
      type: "PDF",
      uploadDate: "Sept 11, 2025",
      link: "#",
    },
  ],
  hala: [
    {
      id: "m6",
      classSection: "BBA - A",
      subject: "Business Management",
      title: "Strategic Planning Framework",
      type: "Slides",
      uploadDate: "Sept 10, 2025",
      link: "#",
    },
  ],
};

const campusNames = {
  main: "Main Campus",
  law: "Law Campus",
  hala: "Hala Campus",
};

const Materials = () => {
  const { getCurrentCampus, isDarkMode } = useFacultyContext();
  const campus = getCurrentCampus();
  const materials = materialsByCampus[campus] || [];

  return (
    <div className="space-y-6 pb-10">
      <PortalPageHeader
        badge={
          <Badge variant={isDarkMode ? "gold" : "navy"}>
            {campusNames[campus]}
          </Badge>
        }
        title="Course Materials"
        subtitle="Upload and manage resources, lecture notes, and media for your students."
        action={
          <PublicButton
            onClick={() => navigate("/faculty/materials/upload")}
            variant="secondary"
            className="w-full"
            shape="slanted"
          >
            <UploadCloud size={18} />
            <span>Upload Material</span>
          </PublicButton>
        }
      />

      {materials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>
      ) : (
        <div className="bg-white/60 dark:bg-college-navy/40 backdrop-blur-sm border border-dashed border-gray-300 dark:border-college-gold/30 rounded-3xl p-12 text-center">
          <div className="w-16 h-16 bg-college-navy/5 dark:bg-college-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-college-navy dark:text-college-gold">
            <UploadCloud size={30} />
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
            No materials uploaded for {campusNames[campus]} yet.
          </p>
          <Link
            to="/faculty/materials/upload"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-college-navy/80 border border-gray-200 dark:border-college-gold/30 text-college-navy dark:text-white rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-college-navy transition-colors"
          >
            Upload your first material
          </Link>
        </div>
      )}
    </div>
  );
};

export default Materials;
