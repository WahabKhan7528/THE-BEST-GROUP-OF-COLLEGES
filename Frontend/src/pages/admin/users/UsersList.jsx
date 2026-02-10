import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Table from "../../../components/admin/Table";
import { useAdminContext } from "../../../context/AdminContext";
import {
  Plus,
  Search,
  Filter,
  Users,
  UserPlus,
  Shield,
  GraduationCap,
  Building2
} from "lucide-react";

const UsersList = () => {
  const navigate = useNavigate();
  const { campuses, isSuperAdmin, currentAdmin } = useAdminContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedCampus, setSelectedCampus] = useState("");

  // Mock data with campus allocations
  const mockData = [
    {
      id: "U-001",
      name: "System Admin",
      email: "admin@best.edu",
      role: "Super Admin",
      adminRole: "Super Admin",
      department: "Administration",
      allocatedCampuses: ["main", "law", "hala"],
    },
    {
      id: "U-002",
      name: "Ahmed Khan",
      email: "ahmed.khan@best.edu",
      role: "Sub-Admin",
      adminRole: "Sub-Admin",
      department: "Administration",
      allocatedCampuses: ["law"],
    },
    {
      id: "U-003",
      name: "Fatima Ali",
      email: "fatima.ali@best.edu",
      role: "Sub-Admin",
      adminRole: "Sub-Admin",
      department: "Administration",
      allocatedCampuses: ["main", "hala"],
    },
    {
      id: "F-102",
      name: "Prof. Ahmed Raza",
      email: "ahmed.raza@best.edu",
      role: "Faculty",
      adminRole: null,
      department: "CS",
      allocatedCampuses: ["main"],
    },
    {
      id: "F-103",
      name: "Dr. Sarah Ahmed",
      email: "sarah.ahmed@best.edu",
      role: "Faculty",
      adminRole: null,
      department: "Law",
      allocatedCampuses: ["law"],
    },
    {
      id: "F-104",
      name: "Prof. Hassan Raza",
      email: "hassan.raza@best.edu",
      role: "Faculty",
      adminRole: null,
      department: "Business",
      allocatedCampuses: ["main", "hala"],
    },
    {
      id: "S-220",
      name: "Ayesha Khan",
      email: "ayesha.khan@best.edu",
      role: "Student",
      adminRole: null,
      department: "BSCS-5A",
      allocatedCampuses: ["main"],
    },
    {
      id: "S-221",
      name: "Ali Hassan",
      email: "ali.hassan@best.edu",
      role: "Student",
      adminRole: null,
      department: "LLB-3A",
      allocatedCampuses: ["law"],
    },
    {
      id: "S-222",
      name: "Maria Ahmed",
      email: "maria.ahmed@best.edu",
      role: "Student",
      adminRole: null,
      department: "BBA-2A",
      allocatedCampuses: ["hala"],
    },
  ];

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
          <span className="font-semibold text-gray-900">{row.name}</span>
          <span className="text-xs text-gray-500">{row.email}</span>
        </div>
      )
    },
    {
      key: "role",
      label: "Role",
      render: (row) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${row.role === 'Super Admin' ? 'bg-blue-50 text-blue-700' :
          row.role === 'Sub-Admin' ? 'bg-cyan-50 text-cyan-700' :
            row.role === 'Faculty' ? 'bg-sky-50 text-sky-700' :
              'bg-slate-50 text-slate-700'
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
      className: "text-blue-600 hover:text-blue-700 font-medium bg-blue-50 border border-blue-100",
    },
    {
      label: "Disable",
      onClick: () => alert("Disable user"),
      className: "text-rose-600 hover:text-rose-700 font-medium bg-rose-50 border border-rose-100",
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">User Management</h1>
          <p className="text-gray-500 mt-2 flex items-center gap-2">
            Control access and manage roles across your educational network
          </p>
        </div>

        <Link
          to="/admin/users/create"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all duration-200"
        >
          <UserPlus size={20} />
          Create New User
        </Link>
      </div>

      {/* Filters Section */}
      <div className="bg-white/60 backdrop-blur-md border border-white/60 p-6 rounded-2xl shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
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
              className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
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
              className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm appearance-none"
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
                className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm appearance-none"
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
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Active View
          </p>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
              {filteredData.length} Users Found
            </span>
            {selectedRole && (
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold flex items-center gap-1">
                {selectedRole}
              </span>
            )}
            {selectedCampus && (
              <span className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-xs font-semibold flex items-center gap-1">
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
        <div className="bg-white/50 backdrop-blur rounded-2xl border border-dashed border-gray-300 p-12 text-center">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No users match your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedRole("");
              setSelectedCampus("");
            }}
            className="mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersList;
