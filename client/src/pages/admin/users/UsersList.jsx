import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useAdminContext } from "../../../store/hooks/useAdminReduxContext";
import { useToast } from "../../../context/ToastContext";
import { useConfirm } from "../../../context/ConfirmContext";
import PublicButton from "../../../components/shared/PublicButton";
import Table from "../../../components/portal-shared/Table";
import SkeletonLoading from "../../../components/shared/SkeletonLoading";
import {
  Plus,
  Search,
  Filter,
  Users,
  UserPlus,
  Shield,
  Building2,
} from "lucide-react";
import { adminApi } from "../../../services/api";

const UsersList = () => {
  const navigate = useNavigate();
  const { campuses, isSuperAdmin, currentAdmin, isDarkMode } = useAdminContext();
  const toast = useToast();
  const confirm = useConfirm();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedCampus, setSelectedCampus] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      try {
        const { data } = await adminApi.users();
        setUsers(data.data || []);
      } catch {
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredData = useMemo(() => {
    let result = [...users];

    if (!isSuperAdmin) {
      result = result.filter(
        (user) => String(user.campus?._id || user.campus) === String(currentAdmin?.campus?._id || currentAdmin?.campus),
      );
      result = result.filter((user) => user.role === "faculty" || user.role === "student");
    }

    if (selectedRole) {
      result = result.filter((user) => user.role === selectedRole);
    }

    if (isSuperAdmin && selectedCampus) {
      result = result.filter((user) => String(user.campus?._id || user.campus) === selectedCampus);
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

  const columns = [
    {
      key: "name",
      label: "User Details",
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-semibold text-college-navy">
            {row.name || row.fullName || row.studentName || row.displayName || row.portalId || "Unnamed User"}
          </span>
          <span className="text-xs text-gray-500">{row.email}</span>
        </div>
      )
    },
    {
      key: "role",
      label: "Role",
      render: (row) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${row.role === 'super_admin' ? 'bg-college-navy/10 text-college-navy dark:text-college-gold' :
          row.role === 'admin' ? 'bg-college-gold/10 text-college-navy dark:text-college-gold' :
            row.role === 'faculty' ? 'bg-white dark:bg-college-navy/50 border border-college-gold/20 text-college-navy dark:text-college-gold' :
              'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-400'
          }`}>
          {row.role?.replace("_", " ")}
        </span>
      )
    },
    { key: "portalId", label: "ID" },
    { key: "department", label: "Department / Subject / Course" },
    {
      key: "campus",
      label: "Campuses",
      render: (row) => (
        <span className="text-sm bg-gray-50 px-2 py-1 rounded border border-gray-100 font-medium text-gray-600">
          {getCampusesDisplay(row.campus)}
        </span>
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
      label: "Delete",
      onClick: async () => {
        const confirmed = await confirm({ title: "Delete User", message: "Are you sure you want to delete this user?", confirmText: "Delete", variant: "danger" });
        if (confirmed) {
          await adminApi.disableUser(row._id);
          setUsers((prev) => prev.filter((user) => user._id !== row._id));
          toast.success("User deleted");
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
              <Search className="h-4 w-4 text-gray-400" />
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
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Shield className="h-4 w-4 text-gray-400" />
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-college-navy border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all text-sm appearance-none dark:text-white"
            >
              <option value="">All Roles</option>
              {isSuperAdmin && <option value="super_admin">Super Admin</option>}
              {isSuperAdmin && <option value="admin">Admin</option>}
              <option value="faculty">Faculty</option>
              <option value="student">Student</option>
            </select>
          </div>

          {/* Campus Filter (Super Admin only) */}
          {isSuperAdmin && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-college-navy border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all text-sm appearance-none dark:text-white"
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

      {/* Table */}
      {isLoading ? (
        <div className="bg-white dark:bg-college-navy border border-gray-200 dark:border-dark-border rounded-sm shadow-sm overflow-hidden">
          <div className="p-5 space-y-4">
            <SkeletonLoading count={6} variant="tableRow" containerClassName="space-y-4" />
          </div>
        </div>
      ) : filteredData.length > 0 ? (
        <Table
          columns={columns}
          data={filteredData}
          actionButtons={actionButtons}
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

