import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Table from "../../../../components/portal-shared/Table";
import Badge from "../../../../components/shared/Badge";
import PublicButton from "../../../../components/shared/PublicButton";
import { useAdminContext } from "../../../../store/hooks/useAdminReduxContext";
import { useToast } from "../../../../context/ToastContext";
import { useConfirm } from "../../../../context/ConfirmContext";
import {
  Plus,
  Search,
  Calendar,
  Newspaper,
  Eye,
} from "lucide-react";
import { adminApi } from "../../../../services/api";

const NewsList = () => {
  const navigate = useNavigate();
  const { isDarkMode, isSuperAdmin } = useAdminContext();

  useEffect(() => {
    if (!isSuperAdmin) {
      navigate("/admin/users", { replace: true });
    }
  }, [isSuperAdmin, navigate]);
  const toast = useToast();
  const confirm = useConfirm();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      setIsLoading(true);
      try {
        const { data: response } = await adminApi.newsEvents();
        setData((response.data || []).map((item) => ({
          id: item._id,
          title: item.title,
          type: item.type === "event" ? "Event" : "News",
          date: item.date ? new Date(item.date).toLocaleDateString() : new Date(item.createdAt).toLocaleDateString(),
          status: item.status || "published",
          category: item.category,
          views: item.views || 0,
        })));
      } catch {
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, []);

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
        <div className="flex items-start gap-3 max-w-xs">
          <div className={`p-2 flex-shrink-0 rounded-sm ${row.type === 'Event'
            ? 'bg-college-navy/10 text-college-navy dark:bg-college-gold/10 dark:text-college-gold'
            : 'bg-white border border-gray-200 text-college-navy dark:bg-college-navy/40 dark:border-college-gold/20 dark:text-college-gold'}`}>
            {row.type === 'Event' ? <Calendar className="w-4 h-4" /> : <Newspaper className="w-4 h-4" />}
          </div>
          <div>
            <span className="font-semibold text-college-navy dark:text-white line-clamp-2 group-hover:text-college-gold transition-colors">{row.title}</span>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="subtle">
                {row.category}
              </Badge>
            </div>
          </div>
        </div>
      )
    },
    {
      key: "type",
      label: "Type",
      render: (row) => (
        <Badge variant="subtle" className="font-bold">
          {row.type}
        </Badge>
      )
    },
    {
      key: "date",
      label: "Date",
      render: (row) => (
        <div className="flex flex-col text-xs md:text-sm">
          <span className="text-college-navy dark:text-white font-bold">{row.date}</span> 
        </div>
      )
    },

  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-college-navy dark:text-white">
            News & Events
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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
      <div className="bg-white/80 dark:bg-college-navy backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-4 rounded-sm shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Filter Tabs */}
          <div className="flex p-1 bg-gray-100/80 dark:bg-college-navy/50 border border-transparent dark:border-college-gold/20 rounded-sm w-fit">
            {["all", "news", "event"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm font-medium rounded-sm transition-all duration-200 capitalize ${activeFilter === filter
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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-college-gold/60 w-4 h-4" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all text-sm dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      {isLoading || filteredData.length > 0 ? (
        <Table
          columns={columns}
          data={filteredData}
          isLoading={isLoading}
          actionButtons={(row) => [
            {
              label: "Edit",
              onClick: () => navigate(`/admin/cms/news/edit/${row.id}`),
              className: "text-emerald-600 hover:text-emerald-700 font-medium bg-emerald-50 border border-emerald-100 dark:bg-emerald-900 dark:border-transparent dark:text-gray-300 dark:hover:bg-emerald-800",
            },
            {
              label: "Delete",
              onClick: async () => {
                const confirmed = await confirm({ title: "Delete Post", message: "Are you sure you want to delete this post?", confirmText: "Delete", variant: "danger" });
                if (confirmed) {
                  await adminApi.deleteNewsEvent(row.id);
                  setData((prev) => prev.filter((item) => item.id !== row.id));
                  toast.success(`Post ${row.id} deleted`);
                }
              },
              className: "text-red-600 hover:text-red-700 font-medium bg-red-50 border border-red-100 dark:bg-red-900 dark:border-transparent dark:text-gray-300 dark:hover:bg-red-800",
            },
          ]}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-12 rounded-sm border border-dashed border-gray-300 dark:border-college-gold/20">
          <h3 className="text-lg font-medium text-college-navy dark:text-white">No posts found</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 mb-4 max-w-sm text-center">
            {searchQuery || activeFilter !== "all"
              ? "Try adjusting your search or filters to find what you're looking for."
              : "Get started by creating a new post."}
          </p>
          {(searchQuery || activeFilter !== "all") && (
            <button
              onClick={() => { setSearchQuery(""); setActiveFilter("all"); }}
              className="text-college-navy dark:text-college-gold text-sm font-medium hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsList;


