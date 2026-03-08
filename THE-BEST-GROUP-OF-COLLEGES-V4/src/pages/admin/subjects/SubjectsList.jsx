import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import PublicButton from "../../../components/shared/PublicButton";
import Table from "../../../components/admin/Table";
import {
  Plus,
  Search,
  Filter,
  BookOpen,
  Building2,
} from "lucide-react";
import { mockSubjectsData as adminSubjects } from "../../../data/adminData";

const SubjectsList = () => {
  const navigate = useNavigate();
  const { campuses, isSuperAdmin, currentAdmin, isDarkMode } = useAdminContext();
  const [selectedCampus, setSelectedCampus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const mockData = adminSubjects;

  // Filter data based on user and selected campus
  let filteredData = mockData;

  // 1. Filter by Role & Campus
  if (!isSuperAdmin) {
    filteredData = filteredData.filter((subject) =>
      subject.offeredAt.some((campus) =>
        currentAdmin?.allocatedCampuses?.includes(campus),
      ),
    );
  } else if (selectedCampus) {
    // If Super Admin selected a campus, filter to subjects offered there
    filteredData = filteredData.filter((subject) =>
      subject.offeredAt.includes(selectedCampus),
    );
  }

  // 2. Filter by Search Query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredData = filteredData.filter(
      (sub) =>
        sub.name.toLowerCase().includes(query) ||
        sub.code.toLowerCase().includes(query) ||
        sub.faculty.toLowerCase().includes(query)
    );
  }

  const getCampusName = (campusId) => {
    return campuses.find((c) => c.id === campusId)?.name || campusId;
  };

  const columns = [
    {
      key: "name",
      label: "Subject",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-college-navy/10 text-college-navy dark:bg-college-gold/10 dark:text-college-gold flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="font-semibold text-college-navy dark:text-college-gold block">{row.name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{row.class}</span>
          </div>
        </div>
      )
    },
    {
      key: "code",
      label: "Code",
      render: (row) => (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 font-mono border border-gray-200">
          <Hash className="w-3 h-3 text-gray-400" />
          {row.code}
        </span>
      )
    },
    {
      key: "faculty",
      label: "Faculty",
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-college-navy dark:bg-college-gold flex items-center justify-center text-white dark:text-college-navy text-xs font-bold ring-2 ring-white/50 shadow-sm">
            {row.faculty.charAt(0)}
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{row.faculty}</span>
        </div>
      )
    },
    {
      key: "offeredAt",
      label: "Campuses",
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.offeredAt.map((campusId) => (
            <span
              key={campusId}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-college-navy/5 text-college-navy border border-college-navy/10"
            >
              <Building2 className="w-3 h-3" />
              {getCampusName(campusId)}
            </span>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-college-navy">
            Subjects & Assignments
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage course curriculum and campus-specific subject offerings
          </p>
        </div>
        <PublicButton
          to="/admin/subjects/create"
          variant={isDarkMode ? "secondary" : "primary"}
          shape="slanted"
          size="md"
          className="shadow-md transition-all duration-200"
          icon={Plus}
        >
          Add New Subject
        </PublicButton>
      </div>

      {/* Filters Section */}
      <div className="bg-white/80 dark:bg-college-navy backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-4 rounded-2xl shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="relative col-span-1 lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search subjects, codes, or faculty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all text-sm dark:text-white dark:placeholder-gray-400"
            />
          </div>

          {/* Campus Filter (Super Admin) */}
          {isSuperAdmin && (
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="w-full pl-10 pr-8 py-2 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all text-sm appearance-none cursor-pointer dark:text-gray-300"
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
              onClick: () => navigate(`/admin/subjects/edit/${row.id}`),
              className: "text-emerald-600 hover:text-emerald-700 font-medium bg-emerald-50 border border-emerald-100 dark:bg-emerald-900 dark:border-transparent dark:text-gray-300 dark:hover:bg-emerald-800",
            },
            {
              label: "Delete",
              onClick: () => {
                if (window.confirm("Are you sure you want to delete this subject?")) {
                  alert(`Subject ${row.id} deleted (mock)`);
                }
              },
              className: "text-red-600 hover:text-red-700 font-medium bg-red-50 border border-red-100 dark:bg-red-900 dark:border-transparent dark:text-gray-300 dark:hover:bg-red-800",
            },
          ]}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl border border-dashed border-gray-300">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-college-navy">No subjects found</h3>
          <p className="text-gray-500 text-sm mt-1 mb-4 max-w-sm text-center">
            {searchQuery || selectedCampus
              ? "Try adjusting your search or filters to find what you're looking for."
              : "Get started by creating a new subject for your curriculum."}
          </p>
          {(searchQuery || selectedCampus) && (
            <button
              onClick={() => { setSearchQuery(""); setSelectedCampus(""); }}
              className="text-college-navy dark:text-college-gold text-sm font-medium hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SubjectsList;
