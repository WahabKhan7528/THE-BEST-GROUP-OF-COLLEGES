import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Here lazy state initialization is used to prevent the re-rendering of the component on every render
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("portal-theme");
            if (savedTheme !== null) {
                return savedTheme === "dark";
            }
            return true;
        }
        return true;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add("dark");
            localStorage.setItem("portal-theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("portal-theme", "light");
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

    const value = {
        isDarkMode,
        toggleDarkMode,
    };

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
