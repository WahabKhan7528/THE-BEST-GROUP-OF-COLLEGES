import React, { createContext, useContext, useState } from "react";

// Create the context
const StudentContext = createContext();

// Mock current student user
const mockStudentUser = {
  id: "STU-2025-0145",
  name: "Ayesha Khan",
  email: "ayesha.khan@best.edu",
  department: "Computer Science",
  campus: "main", // Associated campus
  semester: "5th",
  cgpa: "3.68",
  enrollmentYear: 2021,
  phoneNumber: "+92-300-XXXX-XXX",
};

// Mock enrolled courses by campus
const mockEnrolledCourses = {
  main: [
    {
      id: "CS-312",
      code: "CS-312",
      name: "Operating Systems",
      instructor: "Prof. Ahmed Raza",
      credits: 3,
      section: "A",
    },
    {
      id: "CS-418",
      code: "CS-418",
      name: "Data Mining",
      instructor: "Dr. Hassan Ali",
      credits: 3,
      section: "B",
    },
    {
      id: "MTH-205",
      code: "MTH-205",
      name: "Linear Algebra",
      instructor: "Dr. Sara Imran",
      credits: 3,
      section: "A",
    },
    {
      id: "CS-215",
      code: "CS-215",
      name: "Database Design",
      instructor: "Prof. Bilal Khan",
      credits: 3,
      section: "A",
    },
  ],
  law: [
    {
      id: "LAW-201",
      code: "LAW-201",
      name: "Constitutional Law",
      instructor: "Dr. Fatima Khan",
      credits: 3,
      section: "A",
    },
    {
      id: "LAW-302",
      code: "LAW-302",
      name: "Criminal Law",
      instructor: "Prof. Muhammad Zaidi",
      credits: 3,
      section: "A",
    },
  ],
  hala: [
    {
      id: "BBA-101",
      code: "BBA-101",
      name: "Business Management",
      instructor: "Prof. Hassan Ahmed",
      credits: 3,
      section: "A",
    },
  ],
};

// Mock assignments by campus
const mockAssignmentsByStatus = {
  main: {
    upcoming: 3,
    submitted: 15,
    graded: 12,
  },
  law: {
    upcoming: 2,
    submitted: 8,
    graded: 6,
  },
  hala: {
    upcoming: 1,
    submitted: 5,
    graded: 4,
  },
};

// Mock announcements by campus
const mockAnnouncementsByStatus = {
  main: {
    unread: 2,
    total: 12,
    recent: [
      {
        id: "A-001",
        title: "Mid-term schedule released",
        date: "Sept 12, 2025",
      },
      { id: "A-002", title: "Library hours extended", date: "Sept 10, 2025" },
      {
        id: "A-003",
        title: "New study materials uploaded",
        date: "Sept 8, 2025",
      },
    ],
  },
  law: {
    unread: 1,
    total: 8,
    recent: [
      {
        id: "A-004",
        title: "Moot court finals schedule",
        date: "Sept 11, 2025",
      },
      { id: "A-005", title: "Legal research workshop", date: "Sept 9, 2025" },
    ],
  },
  hala: {
    unread: 0,
    total: 5,
    recent: [
      {
        id: "A-006",
        title: "Campus event announcement",
        date: "Sept 10, 2025",
      },
    ],
  },
};

// Mock detailed results for GPA calculation
const mockDetailedResults = {
  main: {
    semesters: [
      {
        id: 1,
        name: "Semester 1",
        subjects: [
          { code: "CS-101", title: "Intro to Computing", credits: 3, marks: 87 },
          { code: "ENG-101", title: "English Comp", credits: 3, marks: 82 },
          { code: "MTH-101", title: "Calculus I", credits: 3, marks: 75 },
          { code: "PHY-101", title: "Applied Physics", credits: 3, marks: 71 },
          { code: "ISL-101", title: "Islamic Studies", credits: 2, marks: 90 },
        ],
      },
      {
        id: 2,
        name: "Semester 2",
        subjects: [
          { code: "CS-102", title: "Programming Fund", credits: 4, marks: 85 },
          { code: "ENG-102", title: "Comm Skills", credits: 3, marks: 88 },
          { code: "MTH-102", title: "Calculus II", credits: 3, marks: 68 },
          { code: "PHY-102", title: "Basic Electronics", credits: 3, marks: 78 },
          { code: "PST-101", title: "Pak Studies", credits: 2, marks: 84 },
        ],
      },
      {
        id: 3,
        name: "Semester 3",
        subjects: [
          { code: "CS-201", title: "Data Structures", credits: 4, marks: 72 },
          { code: "CS-202", title: "Digital Logic", credits: 3, marks: 76 },
          { code: "MTH-201", title: "Linear Algebra", credits: 3, marks: 88 },
          { code: "CS-203", title: "Discrete Struct", credits: 3, marks: 81 },
          { code: "MGT-101", title: "Principles of Mgt", credits: 3, marks: 85 },
        ],
      },
      {
        id: 4,
        name: "Semester 4",
        subjects: [
          { code: "CS-205", title: "Operating Systems", credits: 3, marks: 84 },
          { code: "CS-206", title: "Database Systems", credits: 4, marks: 79 },
          { code: "CS-207", title: "Software Eng", credits: 3, marks: 86 },
          { code: "MTH-203", title: "Prob & Stats", credits: 3, marks: 82 },
          { code: "CS-208", title: "Comp Org & Arch", credits: 3, marks: 74 },
        ],
      },
      {
        id: 5,
        name: "Semester 5 (Current)",
        subjects: [ // Partial results maybe? Or simplified for now
          { code: "CS-301", title: "Comp Networks", credits: 3, marks: 0 }, // Pending
          { code: "CS-302", title: "Web Eng", credits: 3, marks: 0 }, // Pending
        ]
      }
    ],
  },
  law: { semesters: [] }, // omitted for brevity
  hala: { semesters: [] }, // omitted for brevity
};

// Mock results summary by campus
const mockResultsByStatus = {
  main: {
    gpa: "3.68",
    averageGrade: "A-",
  },
  law: {
    gpa: "3.50",
    averageGrade: "B+",
  },
  hala: {
    gpa: "3.20",
    averageGrade: "B",
  },
};

// Mock attendance by campus
const mockAttendanceStats = {
  main: "92%",
  law: "95%",
  hala: "88%",
};

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
