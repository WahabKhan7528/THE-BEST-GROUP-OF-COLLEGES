import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Here lazy state initialization is used to prevent the re-rendering of the component on every render
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem("portal-theme");
        return saved ? saved === "dark" : true;
    });

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle("dark", isDarkMode);
        localStorage.setItem("portal-theme", isDarkMode ? "dark" : "light");

        return () => {
            root.classList.remove("dark");
        };
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

    const value = { isDarkMode, toggleDarkMode };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useThemeContext must be used within ThemeProvider");
    }
    return context;
};

