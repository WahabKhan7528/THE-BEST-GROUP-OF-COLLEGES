import { useStudentContext } from "../../context/StudentContext";
import MaterialCard from "../../components/shared/MaterialCard";
import PortalPageHeader from "../../components/shared/PortalPageHeader";
import Badge from "../../components/public_site/Badge";
import { FolderOpen } from "lucide-react";

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
  const { getCurrentCampus, isDarkMode } = useStudentContext();
  const campus = getCurrentCampus();
  const subjects = subjectsByCampus[campus] || [];

  return (
    <div className="space-y-8 pb-10">
      <PortalPageHeader
        badge={
          <Badge variant={isDarkMode ? "gold" : "navy"}>
            {campusNames[campus]}
          </Badge>
        }
        title="Course Material"
        subtitle="Access lecture slides, videos, notes, and other learning resources for your enrolled courses."
      />

      {subjects.length > 0 ? (
        <div className="space-y-8">
          {subjects.map((subject) => (
            <section
              key={subject.code}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
                <div>
                  <h2 className="text-xl font-bold text-college-navy dark:text-white break-words">
                    {subject.name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                    <span className="font-medium px-2 py-0.5 bg-gray-100 dark:bg-dark-elevated rounded text-gray-600 dark:text-gray-300 shrink-0">{subject.code}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="break-words">PDFs, videos, images, notes</span>
                  </div>
                </div>
                <span className="self-start sm:self-center text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-border shrink-0">
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
            </section>
          ))}
        </div>
      ) : (
        <div className="bg-white/60 dark:bg-college-navy/40 backdrop-blur-sm border border-dashed border-gray-300 dark:border-college-gold/30 rounded-3xl p-12 text-center">
          <div className="w-16 h-16 bg-college-navy/5 dark:bg-college-gold/10 text-college-navy dark:text-college-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderOpen size={30} />
          </div>
          <h3 className="text-lg font-semibold text-college-navy dark:text-white">No materials found</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-sm mx-auto">
            No course materials are currently available for {campusNames[campus]}. Please check back later or contact your instructor.
          </p>
        </div>
      )}
    </div>
  );
};

export default Materials;
