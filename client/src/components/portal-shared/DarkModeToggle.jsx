import { Sun, Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../store/slices/uiSlice";

export default function DarkModeToggle() {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state) => state.ui.isDarkMode);

    const handleToggle = () => {
        dispatch(toggleDarkMode());
    };

    return (
        <button
            onClick={handleToggle}
            className="relative p-2.5 rounded-sm text-gray-500 hover:bg-college-navy/10 hover:text-college-navy dark:hover:bg-college-gold/10 dark:hover:text-college-gold transition-all duration-300 group"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle dark mode"
        >
            <div className="relative w-5 h-5">
                <Sun
                    size={20}
                    className={`absolute inset-0 transform transition-all duration-300 ${isDarkMode
                        ? "opacity-0 rotate-90 scale-0"
                        : "opacity-100 rotate-0 scale-100"
                        }`}
                />
                <Moon
                    size={20}
                    className={`absolute inset-0 transform transition-all duration-300 ${isDarkMode
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 -rotate-90 scale-0"
                        }`}
                />
            </div>
        </button>
    );
}
