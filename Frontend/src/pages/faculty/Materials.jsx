import { Link } from "react-router-dom";
import { useFacultyContext } from "../../context/FacultyContext";
import MaterialCard from "../../components/faculty/MaterialCard";

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
  const { getCurrentCampus } = useFacultyContext();
  const campus = getCurrentCampus();
  const materials = materialsByCampus[campus] || [];

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Course Materials</p>
            <h1 className="text-2xl font-semibold text-gray-900">
              Uploaded resources
            </h1>
            <p className="text-sm text-primary-600 mt-2">
              📍 {campusNames[campus]}
            </p>
          </div>
          <Link
            to="/faculty/materials/upload"
            className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors"
          >
            Upload Material
          </Link>
        </div>
      </div>

      {materials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>
      ) : (
        <div className="bg-white border rounded-2xl shadow-sm p-8 text-center">
          <p className="text-gray-600 text-lg">
            No materials uploaded for {campusNames[campus]} yet.
          </p>
          <Link
            to="/faculty/materials/upload"
            className="text-primary-700 font-semibold hover:text-primary-800 mt-2 inline-block"
          >
            Upload your first material →
          </Link>
        </div>
      )}
    </div>
  );
};

export default Materials;
