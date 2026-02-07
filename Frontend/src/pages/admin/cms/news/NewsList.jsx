import { Link } from "react-router-dom";
import { useState } from "react";
import Table from "../../../../components/admin/Table";
import {
  Plus,
  Search,
  Calendar,
  Newspaper,
  FileText,
  MoreVertical,
  Pencil,
  Trash2,
  Clock,
  MapPin,
  Eye,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const NewsList = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const data = [
    {
      id: "n1",
      title: "Convocation 2025",
      type: "Event",
      date: "Jan 30, 2026",
      status: "Published",
      category: "Academic",
      views: 1240
    },
    {
      id: "n2",
      title: "Best Group Achieves Higher Accreditation",
      type: "News",
      date: "Dec 20, 2025",
      status: "Published",
      category: "Achievement",
      views: 856
    },
    {
      id: "n3",
      title: "New Research Center Inaugurated",
      type: "News",
      date: "Dec 15, 2025",
      status: "Draft",
      category: "Research",
      views: 0
    },
    {
      id: "n4",
      title: "Annual Sports Gala 2025",
      type: "Event",
      date: "Jan 15, 2026",
      status: "Published",
      category: "Sports",
      views: 2100
    },
  ];

  let filteredData = data;

  if (activeFilter !== "all") {
    filteredData = filteredData.filter(
      (item) => item.type.toLowerCase() === activeFilter.toLowerCase()
    );
  }

  if (searchQuery) {
    filteredData = filteredData.filter(
      (item) => item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const columns = [
    {
      key: "title",
      label: "Title & Category",
      render: (row) => (
        <div className="flex items-start gap-3 max-w-sm">
          <div className={`p-2 rounded-lg ${row.type === 'Event' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
            {row.type === 'Event' ? <Calendar className="w-5 h-5" /> : <Newspaper className="w-5 h-5" />}
          </div>
          <div>
            <span className="font-semibold text-gray-900 line-clamp-2">{row.title}</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{row.category}</span>
              {row.status === "Published" && (
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Eye className="w-3 h-3" /> {row.views}
                </span>
              )}
            </div>
          </div>
        </div>
      )
    },
    {
      key: "type",
      label: "Type",
      render: (row) => (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${row.type === "Event"
            ? "bg-orange-50 text-orange-700 border-orange-100"
            : "bg-blue-50 text-blue-700 border-blue-100"
          }`}>
          {row.type}
        </span>
      )
    },
    {
      key: "date",
      label: "Date",
      render: (row) => (
        <div className="flex flex-col text-sm">
          <span className="text-gray-700 font-medium">{row.date}</span>
          <span className="text-xs text-gray-500">Last updated</span>
        </div>
      )
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${row.status === "Published"
            ? "bg-green-50 text-green-700 border-green-100"
            : "bg-amber-50 text-amber-700 border-amber-100"
          }`}>
          {row.status === "Published" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
          {row.status}
        </span>
      )
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            News & Events
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your latest updates, announcements, and upcoming events
          </p>
        </div>
        <Link
          to="/admin/cms/news/create"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-sm font-semibold hover:from-purple-700 hover:to-indigo-700 shadow-sm transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          Create Post
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Filter Tabs */}
          <div className="flex p-1 bg-gray-100/80 rounded-xl w-fit">
            {["all", "news", "event"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 capitalize ${activeFilter === filter
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                  }`}
              >
                {filter}s
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-sm"
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <Table
        columns={columns}
        data={filteredData}
        actions={(row) => [
          {
            label: "Edit",
            onClick: () => console.log("Edit", row.id),
            className: "text-blue-600 hover:bg-blue-50",
          },
          {
            label: "Delete",
            onClick: () => console.log("Delete", row.id),
            className: "text-rose-600 hover:bg-rose-50",
          },
        ]}
      />
    </div>
  );
};

export default NewsList;
