import {
  Users,
  ClipboardList,
  FileText,
  BarChart3,
  Megaphone,
  Image,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { useAdminContext } from "../../context/AdminContext";
import StatsCard from "../../components/admin/StatsCard";
import Table from "../../components/admin/Table";

// Mock data (kept same)
const mockAllStats = {
  all: {
    users: { value: "2,430", hint: "+12% from last month" },
    assignments: { value: "320", hint: "Active assignments" },
    submissions: { value: "5.4k", hint: "Total submissions" },
    courses: { value: "42", hint: "Active courses" },
  },
  main: {
    users: { value: "1,200", hint: "Main Campus" },
    assignments: { value: "180", hint: "Main Campus" },
    submissions: { value: "3.2k", hint: "Main Campus" },
    courses: { value: "24", hint: "Main Campus" },
  },
  law: {
    users: { value: "650", hint: "Law Campus" },
    assignments: { value: "95", hint: "Law Campus" },
    submissions: { value: "1.5k", hint: "Law Campus" },
    courses: { value: "12", hint: "Law Campus" },
  },
  hala: {
    users: { value: "580", hint: "Hala Campus" },
    assignments: { value: "45", hint: "Hala Campus" },
    submissions: { value: "700", hint: "Hala Campus" },
    courses: { value: "6", hint: "Hala Campus" },
  },
};

const mockLmsRows = {
  all: [
    { id: "1", metric: "Class-wise performance", detail: "Avg 82% across all", trend: "+2.4%" },
    { id: "2", metric: "Active Faculty", detail: "18 active this week", trend: "Stability" },
    { id: "3", metric: "Student logins", detail: "1.2k in past 24h", trend: "+12%" },
    { id: "4", metric: "Pending grading", detail: "64 submissions", trend: "High" },
  ],
  main: [
    { id: "1", metric: "Class performance", detail: "Avg 84% Main Campus", trend: "+1.2%" },
    { id: "2", metric: "Active Faculty", detail: "10 active", trend: "Stable" },
    { id: "3", metric: "Student activity", detail: "720 logins", trend: "+8%" },
    { id: "4", metric: "Pending grading", detail: "38 submissions", trend: "Medium" },
  ],
  law: [
    { id: "1", metric: "Class performance", detail: "Avg 80% Law Campus", trend: "-0.5%" },
    { id: "2", metric: "Active Faculty", detail: "5 active", trend: "Low" },
    { id: "3", metric: "Student activity", detail: "320 logins", trend: "+5%" },
    { id: "4", metric: "Pending grading", detail: "18 submissions", trend: "Low" },
  ],
  hala: [
    { id: "1", metric: "Class performance", detail: "Avg 78% Hala Campus", trend: "+3.1%" },
    { id: "2", metric: "Active Faculty", detail: "3 active", trend: "Stable" },
    { id: "3", metric: "Student activity", detail: "180 logins", trend: "+15%" },
    { id: "4", metric: "Pending grading", detail: "8 submissions", trend: "Low" },
  ],
};

const mockFacultyData = {
  all: [
    { id: "f1", name: "Prof. Ahmed Raza", classes: "BSCS-A/B", assignments: "8", submissions: "310" },
    { id: "f2", name: "Dr. Sara Imran", classes: "BSIT-A", assignments: "5", submissions: "180" },
    { id: "f3", name: "Prof. Bilal Khan", classes: "BSCS-C", assignments: "4", submissions: "140" },
  ],
  main: [
    { id: "f1", name: "Prof. Ahmed Raza", classes: "BSCS-A/B", assignments: "8", submissions: "310" },
    { id: "f2", name: "Dr. Sara Imran", classes: "BSIT-A", assignments: "5", submissions: "180" },
  ],
  law: [
    { id: "f3", name: "Dr. Fatima Khan", classes: "LLB-A", assignments: "6", submissions: "250" },
  ],
  hala: [
    { id: "f4", name: "Prof. Hassan Ahmed", classes: "BBA-A", assignments: "3", submissions: "90" },
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
    { id: "n1", title: "Convocation 2025", status: "Published", date: "Sept 10", campus: "main", type: "News" },
    { id: "n2", title: "Library upgrade", status: "Draft", date: "Sept 8", campus: "main", type: "News" },
    { id: "n3", title: "Moot court finals", status: "Published", date: "Sept 12", campus: "law", type: "News" },
    { id: "n4", title: "Summer session", status: "Draft", date: "Sept 7", campus: "hala", type: "Event" },
  ].filter((item) => campusKey === "all" || item.campus === campusKey);

  const stats = [
    { title: "Total Users", value: currentStats.users.value, hint: currentStats.users.hint, icon: Users, tone: "purple" },
    { title: "Assignments", value: currentStats.assignments.value, hint: currentStats.assignments.hint, icon: ClipboardList, tone: "blue" },
    { title: "Submissions", value: currentStats.submissions.value, hint: currentStats.submissions.hint, icon: FileText, tone: "emerald" },
    { title: "Active Courses", value: currentStats.courses.value, hint: currentStats.courses.hint, icon: Layers, tone: "amber" },
  ];

  const cmsStats = [
    { title: "News posts", value: campusKey === "all" ? "34" : "12", hint: "Published", icon: Megaphone, tone: "purple" },
    { title: "Gallery", value: campusKey === "all" ? "212" : "45", hint: "Images", icon: Image, tone: "blue" },
    { title: "Courses", value: campusKey === "all" ? "26" : "8", hint: "Active", icon: Layers, tone: "emerald" },
    { title: "Drafts", value: campusKey === "all" ? "7" : "2", hint: "Pending", icon: FileText, tone: "amber" },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">System Dashboard</h1>
          <p className="text-gray-500 mt-1">Real-time overview of your educational ecosystem</p>
        </div>

        {/* Context Badge */}
        <div className="flex items-center gap-3">
          {(!isSuperAdmin || selectedCampusFilter !== "all") && (
            <div className="px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold shadow-sm flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              {isSuperAdmin ? campusLabel : "Allocated Campuses"}
            </div>
          )}
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <StatsCard key={item.title} {...item} />
        ))}
      </div>

      {/* Secondary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LMS Oversight */}
        <div className="group bg-white/60 backdrop-blur-md border border-white/60 rounded-3xl p-6 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">LMS Oversight</h2>
                <p className="text-sm text-gray-500">Learning management statistics</p>
              </div>
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                <BarChart3 size={20} />
              </div>
            </div>

            <div className="space-y-3">
              {lmsData.map((row) => (
                <div key={row.id} className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all duration-200 group/item">
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900">{row.metric}</p>
                    <p className="text-xs text-gray-500">{row.detail}</p>
                  </div>
                  <div className={`text-xs font-bold px-3 py-1.5 rounded-full ${row.trend.includes('+') ? 'bg-green-50 text-green-700' :
                      row.trend.includes('-') ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                    {row.trend}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CMS Activity */}
        <div className="group bg-white/60 backdrop-blur-md border border-white/60 rounded-3xl p-6 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">CMS Updates</h2>
                <p className="text-sm text-gray-500">Recent content activity</p>
              </div>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Megaphone size={20} />
              </div>
            </div>

            <div className="space-y-3">
              {cmsRows.length > 0 ? (
                cmsRows.map((row) => (
                  <div key={row.id} className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                        {row.type === 'News' ? <FileText size={18} /> : <Image size={18} />}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 line-clamp-1">{row.title}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{row.date}</span>
                          <span>•</span>
                          <span className="uppercase">{row.campus}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${row.status === 'Published' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                      {row.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-400">
                  <p>No activity yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Faculty Table */}
        <div className="bg-white border text-left border-gray-200 rounded-3xl shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-gray-900">Faculty Performance</h2>
              <p className="text-sm text-gray-500">Top performing teachers</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-gray-100">
            <Table
              columns={[
                { key: "name", label: "Faculty Member" },
                { key: "classes", label: "Classes" },
                { key: "submissions", label: "Submissions" },
              ]}
              data={facultyData}
            />
          </div>
        </div>

        {/* CMS Quick Stats */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Layers size={120} />
          </div>

          <div className="relative z-10 space-y-8">
            <div>
              <h2 className="text-2xl font-bold">Content Overview</h2>
              <p className="text-slate-400">System-wide asset distribution</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {cmsStats.map((stat) => (
                <div key={stat.title} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/15 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <stat.icon className="text-blue-400" size={20} />
                    <span className="text-xs font-medium text-slate-400">{stat.hint}</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-slate-300">{stat.title}</p>
                </div>
              ))}
            </div>

            <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
              View Detailed Reports
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
