import { useStudentContext } from "../../context/StudentContext";
import MaterialCard from "../../components/student/MaterialCard";

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
    <div className="space-y-6">
      <div className="bg-white border rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Course Material</p>
            <h1 className="text-2xl font-semibold text-gray-900">
              Subject folders
            </h1>
            <p className="text-sm text-blue-600 mt-2">
              📍 {campusNames[campus]}
            </p>
          </div>
          <button className="px-4 py-2 bg-purple-700 text-white rounded-lg text-sm font-semibold hover:bg-purple-800">
            Upload (mock)
          </button>
        </div>
      </div>

      {subjects.length > 0 ? (
        <div className="space-y-6">
          {subjects.map((subject) => (
            <section key={subject.code} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {subject.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {subject.code} • PDFs, videos, images, notes
                  </p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                  {subject.materials.length} items
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subject.materials.map((item) => (
                  <MaterialCard
                    key={item.name}
                    name={item.name}
                    type={item.type}
                    date={item.date}
                    description={item.description}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="bg-white border rounded-2xl shadow-sm p-8 text-center">
          <p className="text-gray-600 text-lg">
            No materials available for {campusNames[campus]} yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default Materials;
