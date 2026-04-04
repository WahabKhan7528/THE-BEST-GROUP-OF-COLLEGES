import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../../../store/hooks/useAdminReduxContext";
import { useToast } from "../../../context/ToastContext";
import { useConfirm } from "../../../context/ConfirmContext";
import PublicButton from "../../../components/shared/PublicButton";
import Table from "../../../components/portal-shared/Table";
import {
  Plus,
  Search,
  MapPin,
  Building2,
  ShieldCheck,
  School
} from "lucide-react";
import { adminApi } from "../../../services/api";

const CampusManagement = () => {
  const navigate = useNavigate();
  const { campuses: contextCampuses, isSuperAdmin, isDarkMode, deleteCampus: deleteCampusState } = useAdminContext();
  const toast = useToast();
  const confirmDialog = useConfirm();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [campuses, setCampuses] = useState([]);

  React.useEffect(() => {
    const loadCampuses = async () => {
      setIsLoading(true);
      try {
        const { data } = await adminApi.campuses();
        setCampuses(data.data.map(c => ({ ...c, id: c._id })) || []);
      } catch {
        setCampuses(contextCampuses || []);
      } finally {
        setIsLoading(false);
      }
    };
    loadCampuses();
  }, [contextCampuses]);

  if (!isSuperAdmin) {
    return (
      <div className="p-8 bg-college-navy/5 dark:bg-college-gold/10 backdrop-blur-sm border border-college-navy/10 dark:border-college-gold/20 rounded-sm flex items-center gap-4">
        <div className="p-3 bg-college-navy/20 dark:bg-college-gold/20 rounded-sm text-college-navy dark:text-white">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-college-navy dark:text-white">Access Denied</h2>
          <p className="text-college-navy/70 dark:text-gray-300 mt-1">
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
      className: "text-purple-600 hover:text-purple-700 font-medium bg-purple-50 border border-purple-100 dark:bg-purple-900 dark:border-transparent dark:text-gray-300 dark:hover:bg-purple-800",
    },
    {
      label: "Edit",
      onClick: () => handleEdit(row),
      className: "text-emerald-600 hover:text-emerald-700 font-medium bg-emerald-50 border border-emerald-100 dark:bg-emerald-900 dark:border-transparent dark:text-gray-300 dark:hover:bg-emerald-800",
    },
    {
      label: "Delete",
      onClick: async () => {
        const confirmed = await confirmDialog({ title: "Delete Campus", message: `Delete campus "${row.name}"?`, confirmText: "Delete", variant: "danger" });
        if (confirmed) {
          try {
            await adminApi.deleteCampus(row._id);
            deleteCampusState(row._id);
            toast.success("Campus deleted");
          } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete campus");
          }
        }
      },
      className: "text-red-600 hover:text-red-700 font-medium bg-red-50 border border-red-100 dark:bg-red-900 dark:border-transparent dark:text-gray-300 dark:hover:bg-red-800",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-college-navy dark:text-white tracking-tight">Campus Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
            Manage your educational centers and administrative allocation
          </p>
        </div>

        <PublicButton
          onClick={handleAddCampus}
          variant={isDarkMode ? "secondary" : "primary"}
          shape="slanted"
          size="md"
          icon={Plus}
        >
          Add New Campus
        </PublicButton>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-college-navy border border-gray-200 dark:border-college-gold/20 rounded-sm p-6 shadow-sm flex items-center gap-5 transition-all duration-300">
          <div className="w-14 h-14 rounded-sm bg-college-navy/10 dark:bg-college-gold/10 flex items-center justify-center text-college-navy dark:text-college-gold shadow-sm">
            <School size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Campuses</p>
            <p className="text-3xl font-bold text-college-navy dark:text-white">{campuses.length}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-college-navy border border-gray-200 dark:border-college-gold/20 rounded-sm p-6 shadow-sm flex items-center gap-5 transition-all duration-300">
          <div className="w-14 h-14 rounded-sm bg-college-navy/10 dark:bg-college-gold/10 flex items-center justify-center text-college-navy dark:text-college-gold shadow-sm">
            <MapPin size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Locations</p>
            <p className="text-3xl font-bold text-college-navy dark:text-white">{campuses.length}</p>
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
          className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-college-navy border border-gray-200 dark:border-college-gold/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all shadow-sm text-college-navy dark:text-white"
        />
      </div>

      {/* Campus Table */}
      {isLoading || filteredCampuses.length > 0 ? (
        <Table
          data={filteredCampuses}
          columns={columns}
          isLoading={isLoading}
          actionButtons={actionButtons}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-12 rounded-sm border border-dashed border-gray-300 dark:border-college-gold/20">
          <h3 className="text-lg font-medium text-college-navy dark:text-white">No campuses found</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 max-w-sm text-center">Try adjusting your search or add a new campus.</p>
        </div>
      )}
    </div>
  );
};

export default CampusManagement;

