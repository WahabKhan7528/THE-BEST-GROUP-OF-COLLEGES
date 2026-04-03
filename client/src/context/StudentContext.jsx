import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useThemeContext } from "./ThemeContext";
import { authApi, portalApi } from "../services/api";

const buildEnrolledSubjects = (classes = []) => {
  const subjectMap = new Map();

  classes.forEach((cls) => {
    const campusSlug = cls.campus?.slug || "main";
    const classLabel = [cls.name, cls.section].filter(Boolean).join(" - ") || "Class";
    const semesterEntries = Array.isArray(cls.semesterSubjects) ? cls.semesterSubjects : [];

    if (semesterEntries.length > 0) {
      semesterEntries.forEach((entry) => {
        const assignments = Array.isArray(entry.subjectAssignments) && entry.subjectAssignments.length > 0
          ? entry.subjectAssignments
          : (entry.subjects || []).map((subject) => ({
              subject,
              faculty: Array.isArray(entry.faculty) ? entry.faculty[0] : null,
            }));

        assignments.forEach((assignment) => {
          const subject = assignment.subject;
          if (!subject?._id) {
            return;
          }

          const key = `${cls._id}-${entry.semesterNumber}-${subject._id}`;
          if (subjectMap.has(key)) {
            return;
          }

          subjectMap.set(key, {
            id: key,
            subjectId: subject._id,
            code: subject.code,
            name: subject.name,
            instructor: assignment.faculty?.name || cls.faculty?.[0]?.name || "Faculty",
            credits: subject.creditHours || 3,
            section: cls.section,
            className: classLabel,
            campus: campusSlug,
            semesterNumber: entry.semesterNumber,
            status: entry.status,
          });
        });
      });

      return;
    }

    (cls.subjects || []).forEach((subject) => {
      if (!subject?._id) {
        return;
      }

      const key = `${cls._id}-${subject._id}`;
      if (subjectMap.has(key)) {
        return;
      }

      subjectMap.set(key, {
        id: key,
        subjectId: subject._id,
        code: subject.code,
        name: subject.name,
        instructor: cls.faculty?.[0]?.name || "Faculty",
        credits: subject.creditHours || 3,
        section: cls.section,
        className: classLabel,
        campus: campusSlug,
      });
    });
  });

  return Array.from(subjectMap.values());
};

// Create the context
const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [currentStudent, setCurrentStudent] = useState(null);
  const [classes, setClasses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [results, setResults] = useState([]);

  const { isDarkMode, toggleDarkMode } = useThemeContext();

  useEffect(() => {
    const loadStudentData = async () => {
      try {
        const meRes = await authApi.me();
        setCurrentStudent(meRes.data.user || null);
      } catch {
        setCurrentStudent(null);
      }

      try {
        const classesRes = await portalApi.classes();
        setClasses(classesRes.data.data || []);
      } catch {
        setClasses([]);
      }

      try {
        const announcementsRes = await portalApi.announcements();
        setAnnouncements(announcementsRes.data.data || []);
      } catch {
        setAnnouncements([]);
      }

      try {
        const resultsRes = await portalApi.results();
        setResults(resultsRes.data.data || []);
      } catch {
        setResults([]);
      }
    };

    loadStudentData();
  }, []);

  const enrolledSubjects = useMemo(() => buildEnrolledSubjects(classes), [classes]);

  const getCurrentCampus = useCallback(() => classes[0]?.campus?.slug || currentStudent?.campus?.slug || currentStudent?.currentClassRoom?.campus?.slug || "main", [classes, currentStudent?.campus?.slug, currentStudent?.currentClassRoom?.campus?.slug]);

  const getSubjectsByCurrentCampus = useCallback(() => {
    const campus = getCurrentCampus();
    return enrolledSubjects.filter((subject) => subject.campus === campus);
  }, [enrolledSubjects, getCurrentCampus]);

  const getAnnouncementsByCurrentCampus = useCallback(() => {
    const recent = announcements.slice(0, 10).map((item) => ({
      id: item._id,
      title: item.title,
      description: item.description,
      date: new Date(item.createdAt).toLocaleDateString(),
      classSection: item.targetClasses?.map((cls) => cls.name).join(", ") || "Class",
      instructor: item.createdBy?.name || "Faculty",
      type: "update",
    }));

    return {
      unread: 0,
      total: announcements.length,
      recent,
    };
  }, [announcements]);

  const switchStudentUser = useCallback((studentData) => {
    setCurrentStudent(studentData);
  }, []);

  const getTotalCredits = useCallback(() => {
    return getSubjectsByCurrentCampus().reduce(
      (sum, subject) => sum + subject.credits,
      0,
    );
  }, [getSubjectsByCurrentCampus]);

  const getDetailedResultsByCurrentCampus = useCallback(() => {
    const grouped = {};
    results.forEach((result) => {
      const key = result.semester || "General";
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push({
        code: result.subject?.code || "SUB",
        title: result.subject?.name || "Subject",
        credits: 3,
        marks: result.marksObtained,
      });
    });

    const semesters = Object.entries(grouped).map(([name, subjects], index) => ({
      id: index + 1,
      name,
      subjects,
    }));

    return { semesters };
  }, [results]);

  const contextValue = useMemo(() => ({
    currentStudent,
    enrolledSubjects,
    isDarkMode,
    getCurrentCampus,
    getSubjectsByCurrentCampus,
    getAnnouncementsByCurrentCampus,
    getDetailedResultsByCurrentCampus,
    getTotalCredits,
    switchStudentUser,
    toggleDarkMode,
  }), [
    currentStudent,
    enrolledSubjects,
    isDarkMode,
    getCurrentCampus,
    getSubjectsByCurrentCampus,
    getAnnouncementsByCurrentCampus,
    getDetailedResultsByCurrentCampus,
    getTotalCredits,
    switchStudentUser,
    toggleDarkMode,
  ]);

  return (
    <StudentContext.Provider value={contextValue}>{children}</StudentContext.Provider>
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
