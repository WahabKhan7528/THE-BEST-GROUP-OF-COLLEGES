import { useState, useMemo } from "react";
import { Mail } from "lucide-react";
import { clsx } from "clsx";
import { facultyData } from "../../data/facultyMembersData";
import FilterBar from "./FilterBar";
import Pagination from "./Pagination";
import Card from "./Card";

export default function FacultyGrid({ filterCampus }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCampus, setSelectedCampus] = useState(filterCampus || "All Campuses");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Get unique campuses
    const campuses = useMemo(() => {
        const camps = new Set(facultyData.map((f) => f.campus));
        return ["All Campuses", ...Array.from(camps)];
    }, []);

    // Campus options for FilterBar select
    const campusFilters = useMemo(
        () => campuses.map((c) => ({ id: c, name: c })),
        [campuses]
    );

    // Filter faculty
    const filteredFaculty = useMemo(() => {
        return facultyData.filter((faculty) => {
            const matchesSearch =
                searchQuery === "" ||
                faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faculty.designation.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCampus =
                selectedCampus === "All Campuses" || faculty.campus === selectedCampus;
            return matchesSearch && matchesCampus;
        });
    }, [searchQuery, selectedCampus]);

    // Pagination
    const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage);
    const paginatedFaculty = filteredFaculty.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset page on filter change
    useMemo(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCampus]);

    const getRoleBadgeColor = (designation) => {
        if (designation.toLowerCase().includes("dean") || designation.toLowerCase().includes("hod")) {
            return "bg-college-gold";
        } else if (designation.toLowerCase().includes("professor emeritus")) {
            return "bg-college-navy/80";
        } else if (designation.toLowerCase().includes("professor")) {
            return "bg-college-navy";
        } else if (designation.toLowerCase().includes("head")) {
            return "bg-college-navy/90";
        } else if (designation.toLowerCase().includes("senior lecturer")) {
            return "bg-college-gold/90";
        }
        return "bg-college-gold";
    };

    return (
        <>
            {/* Search and Filters */}
            <FilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                searchPlaceholder="Search by name or keyword..."
                filters={!filterCampus ? campusFilters : undefined}
                activeFilter={selectedCampus}
                onFilterChange={!filterCampus ? setSelectedCampus : undefined}
                isSticky={false}
            />

            {/* Faculty Grid */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {paginatedFaculty.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">
                            No faculty members found matching your criteria.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
                        {paginatedFaculty.map((faculty) => (
                            <Card
                                key={faculty.id}
                                hover
                                className="p-4 md:p-8"
                            >
                                {/* Mobile: horizontal layout */}
                                <div className="flex items-center gap-4 md:hidden">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-college-gold/30 shadow flex-shrink-0">
                                        <img src={faculty.image} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className={clsx(
                                            getRoleBadgeColor(faculty.designation),
                                            "text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded inline-block mb-1"
                                        )}>
                                            {faculty.designation}
                                        </span>
                                        <h3 className="text-base font-serif font-bold text-college-navy leading-tight">{faculty.name}</h3>
                                        <p className="text-college-gold text-[10px] font-bold uppercase tracking-widest mt-0.5">{faculty.education}</p>
                                        {faculty.awards && faculty.awards.length > 0 && (
                                            <p className="text-gray-500 text-xs mt-1 line-clamp-1">Research: {faculty.awards.join(", ")}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Desktop: vertical centered layout */}
                                <div className="hidden md:flex flex-col items-center text-center">
                                    <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden mb-4 border-4 border-college-gold/20 shadow-lg flex-shrink-0">
                                        <img src={faculty.image} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div className="mb-3">
                                        <span className={clsx(
                                            getRoleBadgeColor(faculty.designation),
                                            "text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded"
                                        )}>
                                            {faculty.designation}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-college-navy mb-1">{faculty.name}</h3>
                                    <p className="text-college-gold text-xs font-bold uppercase tracking-widest mb-3">{faculty.education}</p>
                                    {faculty.awards && faculty.awards.length > 0 && (
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">Research: {faculty.awards.join(", ")}</p>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </main>
        </>
    );
}
