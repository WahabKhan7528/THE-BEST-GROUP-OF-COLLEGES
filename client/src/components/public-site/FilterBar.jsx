import { clsx } from "clsx";
import { Search, ChevronDown, SlidersHorizontal } from "lucide-react";

export default function FilterBar({
    searchQuery,
    onSearchChange,
    searchPlaceholder = "Search...",
    filters,
    activeFilter,
    onFilterChange,
    sortBy,
    onSortChange,
    sortOptions,
    className,
    isSticky = true,
}) {
    return (
        <div className={clsx("bg-white border-b border-gray-200 shadow-sm", isSticky && "sticky top-0 z-10", className)}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">

                {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ MOBILE LAYOUT (< md) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
                <div className="flex flex-col gap-3 md:hidden">

                    {/* Row 1: Search (full-width) */}
                    {onSearchChange && (
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy focus:border-transparent text-sm bg-gray-50"
                            />
                        </div>
                    )}

                    {/* Row 2: Horizontally-scrollable pill tabs (gallery category filters) */}
                    {filters && (
                        <div className="overflow-x-auto no-scrollbar -mx-2 px-4 py-2">
                            <div className="flex gap-2 w-max pb-1">
                                {filters.map((filter) => {
                                    const isActive = activeFilter === filter.id;
                                    return (
                                        <button
                                            key={filter.id}
                                            onClick={() => onFilterChange(filter.id)}
                                            className={clsx(
                                                "flex-shrink-0 px-4 py-2 rounded-full font-semibold text-xs tracking-wide transition-all duration-200 border",
                                                isActive
                                                    ? "bg-college-navy text-white border-college-navy shadow-md"
                                                    : "bg-white text-gray-600 border-gray-200 hover:border-college-navy/40"
                                            )}
                                        >
                                            {filter.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Row 3: Sort (full-width styled select) */}
                    {sortOptions && (
                        <div className="relative w-full">
                            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            <select
                                value={sortBy}
                                onChange={(e) => onSortChange(e.target.value)}
                                className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-9 py-3 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-college-navy cursor-pointer"
                            >
                                {sortOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    )}

                    {/* Row 4: Campus filter as full-width styled select (faculty grid) */}
                    {!filters && !sortOptions && onFilterChange && (
                        <div className="relative w-full">
                            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            <select
                                value={activeFilter}
                                onChange={(e) => onFilterChange(e.target.value)}
                                className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-9 py-3 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-college-navy cursor-pointer"
                            >
                                {filters?.map((f) => (
                                    <option key={f.id} value={f.id}>{f.name}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    )}
                </div>

                {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ DESKTOP LAYOUT (â‰¥ md) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
                <div className="hidden md:flex items-center justify-between gap-4">

                    {/* Search */}
                    {onSearchChange && (
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-college-navy focus:border-transparent text-sm"
                            />
                        </div>
                    )}

                    {/* Filter Tabs */}
                    {filters && (
                        <div className="flex flex-wrap gap-3">
                            {filters.map((filter) => {
                                const isActive = activeFilter === filter.id;
                                return (
                                    <button
                                        key={filter.id}
                                        onClick={() => onFilterChange(filter.id)}
                                        className={clsx(
                                            "px-6 py-2.5 rounded font-medium text-sm transition-all",
                                            isActive
                                                ? "bg-college-gold text-college-navy"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        )}
                                    >
                                        {filter.name}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* Sort Dropdown */}
                    {sortOptions && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 font-medium">Sort by:</span>
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => onSortChange(e.target.value)}
                                    className="appearance-none bg-white border border-gray-300 rounded px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-college-navy cursor-pointer"
                                >
                                    {sortOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                            </div>
                        </div>
                    )}

                    {/* Campus Filter Select (faculty) */}
                    {!filters && !sortOptions && onFilterChange && (
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <select
                                value={activeFilter}
                                onChange={(e) => onFilterChange(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-college-navy text-sm bg-white min-w-[180px]"
                            >
                                {filters?.map((f) => (
                                    <option key={f.id} value={f.id}>{f.name}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
