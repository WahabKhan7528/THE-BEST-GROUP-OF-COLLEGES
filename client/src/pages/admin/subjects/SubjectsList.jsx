import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useAdminContext } from "../../../store/hooks/useAdminReduxContext";
import { useToast } from "../../../context/ToastContext";
import { useConfirm } from "../../../context/ConfirmContext";
import PublicButton from "../../../components/shared/PublicButton";
import Table from "../../../components/portal-shared/Table";
import Badge from "../../../components/shared/Badge";
import {
  Plus,
  Search,
  Filter,
  BookOpen,
  Building2,
  Hash,
} from "lucide-react";
import { adminApi } from "../../../services/api";
import { createCampusMatcher } from "../../../utils/campusMatch";

const SubjectsList = () => {
  const navigate = useNavigate();
  const { campuses, isSuperAdmin, currentAdmin, isDarkMode } = useAdminContext();
  const toast = useToast();
  const confirm = useConfirm();

  const [selectedCampus, setSelectedCampus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSubjects = async () => {
      setIsLoading(true);
      try {
        const { data } = await adminApi.subjects();
        setSubjects(data.data || []);
      } catch {
        setSubjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadSubjects();
  }, []);

  const normalizedSubjects = useMemo(
    () =>
      subjects.map((subject) => ({
        ...subject,
        class: subject.course?.title || "General",
        facultyName: (subject.faculty || []).map((f) => f.name).join(", ") || "Not assigned",
      })),
    [subjects],
  );

  let filteredData = [...normalizedSubjects];
  const matchesCampus = createCampusMatcher(campuses);

  // 1. Filter by Role & Campus
  if (!isSuperAdmin) {
    const adminCampusId = String(currentAdmin?.campus?._id || currentAdmin?.campus || "");
    if (adminCampusId) {
      filteredData = filteredData.filter((subject) => {
        const campuses = subject.campuses || [];
        if (!campuses.length) return true;
        return campuses.some((campus) => matchesCampus(campus, adminCampusId));
      });
    }
  } else if (selectedCampus) {
    filteredData = filteredData.filter((subject) =>
      (subject.campuses || []).some((campus) => matchesCampus(campus, selectedCampus)),
    );
  }

  // 2. Filter by Search Query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredData = filteredData.filter(
      (sub) =>
        sub.name.toLowerCase().includes(query) ||
        sub.code.toLowerCase().includes(query) ||
        sub.class.toLowerCase().includes(query) ||
        sub.facultyName.toLowerCase().includes(query),
    );
  }

  const getCampusName = (campusId) => {
    const matchedCampus = campuses.find((c) => matchesCampus(c, campusId));
    return matchedCampus?.name || campusId;
  };

  const columns = [
    {
      key: "name",
      label: "Subject",
      render: (row) => (
        <div className="flex items-center gap-3">
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
        <Badge variant="subtle" className="font-mono font-bold">
          {row.code}
        </Badge>
      )
    },
    ...(isSuperAdmin ? [{
      key: "faculty",
      label: "Faculty",
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-sm bg-college-navy dark:bg-college-gold flex items-center justify-center text-white dark:text-college-navy text-xs font-bold">
            {row.facultyName.charAt(0)}
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{row.facultyName}</span>
        </div>
      )
    }, {
      key: "campuses",
      label: "Campuses",
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {(row.campuses || []).map((campus) => {
            const campusId = campus?._id || campus;
            return (
              <Badge
                key={campusId}
                variant="subtle"
                className="font-bold"
              >
                {getCampusName(campusId)}
              </Badge>
            );
          })}
        </div>
      ),
    }] : []),
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-college-navy dark:text-white">
            Subjects & Assignments
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage course curriculum and campus-specific subject offerings
          </p>
        </div>
        {!isSuperAdmin && (
          <PublicButton
            to="/admin/subjects/create"
            variant={isDarkMode ? "secondary" : "primary"}
            shape="slanted"
            size="md"
            icon={Plus}
          >
            Add New Subject
          </PublicButton>
        )}
      </div>

      {/* Filters Section */}
      <div className="bg-white/80 dark:bg-college-navy backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-4 rounded-sm shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="relative col-span-1 lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search subjects, codes, or faculty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all text-sm dark:text-white dark:placeholder-gray-400"
            />
          </div>

          {/* Campus Filter (Super Admin) */}
          {isSuperAdmin && (
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="w-full pl-10 pr-8 py-2 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all text-sm appearance-none cursor-pointer dark:text-gray-300"
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
      {isLoading || filteredData.length > 0 ? (
        <Table
          columns={columns}
          data={filteredData}
          isLoading={isLoading}
          actionButtons={isSuperAdmin ? undefined : (row) => [
            {
              label: "Edit",
              onClick: () => navigate(`/admin/subjects/edit/${row._id}`),
              className: "text-emerald-600 hover:text-emerald-700 font-medium bg-emerald-50 border border-emerald-100 dark:bg-emerald-900 dark:border-transparent dark:text-gray-300 dark:hover:bg-emerald-800",
            },
            {
              label: "Delete",
              onClick: async () => {
                const confirmed = await confirm({ title: "Delete Subject", message: "Are you sure you want to delete this subject?", confirmText: "Delete", variant: "danger" });
                if (confirmed) {
                  await adminApi.deleteSubject(row._id);
                  setSubjects((prev) => prev.filter((subject) => subject._id !== row._id));
                  toast.success("Subject deleted");
                }
              },
              className: "text-red-600 hover:text-red-700 font-medium bg-red-50 border border-red-100 dark:bg-red-900 dark:border-transparent dark:text-gray-300 dark:hover:bg-red-800",
            },
          ]}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-12 rounded-sm border border-dashed border-gray-300 dark:border-college-gold/20">
          <h3 className="text-lg font-medium text-college-navy dark:text-white">No subjects found</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 mb-4 max-w-sm text-center">
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

