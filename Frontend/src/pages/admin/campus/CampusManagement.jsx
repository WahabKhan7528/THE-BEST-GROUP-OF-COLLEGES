import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../../../context/AdminContext";
import Table from "../../../components/admin/Table";
import {
  Plus,
  Search,
  MapPin,
  Building2,
  ShieldCheck,
  School
} from "lucide-react";

const CampusManagement = () => {
  const navigate = useNavigate();
  const { campuses, isSuperAdmin } = useAdminContext();
  const [searchTerm, setSearchTerm] = useState("");

  if (!isSuperAdmin) {
    return (
      <div className="p-8 bg-red-50/50 backdrop-blur-sm border border-red-200 rounded-2xl flex items-center gap-4">
        <div className="p-3 bg-red-100 rounded-xl text-red-600">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-red-900">Access Denied</h2>
          <p className="text-red-700 mt-1">
            Only Super Admins can access Campus Management.
          </p>
        </div>
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
    { key: "name", label: "Campus Name" },
    { key: "code", label: "Code" },
    { key: "location", label: "Location" },
  ];

  const handleEdit = (campus) => {
    navigate(`/admin/campus/${campus.id}/edit`, { state: { campus } });
  };

  const handleManageAdmins = (campus) => {
    navigate(`/admin/campus/${campus.id}/admins`, {
      state: { campus },
    });
  };

  const handleAddCampus = () => {
    navigate("/admin/campus/create");
  };

  const actionButtons = (row) => [
    {
      label: "Admins",
      onClick: () => handleManageAdmins(row),
      className: "text-blue-600 hover:text-blue-700 font-medium bg-blue-50 border border-blue-100",
    },
    {
      label: "Edit",
      onClick: () => handleEdit(row),
      className: "text-cyan-600 hover:text-cyan-700 font-medium bg-cyan-50 border border-cyan-100",
    },
    {
      label: "Delete",
      onClick: () => {
        if (window.confirm(`Delete campus "${row.name}"?`)) {
          alert("Delete functionality will be connected to backend");
        }
      },
      className: "text-red-600 hover:text-red-700 font-medium bg-red-50 border border-red-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Campus Management</h1>
          <p className="text-gray-500 mt-2 flex items-center gap-2">
            Manage your educational centers and administrative allocation
          </p>
        </div>

        <button
          onClick={handleAddCampus}
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
        >
          <Plus size={20} />
          Add New Campus
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 shadow-sm">
            <School size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Campuses</p>
            <p className="text-3xl font-bold text-gray-900">{campuses.length}</p>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 shadow-sm">
            <Building2 size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Departments</p>
            <p className="text-3xl font-bold text-gray-900">12</p>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-sm flex items-center gap-5 ">
          <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 shadow-sm">
            <MapPin size={28} />
          </div>
          <div >
            <p className="text-sm font-medium text-gray-500">Total Locations</p>
            <p className="text-3xl font-bold text-gray-900">{campuses.length}</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search campuses by name, code, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm text-gray-700"
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
        <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <School className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900">No campuses found</h3>
          <p className="text-gray-500">Try adjusting your search or add a new campus.</p>
        </div>
      )}
    </div>
  );
};

export default CampusManagement;
