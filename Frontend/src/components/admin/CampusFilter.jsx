import React from "react";
import { useAdminContext } from "../../context/AdminContext";

const CampusFilter = () => {
  const {
    isSuperAdmin,
    selectedCampusFilter,
    setSelectedCampusFilter,
    campuses,
  } = useAdminContext();

  if (!isSuperAdmin) {
    return null; // Only show for Super Admin
  }

  const currentCampusName =
    selectedCampusFilter === "all"
      ? "All Campuses"
      : campuses.find((c) => c.id === selectedCampusFilter)?.name || "Campus";

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700">Campus:</label>
      <select
        value={selectedCampusFilter}
        onChange={(e) => setSelectedCampusFilter(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="all">All Campuses (Unified View)</option>
        {campuses.map((campus) => (
          <option key={campus.id} value={campus.id}>
            {campus.name}
          </option>
        ))}
      </select>
      <span className="text-xs text-gray-500 ml-2">
        {selectedCampusFilter === "all"
          ? "Viewing data from all campuses"
          : `Viewing data from ${currentCampusName} only`}
      </span>
    </div>
  );
};

export default CampusFilter;
