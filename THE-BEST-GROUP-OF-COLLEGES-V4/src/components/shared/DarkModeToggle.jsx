import { Sun, Moon } from "lucide-react";
import { useThemeContext } from "../../context/ThemeContext";

export default function DarkModeToggle() {
    const { isDarkMode, toggleDarkMode } = useThemeContext();

    return (
        <button
            onClick={toggleDarkMode}
            className="relative p-2.5 rounded-xl text-gray-500 hover:bg-college-navy/10 hover:text-college-navy dark:hover:bg-college-gold/10 dark:hover:text-college-gold transition-all duration-300 group"
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
