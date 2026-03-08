import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import {
    Menu, X, ChevronDown, School, BookOpen, Building, LayoutGrid,
    UserCircle, Users as UsersIcon, Image as ImageIcon, Newspaper, FileText,
} from "lucide-react";
import PublicButton from "../shared/PublicButton";
import PortalSelector from "./PortalSelector";

export default function Navbar() {
    const location = useLocation();

    const [isOpen, setIsOpen] = useState(false);
    const [isCampusOpen, setIsCampusOpen] = useState(false);
    const [isMobileCampusOpen, setIsMobileCampusOpen] = useState(false);
    const [isPagesOpen, setIsPagesOpen] = useState(false);
    const [isMobilePagesOpen, setIsMobilePagesOpen] = useState(false);
    const [isPortalOpen, setIsPortalOpen] = useState(false);

    const dropdownRef = useRef(null);
    const pagesDropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const mobileMenuContentRef = useRef(null);

    useEffect(() => {
        setIsOpen(false);
        setIsCampusOpen(false);
        setIsMobileCampusOpen(false);
        setIsPagesOpen(false);
        setIsMobilePagesOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsCampusOpen(false);
            }
            if (pagesDropdownRef.current && !pagesDropdownRef.current.contains(event.target)) {
                setIsPagesOpen(false);
            }
        };

        if (isCampusOpen || isPagesOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isCampusOpen, isPagesOpen]);

    const isActive = (path) => {
        return (
            location.pathname === path || (path !== "/" && location.pathname.startsWith(path + "/"))
        );
    };

    const campuses = [
        { name: "Main Campus", path: "/campuses/main", icon: School },
        { name: "Law Campus", path: "/campuses/law", icon: Building },
        { name: "Hala Campus", path: "/campuses/hala", icon: BookOpen },
    ];

    const pagesLinks = [
        { name: "Faculty", path: "/faculty-info", icon: UsersIcon },
        { name: "Gallery", path: "/gallery", icon: ImageIcon },
        { name: "News & Events", path: "/news-events", icon: Newspaper },
    ];

    const leftNavLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Admissions", path: "/admissions" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <nav className="sticky top-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between h-14 md:h-20 lg:h-24 px-4 sm:px-6 lg:px-12">
                {/* Logo */}
                <Link to="/" className="group flex items-center gap-2">
                    <img
                        src="/LOGO-1-WHITE-NO-BACKGROUND.webp"
                        alt="Logo"
                        className="h-8 sm:h-10 md:h-12 w-auto"
                        loading="eager"
                        fetchpriority="high"
                    />
                    <span className="hidden sm:block text-lg sm:text-2xl md:text-3xl font-serif font-black tracking-wider text-college-navy">
                        THE BEST GROUP
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex md:items-center md:space-x-1 lg:space-x-2">
                    {leftNavLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`relative px-3 py-2 text-[13px] uppercase tracking-widest font-bold transition-all duration-200 ${isActive(link.path)
                                ? "text-college-gold"
                                : "text-gray-600 hover:text-college-gold"
                                }`}
                        >
                            {link.name}
                            {isActive(link.path) && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-college-gold rounded-full mx-3" />
                            )}
                        </Link>
                    ))}

                    {/* Pages Dropdown */}
                    <div
                        className="relative ml-2 lg:ml-0"
                        ref={pagesDropdownRef}
                        onMouseEnter={() => setIsPagesOpen(true)}
                        onMouseLeave={() => setIsPagesOpen(false)}
                    >
                        <PublicButton
                            variant="unstyled"
                            size="none"
                            className="flex items-center gap-1.5 px-3 py-2 text-[13px] uppercase tracking-widest font-bold text-gray-600 hover:text-college-gold transition-colors"
                            onClick={() => setIsPagesOpen(!isPagesOpen)}
                            aria-expanded={isPagesOpen}
                            aria-haspopup="true"
                        >
                            Pages
                            <ChevronDown
                                className={`w-4 h-4 transition-transform duration-200 ${isPagesOpen ? "rotate-180 text-college-gold" : ""
                                    }`}
                            />
                        </PublicButton>

                        {isPagesOpen && (
                            <div className="absolute right-0 top-full pt-4 w-56 z-50 transition-all duration-200">
                                <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 overflow-hidden">
                                    {pagesLinks.map((page) => (
                                        <Link
                                            key={page.name}
                                            to={page.path}
                                            onClick={() => setIsPagesOpen(false)}
                                            className="group flex items-center gap-3 px-4 py-3 rounded hover:bg-college-gold/5 text-sm font-bold tracking-wide text-college-navy hover:text-college-gold transition-colors"
                                        >
                                            <div className="w-8 h-8 rounded bg-college-navy/5 flex items-center justify-center text-college-navy group-hover:bg-college-gold group-hover:text-white transition-colors">
                                                <page.icon className="w-4 h-4" />
                                            </div>
                                            <span>{page.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Campus Dropdown */}
                    <div
                        className="relative ml-2"
                        ref={dropdownRef}
                        onMouseEnter={() => setIsCampusOpen(true)}
                        onMouseLeave={() => setIsCampusOpen(false)}
                    >
                        <PublicButton
                            variant="unstyled"
                            size="none"
                            className="flex items-center gap-1.5 px-3 py-2 text-[13px] uppercase tracking-widest font-bold text-gray-600 hover:text-college-gold transition-colors"
                            onClick={() => setIsCampusOpen(!isCampusOpen)}
                            aria-expanded={isCampusOpen}
                            aria-haspopup="true"
                        >
                            Campuses
                            <ChevronDown
                                className={`w-4 h-4 transition-transform duration-200 ${isCampusOpen ? "rotate-180 text-college-gold" : ""
                                    }`}
                            />
                        </PublicButton>

                        {isCampusOpen && (
                            <div className="absolute right-0 top-full pt-4 w-64 z-50 transition-all duration-200">
                                <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 overflow-hidden">
                                    {campuses.map((campus) => (
                                        <Link
                                            key={campus.name}
                                            to={campus.path}
                                            onClick={() => setIsCampusOpen(false)}
                                            className="group flex items-center gap-3 px-4 py-3 rounded hover:bg-college-gold/5 text-sm font-bold tracking-wide text-college-navy hover:text-college-gold transition-colors"
                                        >
                                            <div className="w-8 h-8 rounded bg-college-navy/5 flex items-center justify-center text-college-navy group-hover:bg-college-gold group-hover:text-white transition-colors">
                                                <campus.icon className="w-4 h-4" />
                                            </div>
                                            <span>{campus.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Portals Button */}
                    <div className="ml-4">
                        <PublicButton
                            variant="primary"
                            size="md"
                            onClick={() => setIsPortalOpen(true)}
                            className="px-6 font-bold rounded uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 flex items-center group"
                        >
                            <span>Portals</span>
                            <UserCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </PublicButton>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <PublicButton
                        variant="unstyled"
                        size="none"
                        onClick={() => {
                            setIsOpen(!isOpen);
                            setIsMobileCampusOpen(false);
                        }}
                        className="p-2.5 rounded text-college-navy hover:text-college-gold transition-all"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </PublicButton>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div ref={mobileMenuRef} className="md:hidden border-t border-gray-100">
                    <div ref={mobileMenuContentRef} className="py-4 space-y-2 bg-white px-4">
                        {leftNavLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`mobile-nav-item flex items-center justify-between px-4 py-3.5 rounded text-xs tracking-widest uppercase font-bold transition-all ${isActive(link.path)
                                    ? "text-college-gold"
                                    : "text-gray-600 hover:text-college-gold"
                                    }`}
                            >
                                {link.name}
                                {isActive(link.path) && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-college-gold" />
                                )}
                            </Link>
                        ))}

                        {/* Mobile Pages Dropdown */}
                        <div className="mobile-nav-item pt-2 border-t border-gray-100 mt-2">
                            <PublicButton
                                variant="unstyled"
                                size="none"
                                onClick={() => setIsMobilePagesOpen(!isMobilePagesOpen)}
                                className="w-full flex items-center justify-between px-4 py-3.5 rounded text-xs tracking-widest uppercase font-bold text-gray-600 hover:text-college-gold transition-all"
                            >
                                <span className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-college-gold" />
                                    Pages
                                </span>
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${isMobilePagesOpen ? "rotate-180 text-college-gold" : ""
                                        }`}
                                />
                            </PublicButton>

                            {isMobilePagesOpen && (
                                <div className="px-2 pb-2 space-y-1">
                                    {pagesLinks.map((page) => (
                                        <Link
                                            key={page.name}
                                            to={page.path}
                                            onClick={() => {
                                                setIsOpen(false);
                                                setIsMobilePagesOpen(false);
                                            }}
                                            className="flex items-center gap-3 px-4 py-3 rounded text-xs tracking-widest uppercase font-bold transition-colors text-college-navy hover:text-college-gold hover:bg-college-gold/5"
                                        >
                                            <div className="w-6 h-6 rounded bg-college-navy/5 flex items-center justify-center group-hover:bg-college-gold">
                                                <page.icon className="w-3 h-3 text-college-navy group-hover:text-white" />
                                            </div>
                                            {page.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mobile Campuses Dropdown */}
                        <div className="mobile-nav-item pt-2 border-t border-gray-100 mt-2">
                            <PublicButton
                                variant="unstyled"
                                size="none"
                                onClick={() => setIsMobileCampusOpen(!isMobileCampusOpen)}
                                className="w-full flex items-center justify-between px-4 py-3.5 rounded text-xs tracking-widest uppercase font-bold text-gray-600 hover:text-college-gold transition-all"
                            >
                                <span className="flex items-center gap-2">
                                    <School className="w-4 h-4 text-college-gold" />
                                    Campuses
                                </span>
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${isMobileCampusOpen ? "rotate-180 text-college-gold" : ""
                                        }`}
                                />
                            </PublicButton>

                            {isMobileCampusOpen && (
                                <div className="px-2 pb-2 space-y-1">
                                    {campuses.map((campus) => (
                                        <Link
                                            key={campus.name}
                                            to={campus.path}
                                            onClick={() => {
                                                setIsOpen(false);
                                                setIsMobileCampusOpen(false);
                                            }}
                                            className="flex items-center gap-3 px-4 py-3 rounded text-xs tracking-widest uppercase font-bold transition-colors text-college-navy hover:text-college-gold hover:bg-college-gold/5"
                                        >
                                            <div className="w-6 h-6 rounded bg-college-navy/5 flex items-center justify-center group-hover:bg-college-gold">
                                                <campus.icon className="w-3 h-3 text-college-navy group-hover:text-white" />
                                            </div>
                                            {campus.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mobile Portals Button */}
                        <div className="mobile-nav-item pt-4 pb-2">
                            <PublicButton
                                onClick={() => {
                                    setIsOpen(false);
                                    setIsPortalOpen(true);
                                }}
                                className="w-full py-4 uppercase tracking-widest text-xs font-bold"
                                icon={LayoutGrid}
                            >
                                Portals
                            </PublicButton>
                        </div>
                    </div>
                </div>
            )}

            <PortalSelector isOpen={isPortalOpen} onClose={() => setIsPortalOpen(false)} />
        </nav>
    );
}
