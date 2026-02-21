import { useStudentContext } from "../../context/StudentContext";
import MaterialCard from "../../components/shared/MaterialCard";
import { FolderOpen } from "lucide-react";
import { motion } from "framer-motion";

// Mock subjects and materials data by campus
const subjectsByCampus = {
  main: [
    {
      name: "Computer Science",
      code: "CS-312",
      materials: [
        {
          name: "Week 7 Lecture Slides",
          type: "PDF",
          date: "Sept 12, 2025",
          description: "Process scheduling & CPU bursts",
        },
        {
          name: "Disk Management Demo",
          type: "Video",
          date: "Sept 10, 2025",
          description: "Lab walk-through and code review",
        },
        {
          name: "Revision Cheatsheet",
          type: "Notes",
          date: "Sept 9, 2025",
          description: "Key formulas and definitions",
        },
      ],
    },
    {
      name: "Linear Algebra",
      code: "MTH-205",
      materials: [
        {
          name: "Assignment Solutions",
          type: "PDF",
          date: "Sept 11, 2025",
          description: "Solutions to tutorial sheet 4",
        },
        {
          name: "Eigenvalues Explained",
          type: "Video",
          date: "Sept 8, 2025",
          description: "30-min concept recap",
        },
        {
          name: "Practice Set",
          type: "Notes",
          date: "Sept 7, 2025",
          description: "Extra credit problems",
        },
      ],
    },
    {
      name: "Database Systems",
      code: "CS-215",
      materials: [
        {
          name: "ER Diagrams Gallery",
          type: "Image",
          date: "Sept 10, 2025",
          description: "Sample schemas from class",
        },
        {
          name: "Normalization Guide",
          type: "PDF",
          date: "Sept 9, 2025",
          description: "1NF to BCNF examples",
        },
        {
          name: "SQL Lab Recording",
          type: "Video",
          date: "Sept 6, 2025",
          description: "Joins and aggregations lab",
        },
      ],
    },
  ],
  law: [
    {
      name: "Constitutional Law",
      code: "LAW-201",
      materials: [
        {
          name: "Constitution Overview",
          type: "PDF",
          date: "Sept 12, 2025",
          description: "Key articles and amendments",
        },
        {
          name: "Case Law Database",
          type: "PDF",
          date: "Sept 10, 2025",
          description: "Landmark constitutional cases",
        },
      ],
    },
    {
      name: "Criminal Law",
      code: "LAW-302",
      materials: [
        {
          name: "Criminal Code Summary",
          type: "PDF",
          date: "Sept 11, 2025",
          description: "Section-wise analysis",
        },
        {
          name: "Criminal Procedure Flowchart",
          type: "Image",
          date: "Sept 9, 2025",
          description: "Investigation to conviction",
        },
      ],
    },
  ],
  hala: [
    {
      name: "Business Management",
      code: "BBA-101",
      materials: [
        {
          name: "Strategic Planning guide",
          type: "PDF",
          date: "Sept 10, 2025",
          description: "Framework and templates",
        },
        {
          name: "Case Studies",
          type: "PDF",
          date: "Sept 8, 2025",
          description: "Real-world examples",
        },
      ],
    },
  ],
};

const campusNames = {
  main: "Main Campus",
  law: "Law Campus",
  hala: "Hala Campus",
};

const Materials = () => {
  const { getCurrentCampus } = useStudentContext();
  const campus = getCurrentCampus();
  const subjects = subjectsByCampus[campus] || [];

  return (
    <div className="space-y-8">
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <FolderOpen size={150} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wide">
                Student Portal
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wide">
                {campusNames[campus]}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Course Material
            </h1>
            <p className="text-gray-500 mt-2 max-w-xl">
              Access lecture slides, videos, notes, and other learning resources for your enrolled courses.
            </p>
          </div>
        </div>
      </div>

      {subjects.length > 0 ? (
        <div className="space-y-8">
          {subjects.map((subject, index) => (
            <motion.section
              key={subject.code}
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 break-words">
                    {subject.name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-1 sm:mt-0">
                    <span className="font-medium px-2 py-0.5 bg-gray-100 rounded text-gray-600 shrink-0">{subject.code}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="break-words">PDFs, videos, images, notes</span>
                  </div>
                </div>
                <span className="self-start sm:self-center text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200 shrink-0">
                  {subject.materials.length} items
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {subject.materials.map((item) => (
                  <MaterialCard
                    key={item.name}
                    material={item}
                    role="student"
                  />
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      ) : (
        <div className="bg-white/60 backdrop-blur-sm border border-dashed border-gray-300 rounded-3xl p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderOpen size={30} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No materials found</h3>
          <p className="text-gray-500 mt-2 max-w-sm mx-auto">
            No course materials are currently available for {campusNames[campus]}. Please check back later or contact your instructor.
          </p>
        </div>
      )}
    </div>
  );
};

export default Materials;
