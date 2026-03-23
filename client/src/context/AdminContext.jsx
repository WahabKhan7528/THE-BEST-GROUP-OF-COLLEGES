import { createContext, useContext, useState, useEffect } from "react";
import { mockAdminUser, mockCampuses } from "../data/adminData";
import { useThemeContext } from "./ThemeContext";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Current logged-in admin user
  const [currentAdmin, setCurrentAdmin] = useState(mockAdminUser);

  // Selected campus filter for data display ('all' for Super Admin unified view, or specific campus id)
  const [selectedCampusFilter, setSelectedCampusFilter] = useState("all");

  // All campuses in the system
  const [campuses, setCampuses] = useState(mockCampuses);

  // Sub-Admin to Campus allocation mapping
  const [adminCampusAllocations, setAdminCampusAllocations] = useState({
    "U-002": ["law"],  // Ahmed Khan → Law Campus
    "U-003": ["main"], // Fatima Ali → Main Campus
    "U-004": ["main"], // Sub-Admin restricted to Main Campus
  });

  const { isDarkMode, toggleDarkMode } = useThemeContext();

  // Check if current admin is Super Admin
  const isSuperAdmin = currentAdmin?.adminRole === "Super Admin";

  // Get the single allocated campus id for a sub-admin (null for super admin)
  const getSubAdminCampus = () => {
    if (isSuperAdmin) return null;
    const allocations = adminCampusAllocations[currentAdmin?.id];
    return allocations?.[0] || currentAdmin?.allocatedCampuses?.[0] || null;
  };

  // Auto-lock campus filter to sub-admin's campus on login/switch
  useEffect(() => {
    if (!isSuperAdmin) {
      const campus = getSubAdminCampus();
      if (campus) setSelectedCampusFilter(campus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAdmin]);

  // Get visible campuses based on current admin role
  const getVisibleCampuses = () => {
    if (isSuperAdmin) return campuses;
    return campuses.filter(c => currentAdmin?.allocatedCampuses?.includes(c.id));
  };

  // Get currently selected campus object
  const getCurrentCampusContext = () => {
    if (selectedCampusFilter === "all") return null;
    return campuses.find(c => c.id === selectedCampusFilter);
  };

  const getAdminAllocations = (adminId) => adminCampusAllocations[adminId] || [];

  // Update sub-admin campus allocation
  const updateAdminAllocations = (adminId, newCampuses) => {
    setAdminCampusAllocations(prev => ({
      ...prev,
      [adminId]: newCampuses,
    }));
  };

  // Add new campus
  const addCampus = (newCampus) => {
    setCampuses(prev => [
      ...prev,
      { ...newCampus, id: newCampus.id || Date.now() },
    ]);
  };

  // Update campus
  const updateCampus = (campusId, updatedCampus) => {
    setCampuses(prev =>
      prev.map(c => (c.id === campusId ? { ...c, ...updatedCampus } : c))
    );
  };

  // Delete campus
  const deleteCampus = (campusId) => {
    setCampuses(prev => prev.filter(c => c.id !== campusId));
  };

  // Mock: Switch admin user (for testing purposes)
  const switchAdminUser = (adminData) => {
    setCurrentAdmin(adminData);
    // useEffect will auto-set campus filter for sub-admins
    if (adminData?.adminRole === "Super Admin") {
      setSelectedCampusFilter("all");
    }
  };

  const value = {
    // State
    currentAdmin,
    selectedCampusFilter,
    campuses,
    adminCampusAllocations,
    isDarkMode,

    // Computed properties
    isSuperAdmin,

    // Methods
    setSelectedCampusFilter,
    getVisibleCampuses,
    getCurrentCampusContext,
    getAdminAllocations,
    getSubAdminCampus,
    updateAdminAllocations,
    addCampus,
    updateCampus,
    deleteCampus,
    switchAdminUser,
    toggleDarkMode,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook to use AdminContext
export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within AdminProvider");
  }
  return context;
};
