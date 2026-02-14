import { Link } from "react-router-dom";
import { useState } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import Table from "../../../components/admin/Table";
import {
  Plus,
  Search,
  BookOpen,
  Clock,
  GraduationCap,
  DollarSign,
  Building2,
  Pencil,
  Trash2,
  MoreVertical,
  ChevronDown
} from "lucide-react";

const CourseList = () => {
  const { campuses, isSuperAdmin, currentAdmin } = useAdminContext();
  const [selectedCampus, setSelectedCampus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data with campuses where course is offered (Courses are global but assigned to campuses)
  const mockData = [
    {
      id: "c101",
      title: "BS Computer Science",
      duration: "4 years",
      eligibility: "Intermediate",
      fee: "$1200",
      type: "semester",
      offeredAt: ["main", "law"],
    },
    {
      id: "c102",
      title: "BS Information Technology",
      duration: "4 years",
      eligibility: "Intermediate",
      fee: "$1100",
      type: "semester",
      offeredAt: ["main"],
    },
    {
      id: "c103",
      title: "Bachelor of Law (LLB)",
      duration: "5 years",
      eligibility: "Intermediate",
      fee: "$900",
      type: "semester",
      offeredAt: ["law"],
    },
    {
      id: "c104",
      title: "Bachelor of Business Admin",
      duration: "4 years",
      eligibility: "Intermediate",
      fee: "$800",
      type: "semester",
      offeredAt: ["hala"],
    },
  ];

  // Filter data based on user and selected campus
  let filteredData = mockData;

  // Search Filter
  if (searchQuery) {
    filteredData = filteredData.filter(course =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // If Sub-Admin, only show courses offered at their allocated campuses
  if (!isSuperAdmin) {
    filteredData = filteredData.filter((course) =>
      course.offeredAt.some((campus) =>
        currentAdmin?.allocatedCampuses?.includes(campus),
      ),
    );
  } else if (selectedCampus) {
    // If Super Admin selected a campus, filter to courses offered there
    filteredData = filteredData.filter((course) =>
      course.offeredAt.includes(selectedCampus),
    );
  }

  const getCampusesDisplay = (campusIds) => {
    return campusIds.map((cId) => {
      const campus = campuses.find((c) => c.id === cId);
      return (
        <span
          key={cId}
          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
        >
          {campus?.code || cId}
        </span>
      );
    });
  };

  const columns = [
    {
      key: "title",
      label: "Course Details",
      render: (row) => (
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary-50 text-primary-600 rounded-lg">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="font-semibold text-gray-900 line-clamp-1">{row.title}</span>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500">
              <span className="bg-primary-50 text-primary-700 px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide">
                Undergraduate
              </span>
            </div>
          </div>
        </div>
      )
    },
    {
      key: "duration",
      label: "Duration & Fee",
      render: (row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-sm text-gray-700 font-medium">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            {row.duration}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <DollarSign className="w-3.5 h-3.5 text-gray-400" />
            {row.fee}/{row.type}
          </div>
        </div>
      )
    },
    {
      key: "eligibility",
      label: "Eligibility",
      render: (row) => (
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{row.eligibility}</span>
        </div>
      )
    },
    {
      key: "offeredAt",
      label: "Campuses",
      render: (row) => (
        <div className="flex flex-wrap gap-1.5 max-w-[200px]">
          {getCampusesDisplay(row.offeredAt)}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Course Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage degree programs, short courses, and academic offerings
          </p>
        </div>
        <Link
          to="/admin/courses/create"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-semibold shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          Add New Course
        </Link>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search courses by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
          />
        </div>

        {isSuperAdmin && (
          <div className="relative min-w-[200px] w-full md:w-auto">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            <select
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value)}
              className="w-full pl-10 pr-10 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all appearance-none cursor-pointer text-gray-700"
            >
              <option value="">All Campuses</option>
              {campuses.map((campus) => (
                <option key={campus.id} value={campus.id}>
                  {campus.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-sm overflow-hidden">
        {filteredData.length > 0 ? (
          <Table
            columns={columns}
            data={filteredData}
            actionButtons={(row) => [
              {
                label: "Edit",
                onClick: () => {
                  window.location.href = `/admin/courses/edit/${row.id}`;
                },
                className: "text-blue-600 hover:text-blue-700 font-medium bg-blue-50 border border-blue-100",
              },
              {
                label: "Delete",
                onClick: () => {
                  if (window.confirm("Are you sure you want to delete this course?")) {
                    alert(`Course ${row.id} deleted (mock)`);
                  }
                },
                className: "text-rose-600 hover:text-rose-700 font-medium bg-rose-50 border border-rose-100",
              }
            ]}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
            <p className="text-gray-500 max-w-sm mt-1">
              There are no courses matching your search criteria. Try adjusting your filters or add a new course.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
