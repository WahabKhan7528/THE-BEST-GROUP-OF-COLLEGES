import { Menu, Home, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentNavbar = ({ onMenuToggle }) => {
    const navigate = useNavigate();

    return (
        <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-0 z-20 px-4 lg:px-8 shadow-sm">
            <div className="h-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        className="p-2.5 rounded-xl hover:bg-gray-100/80 text-gray-600 lg:hidden transition-all duration-200 active:scale-95"
                        onClick={onMenuToggle}
                        aria-label="Toggle sidebar"
                    >
                        <Menu size={22} />
                    </button>

                    <div className="hidden lg:block">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 ring-1 ring-inset ring-primary-600/20">
                            <GraduationCap size={14} />
                            Student Panel
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                    <button
                        onClick={() => navigate("/")}
                        className="p-2.5 rounded-xl text-gray-500 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200"
                        title="Back to Home"
                    >
                        <Home size={20} />
                    </button>

                    <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>

                    <div className="flex items-center gap-3 p-1.5 pl-2 rounded-xl group cursor-default">
                        <div className="hidden sm:block text-right">
                            <p className="text-sm font-semibold text-gray-900 leading-none">
                                Ayesha Khan
                            </p>
                            <p className="text-xs text-gray-500 mt-1 leading-none">
                                CS • Semester 5
                            </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-bold shadow-sm ring-2 ring-white">
                            AK
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default StudentNavbar;
