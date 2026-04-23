import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useAdminContext } from "../../../store/hooks/useAdminReduxContext";
import { useToast } from "../../../context/ToastContext";
import { useConfirm } from "../../../context/ConfirmContext";
import PublicButton from "../../../components/shared/PublicButton";
import Table from "../../../components/portal-shared/Table";
import Badge from "../../../components/shared/Badge";
import SkeletonLoading from "../../../components/shared/SkeletonLoading";
import {
  Plus,
  Search,
  Filter,
  Users,
  UserPlus,
  Shield,
  Building2,
  ChevronDown,
} from "lucide-react";
import { adminApi } from "../../../services/api";
import { createCampusMatcher } from "../../../utils/campusMatch";

const getRefId = (value) => value?._id || value?.id || value || "";

const UsersList = () => {
  const navigate = useNavigate();
  const { campuses, isSuperAdmin, currentAdmin, isDarkMode } = useAdminContext();
  const toast = useToast();
  const confirm = useConfirm();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedCampus, setSelectedCampus] = useState("");
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      try {
        const [usersRes, coursesRes, subjectsRes] = await Promise.all([
          adminApi.users(),
          adminApi.courses(),
          adminApi.subjects(),
        ]);

        const { data } = usersRes;
        setUsers(data.data || []);
        setCourses(coursesRes.data.data || []);
        setSubjects(subjectsRes.data.data || []);
      } catch {
        setUsers([]);
        setCourses([]);
        setSubjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredData = useMemo(() => {
    let result = [...users];
    const matchesCampus = createCampusMatcher(campuses);

    if (!isSuperAdmin) {
      result = result.filter(
        (user) =>
          user.role === "faculty" ||
          (user.role === "student" &&
            matchesCampus(user.campus, currentAdmin?.campus)),
      );
      result = result.filter(
        (user) => user.role === "faculty" || user.role === "student",
      );
    }

    if (selectedRole) {
      result = result.filter((user) => user.role === selectedRole);
    }

    if (isSuperAdmin && selectedCampus) {
      result = result.filter((user) => matchesCampus(user.campus, selectedCampus));
    }

    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      result = result.filter(
        (user) =>
          user.name?.toLowerCase().includes(query) ||
          user.email?.toLowerCase().includes(query) ||
          user.portalId?.toLowerCase().includes(query),
      );
    }

    return result;
  }, [users, isSuperAdmin, currentAdmin, selectedRole, selectedCampus, searchTerm]);

  // Format allocated campuses display
  const getCampusesDisplay = (campusObjOrId) => {
    const id = campusObjOrId?._id || campusObjOrId;
    return campuses.find((c) => c.id === id)?.code || campusObjOrId?.code || "N/A";
  };

  const courseById = useMemo(() => {
    const map = new Map();
    courses.forEach((course) => {
      const id = getRefId(course);
      if (id) map.set(String(id), course);
    });
    return map;
  }, [courses]);

  const subjectById = useMemo(() => {
    const map = new Map();
    subjects.forEach((subject) => {
      const id = getRefId(subject);
      if (id) map.set(String(id), subject);
    });
    return map;
  }, [subjects]);

  const getCourseLabel = (courseValue) => {
    const course = courseById.get(String(getRefId(courseValue)));
    return course?.title || course?.code || courseValue?.title || courseValue?.code || courseValue || "Not assigned";
  };

  const getSubjectLabel = (subjectValue) => {
    const subject = subjectById.get(String(getRefId(subjectValue)));
    return subject?.name || subject?.code || subjectValue?.name || subjectValue?.code || subjectValue || "";
  };

  const getAcademicDisplay = (row) => {
    if (row.role === "student") {
      return getCourseLabel(row.currentCourse) || row.department || "Not assigned";
    }

    if (row.role === "faculty") {
      const assignedSubjects = Array.isArray(row.subjects)
        ? row.subjects.map((subject) => getSubjectLabel(subject)).filter(Boolean)
        : [];
      return assignedSubjects.length > 0
        ? assignedSubjects.join(", ")
        : row.subjectSpecialization || row.department || "Not assigned";
    }

    return row.department || row.subjectSpecialization || getCourseLabel(row.currentCourse) || "N/A";
  };

  const columns = [
    {
      key: "name",
      label: "User Details",
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-semibold dark:text-white text-college-navy">
            {row.name || row.fullName || row.studentName || row.displayName || row.portalId || "Unnamed User"}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{row.email}</span>
        </div>
      )
    },
    {
      key: "role",
      label: "Role",
      render: (row) => {
        const getRoleVariant = (role) => {
          if (role === 'super_admin') return 'navy';
          if (role === 'admin') return 'gold';
          if (role === 'faculty') return 'outline';
          return 'subtle';
        };
        return (
          <Badge variant={getRoleVariant(row.role)}>
            {row.role?.replace("_", " ")}
          </Badge>
        );
      }
    },
    { key: "portalId", label: "ID" },
    {
      key: "department",
      label: "Subject / Course",
      render: (row) => (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {getAcademicDisplay(row)}
        </span>
      ),
    },
    {
      key: "campus",
      label: "Campuses",
      render: (row) => (
        <Badge variant="subtle" className="font-bold">
          {getCampusesDisplay(row.campus)}
        </Badge>
      ),
    },
  ];

  const actionButtons = (row) => [
    {
      label: "Edit",
      onClick: () => navigate(`/admin/users/edit/${row._id}`),
      className: "text-emerald-600 hover:text-emerald-700 font-medium bg-emerald-50 border border-emerald-100 dark:bg-emerald-900 dark:border-transparent dark:text-gray-300 dark:hover:bg-emerald-800",
    },
    {
      label: "Deactivate",
      onClick: async () => {
        const confirmed = await confirm({ title: "Deactivate User", message: "Are you sure you want to deactivate this user?", confirmText: "Deactivate", variant: "danger" });
        if (confirmed) {
          await adminApi.deactivateUser(row._id);
          setUsers((prev) => prev.filter((user) => user._id !== row._id));
          toast.success("User deactivated");
        }
      },
      className: "text-red-600 hover:text-red-700 font-medium bg-red-50 border border-red-100 dark:bg-red-900 dark:border-transparent dark:text-gray-300 dark:hover:bg-red-800",
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-college-navy dark:text-white tracking-tight">User Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
            Control access and manage roles across your educational network
          </p>
        </div>

        <PublicButton
          to="/admin/users/create"
          variant={isDarkMode ? "secondary" : "primary"}
          shape="slanted"
          size="md"
          className="shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          icon={UserPlus}
        >
          Create New User
        </PublicButton>
      </div>

      {/* Filters Section */}
      <div className="bg-white/60 dark:bg-college-navy backdrop-blur-md border border-white/60 dark:border-college-gold/20 p-6 rounded-sm shadow-sm space-y-6 transition-all duration-300">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          <Filter size={16} />
          <span>Filters & Search</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 dark:text-college-gold/60" />
            </div>
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-college-navy border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all text-sm dark:text-white"
            />
          </div>

          {/* Role Filter */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 text-college-navy/40 dark:text-college-gold/50 group-hover:text-college-navy dark:group-hover:text-college-gold transition-colors">
              <Shield size={18} />
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 md:py-3.5 bg-white dark:bg-college-navy/50 border border-college-navy/10 dark:border-college-gold/20 rounded-sm shadow-sm transition-all appearance-none dark:text-white font-bold text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-college-navy/10 dark:focus:ring-college-gold/10 focus:border-college-navy dark:focus:border-college-gold disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-black/20 disabled:cursor-not-allowed cursor-pointer"
            >
              <option value="" className="dark:bg-college-navy dark:text-white">All Roles</option>
              {isSuperAdmin && <option value="super_admin" className="dark:bg-college-navy dark:text-white">Super Admin</option>}
              {isSuperAdmin && <option value="admin" className="dark:bg-college-navy dark:text-white">Admin</option>}
              <option value="faculty" className="dark:bg-college-navy dark:text-white">Faculty</option>
              <option value="student" className="dark:bg-college-navy dark:text-white">Student</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-college-navy/40 dark:text-college-gold/50 group-hover:text-college-navy dark:group-hover:text-college-gold transition-colors">
              <ChevronDown size={18} />
            </div>
          </div>

          {/* Campus Filter (Super Admin only) */}
          {isSuperAdmin && (
            <div className="relative group">
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

        {/* Active Filters Summary */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-college-gold/10">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Active View
          </p>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-gray-100 dark:bg-college-gold/10 text-gray-700 dark:text-college-gold rounded-full text-xs font-semibold">
              {filteredData.length} Users Found
            </span>
            {selectedRole && (
              <span className="px-3 py-1 bg-college-gold/10 text-college-navy dark:text-college-gold rounded-full text-xs font-semibold flex items-center gap-1">
                {selectedRole}
              </span>
            )}
            {selectedCampus && (
              <span className="px-3 py-1 bg-college-navy/5 dark:bg-college-gold/10 text-college-navy dark:text-college-gold rounded-full text-xs font-semibold flex items-center gap-1">
                {campuses.find((c) => c.id === selectedCampus)?.name}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Table Section */}
      {isLoading || filteredData.length > 0 ? (
        <Table
          columns={columns}
          data={filteredData}
          actionButtons={actionButtons}
          isLoading={isLoading}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-12 rounded-sm border border-dashed border-gray-300 dark:border-college-gold/20">
          <h3 className="text-lg font-medium text-college-navy dark:text-white">No users found</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 mb-4 max-w-sm text-center">
            No users match your criteria.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedRole("");
              setSelectedCampus("");
            }}
            className="text-college-navy dark:text-college-gold text-sm font-medium hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersList;

