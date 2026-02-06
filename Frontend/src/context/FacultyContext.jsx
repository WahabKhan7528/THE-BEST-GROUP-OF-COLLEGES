import React, { createContext, useContext, useState } from "react";

// Create the context
const FacultyContext = createContext();

// Mock current faculty user
const mockFacultyUser = {
  id: "F-001",
  name: "Prof. Ahmed Raza",
  email: "ahmed.raza@best.edu",
  department: "Computer Science",
  campus: "main", // Associated campus
  designation: "Associate Professor",
  specialization: "Operating Systems",
  phoneNumber: "+92-321-XXXX-XXX",
  officeNumber: "CS-301",
};

// Mock classes for faculty
const mockClasses = {
  main: [
    {
      id: "cls-001",
      code: "CS-312",
      name: "Operating Systems",
      section: "A",
      students: 42,
      semester: "5th",
    },
    {
      id: "cls-002",
      code: "CS-312",
      name: "Operating Systems",
      section: "B",
      students: 38,
      semester: "5th",
    },
    {
      id: "cls-003",
      code: "MTH-205",
      name: "Linear Algebra",
      section: "A",
      students: 40,
      semester: "2nd",
    },
  ],
  law: [
    {
      id: "cls-004",
      code: "LAW-201",
      name: "Constitutional Law",
      section: "A",
      students: 35,
      semester: "3rd",
    },
    {
      id: "cls-005",
      code: "LAW-302",
      name: "Criminal Law",
      section: "A",
      students: 32,
      semester: "5th",
    },
  ],
  hala: [
    {
      id: "cls-006",
      code: "BBA-101",
      name: "Business Management",
      section: "A",
      students: 30,
      semester: "1st",
    },
  ],
};

// Mock assignments stats
const mockAssignmentStats = {
  main: {
    totalAssignments: 24,
    pendingSubmissions: 6,
    reviewed: 18,
    averageScore: "82%",
  },
  law: {
    totalAssignments: 12,
    pendingSubmissions: 3,
    reviewed: 9,
    averageScore: "78%",
  },
  hala: {
    totalAssignments: 8,
    pendingSubmissions: 2,
    reviewed: 6,
    averageScore: "85%",
  },
};

// Mock attendance by campus
const mockAttendanceStats = {
  main: "89%",
  law: "92%",
  hala: "88%",
};

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
