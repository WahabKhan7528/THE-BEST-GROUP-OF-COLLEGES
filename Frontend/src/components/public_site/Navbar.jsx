import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, School, BookOpen, Building, LayoutGrid } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PortalSelector from "./PortalSelector";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCampusOpen, setIsCampusOpen] = useState(false);
  const [isMobileCampusOpen, setIsMobileCampusOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    setIsOpen(false);
    setIsCampusOpen(false);
    // Delay resetting the inner mobile menu so it doesn't try to animate out
    // at the exact same time as the outer menu, which causes rendering bugs on mobile devices.
    setTimeout(() => setIsMobileCampusOpen(false), 350);
  }, [location.pathname]);

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCampusOpen(false);
      }
    };

    if (isCampusOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCampusOpen]);

  const isActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const campuses = [
    { name: "Main Campus", path: "/campuses/main", icon: School },
    { name: "Law Campus", path: "/campuses/law", icon: Building },
    { name: "Hala Campus", path: "/campuses/hala", icon: BookOpen },
  ];

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Admissions", path: "/admissions" },
    { name: "Faculty", path: "/faculty-info" },
    { name: "Gallery", path: "/gallery" },
    { name: "News & Events", path: "/news-events" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 w-full z-50 bg-surface border-b border-border shadow-sm">
      <div className="flex items-center justify-between h-24 px-6">
        {/* Logo */}
        <Link to="/" className="block group flex items-center gap-2">
          <img
            src="/LOGO-1-WHITE-NO-BACKGROUND.webp"
            alt="Logo"
            className="h-12 w-auto"
            loading="eager"
            fetchpriority="high"
          />
          <span className="sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-wider text-primary-900">
            THE BEST GROUP
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${isActive(link.path)
                ? "text-primary-700 bg-primary-50"
                : "text-secondary hover:text-primary-600 hover:bg-slate-50"
                }`}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full mx-3"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}

          {/* Campus Dropdown */}
          <div
            className="relative ml-2"
            ref={dropdownRef}
            onMouseEnter={() => setIsCampusOpen(true)}
            onMouseLeave={() => setIsCampusOpen(false)}
          >
            <button
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-secondary hover:text-primary-700 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              onClick={() => setIsCampusOpen(!isCampusOpen)}
              aria-expanded={isCampusOpen}
              aria-haspopup="true"
            >
              Campuses
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCampusOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isCampusOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full pt-4 w-56 z-50"
                >
                  <div className="bg-surface rounded-xl shadow-lg border border-border p-2 overflow-hidden">
                    {campuses.map((campus) => (
                      <Link
                        key={campus.name}
                        to={campus.path}
                        onClick={() => setIsCampusOpen(false)}
                        className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 text-sm text-secondary hover:text-primary-600 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 group-hover:bg-white transition-colors">
                          <campus.icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{campus.name}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Portals Button */}
          <button
            onClick={() => setIsPortalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 ml-1 text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            <LayoutGrid className="w-4 h-4" />
            Portals
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              setIsMobileCampusOpen(false);
            }}
            className="p-2.5 rounded-xl bg-slate-50 text-secondary hover:text-primary-600 hover:bg-primary-50 transition-all border border-transparent hover:border-primary-100"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-gray-100"
          >
            <div className="py-4 space-y-2 bg-surface">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive(link.path)
                    ? "text-primary-600 bg-primary-50 font-semibold shadow-sm"
                    : "text-secondary hover:text-primary-700 hover:bg-white hover:shadow-sm"
                    }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-600" />
                  )}
                </Link>
              ))}

              {/* Mobile Campuses Dropdown */}
              <div className="pt-2">
                <button
                  onClick={() => setIsMobileCampusOpen(!isMobileCampusOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-text-primary hover:bg-white hover:shadow-sm transition-all"
                >
                  <span className="flex items-center gap-2">
                    <School className="w-4 h-4 text-primary-600" />
                    Campuses
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileCampusOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isMobileCampusOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-2 pb-2 space-y-1">
                        {campuses.map((campus) => (
                          <Link
                            key={campus.name}
                            to={campus.path}
                            onClick={() => {
                              setIsOpen(false);
                              setTimeout(() => setIsMobileCampusOpen(false), 350);
                            }}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors text-secondary hover:text-primary-600 hover:bg-primary-50/50"
                          >
                            <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center group-hover:bg-white">
                              <campus.icon className="w-3 h-3" />
                            </div>
                            {campus.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Portals Button */}
              <div className="pt-4 pb-2 px-4">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsPortalOpen(true);
                  }}
                  className="flex items-center justify-center w-full gap-2 px-4 py-3.5 text-sm font-bold text-white bg-primary-600 rounded-xl shadow-sm hover:bg-primary-700 transition-all duration-200"
                >
                  <LayoutGrid className="w-4 h-4" />
                  Portals
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence >

      <PortalSelector isOpen={isPortalOpen} onClose={() => setIsPortalOpen(false)} />
    </nav >
  );
};

export default Navbar;
