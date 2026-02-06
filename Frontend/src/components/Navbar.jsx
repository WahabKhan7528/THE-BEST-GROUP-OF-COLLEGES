import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import PortalSelector from "./PortalSelector";
import Dropdown from "./ui/Dropdown";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPortalSelectorOpen, setIsPortalSelectorOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const campuses = [
    { name: "Main Campus", path: "/campuses/main" },
    { name: "Law Campus", path: "/campuses/law" },
    { name: "Hala Campus", path: "/campuses/hala" },
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
    <nav className="fixed w-full z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <div className="relative overflow-visible rounded-2xl border border-neutral-200/70 bg-white/85 backdrop-blur shadow-[0_10px_40px_rgba(67,56,202,0.08)]">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div>
                <Link to="/" className="block">
                  <p className="text-xs text-neutral-500">Best Group</p>
                  <h1 className="text-lg font-semibold text-neutral-900">
                    Colleges & LMS
                  </h1>
                </Link>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(link.path)
                      ? "text-primary-700 bg-primary-50 font-semibold"
                      : "text-neutral-600 hover:text-primary-700 hover:bg-neutral-100"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Dropdown trigger="Campuses" items={campuses} />
              <Link
                to="/admissions"
                className={`ml-3 inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg transition ${
                  isActive("/admissions")
                    ? "text-white bg-gradient-to-r from-primary-700 to-accent-700 shadow-md"
                    : "text-white bg-gradient-to-r from-primary-600 to-accent-600 shadow hover:shadow-md"
                }`}
              >
                Apply Now
              </Link>
              <button
                onClick={() => setIsPortalSelectorOpen(true)}
                className="ml-2 inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg text-primary-700 bg-primary-50 border border-primary-100 hover:bg-primary-100 transition"
              >
                Portals
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-neutral-500 hover:text-primary-700 hover:bg-neutral-100 transition"
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden border-t border-neutral-200">
              <div className="px-4 py-3 space-y-1 bg-white">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? "text-primary-700 bg-primary-50 font-semibold border-l-4 border-primary-700"
                        : "text-neutral-600 hover:text-primary-700 hover:bg-neutral-100"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/admissions"
                  className={`block w-full text-center px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    isActive("/admissions")
                      ? "text-white bg-gradient-to-r from-primary-700 to-accent-700 shadow-md"
                      : "text-white bg-gradient-to-r from-primary-600 to-accent-600 shadow hover:shadow-md"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Apply Now
                </Link>
                <button
                  onClick={() => {
                    setIsPortalSelectorOpen(true);
                    setIsOpen(false);
                  }}
                  className="block w-full text-center px-4 py-2 rounded-lg text-sm font-semibold text-primary-700 bg-primary-50 border border-primary-100 hover:bg-primary-100 transition"
                >
                  Portals
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Portal Selector */}
      <PortalSelector
        isOpen={isPortalSelectorOpen}
        onClose={() => setIsPortalSelectorOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
