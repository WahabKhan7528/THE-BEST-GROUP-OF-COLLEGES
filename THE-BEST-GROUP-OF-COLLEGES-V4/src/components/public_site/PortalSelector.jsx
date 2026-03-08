import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { portals } from "../../data/navigationData";
import Badge from "./Badge";
import Card from "./Card";

export default function PortalSelector({ isOpen, onClose }) {
    const navigate = useNavigate();

    const handleSelect = (path) => {
        navigate(path);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4 text-center">
                <div
                    className="fixed inset-0 bg-college-navy/80 backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />

                <Card variant="navy" hover={false} className="relative w-full max-w-4xl p-5 sm:p-8 md:p-10 text-left shadow-2xl border-t-4 border-college-gold">
                    <div className="text-center space-y-2 md:space-y-3 mb-8 md:mb-12">
                        <Badge variant="gold">Portal Access</Badge>
                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">
                            Choose Your Portal
                        </h3>
                        <p className="text-sm text-white/50 max-w-md mx-auto">
                            Securely access your academic and administrative tools
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {portals.map(({ title, description, path }) => (
                            <Card
                                key={title}
                                variant="navy"
                                hover={true}
                                className="border-white/10 bg-white/5 hover:border-college-gold hover:bg-white/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-college-navy/30 dark:focus:ring-college-gold/30"
                                as="button"
                            >
                                <button
                                    onClick={() => handleSelect(path)}
                                    className="p-6 text-left w-full"
                                >
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <h4 className="text-lg font-serif font-bold text-white transition-colors">
                                                {title}
                                            </h4>
                                            <p className="text-sm text-white/50 leading-relaxed font-medium">
                                                {description}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 text-college-gold font-bold text-sm tracking-wide uppercase group-hover:gap-3 transition-all mt-4 border-t border-white/10 pt-4">
                                            <span>Continue</span>
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </button>
                            </Card>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
