import React, { createContext, useContext, useState } from "react";

// Create the context
const FacultyContext = createContext();

import { mockFacultyUser, mockClasses, mockAssignmentStats, mockFacultyAttendanceStats as mockAttendanceStats } from "../data/facultyPortalData";

export const FacultyProvider = ({ children }) => {
  // Current logged-in faculty user
  const [currentFaculty, setCurrentFaculty] = useState(mockFacultyUser);

  // All classes assigned to this faculty
  const [classes, setClasses] = useState(mockClasses);

  // Get current campus context
  const getCurrentCampus = () => {
    return currentFaculty?.campus || "main";
  };

  // Get classes for current campus
  const getClassesByCurrentCampus = () => {
    const campus = getCurrentCampus();
    return classes[campus] || [];
  };

  // Get assignment stats for current campus
  const getAssignmentStatsByCurrentCampus = () => {
    const campus = getCurrentCampus();
    return mockAssignmentStats[campus] || mockAssignmentStats.main;
  };

  // Get attendance stats for current campus
  const getAttendanceByCurrentCampus = () => {
    const campus = getCurrentCampus();
    return mockAttendanceStats[campus] || "89%";
  };

  // Get all information for current campus context
  const getCampusContext = () => {
    const campus = getCurrentCampus();
    return {
      campus,
      classes: getClassesByCurrentCampus(),
      assignmentStats: getAssignmentStatsByCurrentCampus(),
      attendance: getAttendanceByCurrentCampus(),
    };
  };

  // Switch faculty user (for testing)
  const switchFacultyUser = (facultyData) => {
    setCurrentFaculty(facultyData);
  };

  // Get total students taught
  const getTotalStudents = () => {
    return getClassesByCurrentCampus().reduce(
      (sum, cls) => sum + cls.students,
      0,
    );
  };

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

    // Methods
    getCurrentCampus,
    getClassesByCurrentCampus,
    getAssignmentStatsByCurrentCampus,
    getAttendanceByCurrentCampus,
    getCampusContext,
    getTotalStudents,
    getAverageClassSize,
    switchFacultyUser,
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
