import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import PublicButton from "../../../components/shared/PublicButton";
import { useAdminContext } from "../../../context/AdminContext";
import { mockAllAdmins } from "../../../data/adminData";



const AllocateAdmin = () => {
  const navigate = useNavigate();
  const { campusId } = useParams();
  const location = useLocation();
  const { campuses, adminCampusAllocations, updateAdminAllocations, isDarkMode } =
    useAdminContext();

  const [campus, setCampus] = useState(null);
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const [currentAllocations, setCurrentAllocations] = useState({});

  useEffect(() => {
    // Get campus data
    let campusData = location.state?.campus;
    if (!campusData) {
      campusData = campuses.find((c) => c.id === campusId);
    }
    setCampus(campusData);

    // Load current allocations
    const allocations = {};
    Object.entries(adminCampusAllocations).forEach(([adminId, campusIds]) => {
      if (campusIds.includes(campusId)) {
        allocations[adminId] = true;
      }
    });
    setCurrentAllocations(allocations);
  }, [campusId, campuses, adminCampusAllocations, location.state]);

  if (!campus) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Loading campus details...</p>
      </div>
    );
  }

  const handleAdminToggle = (adminId) => {
    setSelectedAdmins((prev) =>
      prev.includes(adminId)
        ? prev.filter((id) => id !== adminId)
        : [...prev, adminId],
    );
  };

  const handleSave = () => {
    // Update allocations for all admins
    const newAllocations = { ...adminCampusAllocations };

    mockAllAdmins.forEach(({ id }) => {
      const currentCampuses = newAllocations[id] || [];
      const isNowSelected = selectedAdmins.includes(id);
      const wasAllocated = currentAllocations[id];

      if (isNowSelected && !wasAllocated) {
        // Add campus allocation
        newAllocations[id] = [...currentCampuses, campusId];
      } else if (!isNowSelected && wasAllocated) {
        // Remove campus allocation
        newAllocations[id] = currentCampuses.filter((cId) => cId !== campusId);
      }
    });

    // Update context
    Object.entries(newAllocations).forEach(([adminId, campuses]) => {
      updateAdminAllocations(adminId, campuses);
    });

    alert("Admin allocations updated! (Mock - will be connected to backend)");
    navigate("/admin/campus");
  };

  const getCurrentAllocatedAdmins = () => {
    return Object.entries(adminCampusAllocations)
      .filter(([, campusIds]) => campusIds.includes(campusId))
      .map(([adminId]) => adminId);
  };

  const currentAllocatedAdmins = getCurrentAllocatedAdmins();

  return (
    <div className="w-full mx-auto bg-white/80 dark:bg-college-navy backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-8 rounded-2xl shadow-sm">
      <h1 className="text-3xl font-bold text-college-navy dark:text-white mb-2">
        Allocate Sub-Admins to {campus.name}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Select which sub-admins can manage this campus and its associated
        entities.
      </p>

      {/* Current Allocations Summary */}
      <div className="bg-college-gold/5 dark:bg-college-gold/10 border border-college-gold/20 rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-college-navy dark:text-college-gold mb-2">
          Currently Allocated Sub-Admins
        </h3>
        {currentAllocatedAdmins.length > 0 ? (
          <ul className="list-disc list-inside text-college-navy/80 dark:text-gray-300">
            {currentAllocatedAdmins.map((adminId) => {
              const admin = mockAllAdmins.find((a) => a.id === adminId);
              return admin ? <li key={adminId}>{admin.name}</li> : null;
            })}
          </ul>
        ) : (
          <p className="text-college-navy/60 dark:text-gray-400 italic">
            No sub-admins are currently allocated to this campus.
          </p>
        )}
      </div>

      {/* Admin Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-college-navy dark:text-white mb-4">
          Available Sub-Admins
        </h3>
        <div className="space-y-3">
          {mockAllAdmins.map((admin) => (
            <label
              key={admin.id}
              className={`flex items-center p-4 border rounded-xl transition-all cursor-pointer ${currentAllocations[admin.id]
                ? 'bg-college-navy/10 border-college-navy shadow-sm dark:bg-college-gold/10 dark:border-college-gold'
                : 'bg-white dark:bg-college-navy/50 border-gray-200 dark:border-college-gold/20'
                }`}
            >
              <input
                type="checkbox"
                checked={currentAllocations[admin.id] || false}
                onChange={() => handleAdminToggle(admin.id)}
                className="w-4 h-4 text-college-navy rounded focus:ring-college-navy/20 dark:focus:ring-college-gold/20 border-gray-300 dark:border-college-gold/30 bg-white dark:bg-college-navy"
              />
              <div className="ml-4 flex-1">
                <div className="font-medium text-college-navy dark:text-white">{admin.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{admin.email}</div>
              </div>
              {currentAllocations[admin.id] && (
                <span className="text-xs bg-college-navy/10 text-college-navy dark:bg-college-gold/10 dark:text-college-gold px-3 py-1 rounded-full font-medium border border-college-navy/10 dark:border-college-gold/20">
                  Currently Allocated
                </span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-college-navy/5 dark:bg-college-gold/5 border border-college-navy/10 dark:border-college-gold/10 rounded-xl p-4 mb-6">
        <p className="text-sm text-college-navy dark:text-gray-300 leading-relaxed">
          <strong className="text-college-navy dark:text-college-gold font-bold italic mr-1">Note:</strong> Sub-Admins who are allocated to this campus can
          manage all users, classes, subjects, courses, and CMS content for this
          campus only. They cannot access other campuses.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <PublicButton
          variant="secondary"
          shape="slanted"
          onClick={handleSave}
          className="flex-1 font-bold shadow-md"
        >
          Save Allocations
        </PublicButton>
        <PublicButton
          variant="primary"
          onClick={() => navigate("/admin/campus")}
          className="flex-1 border-2 border-white/10"
        >
          Cancel
        </PublicButton>
      </div>
    </div>
  );
};

export default AllocateAdmin;
