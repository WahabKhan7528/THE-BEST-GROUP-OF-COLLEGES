import { Link } from "react-router-dom";
import { useState } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import Table from "../../../components/admin/Table";

const ClassesList = () => {
  const { campuses, isSuperAdmin, currentAdmin } = useAdminContext();
  const [selectedCampus, setSelectedCampus] = useState("");

  // Mock data with campus allocation (Classes are campus-specific)
  const mockData = [
    {
      id: "c1",
      name: "BSCS - 3rd Semester",
      sections: "A, B",
      subjects: "OS, DBMS, DSA",
      faculty: "Ahmed, Sara",
      campus: "main",
    },
    {
      id: "c2",
      name: "BSIT - 2nd Semester",
      sections: "A",
      subjects: "Programming, Discrete Math",
      faculty: "Bilal",
      campus: "main",
    },
    {
      id: "c3",
      name: "LLB - 1st Semester",
      sections: "A, B",
      subjects: "Constitutional Law, Intro to Law",
      faculty: "Fatima",
      campus: "law",
    },
    {
      id: "c4",
      name: "BBA - 4th Semester",
      sections: "A",
      subjects: "Marketing, Finance",
      faculty: "Hassan",
      campus: "hala",
    },
  ];

  // Filter data based on user role and selected campus
  let filteredData = mockData;

  // If Sub-Admin, only show classes from their allocated campuses
  if (!isSuperAdmin) {
    filteredData = filteredData.filter((cls) =>
      currentAdmin?.allocatedCampuses?.includes(cls.campus),
    );
  } else if (selectedCampus) {
    // If Super Admin selected a campus, filter to that campus
    filteredData = filteredData.filter((cls) => cls.campus === selectedCampus);
  }

  const getCampusName = (campusId) => {
    return campuses.find((c) => c.id === campusId)?.name || campusId;
  };

  const columns = [
    { key: "name", label: "Class" },
    { key: "sections", label: "Sections" },
    { key: "subjects", label: "Subjects" },
    { key: "faculty", label: "Assigned Faculty" },
    {
      key: "campus",
      label: "Campus",
      render: (row) => (
        <span className="text-sm font-medium">{getCampusName(row.campus)}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Class Management</p>
          <h1 className="text-2xl font-semibold text-gray-900">
            Classes & sections
          </h1>
        </div>
        <Link
          to="/admin/classes/create"
          className="px-4 py-2 bg-purple-700 text-white rounded-lg text-sm font-semibold hover:bg-purple-800"
        >
          Create Class
        </Link>
      </div>

      {/* Campus Filter (Super Admin only) */}
      {isSuperAdmin && (
        <div className="bg-white rounded-lg border p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Campus
          </label>
          <select
            value={selectedCampus}
            onChange={(e) => setSelectedCampus(e.target.value)}
            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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

      {filteredData.length > 0 ? (
        <Table
          columns={columns}
          data={filteredData}
          actions={(row) => (
            <div className="flex items-center gap-2 text-sm">
              <Link
                to={`/admin/classes/edit/${row.id}`}
                className="text-purple-700 font-semibold hover:text-purple-800"
              >
                Edit
              </Link>
              <button className="text-rose-600 hover:text-rose-700">
                Delete
              </button>
            </div>
          )}
        />
      ) : (
        <div className="bg-white p-8 rounded-lg text-center">
          <p className="text-gray-600">
            No classes found.{" "}
            {isSuperAdmin && selectedCampus
              ? `Create the first one for the selected campus!`
              : `Create the first one!`}
          </p>
        </div>
      )}
    </div>
  );
};

export default ClassesList;
