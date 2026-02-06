import { Link } from "react-router-dom";
import { useState } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import Table from "../../../components/admin/Table";

const SubjectsList = () => {
  const { campuses, isSuperAdmin, currentAdmin } = useAdminContext();
  const [selectedCampus, setSelectedCampus] = useState("");

  // Mock data with campuses where subject is offered (Subjects are global but assigned to campuses)
  const mockData = [
    {
      id: "s1",
      name: "Operating Systems",
      code: "CS-312",
      class: "BSCS - 3rd",
      faculty: "Prof. Ahmed",
      offeredAt: ["main", "law"],
    },
    {
      id: "s2",
      name: "Database Systems",
      code: "CS-215",
      class: "BSCS - 3rd",
      faculty: "Prof. Sara",
      offeredAt: ["main"],
    },
    {
      id: "s3",
      name: "Linear Algebra",
      code: "MTH-205",
      class: "BSCS - 3rd",
      faculty: "Prof. Bilal",
      offeredAt: ["main", "hala"],
    },
    {
      id: "s4",
      name: "Constitutional Law",
      code: "LAW-101",
      class: "LLB - 1st",
      faculty: "Dr. Fatima",
      offeredAt: ["law"],
    },
    {
      id: "s5",
      name: "Business Ethics",
      code: "BBA-305",
      class: "BBA - 3rd",
      faculty: "Prof. Hassan",
      offeredAt: ["hala"],
    },
  ];

  // Filter data based on user and selected campus
  let filteredData = mockData;

  // If Sub-Admin, only show subjects offered at their allocated campuses
  if (!isSuperAdmin) {
    filteredData = filteredData.filter((subject) =>
      subject.offeredAt.some((campus) =>
        currentAdmin?.allocatedCampuses?.includes(campus),
      ),
    );
  } else if (selectedCampus) {
    // If Super Admin selected a campus, filter to subjects offered there
    filteredData = filteredData.filter((subject) =>
      subject.offeredAt.includes(selectedCampus),
    );
  }

  const getCampusesDisplay = (campusIds) => {
    return campusIds
      .map((cId) => campuses.find((c) => c.id === cId)?.code || cId)
      .join(", ");
  };

  const columns = [
    { key: "name", label: "Subject" },
    { key: "code", label: "Code" },
    { key: "class", label: "Class" },
    { key: "faculty", label: "Faculty" },
    {
      key: "offeredAt",
      label: "Offered at Campuses",
      render: (row) => (
        <span className="text-sm font-medium">
          {getCampusesDisplay(row.offeredAt)}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Subject Management</p>
          <h1 className="text-2xl font-semibold text-gray-900">
            Subjects & assignments
          </h1>
        </div>
        <Link
          to="/admin/subjects/create"
          className="px-4 py-2 bg-purple-700 text-white rounded-lg text-sm font-semibold hover:bg-purple-800"
        >
          Add Subject
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
                to={`/admin/subjects/edit/${row.id}`}
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
            No subjects found. Create the first one!
          </p>
        </div>
      )}
    </div>
  );
};

export default SubjectsList;
