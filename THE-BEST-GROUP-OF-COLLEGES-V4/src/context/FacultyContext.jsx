import { createContext, useContext, useState } from "react";
import { mockFacultyUser, mockClasses, mockAssignmentStats } from "../data/facultyPortalData";
import { useThemeContext } from "./ThemeContext";

// Create the context
const FacultyContext = createContext();

export const FacultyProvider = ({ children }) => {
  // Current logged-in faculty user
  const [currentFaculty, setCurrentFaculty] = useState(mockFacultyUser);

  // All classes assigned to this faculty
  const [classes, setClasses] = useState(mockClasses);

  const { isDarkMode, toggleDarkMode } = useThemeContext();

  // Get current campus context
  const getCurrentCampus = () => currentFaculty?.campus || "main";

  // Get classes for current campus
  const getClassesByCurrentCampus = () => classes[getCurrentCampus()] || [];

  // Get assignment stats for current campus
  const getAssignmentStatsByCurrentCampus = () => {
    const campus = getCurrentCampus();
    return mockAssignmentStats[campus] || mockAssignmentStats.main;
  };

  // Get all information for current campus context
  const getCampusContext = () => ({
    campus: getCurrentCampus(),
    classes: getClassesByCurrentCampus(),
    assignmentStats: getAssignmentStatsByCurrentCampus(),
  });

  // Switch faculty user (for testing)
  const switchFacultyUser = (facultyData) => {
    setCurrentFaculty(facultyData);
  };

  // Get total students taught
  const getTotalStudents = () => getClassesByCurrentCampus().reduce((sum, cls) => sum + cls.students, 0);

  // Get average class size
  const getAverageClassSize = () => {
    const classesList = getClassesByCurrentCampus();
    if (classesList.length === 0) return 0;
    const total = classesList.reduce((sum, cls) => sum + cls.students, 0);
    return Math.round(total / classesList.length);
  };

  const value = {
    // State
    currentFaculty,
    classes,
    isDarkMode,

    // Methods
    getCurrentCampus,
    getClassesByCurrentCampus,
    getAssignmentStatsByCurrentCampus,
    getCampusContext,
    getTotalStudents,
    getAverageClassSize,
    switchFacultyUser,
    toggleDarkMode,
  };

  return (
    <FacultyContext.Provider value={value}>{children}</FacultyContext.Provider>
  );
};

// Custom hook to use FacultyContext
export const useFacultyContext = () => {
  const context = useContext(FacultyContext);
  if (!context) {
    throw new Error("useFacultyContext must be used within FacultyProvider");
  }
  return context;
};


