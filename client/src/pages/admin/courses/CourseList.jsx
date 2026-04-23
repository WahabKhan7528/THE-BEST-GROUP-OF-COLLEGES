import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useAdminContext } from "../../../store/hooks/useAdminReduxContext";
import { useToast } from "../../../context/ToastContext";
import { useConfirm } from "../../../context/ConfirmContext";
import Table from "../../../components/portal-shared/Table";
import Badge from "../../../components/shared/Badge";
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
import { createCampusMatcher } from "../../../utils/campusMatch";

const CourseList = () => {
  const navigate = useNavigate();
  const { campuses, isSuperAdmin, currentAdmin, isDarkMode } = useAdminContext();
  const toast = useToast();
  const confirm = useConfirm();

  const [selectedCampus, setSelectedCampus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      try {
        const { data } = await adminApi.courses();
        setCourses(data.data || []);
      } catch {
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, []);

  const filteredData = useMemo(() => {
    let result = [...courses];
    const matchesCampus = createCampusMatcher(campuses);

    // Search Filter
    if (searchQuery) {
      result = result.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // If Sub-Admin, only show courses offered at their allocated campuses
    if (!isSuperAdmin) {
      const campusId = currentAdmin?.campus?._id || currentAdmin?.campus;
      result = result.filter((course) => (course.campuses || []).some((campus) => matchesCampus(campus, campusId)));
    } else if (selectedCampus) {
      result = result.filter((course) => (course.campuses || []).some((campus) => matchesCampus(campus, selectedCampus)));
    }

    return result;
  }, [courses, searchQuery, isSuperAdmin, currentAdmin, selectedCampus]);

  const getCampusesDisplay = (campusObjs) => {
    const matchesCampus = createCampusMatcher(campuses);
    return (campusObjs || []).map((campusObj) => {
      const campusId = campusObj?._id || campusObj;
      const campus = campuses.find((c) => matchesCampus(c, campusId));
      return (
        <Badge
          key={campusId}
          variant="subtle"
          className="font-bold"
        >
          {campus?.code || campusObj?.code || campusId}
        </Badge>
      );
    });
  };

  const columns = [
    {
      key: "title",
      label: "Course Name",
      render: (row) => (
        <div className="flex items-start gap-3">
          <div>
            <span className="font-semibold text-college-navy dark:text-white line-clamp-1">{row.title}</span>
          </div>
        </div>
      )
    },
    {
      key: "duration",
      label: "Duration",
      render: (row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 font-medium">
            {row.duration}
          </div>
        </div>
      )
    },
    {
      key: "examSystem",
      label: "Exam System",
      render: (row) => (
        <Badge variant="outline" className="font-bold">
          {row.examSystem || row.type || "semester"}
        </Badge>
      )
    },
    {
      key: "eligibility",
      label: "Eligibility",
      render: (row) => (
        <div className="flex items-center gap-2">
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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-college-gold/60 w-4 h-4" />
          <input
            type="text"
            placeholder="Search courses by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all text-sm dark:text-white dark:placeholder-gray-400"
          />
        </div>

        {isSuperAdmin && (
          <div className="relative min-w-[200px] w-full md:w-auto group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 text-college-navy/40 dark:text-college-gold/50 group-hover:text-college-navy dark:group-hover:text-college-gold transition-colors">
              <Building2 size={18} />
            </div>
            <select
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 md:py-3.5 bg-white dark:bg-college-navy/50 border border-college-navy/10 dark:border-college-gold/20 rounded-sm shadow-sm transition-all appearance-none dark:text-white font-bold text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-college-navy/10 dark:focus:ring-college-gold/10 focus:border-college-navy dark:focus:border-college-gold disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-black/20 disabled:cursor-not-allowed cursor-pointer"
            >
              <option value="" className="dark:bg-college-navy dark:text-white">All Campuses</option>
              {campuses.map((campus) => (
                <option key={campus.id} value={campus.id} className="dark:bg-college-navy dark:text-white">
                  {campus.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-college-navy/40 dark:text-college-gold/50 group-hover:text-college-navy dark:group-hover:text-college-gold transition-colors">
              <ChevronDown size={18} />
            </div>
          </div>
        )}
      </div>

      {/* Table Section */}
      {isLoading || filteredData.length > 0 ? (
        <Table
          columns={columns}
          data={filteredData}
          isLoading={isLoading}
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

