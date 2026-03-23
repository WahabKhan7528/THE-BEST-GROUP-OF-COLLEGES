import { Link } from "react-router-dom";
import {
    Facebook, Twitter, Instagram, Mail, Phone, MapPin, Clock
} from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-college-navy text-white border-t border-college-gold/20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="pt-8 sm:pt-12 md:pt-16 pb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-2">
                        {/* About Section */}
                        <div className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1">
                            <h3 className="text-xl font-serif font-bold mb-4 text-college-gold">
                                Best Group of Colleges
                            </h3>
                            <p className="text-white/80 text-sm leading-relaxed mb-4 font-medium">
                                Empowering futures through quality education since 1985. Three
                                dynamic campuses, exceptional faculty, and comprehensive
                                programs.
                            </p>
                        </div>

                        {/* Academics */}
                        <div className="col-span-1">
                            <h3 className="text-lg font-serif font-bold mb-4 text-white">Academics</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/campuses/main" className="text-white/70 hover:text-college-gold hover:translate-x-1 inline-block text-sm transition-all">
                                        Main Campus
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/campuses/law" className="text-white/70 hover:text-college-gold hover:translate-x-1 inline-block text-sm transition-all">
                                        Law College
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/campuses/hala" className="text-white/70 hover:text-college-gold hover:translate-x-1 inline-block text-sm transition-all">
                                        Hala Campus
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admissions" className="text-white/70 hover:text-college-gold hover:translate-x-1 inline-block text-sm transition-all">
                                        Admissions
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Information */}
                        <div className="col-span-1">
                            <h3 className="text-lg font-serif font-bold text-white mb-4">Information</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/about" className="text-white/70 hover:text-college-gold hover:translate-x-1 inline-block text-sm transition-all">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/faculty-info" className="text-white/70 hover:text-college-gold hover:translate-x-1 inline-block text-sm transition-all">
                                        Faculty & Staff
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/news-events" className="text-white/70 hover:text-college-gold hover:translate-x-1 inline-block text-sm transition-all">
                                        News & Events
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/gallery" className="text-white/70 hover:text-college-gold hover:translate-x-1 inline-block text-sm transition-all">
                                        Gallery
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="text-white/70 hover:text-college-gold hover:translate-x-1 inline-block text-sm transition-all">
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="col-span-1 md:col-span-1">
                            <h3 className="text-lg font-serif font-bold text-white mb-4">
                                Contact Information
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 group">
                                    <MapPin className="h-5 w-5 text-college-gold flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                    <span className="text-white/70 text-sm">
                                        Main Campus: Younus Shaheed Road, Model Town A, Bahawalpur.
                                    </span>
                                </li>
                                <li className="flex items-center gap-3 group">
                                    <Phone className="h-5 w-5 text-college-gold flex-shrink-0 group-hover:scale-110 transition-transform" />
                                    <a href="tel:+92511234567" className="text-white/70 hover:text-college-gold text-sm transition">
                                        +92 62 9201016
                                    </a>
                                </li>
                                <li className="flex items-center gap-3 group">
                                    <Mail className="h-5 w-5 text-college-gold flex-shrink-0 group-hover:scale-110 transition-transform" />
                                    <a href="mailto:info@bestcolleges.edu.pk" className="text-white/70 hover:text-college-gold text-sm transition">
                                        info@bestcolleges.edu.pk
                                    </a>
                                </li>
                                <li className="flex items-start gap-3 group">
                                    <Clock className="h-5 w-5 text-college-gold flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                    <div className="text-white/70 text-sm">
                                        <p>Mon - Fri: 8:00 AM - 5:00 PM</p>
                                        <p>Sat - Sun: Closed</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Social Links */}
                        <div className="col-span-1">
                            <h3 className="text-lg font-serif font-bold text-white mb-4">Follow Us</h3>
                            <div className="flex flex-wrap gap-4 mb-6">
                                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-college-gold hover:text-college-navy hover:border-college-gold transition-all transform hover:-translate-y-1">
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-college-gold hover:text-college-navy hover:border-college-gold transition-all transform hover:-translate-y-1">
                                    <Twitter className="h-5 w-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-college-gold hover:text-college-navy hover:border-college-gold transition-all transform hover:-translate-y-1">
                                    <Instagram className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10"></div>

                {/* Bottom Footer */}
                <div className="py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="order-2 md:order-1">
                            <p className="text-white/50 text-xs text-center md:text-left font-medium">
                                © {currentYear} Best Group of Colleges. All rights reserved.
                            </p>
                        </div>
                        <div className="order-3 text-center md:text-right">
                            <p className="text-white/50 text-xs font-medium tracking-wide">
                                DESIGNED BY NEXYVORA
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
