import { createContext, useContext, useState } from "react";
import {
  mockStudentUser,
  mockEnrolledSubjects,
  mockAnnouncementsByStatus,
  mockDetailedResults,
} from "../data/studentPortalData";
import { useThemeContext } from "./ThemeContext";

// Create the context
const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  // Current logged-in student user
  const [currentStudent, setCurrentStudent] = useState(mockStudentUser);

  // Enrolled subjects
  const [enrolledSubjects, setEnrolledSubjects] = useState(mockEnrolledSubjects);

  const { isDarkMode, toggleDarkMode } = useThemeContext();

  // Get current campus context
  const getCurrentCampus = () => {
    return currentStudent?.campus || "main";
  };

  // Get enrolled subjects for current campus
  const getSubjectsByCurrentCampus = () => {
    const campus = getCurrentCampus();
    return enrolledSubjects[campus] || [];
  };


  // Get announcements for current campus
  const getAnnouncementsByCurrentCampus = () => {
    const campus = getCurrentCampus();
    return mockAnnouncementsByStatus[campus] || mockAnnouncementsByStatus.main;
  };

  // Switch student user (for testing)
  const switchStudentUser = (studentData) => {
    setCurrentStudent(studentData);
  };

  const getTotalCredits = () => {
    return getSubjectsByCurrentCampus().reduce(
      (sum, subject) => sum + subject.credits,
      0,
    );
  };

  const value = {
    // State
    currentStudent,
    enrolledSubjects,
    isDarkMode,

    // Methods
    getCurrentCampus,
    getSubjectsByCurrentCampus,
    getAnnouncementsByCurrentCampus,
    getDetailedResultsByCurrentCampus: () => {
      const campus = getCurrentCampus();
      return mockDetailedResults[campus] || { semesters: [] };
    },
    getTotalCredits,
    switchStudentUser,
    toggleDarkMode,
  };

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
};

// Custom hook to use StudentContext
export const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudentContext must be used within StudentProvider");
  }
  return context;
};
