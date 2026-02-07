import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, School, BookOpen, GraduationCap, Building, LayoutGrid } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PortalSelector from "./PortalSelector";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCampusOpen, setIsCampusOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? "pt-2 pb-2" : "pt-4 pb-4"
      }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`relative rounded-2xl border transition-all duration-300 ${scrolled
          ? "bg-white/80 border-gray-200/50 shadow-lg backdrop-blur-md"
          : "bg-white/60 border-white/30 shadow-xl backdrop-blur-sm"
          }`}>
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            {/* Logo */}
            <Link to="/" className="block group">
              <span className="text-xl font-black tracking-tighter text-blue-600 group-hover:text-blue-500 transition-colors">
                BEST GROUP.
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${isActive(link.path)
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full mx-3"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              ))}

              {/* Campus Dropdown */}
              <div className="relative group ml-2">
                <button
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-gray-700 hover:text-blue-700 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  onClick={() => setIsCampusOpen(!isCampusOpen)} // Added optional click toggle
                  aria-expanded={isCampusOpen}
                  aria-haspopup="true"
                >
                  Campuses
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </button>

                <div className="absolute right-0 top-full pt-2 w-56 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto transition-all duration-200 z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 overflow-hidden">
                    {campuses.map((campus) => (
                      <Link
                        key={campus.name}
                        to={campus.path}
                        className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-white transition-colors">
                          <campus.icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{campus.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Portals Button */}
              <button
                onClick={() => setIsPortalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 ml-1 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
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
                  setIsCampusOpen(false);
                }}
                className="p-2.5 rounded-xl bg-gray-50 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100"
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
                <div className="px-4 py-4 space-y-2 bg-white/50 backdrop-blur-sm">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive(link.path)
                        ? "text-blue-600 bg-blue-50 font-semibold shadow-sm"
                        : "text-gray-600 hover:text-blue-700 hover:bg-white hover:shadow-sm"
                        }`}
                    >
                      {link.name}
                      {isActive(link.path) && (
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      )}
                    </Link>
                  ))}

                  {/* Mobile Campuses Dropdown */}
                  <div className="pt-2">
                    <button
                      onClick={() => setIsCampusOpen(!isCampusOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <School className="w-4 h-4 text-blue-600" />
                        Campuses
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCampusOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {isCampusOpen && (
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
                                  setIsCampusOpen(false);
                                }}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors text-gray-500 hover:text-blue-600 hover:bg-blue-50/50"
                              >
                                <div className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center group-hover:bg-white">
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
                  <div className="pt-4 pb-2">
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        setIsPortalOpen(true);
                      }}
                      className="flex items-center justify-center w-full gap-2 px-4 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
                    >
                      <LayoutGrid className="w-4 h-4" />
                      Portals
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <PortalSelector isOpen={isPortalOpen} onClose={() => setIsPortalOpen(false)} />
    </nav>
  );
};

export default Navbar;
