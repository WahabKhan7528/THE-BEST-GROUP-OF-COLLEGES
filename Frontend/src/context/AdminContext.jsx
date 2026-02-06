import React, { createContext, useContext, useState } from "react";

// Create the context
const AdminContext = createContext();

// Mock current admin user - will be replaced with real auth data from backend
const mockAdminUser = {
  id: "U-001",
  name: "System Admin",
  email: "admin@best.edu",
  adminRole: "Super Admin", // 'Super Admin' | 'Sub-Admin'
  allocatedCampuses: ["main", "law", "hala"], // Super Admin has all
};

// Mock campuses data
const mockCampuses = [
  { id: "main", name: "Main Campus", code: "MC", location: "Islamabad" },
  { id: "law", name: "Law Campus", code: "LC", location: "Islamabad" },
  { id: "hala", name: "Hala Campus", code: "HC", location: "Hala" },
];

export const AdminProvider = ({ children }) => {
  // Current logged-in admin user
  const [currentAdmin, setCurrentAdmin] = useState(mockAdminUser);

  // Selected campus filter for data display ('all' for Super Admin unified view, or specific campus id)
  const [selectedCampusFilter, setSelectedCampusFilter] = useState("all");

  // All campuses in the system
  const [campuses, setCampuses] = useState(mockCampuses);

  // Sub-Admin to Campus allocation mapping
  const [adminCampusAllocations, setAdminCampusAllocations] = useState({
    "U-003": ["law"], // Example: Sub-Admin allocated to Law Campus
    "U-004": ["main", "hala"], // Example: Sub-Admin can manage multiple campuses
  });

  // Check if current admin is Super Admin
  const isSuperAdmin = currentAdmin?.adminRole === "Super Admin";

  // Get visible campuses based on current admin role
  const getVisibleCampuses = () => {
    if (isSuperAdmin) {
      return campuses;
    }
    // Sub-Admin sees only their allocated campuses
    return campuses.filter((c) =>
      currentAdmin?.allocatedCampuses?.includes(c.id),
    );
  };

  // Get currently selected campus object
  const getCurrentCampusContext = () => {
    if (selectedCampusFilter === "all" || !isSuperAdmin) {
      return null; // No specific campus context
    }
    return campuses.find((c) => c.id === selectedCampusFilter);
  };

  // Get admin allocations for a specific sub-admin
  const getAdminAllocations = (adminId) => {
    return adminCampusAllocations[adminId] || [];
  };

  // Update sub-admin campus allocation
  const updateAdminAllocations = (adminId, newCampuses) => {
    setAdminCampusAllocations({
      ...adminCampusAllocations,
      [adminId]: newCampuses,
    });
  };

  // Add new campus
  const addCampus = (newCampus) => {
    setCampuses([
      ...campuses,
      { ...newCampus, id: newCampus.id || Date.now() },
    ]);
  };

  // Update campus
  const updateCampus = (campusId, updatedCampus) => {
    setCampuses(
      campuses.map((c) => (c.id === campusId ? { ...c, ...updatedCampus } : c)),
    );
  };

  // Delete campus
  const deleteCampus = (campusId) => {
    setCampuses(campuses.filter((c) => c.id !== campusId));
  };

  // Mock: Switch admin user (for testing purposes)
  const switchAdminUser = (adminData) => {
    setCurrentAdmin(adminData);
    setSelectedCampusFilter("all"); // Reset filter when switching users
  };

  const value = {
    // State
    currentAdmin,
    selectedCampusFilter,
    campuses,
    adminCampusAllocations,

    // Computed properties
    isSuperAdmin,

    // Methods
    setSelectedCampusFilter,
    getVisibleCampuses,
    getCurrentCampusContext,
    getAdminAllocations,
    updateAdminAllocations,
    addCampus,
    updateCampus,
    deleteCampus,
    switchAdminUser,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
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
