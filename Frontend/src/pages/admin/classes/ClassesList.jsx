import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import Table from "../../../components/admin/Table";
import {
  Plus,
  Search,
  Filter,
  BookOpen,
  Users,
  GraduationCap,
  Building2,
  MoreVertical,
  Pencil,
  Trash2
} from "lucide-react";
import { motion } from "framer-motion";

const ClassesList = () => {
  const navigate = useNavigate();
  const { campuses, isSuperAdmin, currentAdmin } = useAdminContext();
  const [selectedCampus, setSelectedCampus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data with campus allocation (Classes are campus-specific)
  const mockData = [
    {
      id: "c1",
      name: "BSCS - 3rd Semester",
      sections: ["A", "B"],
      subjects: ["OS", "DBMS", "DSA"],
      faculty: "Ahmed, Sara",
      campus: "main",
      students: 120
    },
    {
      id: "c2",
      name: "BSIT - 2nd Semester",
      sections: ["A"],
      subjects: ["Programming", "Discrete Math"],
      faculty: "Bilal",
      campus: "main",
      students: 45
    },
    {
      id: "c3",
      name: "LLB - 1st Semester",
      sections: ["A", "B"],
      subjects: ["Constitutional Law", "Intro to Law"],
      faculty: "Fatima",
      campus: "law",
      students: 80
    },
    {
      id: "c4",
      name: "BBA - 4th Semester",
      sections: ["A"],
      subjects: ["Marketing", "Finance"],
      faculty: "Hassan",
      campus: "hala",
      students: 35
    },
  ];

  // Filter data based on user role, selected campus, and search query
  let filteredData = mockData;

  // 1. Filter by Role & Campus
  if (!isSuperAdmin) {
    filteredData = filteredData.filter((cls) =>
      currentAdmin?.allocatedCampuses?.includes(cls.campus),
    );
  } else if (selectedCampus) {
    filteredData = filteredData.filter((cls) => cls.campus === selectedCampus);
  }

  // 2. Filter by Search Query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredData = filteredData.filter(
      (cls) =>
        cls.name.toLowerCase().includes(query) ||
        cls.faculty.toLowerCase().includes(query) ||
        cls.subjects.some(sub => sub.toLowerCase().includes(query))
    );
  }

  const getCampusName = (campusId) => {
    return campuses.find((c) => c.id === campusId)?.name || campusId;
  };

  const columns = [
    {
      key: "name",
      label: "Class Info",
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">{row.name}</span>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Users className="w-3 h-3" /> {row.students} Students
          </span>
        </div>
      )
    },
    {
      key: "sections",
      label: "Sections",
      render: (row) => (
        <div className="flex gap-1 flex-wrap">
          {row.sections.map((sec, idx) => (
            <span key={idx} className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded text-xs font-medium border border-primary-100">
              {sec}
            </span>
          ))}
        </div>
      )
    },
    {
      key: "subjects",
      label: "Subjects",
      render: (row) => (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {row.subjects.slice(0, 2).map((sub, idx) => (
            <span key={idx} className="bg-white text-primary-700 px-2 py-0.5 rounded text-xs font-medium border border-primary-200">
              {sub}
            </span>
          ))}
          {row.subjects.length > 2 && (
            <span className="text-xs text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded">+{row.subjects.length - 2} more</span>
          )}
        </div>
      )
    },
    {
      key: "faculty",
      label: "Faculty Lead",
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-bold border border-primary-200">
            {row.faculty.charAt(0)}
          </div>
          <span className="text-sm text-gray-700">{row.faculty}</span>
        </div>
      )
    },
    {
      key: "campus",
      label: "Campus",
      render: (row) => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
          <Building2 className="w-3 h-3" />
          {getCampusName(row.campus)}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Classes Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage academic classes, sections, and subject allocations
          </p>
        </div>
        <Link
          to="/admin/classes/create"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-semibold shadow-md transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          Create New Class
        </Link>
      </div>

      {/* Filters Section */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="relative col-span-1 lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search classes, subjects, or faculty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
            />
          </div>

          {/* Campus Filter (Super Admin) */}
          {isSuperAdmin && (
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="w-full pl-10 pr-8 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm appearance-none cursor-pointer"
              >
                <option value="">All Campuses</option>
                {campuses.map((campus) => (
                  <option key={campus.id} value={campus.id}>
                    {campus.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Table Section */}
      {filteredData.length > 0 ? (
        <Table
          columns={columns}
          data={filteredData}
          actionButtons={(row) => [
            {
              label: "Edit",
              onClick: () => navigate(`/admin/classes/edit/${row.id}`),
              className: "text-blue-600 hover:text-blue-700 font-medium bg-blue-50 border border-blue-100",
            },
            {
              label: "Delete",
              onClick: () => {
                if (window.confirm("Are you sure you want to delete this class?")) {
                  alert(`Class ${row.id} deleted (mock)`);
                }
              },
              className: "text-rose-600 hover:text-rose-700 font-medium bg-rose-50 border border-rose-100",
            },
          ]}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl border border-dashed border-gray-300">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No classes found</h3>
          <p className="text-gray-500 text-sm mt-1 mb-4 max-w-sm text-center">
            {searchQuery || selectedCampus
              ? "Try adjusting your search or filters to find what you're looking for."
              : "Get started by creating a new class for your academic schedule."}
          </p>
          {(searchQuery || selectedCampus) && (
            <button
              onClick={() => { setSearchQuery(""); setSelectedCampus(""); }}
              className="text-blue-600 text-sm font-medium hover:text-blue-700 hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ClassesList;

