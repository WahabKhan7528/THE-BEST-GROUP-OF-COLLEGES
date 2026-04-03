import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useThemeContext } from "./ThemeContext";
import { authApi, portalApi } from "../services/api";

// Create the context
const FacultyContext = createContext();

export const FacultyProvider = ({ children }) => {
  const [currentFaculty, setCurrentFaculty] = useState(null);
  const [classes, setClasses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  const { isDarkMode, toggleDarkMode } = useThemeContext();

  useEffect(() => {
    const loadFacultyData = async () => {
      try {
        const meRes = await authApi.me();
        setCurrentFaculty(meRes.data.user || null);
      } catch {
        setCurrentFaculty(null);
      }

      try {
        const classesRes = await portalApi.classes();
        setClasses(classesRes.data.data || []);
      } catch {
        setClasses([]);
      }

      try {
        const assignmentsRes = await portalApi.assignments();
        setAssignments(assignmentsRes.data.data || []);
      } catch {
        setAssignments([]);
      }

      try {
        const submissionsRes = await portalApi.mySubmissions();
        setSubmissions(submissionsRes.data.data || []);
      } catch {
        setSubmissions([]);
      }
    };

    loadFacultyData();
  }, []);

  const classesByCampus = useMemo(() => {
    const map = {};
    classes.forEach((cls) => {
      const key = cls.campus?.slug || cls.campus?.code?.toLowerCase() || "main";
      if (!map[key]) map[key] = [];
      const studentsList = Array.isArray(cls.students) ? cls.students : [];
      map[key].push({
        ...cls,
        id: cls._id,
        code: cls.course?.code || cls.name,
        name: cls.name,
        section: cls.section,
        studentsList,
        studentsCount: studentsList.length,
        students: studentsList,
        semester: cls.semester || "-",
      });
    });
    return map;
  }, [classes]);

  const getCurrentCampus = () => {
    const classCampus = Object.keys(classesByCampus)[0];
    return classCampus || currentFaculty?.campus?.slug || "main";
  };

  // Get classes for current campus
  const getClassesByCurrentCampus = () => classesByCampus[getCurrentCampus()] || [];

  const getAssignmentStatsByCurrentCampus = () => {
    const campusClasses = getClassesByCurrentCampus();
    const classIds = new Set(campusClasses.map((cls) => cls.id));
    const campusAssignments = assignments.filter((assignment) =>
      classIds.has(assignment.classRoom?._id || assignment.classRoom),
    );

    const campusSubmissions = submissions.filter((submission) =>
      classIds.has(submission.assignment?.classRoom?._id || submission.assignment?.classRoom),
    );

    const reviewed = campusSubmissions.filter((sub) => sub.marks !== null && sub.marks !== undefined).length;
    const totalMarks = campusSubmissions
      .filter((sub) => typeof sub.marks === "number")
      .reduce((sum, sub) => sum + sub.marks, 0);

    const averageScore = reviewed > 0 ? `${Math.round(totalMarks / reviewed)}%` : "0%";

    return {
      totalAssignments: campusAssignments.length,
      pendingSubmissions: Math.max(campusSubmissions.length - reviewed, 0),
      reviewed,
      averageScore,
    };
  };

  // Get all information for current campus context
  const getCampusContext = () => ({
    campus: getCurrentCampus(),
    classes: getClassesByCurrentCampus(),
    assignmentStats: getAssignmentStatsByCurrentCampus(),
  });

  const switchFacultyUser = (facultyData) => {
    setCurrentFaculty(facultyData);
  };

  const getTotalStudents = () => getClassesByCurrentCampus().reduce((sum, cls) => sum + (cls.studentsCount || 0), 0);

  // Get average class size
  const getAverageClassSize = () => {
    const classesList = getClassesByCurrentCampus();
    if (classesList.length === 0) return 0;
    const total = classesList.reduce((sum, cls) => sum + (cls.studentsCount || 0), 0);
    return Math.round(total / classesList.length);
  };

  const getAssignedSubjectsCount = () => {
    const campusClasses = getClassesByCurrentCampus();
    const facultyId = String(currentFaculty?._id || currentFaculty?.id || "");
    const subjectKeys = new Set();

    campusClasses.forEach((cls) => {
      const classId = String(cls._id || cls.id || "");
      const semesterEntries = Array.isArray(cls.semesterSubjects) ? cls.semesterSubjects : [];

      if (semesterEntries.length > 0) {
        semesterEntries.forEach((term) => {
          const assignments = Array.isArray(term.subjectAssignments) ? term.subjectAssignments : [];
          if (assignments.length > 0) {
            assignments.forEach((assignment) => {
              const subjectId = String(assignment?.subject?._id || assignment?.subject || "");
              const assignedFacultyId = String(assignment?.faculty?._id || assignment?.faculty || "");
              if (!subjectId) return;
              if (facultyId && assignedFacultyId && assignedFacultyId !== facultyId) return;
              if (facultyId && !assignedFacultyId) return;
              subjectKeys.add(`${classId}::${subjectId}`);
            });
            return;
          }

          const classFacultyIds = (Array.isArray(cls.faculty) ? cls.faculty : [])
            .map((item) => String(item?._id || item || ""))
            .filter(Boolean);
          if (facultyId && classFacultyIds.length > 0 && !classFacultyIds.includes(facultyId)) {
            return;
          }

          (term.subjects || []).forEach((subject) => {
            const subjectId = String(subject?._id || subject || "");
            if (!subjectId) return;
            subjectKeys.add(`${classId}::${subjectId}`);
          });
        });

        return;
      }

      const classFacultyIds = (Array.isArray(cls.faculty) ? cls.faculty : [])
        .map((item) => String(item?._id || item || ""))
        .filter(Boolean);
      if (facultyId && classFacultyIds.length > 0 && !classFacultyIds.includes(facultyId)) {
        return;
      }

      (cls.subjects || []).forEach((subject) => {
        const subjectId = String(subject?._id || subject || "");
        if (!subjectId) return;
        subjectKeys.add(`${classId}::${subjectId}`);
      });
    });

    return subjectKeys.size;
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
    getAssignedSubjectsCount,
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


