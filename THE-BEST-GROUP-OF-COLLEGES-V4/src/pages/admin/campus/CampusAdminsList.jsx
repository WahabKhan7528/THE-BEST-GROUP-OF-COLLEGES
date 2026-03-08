import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import PublicButton from "../../../components/shared/PublicButton";
import Table from "../../../components/admin/Table";
import { useAdminContext } from "../../../context/AdminContext";
import {
    Search,
    Users,
    UserPlus,
    Shield,
    ArrowLeft,
} from "lucide-react";
import { mockCampusAdminsData as adminUsers } from "../../../data/adminData";

const CampusAdminsList = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { campuses, isDarkMode } = useAdminContext();
    const [searchTerm, setSearchTerm] = useState("");
    const campus = campuses.find(c => c.id === id);

    const mockData = adminUsers;

    // Filter for admins of this specific campus
    const filteredData = mockData.filter(user =>
        (user.role === 'Sub-Admin' || user.role === 'Super Admin') &&
        user.allocatedCampuses.includes(id) &&
        (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const columns = [
        {
            key: "name",
            label: "Admin Details",
            render: (row) => (
                <div className="flex flex-col">
                    <span className="font-semibold text-college-navy dark:text-college-gold">{row.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{row.email}</span>
                </div>
            )
        },
        {
            key: "role",
            label: "Role",
            render: (row) => (
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${row.role === 'Super Admin'
                    ? 'bg-college-navy/10 text-college-navy dark:bg-college-gold/10 dark:text-college-gold'
                    : 'bg-college-gold/10 text-college-navy dark:text-college-gold border border-college-gold/20 shadow-sm'
                    }`}>
                    {row.role}
                </span>
            )
        },
        { key: "id", label: "ID" },
    ];

    const actionButtons = (row) => [
        {
            label: "Edit",
            onClick: () => navigate(`/admin/users/edit/${row.id}`),
            className: "text-emerald-600 hover:text-emerald-700 font-medium bg-emerald-50 border border-emerald-100 dark:bg-emerald-900 dark:border-transparent dark:text-gray-300 dark:hover:bg-emerald-800",
        },
        {
            label: "Remove",
            onClick: () => {
                if (window.confirm(`Remove ${row.name} from ${campus?.name}?`)) {
                    alert("User removed from campus (mock)");
                }
            },
            className: "text-red-600 hover:text-red-700 font-medium bg-red-50 border border-red-100 dark:bg-red-900 dark:border-transparent dark:text-gray-300 dark:hover:bg-red-800",
        }
    ];

    if (!campus) return <div>Campus not found</div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link to="/admin/campus" className="p-2 hover:bg-white/50 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-college-navy dark:text-white tracking-tight flex items-center gap-2">

                            {campus.name} Admins
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                            Manage administrators allocated to this campus
                        </p>
                    </div>
                </div>

                <PublicButton
                    to="/admin/users/create"
                    variant={isDarkMode ? "secondary" : "primary"}
                    shape="slanted"
                    icon={UserPlus}
                    className="shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                    Add New Admin
                </PublicButton>
            </div>

            {/* Search */}
            <div className="bg-white/80 dark:bg-college-navy/60 backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-4 rounded-2xl shadow-sm">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search admins..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all text-sm dark:text-white"
                    />
                </div>
            </div>

            {/* Table */}
            {filteredData.length > 0 ? (
                <Table
                    columns={columns}
                    data={filteredData}
                    actionButtons={actionButtons}
                />
            ) : (
                <div className="bg-white/50 dark:bg-college-navy/50 backdrop-blur rounded-2xl border border-dashed border-gray-300 dark:border-college-gold/20 p-12 text-center transition-all">
                    <Users className="w-12 h-12 text-gray-300 dark:text-college-gold/30 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400 font-medium">No admins assigned to this campus.</p>
                </div>
            )}
        </div>
    );
};

export default CampusAdminsList;
