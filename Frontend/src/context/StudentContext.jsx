import React, { createContext, useContext, useState } from "react";

// Create the context
const StudentContext = createContext();

import {
  mockStudentUser,
  mockEnrolledCourses,
  mockAssignmentsByStatus,
  mockAnnouncementsByStatus,
  mockDetailedResults,
  mockResultsByStatus,
  mockStudentAttendanceStats as mockAttendanceStats,
} from "../data/studentPortalData";

export const StudentProvider = ({ children }) => {
  // Current logged-in student user
  const [currentStudent, setCurrentStudent] = useState(mockStudentUser);

  // Enrolled courses
  const [enrolledCourses, setEnrolledCourses] = useState(mockEnrolledCourses);

  // Get current campus context
  const getCurrentCampus = () => {
    return currentStudent?.campus || "main";
  };

  // Get enrolled courses for current campus
  const getCoursesByCurrentCampus = () => {
    const campus = getCurrentCampus();
    return enrolledCourses[campus] || [];
  };

  // Get assignment stats for current campus
  const getAssignmentStatsByCurrentCampus = () => {
    const campus = getCurrentCampus();
    return mockAssignmentsByStatus[campus] || mockAssignmentsByStatus.main;
  };

  // Get announcements for current campus
  const getAnnouncementsByCurrentCampus = () => {
    const campus = getCurrentCampus();
    return mockAnnouncementsByStatus[campus] || mockAnnouncementsByStatus.main;
  };

  // Get results for current campus
  const getResultsByCurrentCampus = () => {
    const campus = getCurrentCampus();
    return mockResultsByStatus[campus] || mockResultsByStatus.main;
  };

  // Get attendance for current campus
  const getAttendanceByCurrentCampus = () => {
    const campus = getCurrentCampus();
    return mockAttendanceStats[campus] || "92%";
  };

  // Get all information for current campus context
  const getCampusContext = () => {
    const campus = getCurrentCampus();
    return {
      campus,
      courses: getCoursesByCurrentCampus(),
      assignments: getAssignmentStatsByCurrentCampus(),
      announcements: getAnnouncementsByCurrentCampus(),
      results: getResultsByCurrentCampus(),
      attendance: getAttendanceByCurrentCampus(),
    };
  };

  // Switch student user (for testing)
  const switchStudentUser = (studentData) => {
    setCurrentStudent(studentData);
  };

  // Get total credits for current semester
  const getTotalCredits = () => {
    return getCoursesByCurrentCampus().reduce(
      (sum, course) => sum + course.credits,
      0,
    );
  };

  const value = {
    // State
    currentStudent,
    enrolledCourses,

    // Methods
    getCurrentCampus,
    getCoursesByCurrentCampus,
    getAssignmentStatsByCurrentCampus,
    getAnnouncementsByCurrentCampus,
    getResultsByCurrentCampus,
    getDetailedResultsByCurrentCampus: () => {
      const campus = getCurrentCampus();
      return mockDetailedResults[campus] || { semesters: [] };
    },
    getAttendanceByCurrentCampus,
    getCampusContext,
    getTotalCredits,
    switchStudentUser,
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
