import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPortalData } from "../slices/portalsSlice";
import { toggleDarkMode as toggleDarkModeAction } from "../slices/uiSlice";

export const useFacultyContext = () => {
  const dispatch = useDispatch();
  const { classes, assignments, submissions, loading } = useSelector(
    (state) => state.portals,
  );
  const currentFaculty = useSelector((state) => state.auth.user);
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);

  useEffect(() => {
    dispatch(fetchPortalData());
  }, [dispatch]);

  const classesByCampus = useMemo(() => {
    const map = {};
    (classes || []).forEach((cls) => {
      const key = cls.campus?.slug || cls.campus?.code?.toLowerCase() || "main";
      if (!map[key]) map[key] = [];
      map[key].push({
        id: cls._id,
        code: cls.course?.code || cls.name,
        name: cls.name,
        section: cls.section,
        students: cls.students?.length || 0,
        studentsList: cls.students || [],
        semester: cls.semester || "-",
        annualYear: cls.annualYear || "-",
        semesterSubjects: cls.semesterSubjects || [],
        subjects: cls.subjects || [],
        faculty: cls.faculty || [],
        course: cls.course || null,
      });
    });
    return map;
  }, [classes]);

  const getCurrentCampus = () => {
    const classCampus = Object.keys(classesByCampus)[0];
    return classCampus || currentFaculty?.campus?.slug || "main";
  };

  const getClassesByCurrentCampus = () =>
    classesByCampus[getCurrentCampus()] || [];

  const getAssignmentStatsByCurrentCampus = () => {
    const campusClasses = getClassesByCurrentCampus();
    const classIds = new Set(campusClasses.map((cls) => cls.id));
    const campusAssignments = (assignments || []).filter((assignment) =>
      classIds.has(assignment.classRoom?._id || assignment.classRoom),
    );

    const campusSubmissions = (submissions || []).filter((submission) =>
      classIds.has(
        submission.assignment?.classRoom?._id ||
          submission.assignment?.classRoom,
      ),
    );

    const reviewed = campusSubmissions.filter(
      (sub) => sub.marks !== null && sub.marks !== undefined,
    ).length;
    const totalMarks = campusSubmissions
      .filter((sub) => typeof sub.marks === "number")
      .reduce((sum, sub) => sum + sub.marks, 0);

    const averageScore =
      reviewed > 0 ? `${Math.round(totalMarks / reviewed)}%` : "0%";
    return {
      totalAssignments: campusAssignments.length,
      pendingSubmissions: Math.max(campusSubmissions.length - reviewed, 0),
      reviewed,
      averageScore,
    };
  };

  const getCampusContext = () => ({
    campus: getCurrentCampus(),
    classes: getClassesByCurrentCampus(),
    assignmentStats: getAssignmentStatsByCurrentCampus(),
  });

  const switchFacultyUser = () => {};

  const getTotalStudents = () =>
    getClassesByCurrentCampus().reduce((sum, cls) => sum + cls.students, 0);

  const getAverageClassSize = () => {
    const classesList = getClassesByCurrentCampus();
    if (classesList.length === 0) return 0;
    const total = classesList.reduce((sum, cls) => sum + cls.students, 0);
    return Math.round(total / classesList.length);
  };

  const getAssignedSubjectsCount = () => {
    const campusClasses = getClassesByCurrentCampus();
    const facultyId = String(currentFaculty?._id || currentFaculty?.id || "");
    const subjectKeys = new Set();

    campusClasses.forEach((cls) => {
      const classId = String(cls.id || "");
      const semesterEntries = Array.isArray(cls.semesterSubjects)
        ? cls.semesterSubjects
        : [];

      if (semesterEntries.length > 0) {
        semesterEntries.forEach((term) => {
          const assignments = Array.isArray(term.subjectAssignments)
            ? term.subjectAssignments
            : [];
          if (assignments.length > 0) {
            assignments.forEach((assignment) => {
              const subjectId = String(
                assignment?.subject?._id || assignment?.subject || "",
              );
              const assignedFacultyId = String(
                assignment?.faculty?._id || assignment?.faculty || "",
              );
              if (!subjectId) return;
              if (
                facultyId &&
                assignedFacultyId &&
                assignedFacultyId !== facultyId
              )
                return;
              if (facultyId && !assignedFacultyId) return;
              subjectKeys.add(`${classId}::${subjectId}`);
            });
            return;
          }

          const classFacultyIds = (
            Array.isArray(cls.faculty) ? cls.faculty : []
          )
            .map((item) => String(item?._id || item || ""))
            .filter(Boolean);
          if (
            facultyId &&
            classFacultyIds.length > 0 &&
            !classFacultyIds.includes(facultyId)
          ) {
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
      if (
        facultyId &&
        classFacultyIds.length > 0 &&
        !classFacultyIds.includes(facultyId)
      ) {
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

  const getAssignedSubjectsByCurrentCampus = () => {
    const campusClasses = getClassesByCurrentCampus();
    const facultyId = String(currentFaculty?._id || currentFaculty?.id || "");
    const subjectMap = new Map();

    campusClasses.forEach((cls) => {
      const classLabel =
        [cls.name, cls.section].filter(Boolean).join(" - ") ||
        cls.name ||
        "Class";
      const semesterEntries = Array.isArray(cls.semesterSubjects)
        ? cls.semesterSubjects
        : [];

      if (semesterEntries.length > 0) {
        semesterEntries.forEach((term) => {
          const assignments = Array.isArray(term.subjectAssignments)
            ? term.subjectAssignments
            : [];

          if (assignments.length > 0) {
            assignments.forEach((assignment) => {
              const subject = assignment?.subject;
              const subjectId = String(subject?._id || subject || "");
              const assignedFacultyId = String(
                assignment?.faculty?._id || assignment?.faculty || "",
              );

              if (!subjectId) return;
              if (
                facultyId &&
                assignedFacultyId &&
                assignedFacultyId !== facultyId
              )
                return;
              if (facultyId && !assignedFacultyId) return;

              if (!subjectMap.has(subjectId)) {
                subjectMap.set(subjectId, {
                  _id: subject?._id || subjectId,
                  name: subject?.name || "Unknown Subject",
                  code: subject?.code || "-",
                  credits:
                    typeof subject?.creditHours === "number"
                      ? subject.creditHours
                      : typeof subject?.credits === "number"
                        ? subject.credits
                        : null,
                  classLabel,
                });
              }
            });
            return;
          }

          const classFacultyIds = (
            Array.isArray(cls.faculty) ? cls.faculty : []
          )
            .map((item) => String(item?._id || item || ""))
            .filter(Boolean);
          if (
            facultyId &&
            classFacultyIds.length > 0 &&
            !classFacultyIds.includes(facultyId)
          ) {
            return;
          }

          (term.subjects || []).forEach((subject) => {
            const subjectId = String(subject?._id || subject || "");
            if (!subjectId) return;

            if (!subjectMap.has(subjectId)) {
              subjectMap.set(subjectId, {
                _id: subject?._id || subjectId,
                name: subject?.name || "Unknown Subject",
                code: subject?.code || "-",
                credits:
                  typeof subject?.creditHours === "number"
                    ? subject.creditHours
                    : typeof subject?.credits === "number"
                      ? subject.credits
                      : null,
                classLabel,
              });
            }
          });
        });

        return;
      }

      const classFacultyIds = (Array.isArray(cls.faculty) ? cls.faculty : [])
        .map((item) => String(item?._id || item || ""))
        .filter(Boolean);
      if (
        facultyId &&
        classFacultyIds.length > 0 &&
        !classFacultyIds.includes(facultyId)
      ) {
        return;
      }

      (cls.subjects || []).forEach((subject) => {
        const subjectId = String(subject?._id || subject || "");
        if (!subjectId) return;

        if (!subjectMap.has(subjectId)) {
          subjectMap.set(subjectId, {
            _id: subject?._id || subjectId,
            name: subject?.name || "Unknown Subject",
            code: subject?.code || "-",
            credits:
              typeof subject?.creditHours === "number"
                ? subject.creditHours
                : typeof subject?.credits === "number"
                  ? subject.credits
                  : null,
            classLabel,
          });
        }
      });
    });

    return Array.from(subjectMap.values());
  };

  const toggleDarkMode = () => {
    dispatch(toggleDarkModeAction());
  };

  return {
    currentFaculty,
    classes,
    loading,
    isDarkMode,
    getCurrentCampus,
    getClassesByCurrentCampus,
    getAssignmentStatsByCurrentCampus,
    getCampusContext,
    getTotalStudents,
    getAverageClassSize,
    getAssignedSubjectsCount,
    getAssignedSubjectsByCurrentCampus,
    switchFacultyUser,
    toggleDarkMode,
  };
};
