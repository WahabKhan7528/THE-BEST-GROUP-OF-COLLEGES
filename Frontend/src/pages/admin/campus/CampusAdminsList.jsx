import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Table from "../../../components/admin/Table";
import { useAdminContext } from "../../../context/AdminContext";
import {
    Plus,
    Search,
    Users,
    UserPlus,
    Shield,
    Building2,
    ArrowLeft
} from "lucide-react";

const CampusAdminsList = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { campuses } = useAdminContext();
    const [searchTerm, setSearchTerm] = useState("");
    const campus = campuses.find(c => c.id === id);

    // Mock data - In real app, fetch from API filtering by campus and role='Sub-Admin'
    const mockData = [
        {
            id: "U-001",
            name: "System Admin",
            email: "admin@best.edu",
            role: "Super Admin",
            allocatedCampuses: ["main", "law", "hala"],
        },
        {
            id: "U-002",
            name: "Ahmed Khan",
            email: "ahmed.khan@best.edu",
            role: "Sub-Admin",
            allocatedCampuses: ["law"],
        },
        {
            id: "U-003",
            name: "Fatima Ali",
            email: "fatima.ali@best.edu",
            role: "Sub-Admin",
            allocatedCampuses: ["main", "hala"],
        },
        {
            id: "U-004",
            name: "Zainab Bibi",
            email: "zainab@best.edu",
            role: "Sub-Admin",
            allocatedCampuses: ["main"],
        },
    ];

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
                    <span className="font-semibold text-gray-900">{row.name}</span>
                    <span className="text-xs text-gray-500">{row.email}</span>
                </div>
            )
        },
        {
            key: "role",
            label: "Role",
            render: (row) => (
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${row.role === 'Super Admin' ? 'bg-cyan-50 text-cyan-700' : 'bg-blue-50 text-blue-700'
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
            className: "text-blue-600 hover:text-blue-700 font-medium bg-blue-50 border border-blue-100",
        },
        {
            label: "Remove",
            onClick: () => {
                if (window.confirm(`Remove ${row.name} from ${campus?.name}?`)) {
                    alert("User removed from campus (mock)");
                }
            },
            className: "text-rose-600 hover:text-rose-700 font-medium bg-rose-50 border border-rose-100",
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
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                            <Shield className="w-6 h-6 text-blue-600" />
                            {campus.name} Admins
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Manage administrators allocated to this campus
                        </p>
                    </div>
                </div>

                <Link
                    to="/admin/users/create"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold shadow-md transition-all text-sm"
                >
                    <UserPlus size={18} />
                    Add New Admin
                </Link>
            </div>

            {/* Search */}
            <div className="bg-white/60 backdrop-blur-md border border-white/60 p-4 rounded-2xl shadow-sm">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search admins..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
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
                <div className="bg-white/50 backdrop-blur rounded-2xl border border-dashed border-gray-300 p-12 text-center">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">No admins assigned to this campus.</p>
                </div>
            )}
        </div>
    );
};

export default CampusAdminsList;
