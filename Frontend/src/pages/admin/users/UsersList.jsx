import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Table from "../../../components/admin/Table";
import { useAdminContext } from "../../../context/AdminContext";

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
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "id", label: "ID" },
    { key: "department", label: "Department/Class" },
    {
      key: "allocatedCampuses",
      label: "Allocated Campuses",
      render: (row) => (
        <span className="text-sm">
          {getCampusesDisplay(row.allocatedCampuses)}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">User Management</p>
          <h1 className="text-2xl font-semibold text-gray-900">
            Admins, Faculty, Students
          </h1>
        </div>
        <Link
          to="/admin/users/create"
          className="px-4 py-2 bg-purple-700 text-white rounded-lg text-sm font-semibold hover:bg-purple-800"
        >
          Create User
        </Link>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg border p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Role Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Campus
              </label>
              <select
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
        <div className="pt-2 border-t">
          <p className="text-sm text-gray-600">
            <strong>Showing:</strong> {filteredData.length} user
            {filteredData.length !== 1 ? "s" : ""}
            {selectedRole && ` • Role: ${selectedRole}`}
            {selectedCampus &&
              ` • Campus: ${campuses.find((c) => c.id === selectedCampus)?.name}`}
          </p>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={filteredData}
        actions={(row) => (
          <div className="flex items-center gap-2 text-sm">
            <Link
              to={`/admin/users/edit/${row.id}`}
              className="text-purple-700 font-semibold hover:text-purple-800"
            >
              Edit
            </Link>
            <button className="text-rose-600 hover:text-rose-700">
              Disable
            </button>
          </div>
        )}
      />

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="bg-white p-8 rounded-lg text-center">
          <p className="text-gray-600 mb-4">
            No users found with the selected filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedRole("");
              setSelectedCampus("");
            }}
            className="text-purple-700 font-semibold hover:text-purple-800"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersList;
