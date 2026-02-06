import {
  Users,
  ClipboardList,
  FileText,
  BarChart3,
  Megaphone,
  Image,
  Layers,
} from "lucide-react";
import { useAdminContext } from "../../context/AdminContext";
import StatsCard from "../../components/admin/StatsCard";
import Table from "../../components/admin/Table";

// Mock data with campus context
const mockAllStats = {
  all: {
    users: { value: "2,430", hint: "Admins, faculty, students" },
    assignments: { value: "320", hint: "Across all classes" },
    submissions: { value: "5.4k", hint: "Student uploads" },
    courses: { value: "42", hint: "Published to LMS" },
  },
  main: {
    users: { value: "1,200", hint: "Users at Main Campus" },
    assignments: { value: "180", hint: "Main Campus classes" },
    submissions: { value: "3.2k", hint: "Main Campus submissions" },
    courses: { value: "24", hint: "Main Campus courses" },
  },
  law: {
    users: { value: "650", hint: "Users at Law Campus" },
    assignments: { value: "95", hint: "Law Campus classes" },
    submissions: { value: "1.5k", hint: "Law Campus submissions" },
    courses: { value: "12", hint: "Law Campus courses" },
  },
  hala: {
    users: { value: "580", hint: "Users at Hala Campus" },
    assignments: { value: "45", hint: "Hala Campus classes" },
    submissions: { value: "700", hint: "Hala Campus submissions" },
    courses: { value: "6", hint: "Hala Campus courses" },
  },
};

const mockLmsRows = {
  all: [
    {
      id: "1",
      metric: "Class-wise performance",
      detail: "Avg 82% across all campuses",
    },
    {
      id: "2",
      metric: "Teacher activity",
      detail: "18 faculty active this week",
    },
    { id: "3", metric: "Student activity", detail: "1.2k logins past 24h" },
    {
      id: "4",
      metric: "Pending grading",
      detail: "64 submissions awaiting review",
    },
  ],
  main: [
    {
      id: "1",
      metric: "Class-wise performance",
      detail: "Avg 84% at Main Campus",
    },
    {
      id: "2",
      metric: "Teacher activity",
      detail: "10 faculty active this week",
    },
    { id: "3", metric: "Student activity", detail: "720 logins past 24h" },
    {
      id: "4",
      metric: "Pending grading",
      detail: "38 submissions awaiting review",
    },
  ],
  law: [
    {
      id: "1",
      metric: "Class-wise performance",
      detail: "Avg 80% at Law Campus",
    },
    {
      id: "2",
      metric: "Teacher activity",
      detail: "5 faculty active this week",
    },
    { id: "3", metric: "Student activity", detail: "320 logins past 24h" },
    {
      id: "4",
      metric: "Pending grading",
      detail: "18 submissions awaiting review",
    },
  ],
  hala: [
    {
      id: "1",
      metric: "Class-wise performance",
      detail: "Avg 78% at Hala Campus",
    },
    {
      id: "2",
      metric: "Teacher activity",
      detail: "3 faculty active this week",
    },
    { id: "3", metric: "Student activity", detail: "180 logins past 24h" },
    {
      id: "4",
      metric: "Pending grading",
      detail: "8 submissions awaiting review",
    },
  ],
};

const mockFacultyData = {
  all: [
    {
      id: "f1",
      name: "Prof. Ahmed Raza",
      classes: "BSCS-A/B",
      assignments: "8",
      submissions: "310",
    },
    {
      id: "f2",
      name: "Dr. Sara Imran",
      classes: "BSIT-A",
      assignments: "5",
      submissions: "180",
    },
    {
      id: "f3",
      name: "Prof. Bilal Khan",
      classes: "BSCS-C",
      assignments: "4",
      submissions: "140",
    },
  ],
  main: [
    {
      id: "f1",
      name: "Prof. Ahmed Raza",
      classes: "BSCS-A/B",
      assignments: "8",
      submissions: "310",
    },
    {
      id: "f2",
      name: "Dr. Sara Imran",
      classes: "BSIT-A",
      assignments: "5",
      submissions: "180",
    },
  ],
  law: [
    {
      id: "f3",
      name: "Dr. Fatima Khan",
      classes: "LLB-A",
      assignments: "6",
      submissions: "250",
    },
  ],
  hala: [
    {
      id: "f4",
      name: "Prof. Hassan Ahmed",
      classes: "BBA-A",
      assignments: "3",
      submissions: "90",
    },
  ],
};

