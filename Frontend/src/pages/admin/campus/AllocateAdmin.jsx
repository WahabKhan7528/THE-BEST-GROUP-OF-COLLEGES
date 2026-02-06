import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAdminContext } from "../../../context/AdminContext";
import Button from "../../../components/ui/Button";

// Mock all admins in system (would come from backend)
const mockAllAdmins = [
  {
    id: "U-002",
    name: "Ahmed Khan",
    email: "ahmed.khan@best.edu",
    adminRole: "Sub-Admin",
  },
  {
    id: "U-003",
    name: "Fatima Ali",
    email: "fatima.ali@best.edu",
    adminRole: "Sub-Admin",
  },
  {
    id: "U-004",
    name: "Hassan Raza",
    email: "hassan.raza@best.edu",
    adminRole: "Sub-Admin",
  },
  {
    id: "U-005",
    name: "Sara Ahmed",
    email: "sara.ahmed@best.edu",
    adminRole: "Sub-Admin",
  },
];

const AllocateAdmin = () => {
  const navigate = useNavigate();
  const { campusId } = useParams();
  const location = useLocation();
  const { campuses, adminCampusAllocations, updateAdminAllocations } =
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
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Allocate Sub-Admins to {campus.name}
      </h1>
      <p className="text-gray-600 mb-6">
        Select which sub-admins can manage this campus and its associated
        entities.
      </p>

      {/* Current Allocations Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-800 mb-2">
          Currently Allocated Sub-Admins
        </h3>
        {currentAllocatedAdmins.length > 0 ? (
          <ul className="list-disc list-inside text-blue-700">
            {currentAllocatedAdmins.map((adminId) => {
              const admin = mockAllAdmins.find((a) => a.id === adminId);
              return admin ? <li key={adminId}>{admin.name}</li> : null;
            })}
          </ul>
        ) : (
          <p className="text-blue-600">
            No sub-admins are currently allocated to this campus.
          </p>
        )}
      </div>

      {/* Admin Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Available Sub-Admins
        </h3>
        <div className="space-y-3">
          {mockAllAdmins.map((admin) => (
            <label
              key={admin.id}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={currentAllocations[admin.id] || false}
                onChange={() => handleAdminToggle(admin.id)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <div className="ml-4 flex-1">
                <div className="font-medium text-gray-800">{admin.name}</div>
                <div className="text-sm text-gray-600">{admin.email}</div>
              </div>
              {currentAllocations[admin.id] && (
                <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  Currently Allocated
                </span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> Sub-Admins who are allocated to this campus can
          manage all users, classes, subjects, courses, and CMS content for this
          campus only. They cannot access other campuses.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={handleSave}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          Save Allocations
        </Button>
        <Button
          onClick={() => navigate("/admin/campus")}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AllocateAdmin;
