import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useAdminContext } from "../../../store/hooks/useAdminReduxContext";
import { useToast } from "../../../context/ToastContext";
import { useConfirm } from "../../../context/ConfirmContext";
import Table from "../../../components/portal-shared/Table";
import PublicButton from "../../../components/shared/PublicButton";
import {
  Plus,
  Search,
  BookOpen,
  Clock,
  GraduationCap,
  DollarSign,
  Building2,
  ChevronDown
} from "lucide-react";
import { adminApi } from "../../../services/api";

const CourseList = () => {
  const navigate = useNavigate();
  const { campuses, isSuperAdmin, currentAdmin, isDarkMode } = useAdminContext();
  const toast = useToast();
  const confirm = useConfirm();

  const [selectedCampus, setSelectedCampus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const { data } = await adminApi.courses();
        setCourses(data.data || []);
      } catch {
        setCourses([]);
      }
    };

    loadCourses();
  }, []);

  const filteredData = useMemo(() => {
    let result = [...courses];

  // Search Filter
    if (searchQuery) {
      result = result.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    }

  // If Sub-Admin, only show courses offered at their allocated campuses
    if (!isSuperAdmin) {
      const campusId = currentAdmin?.campus?._id || currentAdmin?.campus;
      result = result.filter((course) => (course.campuses || []).some((campus) => String(campus?._id || campus) === String(campusId)));
    } else if (selectedCampus) {
      result = result.filter((course) => (course.campuses || []).some((campus) => String(campus?._id || campus) === selectedCampus));
    }

    return result;
  }, [courses, searchQuery, isSuperAdmin, currentAdmin, selectedCampus]);

  const getCampusesDisplay = (campusObjs) => {
    return (campusObjs || []).map((campusObj) => {
      const campusId = campusObj?._id || campusObj;
      const campus = campuses.find((c) => c.id === campusId);
      return (
        <span
          key={campusId}
          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-college-navy/5 text-college-navy dark:text-college-gold dark:bg-college-gold/10 border border-college-navy/10 dark:border-college-gold/20"
        >
          {campus?.code || campusObj?.code || campusId}
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
          <div className="p-2 bg-college-navy/10 text-college-navy dark:bg-college-gold/10 dark:text-college-gold rounded-sm">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="font-semibold text-college-navy dark:text-white line-clamp-1">{row.title}</span>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              <span className="bg-college-navy/5 text-college-navy dark:bg-college-gold/10 dark:text-college-gold px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide border border-college-navy/10 dark:border-college-gold/20">
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
          <div className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 font-medium">
            <Clock className="w-3.5 h-3.5 text-college-navy/40 dark:text-college-gold/60" />
            {row.duration}
          </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <DollarSign className="w-3.5 h-3.5 text-gray-400" />
            {row.fee || "-"}/{row.examSystem || row.type || "semester"}
          </div>
        </div>
      )
    },
    {
      key: "examSystem",
      label: "Exam System",
      render: (row) => (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 capitalize">
          {row.examSystem || row.type || "semester"}
        </span>
      )
    },
    {
      key: "eligibility",
      label: "Eligibility",
      render: (row) => (
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-college-navy/40 dark:text-college-gold/60" />
          <span className="text-sm text-gray-600 dark:text-gray-400">{row.eligibility}</span>
        </div>
      )
    },
    ...(isSuperAdmin ? [{
      key: "campuses",
      label: "Campuses",
      render: (row) => (
        <div className="flex flex-wrap gap-1.5 max-w-[200px]">
          {getCampusesDisplay(row.campuses)}
        </div>
      ),
    }] : []),
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-college-navy dark:text-white">
            Course Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage degree programs, short courses, and academic offerings
          </p>
        </div>
        {!isSuperAdmin && (
          <PublicButton
            to="/admin/courses/create"
            variant={isDarkMode ? "secondary" : "primary"}
            shape="slanted"
            size="md"
            icon={Plus}
          >
            Add New Course
          </PublicButton>
        )}
      </div>

      {/* Filters & Actions */}
      <div className="bg-white/80 dark:bg-college-navy backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-4 rounded-sm shadow-sm flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search courses by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all text-sm dark:text-white dark:placeholder-gray-400"
          />
        </div>

        {isSuperAdmin && (
          <div className="relative min-w-[200px] w-full md:w-auto">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            <select
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value)}
              className="w-full pl-10 pr-10 py-2 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all appearance-none cursor-pointer text-gray-700 dark:text-gray-300"
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
      {filteredData.length > 0 ? (
        <Table
          columns={columns}
          data={filteredData}
          actionButtons={isSuperAdmin ? undefined : (row) => [
            {
              label: "Edit",
              onClick: () => {
                navigate(`/admin/courses/edit/${row._id}`);
              },
              className: "text-emerald-600 hover:text-emerald-700 font-medium bg-emerald-50 border border-emerald-100 dark:bg-emerald-900 dark:border-transparent dark:text-gray-300 dark:hover:bg-emerald-800",
            },
            {
              label: "Delete",
              onClick: async () => {
                const confirmed = await confirm({ title: "Delete Course", message: "Are you sure you want to delete this course?", confirmText: "Delete", variant: "danger" });
                if (confirmed) {
                  await adminApi.deleteCourse(row._id);
                  setCourses((prev) => prev.filter((course) => course._id !== row._id));
                  toast.success("Course deleted");
                }
              },
              className: "text-red-600 hover:text-red-700 font-medium bg-red-50 border border-red-100 dark:bg-red-900 dark:border-transparent dark:text-gray-300 dark:hover:bg-red-800",
            }
          ]}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-12 rounded-sm border border-dashed border-gray-300 dark:border-college-gold/20">
          <h3 className="text-lg font-medium text-college-navy dark:text-white">No courses found</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 mb-4 max-w-sm text-center">
            There are no courses matching your search criteria. Try adjusting your filters or add a new course.
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseList;