const Dashboard = () => {
  const {
    selectedCampusFilter,
    getCurrentCampusContext,
    campuses,
    isSuperAdmin,
    currentAdmin,
  } = useAdminContext();

  const currentCampus = getCurrentCampusContext();
  const campusKey = currentCampus ? currentCampus.id : "all";
  const campusLabel = currentCampus ? currentCampus.name : "All Campuses";

  const currentStats = mockAllStats[campusKey] || mockAllStats.all;
  const lmsData = mockLmsRows[campusKey] || mockLmsRows.all;
  const facultyData = mockFacultyData[campusKey] || mockFacultyData.all;

  const cmsRows = [
    {
      id: "n1",
      title: "Convocation 2025",
      status: "Published",
      date: "Sept 10, 2025",
      campus: "main",
    },
    {
      id: "n2",
      title: "Library upgrade",
      status: "Draft",
      date: "Sept 8, 2025",
      campus: "main",
    },
    {
      id: "n3",
      title: "Moot court finals",
      status: "Published",
      date: "Sept 12, 2025",
      campus: "law",
    },
    {
      id: "n4",
      title: "New summer session",
      status: "Draft",
      date: "Sept 7, 2025",
      campus: "hala",
    },
  ].filter((item) => campusKey === "all" || item.campus === campusKey);

  const stats = [
    {
      title: "Total Users",
      value: currentStats.users.value,
      hint: currentStats.users.hint,
      icon: Users,
      tone: "purple",
    },
    {
      title: "Assignments",
      value: currentStats.assignments.value,
      hint: currentStats.assignments.hint,
      icon: ClipboardList,
      tone: "blue",
    },
    {
      title: "Submissions",
      value: currentStats.submissions.value,
      hint: currentStats.submissions.hint,
      icon: FileText,
      tone: "emerald",
    },
    {
      title: "Active Courses",
      value: currentStats.courses.value,
      hint: currentStats.courses.hint,
      icon: Layers,
      tone: "amber",
    },
  ];

  const cmsStats = [
    {
      title: "News posts",
      value: campusKey === "all" ? "34" : "varies",
      hint: "Published",
      icon: Megaphone,
      tone: "purple",
    },
    {
      title: "Gallery images",
      value: campusKey === "all" ? "212" : "varies",
      hint: "Across albums",
      icon: Image,
      tone: "blue",
    },
    {
      title: "Courses listed",
      value: campusKey === "all" ? "26" : "varies",
      hint: "Across portals",
      icon: Layers,
      tone: "emerald",
    },
    {
      title: "Drafts",
      value: campusKey === "all" ? "7" : "varies",
      hint: "Pending review",
      icon: FileText,
      tone: "amber",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-500">Admin Panel</p>
        <h1 className="text-2xl font-semibold text-gray-900">
          System overview
        </h1>
        {!isSuperAdmin && (
          <p className="text-sm text-gray-600 mt-2">
            Viewing data for:{" "}
            <strong>
              {currentAdmin?.allocatedCampuses
                ?.map((cId) => campuses.find((c) => c.id === cId)?.name)
                .join(", ")}
            </strong>
          </p>
        )}
        {isSuperAdmin && selectedCampusFilter !== "all" && (
          <p className="text-sm text-blue-600 mt-2">
            📍 Viewing <strong>{campusLabel}</strong> data only
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item) => (
          <StatsCard key={item.title} {...item} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-2xl shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              LMS oversight
            </h2>
            <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
              Live
            </span>
          </div>
          <div className="space-y-3">
            {lmsData.map((row) => (
              <div
                key={row.id}
                className="border rounded-xl p-4 hover:border-purple-200"
              >
                <p className="text-sm font-semibold text-gray-900">
                  {row.metric}
                </p>
                <p className="text-sm text-gray-600">{row.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              CMS activity
            </h2>
            <span className="text-xs px-3 py-1 rounded-full bg-purple-50 text-purple-700">
              Website
            </span>
          </div>
          <div className="space-y-3">
            {cmsRows.length > 0 ? (
              cmsRows.map((row) => (
                <div
                  key={row.id}
                  className="border rounded-xl p-4 flex items-center justify-between hover:border-blue-200"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {row.title}
                    </p>
                    <p className="text-xs text-gray-500">{row.date}</p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                    {row.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No CMS content for this campus yet.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-2xl shadow-sm p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Teacher-wise activity
            </h2>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-700">
              LMS
            </span>
          </div>
          <Table
            columns={[
              { key: "name", label: "Faculty" },
              { key: "classes", label: "Classes" },
              { key: "assignments", label: "Assignments" },
              { key: "submissions", label: "Submissions" },
            ]}
            data={facultyData}
          />
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">CMS assets</h2>
            <span className="text-xs px-3 py-1 rounded-full bg-amber-50 text-amber-700">
              Content
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {cmsStats.map((stat) => (
              <StatsCard key={stat.title} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
