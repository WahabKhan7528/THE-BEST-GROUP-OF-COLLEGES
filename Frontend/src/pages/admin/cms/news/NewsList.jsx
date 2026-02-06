import { Link } from "react-router-dom";
import { useState } from "react";
import Table from "../../../../components/admin/Table";

const columns = [
  { key: "title", label: "Title" },
  { key: "type", label: "Type" },
  { key: "date", label: "Date" },
  { key: "status", label: "Status" },
];

const data = [
  {
    id: "n1",
    title: "Convocation 2025",
    type: "Event",
    date: "Jan 30, 2026",
    status: "Published",
  },
  {
    id: "n2",
    title: "Best Group Achieves Higher Accreditation",
    type: "News",
    date: "Dec 20, 2025",
    status: "Published",
  },
  {
    id: "n3",
    title: "New Research Center Inaugurated",
    type: "News",
    date: "Dec 15, 2025",
    status: "Draft",
  },
  {
    id: "n4",
    title: "Annual Sports Gala 2025",
    type: "Event",
    date: "Jan 15, 2026",
    status: "Published",
  },
];

const NewsList = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredData =
    activeFilter === "all"
      ? data
      : data.filter(
          (item) => item.type.toLowerCase() === activeFilter.toLowerCase()
        );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">CMS • News & Events</p>
          <h1 className="text-2xl font-semibold text-gray-900">
            Manage news & events
          </h1>
        </div>
        <Link
          to="/admin/cms/news/create"
          className="px-4 py-2 bg-purple-700 text-white rounded-lg text-sm font-semibold hover:bg-purple-800"
        >
          Create Post
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-2 text-sm font-semibold transition ${
            activeFilter === "all"
              ? "text-purple-700 border-b-2 border-purple-700"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveFilter("news")}
          className={`px-4 py-2 text-sm font-semibold transition ${
            activeFilter === "news"
              ? "text-purple-700 border-b-2 border-purple-700"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          News
        </button>
        <button
          onClick={() => setActiveFilter("event")}
          className={`px-4 py-2 text-sm font-semibold transition ${
            activeFilter === "event"
              ? "text-purple-700 border-b-2 border-purple-700"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Events
        </button>
      </div>

      <Table
        columns={columns}
        data={filteredData}
        actions={(row) => (
          <div className="flex items-center gap-2 text-sm">
            <Link
              to={`/admin/cms/news/edit/${row.id}`}
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
    </div>
  );
};

export default NewsList;
