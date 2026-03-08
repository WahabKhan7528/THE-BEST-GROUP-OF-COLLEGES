import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import PublicButton from "../../../components/shared/PublicButton";
import Table from "../../../components/admin/Table";
import {
  Plus,
  Search,
  Filter,
  Users,
  UserPlus,
  Shield,
  Building2,
} from "lucide-react";
import { mockUsersData as adminUsers } from "../../../data/adminData";

const UsersList = () => {
  const navigate = useNavigate();
  const { campuses, isSuperAdmin, currentAdmin, isDarkMode } = useAdminContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedCampus, setSelectedCampus] = useState("");

  const mockData = adminUsers;

  // Filter data based on user role and selected filters
  let filteredData = mockData;

  // If Sub-Admin, only show users from their allocated campuses
  if (!isSuperAdmin) {
    filteredData = filteredData.filter((user) =>
      user.allocatedCampuses.some((campus) =>
        currentAdmin?.allocatedCampuses?.includes(campus),
      ),
    );
  }

  // Apply role filter
  if (selectedRole) {
    filteredData = filteredData.filter((user) => user.role === selectedRole);
  }

  // Apply campus filter (Super Admin only)
  if (isSuperAdmin && selectedCampus) {
    filteredData = filteredData.filter((user) =>
      user.allocatedCampuses.includes(selectedCampus),
    );
  }

  // Apply search term
  if (searchTerm) {
    filteredData = filteredData.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  // Format allocated campuses display
  const getCampusesDisplay = (campusIds) => {
    return campusIds
      .map((cId) => campuses.find((c) => c.id === cId)?.code || cId)
      .join(", ");
  };

  const columns = [
    {
      key: "name",
      label: "User Details",
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-semibold text-college-navy">{row.name}</span>
          <span className="text-xs text-gray-500">{row.email}</span>
        </div>
      )
    },
    {
      key: "role",
      label: "Role",
      render: (row) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${row.role === 'Super Admin' ? 'bg-college-navy/10 text-college-navy dark:text-college-gold' :
          row.role === 'Sub-Admin' ? 'bg-college-gold/10 text-college-navy dark:text-college-gold' :
            row.role === 'Faculty' ? 'bg-white dark:bg-college-navy/50 border border-college-gold/20 text-college-navy dark:text-college-gold' :
              'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-400'
          }`}>
          {row.role}
        </span>
      )
    },
    { key: "id", label: "ID" },
    { key: "department", label: "Department / Class" },
    {
      key: "allocatedCampuses",
      label: "Campuses",
      render: (row) => (
        <span className="text-sm bg-gray-50 px-2 py-1 rounded border border-gray-100 font-medium text-gray-600">
          {getCampusesDisplay(row.allocatedCampuses)}
        </span>
      ),
    },
  ];

  const actionButtons = (row) => [
    {
      label: "Edit",
      onClick: () => navigate(`/admin/users/edit/${row.id}`),
      className: "text-emerald-600 hover:text-emerald-700 font-medium bg-emerald-50 border border-emerald-100 dark:bg-emerald-900 dark:border-transparent dark:text-gray-300 dark:hover:bg-emerald-800",
    },
    {
      label: "Disable",
      onClick: () => alert("Disable user"),
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
          size="lg"
          className="shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          icon={UserPlus}
        >
          Create New User
        </PublicButton>
      </div>

      {/* Filters Section */}
      <div className="bg-white/60 dark:bg-college-navy backdrop-blur-md border border-white/60 dark:border-college-gold/20 p-6 rounded-2xl shadow-sm space-y-6 transition-all duration-300">
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
              className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-college-navy border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all text-sm dark:text-white"
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
              className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-college-navy border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all text-sm appearance-none dark:text-white"
            >
              <option value="">All Roles</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Sub-Admin">Sub-Admin</option>
              <option value="Faculty">Faculty</option>
              <option value="Student">Student</option>
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
                className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-college-navy border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all text-sm appearance-none dark:text-white"
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
      {filteredData.length > 0 ? (
        <Table
          columns={columns}
          data={filteredData}
          actionButtons={actionButtons}
        />
      ) : (
        <div className="bg-white/50 dark:bg-college-navy backdrop-blur rounded-2xl border border-dashed border-gray-300 dark:border-college-gold/20 p-12 text-center transition-all duration-300">
          <Users className="w-12 h-12 text-gray-300 dark:text-college-gold/30 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400 font-medium">No users match your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedRole("");
              setSelectedCampus("");
            }}
            className="mt-4 text-college-navy dark:text-college-gold hover:underline font-semibold text-sm"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersList;
