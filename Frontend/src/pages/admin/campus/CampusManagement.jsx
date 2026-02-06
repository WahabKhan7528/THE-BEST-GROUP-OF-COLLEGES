import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../../../context/AdminContext";
import Table from "../../../components/admin/Table";
import Button from "../../../components/ui/Button";

const CampusManagement = () => {
  const navigate = useNavigate();
  const { campuses, isSuperAdmin } = useAdminContext();
  const [searchTerm, setSearchTerm] = useState("");

  if (!isSuperAdmin) {
    return (
      <div className="p-8 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-xl font-semibold text-red-800">Access Denied</h2>
        <p className="text-red-600">
          Only Super Admins can access Campus Management.
        </p>
      </div>
    );
  }

  const filteredCampuses = campuses.filter(
    (campus) =>
      campus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campus.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campus.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const columns = [
    { key: "name", label: "Campus Name", width: "25%" },
    { key: "code", label: "Code", width: "15%" },
    { key: "location", label: "Location", width: "25%" },
  ];

  const handleEdit = (campus) => {
    navigate(`/admin/campus/${campus.id}/edit`, { state: { campus } });
  };

  const handleManageAdmins = (campus) => {
    navigate(`/admin/campus/${campus.id}/allocate-admin`, {
      state: { campus },
    });
  };

  const handleAddCampus = () => {
    navigate("/admin/campus/create");
  };

  const actionButtons = (row) => [
    {
      label: "Manage Admins",
      onClick: () => handleManageAdmins(row),
      className: "text-blue-600 hover:text-blue-800",
    },
    {
      label: "Edit",
      onClick: () => handleEdit(row),
      className: "text-green-600 hover:text-green-800",
    },
    {
      label: "Delete",
      onClick: () => {
        if (window.confirm(`Delete campus "${row.name}"?`)) {
          alert("Delete functionality will be connected to backend");
        }
      },
      className: "text-red-600 hover:text-red-800",
    },
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Campus Management</h1>
        <Button
          onClick={handleAddCampus}
          className="bg-blue-600 hover:bg-blue-700"
        >
          + Add Campus
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search campuses by name, code, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Campus Table */}
      {filteredCampuses.length > 0 ? (
        <Table
          data={filteredCampuses}
          columns={columns}
          actionButtons={actionButtons}
        />
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">
            No campuses found. Create the first one!
          </p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-800">
            Total Campuses
          </h3>
          <p className="text-2xl font-bold text-blue-600">{campuses.length}</p>
        </div>
      </div>
    </div>
  );
};

export default CampusManagement;
