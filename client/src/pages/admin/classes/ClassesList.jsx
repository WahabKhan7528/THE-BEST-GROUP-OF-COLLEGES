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
  Filter,
  Users,
  Building2,
  ChevronDown,
} from "lucide-react";
import { adminApi } from "../../../services/api";
import { createCampusMatcher } from "../../../utils/campusMatch";


const ClassesList = () => {
  const navigate = useNavigate();
  const { campuses, isSuperAdmin, currentAdmin, isDarkMode } = useAdminContext();

  const toast = useToast();
  const confirm = useConfirm();
  const [selectedCampus, setSelectedCampus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadClasses = async () => {
      setIsLoading(true);
      try {
        const { data } = await adminApi.classes();
        setClasses(data.data || []);
      } catch {
        setClasses([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadClasses();
  }, []);

  const normalizedClasses = useMemo(
    () =>
      classes.map((cls) => ({
        ...cls,
        id: cls._id,
        currentTerm: cls.semester || cls.annualYear || "Not assigned",
        lockedSemesters: (cls.semesterSubjects || []).filter((semester) => semester.status === "locked" || semester.status === "completed" || semester.resultPublished).length,
        totalSemesters: (cls.semesterSubjects || []).length,
        studentsCount: cls.students?.length || 0,
      })),
    [classes],
  );

  let filteredData = [...normalizedClasses];
  const matchesCampus = createCampusMatcher(campuses);

  // 1. Filter by Role & Campus
  if (!isSuperAdmin) {
    filteredData = filteredData.filter((cls) =>
      matchesCampus(cls.campus, currentAdmin?.campus),
    );
  } else if (selectedCampus) {
    filteredData = filteredData.filter((cls) => matchesCampus(cls.campus, selectedCampus));
  }

  // 2. Filter by Search Query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredData = filteredData.filter(
      (cls) =>
        cls.name.toLowerCase().includes(query) ||
        String(cls.currentTerm).toLowerCase().includes(query) ||
        String(cls.totalSemesters).toLowerCase().includes(query)
    );
  }

  const getCampusName = (campusId) => {
    const matchedCampus = campuses.find((c) => matchesCampus(c, campusId));
    return matchedCampus?.name || campusId;
  };

  const columns = [
    {
      key: "name",
      label: "Class Info",
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-semibold text-college-navy dark:text-white group-hover:text-college-gold transition-colors">{row.name}</span>
          <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-tight">
            {row.studentsCount} Registered Students
          </span>
        </div>
      )
    },
    {
      key: "currentTerm",
      label: "Current Term",
      render: (row) => (
        <div className="flex flex-col gap-1">
          <Badge variant="subtle" className="w-fit font-bold">
            {row.currentTerm}
          </Badge>
          <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest pl-0.5">Section {row.section || "A"}</span>
        </div>
      )
    },
    {
      key: "studentsCount",
      label: "Students",
      render: (row) => (
        <span className="text-sm font-bold text-college-navy dark:text-college-gold">
          {row.studentsCount}
        </span>
      )
    },
    {
      key: "lockedSemesters",
      label: "Locked Semesters",
      render: (row) => (
        <Badge variant="outline" className="font-bold">
          {row.lockedSemesters}/{row.totalSemesters}
        </Badge>
      )
    },
    ...(isSuperAdmin ? [{
      key: "campus",
      label: "Campus",
      render: (row) => (
        <Badge variant="subtle" className="font-bold">
          {getCampusName(row.campus?._id || row.campus)}
        </Badge>
      ),
    }] : []),
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-college-navy dark:text-white">
            Classes Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage academic classes, sections, and subject allocations
          </p>
        </div>
        {!isSuperAdmin && (
          <PublicButton
            to="/admin/classes/create"
            variant={isDarkMode ? "secondary" : "primary"}
            shape="slanted"
            size="md"
            className="shadow-md transition-all duration-200"
            icon={Plus}
          >
            Create New Class
          </PublicButton>
        )}
      </div>

      {/* Filters Section */}
      <div className="bg-white/80 dark:bg-college-navy backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-4 rounded-sm shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="relative col-span-1 lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-college-gold/60 w-4 h-4" />
            <input
              type="text"
              placeholder="Search classes, subjects, or faculty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all text-sm dark:text-white dark:placeholder-gray-400"
            />
          </div>

          {/* Campus Filter (Super Admin) */}
          {isSuperAdmin && (
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 text-college-navy/40 dark:text-college-gold/50 group-hover:text-college-navy dark:group-hover:text-college-gold transition-colors">
                <Filter size={18} />
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
              onClick: () => navigate(`/admin/classes/edit/${row.id}`),
              className: "text-emerald-600 hover:text-emerald-700 font-medium bg-emerald-50 border border-emerald-100 dark:bg-emerald-900 dark:border-transparent dark:text-gray-300 dark:hover:bg-emerald-800",
            },
            {
              label: "Delete",
              onClick: async () => {
                const confirmed = await confirm({ title: "Delete Class", message: "Are you sure you want to delete this class?", confirmText: "Delete", variant: "danger" });
                if (confirmed) {
                  await adminApi.deleteClass(row.id);
                  setClasses((prev) => prev.filter((cls) => cls._id !== row.id));
                  toast.success("Class deleted");
                }
              },
              className: "text-red-600 hover:text-red-700 font-medium bg-red-50 border border-red-100 dark:bg-red-900 dark:border-transparent dark:text-gray-300 dark:hover:bg-red-800",
            },
          ]}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-12 rounded-sm border border-dashed border-gray-300 dark:border-college-gold/20">
          <h3 className="text-lg font-medium text-college-navy dark:text-white">No classes found</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 mb-4 max-w-sm text-center">
            {searchQuery || selectedCampus
              ? "Try adjusting your search or filters to find what you're looking for."
              : "Get started by creating a new class for your academic schedule."}
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

export default ClassesList;


