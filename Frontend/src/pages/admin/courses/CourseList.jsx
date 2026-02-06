import { Link } from "react-router-dom";
import { useState } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import Table from "../../../components/admin/Table";

const CourseList = () => {
  const { campuses, isSuperAdmin, currentAdmin } = useAdminContext();
  const [selectedCampus, setSelectedCampus] = useState("");

  // Mock data with campuses where course is offered (Courses are global but assigned to campuses)
  const mockData = [
    {
      id: "c101",
      title: "BS Computer Science",
      duration: "4 years",
      eligibility: "Intermediate",
      fee: "$1200/semester",
      offeredAt: ["main", "law"],
    },
    {
      id: "c102",
      title: "BS Information Technology",
      duration: "4 years",
      eligibility: "Intermediate",
      fee: "$1100/semester",
      offeredAt: ["main"],
    },
    {
      id: "c103",
      title: "Bachelor of Law (LLB)",
      duration: "3 years",
      eligibility: "Intermediate",
      fee: "$900/semester",
      offeredAt: ["law"],
    },
    {
      id: "c104",
      title: "Bachelor of Business Admin",
      duration: "4 years",
      eligibility: "Intermediate",
      fee: "$800/semester",
      offeredAt: ["hala"],
    },
  ];

  // Filter data based on user and selected campus
  let filteredData = mockData;

  // If Sub-Admin, only show courses offered at their allocated campuses
  if (!isSuperAdmin) {
    filteredData = filteredData.filter((course) =>
      course.offeredAt.some((campus) =>
        currentAdmin?.allocatedCampuses?.includes(campus),
      ),
    );
  } else if (selectedCampus) {
    // If Super Admin selected a campus, filter to courses offered there
    filteredData = filteredData.filter((course) =>
      course.offeredAt.includes(selectedCampus),
    );
  }

  const getCampusesDisplay = (campusIds) => {
    return campusIds
      .map((cId) => campuses.find((c) => c.id === cId)?.code || cId)
      .join(", ");
  };

  const columns = [
    { key: "title", label: "Course" },
    { key: "duration", label: "Duration" },
    { key: "eligibility", label: "Eligibility" },
    { key: "fee", label: "Fee" },
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
          <p className="text-sm text-gray-500">Courses (Public Site)</p>
          <h1 className="text-2xl font-semibold text-gray-900">
            Manage course list
          </h1>
        </div>
        <Link
          to="/admin/courses/create"
          className="px-4 py-2 bg-purple-700 text-white rounded-lg text-sm font-semibold hover:bg-purple-800"
        >
          Add Course
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
                to={`/admin/courses/edit/${row.id}`}
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
            No courses found. Create the first one!
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseList;
