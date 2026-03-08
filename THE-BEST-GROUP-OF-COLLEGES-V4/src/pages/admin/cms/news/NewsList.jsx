import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Table from "../../../../components/admin/Table";
import PublicButton from "../../../../components/shared/PublicButton";
import { useAdminContext } from "../../../../context/AdminContext";
import {
  Plus,
  Search,
  Calendar,
  Newspaper,
  Eye,
} from "lucide-react";

const NewsList = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useAdminContext();
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
      status: "Published",
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
          <div className={`p-2 rounded-lg ${row.type === 'Event'
            ? 'bg-college-navy/10 text-college-navy dark:bg-college-gold/10 dark:text-college-gold'
            : 'bg-white border border-gray-200 text-college-navy dark:bg-college-navy dark:border-college-gold/20 dark:text-college-gold'}`}>
            {row.type === 'Event' ? <Calendar className="w-5 h-5" /> : <Newspaper className="w-5 h-5" />}
          </div>
          <div>
            <span className="font-semibold text-college-navy line-clamp-2">{row.title}</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{row.category}</span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Eye className="w-3 h-3" /> {row.views}
              </span>
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
          ? "bg-college-navy/5 text-college-navy border-college-navy/10"
          : "bg-white text-college-navy border-primary-200"
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

  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-college-navy">
            News & Events
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your latest updates, announcements, and upcoming events
          </p>
        </div>
        <PublicButton
          to="/admin/cms/news/create"
          variant={isDarkMode ? "secondary" : "primary"}
          shape="slanted"
          size="md"
          className="shadow-md transition-all duration-200"
          icon={Plus}
        >
          Create Post
        </PublicButton>
      </div>

      {/* Filters & Search */}
      <div className="bg-white/80 dark:bg-college-navy backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-4 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Filter Tabs */}
          <div className="flex p-1 bg-gray-100/80 dark:bg-college-navy/50 border border-transparent dark:border-college-gold/20 rounded-xl w-fit">
            {["all", "news", "event"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 capitalize ${activeFilter === filter
                  ? "bg-white text-college-navy shadow-sm dark:bg-college-navy dark:text-white dark:border dark:border-college-gold/30"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-college-navy/80"
                  }`}
              >
                {filter === "all" ? "All" : filter === "news" ? "News" : "Events"}
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
              className="w-full pl-10 pr-4 py-2 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all text-sm dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <Table
        columns={columns}
        data={filteredData}
        actionButtons={(row) => [
          {
            label: "Edit",
            onClick: () => navigate(`/admin/cms/news/edit/${row.id}`),
            className: "text-emerald-600 hover:text-emerald-700 font-medium bg-emerald-50 border border-emerald-100 dark:bg-emerald-900 dark:border-transparent dark:text-gray-300 dark:hover:bg-emerald-800",
          },
          {
            label: "Delete",
            onClick: () => {
              if (window.confirm("Are you sure you want to delete this post?")) {
                alert(`Post ${row.id} deleted (mock)`);
              }
            },
            className: "text-red-600 hover:text-red-700 font-medium bg-red-50 border border-red-100 dark:bg-red-900 dark:border-transparent dark:text-gray-300 dark:hover:bg-red-800",
          },
        ]}
      />
    </div>
  );
};

export default NewsList;

