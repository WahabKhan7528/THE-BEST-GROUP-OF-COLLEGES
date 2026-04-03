import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useThemeContext } from "./ThemeContext";
import { adminApi, authApi } from "../services/api";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [selectedCampusFilter, setSelectedCampusFilter] = useState("all");
  const [campuses, setCampuses] = useState([]);

  const { isDarkMode, toggleDarkMode } = useThemeContext();

  const isSuperAdmin = currentAdmin?.role === "super_admin";

  const normalizedCampuses = useMemo(
    () =>
      campuses.map((campus) => ({
        ...campus,
        id: campus._id,
      })),
    [campuses],
  );

  useEffect(() => {
    const loadAdminContext = async () => {
      try {
        const meRes = await authApi.me();
        setCurrentAdmin(meRes.data.user || null);
      } catch {
        setCurrentAdmin(null);
      }

      try {
        const campusesRes = await adminApi.campuses();
        setCampuses(campusesRes.data.data || []);
      } catch {
        setCampuses([]);
      }
    };

    loadAdminContext();
  }, []);

  // Get the single allocated campus id for a sub-admin (null for super admin)
  const getSubAdminCampus = () => {
    if (isSuperAdmin) return null;
    return currentAdmin?.campus?._id || currentAdmin?.campus || null;
  };

  // Auto-lock campus filter to sub-admin's campus on login/switch
  useEffect(() => {
    if (!isSuperAdmin) {
      const campus = getSubAdminCampus();
      if (campus) setSelectedCampusFilter(campus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAdmin]);

  const getVisibleCampuses = () => {
    if (isSuperAdmin) return normalizedCampuses;
    const currentCampusId = getSubAdminCampus();
    return normalizedCampuses.filter((c) => c.id === currentCampusId);
  };

  // Get currently selected campus object
  const getCurrentCampusContext = () => {
    if (selectedCampusFilter === "all") return null;
    return normalizedCampuses.find((c) => c.id === selectedCampusFilter);
  };

  const getAdminAllocations = () => {
    const campusId = getSubAdminCampus();
    return campusId ? [campusId] : [];
  };

  const updateAdminAllocations = () => {};

  // Add new campus
  const addCampus = (newCampus) => {
    setCampuses((prev) => [
      ...prev,
      { ...newCampus, _id: newCampus._id || newCampus.id || Date.now().toString() },
    ]);
  };

  // Update campus
  const updateCampus = (campusId, updatedCampus) => {
    setCampuses((prev) =>
      prev.map((c) => (c._id === campusId ? { ...c, ...updatedCampus } : c)),
    );
  };

  // Delete campus
  const deleteCampus = (campusId) => {
    setCampuses((prev) => prev.filter((c) => c._id !== campusId));
  };

  const switchAdminUser = (adminData) => {
    setCurrentAdmin(adminData);
    if (adminData?.role === "super_admin") {
      setSelectedCampusFilter("all");
    }
  };

  const value = {
    // State
    currentAdmin,
    selectedCampusFilter,
    campuses: normalizedCampuses,
    adminCampusAllocations: {},
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
