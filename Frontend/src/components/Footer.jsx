import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Clock,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            {/* About Section */}
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-xl font-bold mb-4 text-white">
                Best Group of Colleges
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Empowering futures through quality education since 1985. Three
                dynamic campuses, exceptional faculty, and comprehensive
                programs.
              </p>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Award className="h-4 w-4 text-primary-500" />
                <span>ISO Certified Institution</span>
              </div>
            </div>

            {/* Academics */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Academics</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/campuses/main"
                    className="text-gray-400 hover:text-primary-400 text-sm transition"
                  >
                    Main Campus
                  </Link>
                </li>
                <li>
                  <Link
                    to="/campuses/law"
                    className="text-gray-400 hover:text-primary-400 text-sm transition"
                  >
                    Law College
                  </Link>
                </li>
                <li>
                  <Link
                    to="/campuses/hala"
                    className="text-gray-400 hover:text-primary-400 text-sm transition"
                  >
                    Hala Campus
                  </Link>
                </li>
                <li>
                  <Link
                    to="/colleges"
                    className="text-gray-400 hover:text-primary-400 text-sm transition"
                  >
                    All Colleges
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admissions"
                    className="text-gray-400 hover:text-primary-400 text-sm transition"
                  >
                    Admissions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Information */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Information</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-primary-400 text-sm transition"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faculty-info"
                    className="text-gray-400 hover:text-primary-400 text-sm transition"
                  >
                    Faculty & Staff
                  </Link>
                </li>
                <li>
                  <Link
                    to="/news-events"
                    className="text-gray-400 hover:text-primary-400 text-sm transition"
                  >
                    News & Events
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gallery"
                    className="text-gray-400 hover:text-primary-400 text-sm transition"
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-primary-400 text-sm transition"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-lg font-semibold mb-4">
                Contact Information
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400 text-sm">
                    123 Education Street, Islamabad, Pakistan
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary-500 flex-shrink-0" />
                  <a
                    href="tel:+92511234567"
                    className="text-gray-400 hover:text-primary-400 text-sm transition"
                  >
                    +92 51 1234 567
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary-500 flex-shrink-0" />
                  <a
                    href="mailto:info@bestcolleges.edu.pk"
                    className="text-gray-400 hover:text-primary-400 text-sm transition"
                  >
                    info@bestcolleges.edu.pk
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <div className="text-gray-400 text-sm">
                    <p>Mon - Fri: 8:00 AM - 5:00 PM</p>
                    <p>Sat - Sun: Closed</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex flex-wrap gap-4 mb-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary-400 transition transform hover:scale-110"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary-400 transition transform hover:scale-110"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary-400 transition transform hover:scale-110"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800"></div>

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div>
              <p className="text-gray-400 text-xs">
                © {currentYear} Best Group of Colleges. All rights reserved.
              </p>
            </div>
            <div className="flex justify-center gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white text-xs transition"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-xs transition"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-xs transition"
              >
                Disclaimer
              </a>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs">
                Designed by Nexyvora for The Best Group of Colleges
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
