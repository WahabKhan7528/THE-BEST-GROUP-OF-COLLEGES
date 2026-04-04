import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPortalData } from "../slices/portalsSlice";
import { toggleDarkMode as toggleDarkModeAction } from "../slices/uiSlice";
import { calculateCgpaFromSemesters, calculateCredits } from "../../utils/academicCalculations";

const getRefId = (value) => {
  const rawValue = value?._id || value?.id || value;
  return rawValue ? String(rawValue) : null;
};

const getFacultyProfile = (faculty) => ({
  name: faculty?.name || "Faculty",
  email: faculty?.email || "",
  designation: faculty?.designation || faculty?.department || "Faculty",
  portalId: faculty?.portalId || "",
});

const getTermLabel = (entry) => {
  if (!entry) return "Current Term";
  if (entry.semesterNumber) return `Semester ${entry.semesterNumber}`;
  return entry.annualYear || "Current Term";
};

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
            instructorEmail: assignment.faculty?.email || cls.faculty?.[0]?.email || "",
            instructorDesignation: assignment.faculty?.designation || cls.faculty?.[0]?.designation || assignment.faculty?.department || cls.faculty?.[0]?.department || "Faculty",
            credits: subject.creditHours || 3,
            section: cls.section,
            className: classLabel,
            campus: campusSlug,
            semesterNumber: entry.semesterNumber,
            semesterLabel: getTermLabel(entry),
            status: entry.status,
            classId: cls._id,
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
        instructorEmail: cls.faculty?.[0]?.email || "",
        instructorDesignation: cls.faculty?.[0]?.designation || cls.faculty?.[0]?.department || "Faculty",
        credits: subject.creditHours || 3,
        section: cls.section,
        className: classLabel,
        campus: campusSlug,
        classId: cls._id,
      });
    });
  });

  return Array.from(subjectMap.values());
};

const buildResultSemesters = (results = [], enrolledSubjects = []) => {
  const subjectLookup = new Map();

  enrolledSubjects.forEach((subject) => {
    subjectLookup.set(`${subject.classId || ""}::${subject.subjectId || ""}`, subject);
  });

  const grouped = {};

  results.forEach((result) => {
    const key = result.semester || "General";
    if (!grouped[key]) grouped[key] = [];

    const subjectKey = `${result.classRoom?._id || result.classRoom || ""}::${result.subject?._id || result.subject || ""}`;
    const subjectDetails = subjectLookup.get(subjectKey);

    grouped[key].push({
      code: result.subject?.code || "SUB",
      title: result.subject?.name || "Subject",
      credits: subjectDetails?.credits || result.subject?.creditHours || 3,
      marks: result.marksObtained,
      instructor: subjectDetails?.instructor || result.publishedBy?.name || "Faculty",
      instructorEmail: subjectDetails?.instructorEmail || result.publishedBy?.email || "",
      instructorDesignation: subjectDetails?.instructorDesignation || result.publishedBy?.designation || result.publishedBy?.department || "Faculty",
    });
  });

  return Object.entries(grouped).map(([name, subjects], index) => ({
    id: index + 1,
    name,
    subjects,
  }));
};

export const useStudentContext = () => {
  const dispatch = useDispatch();
  const { classes, announcements, results } = useSelector((state) => state.portals);
  const currentStudent = useSelector((state) => state.auth.user);
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);

  useEffect(() => {
    dispatch(fetchPortalData());
  }, [dispatch]);

  const enrolledSubjects = useMemo(() => buildEnrolledSubjects(classes), [classes]);

  const getCurrentClassRoom = useCallback(() => {
    const currentClassRoomId = getRefId(currentStudent?.currentClassRoom);
    if (currentClassRoomId) {
      const match = classes?.find((cls) => getRefId(cls) === currentClassRoomId);
      if (match) return match;
    }

    const currentCampus = currentStudent?.campus?.slug || currentStudent?.currentClassRoom?.campus?.slug;
    if (currentCampus) {
      const campusMatch = classes?.find((cls) => cls.campus?.slug === currentCampus);
      if (campusMatch) return campusMatch;
    }

    return classes?.[0] || null;
  }, [classes, currentStudent?.campus?.slug, currentStudent?.currentClassRoom]);

  const getCurrentAcademicProfile = useCallback(() => {
    const currentClassRoom = getCurrentClassRoom();
    if (!currentClassRoom) {
      return null;
    }

    const semesterEntries = Array.isArray(currentClassRoom.semesterSubjects) ? currentClassRoom.semesterSubjects : [];
    const currentTerm = semesterEntries.find((entry) => entry.status === "active") || semesterEntries[0] || null;
    const currentSubjects = enrolledSubjects.filter((subject) => {
      if (subject.classId !== currentClassRoom._id) {
        return false;
      }

      if (!currentTerm?.semesterNumber) {
        return true;
      }

      return String(subject.semesterNumber || "") === String(currentTerm.semesterNumber);
    });

    return {
      classRoom: currentClassRoom,
      courseLabel: currentClassRoom.course?.title || currentClassRoom.course?.code || currentClassRoom.name || "Current Course",
      semesterLabel: currentTerm?.semesterNumber ? `Semester ${currentTerm.semesterNumber}` : currentClassRoom.semester || currentClassRoom.annualYear || "-",
      termLabel: getTermLabel(currentTerm),
      termStatus: currentTerm?.status || "planned",
      subjects: currentSubjects,
    };
  }, [enrolledSubjects, getCurrentClassRoom]);

  const getCurrentCampus = useCallback(
    () => classes?.[0]?.campus?.slug || currentStudent?.campus?.slug || currentStudent?.currentClassRoom?.campus?.slug || "main",
    [classes, currentStudent?.campus?.slug, currentStudent?.currentClassRoom?.campus?.slug],
  );

  const getSubjectsByCurrentCampus = useCallback(() => {
    const campus = getCurrentCampus();
    return enrolledSubjects.filter((subject) => subject.campus === campus);
  }, [enrolledSubjects, getCurrentCampus]);

  const getAnnouncementsByCurrentCampus = useCallback(() => {
    const recent = (announcements || []).slice(0, 10).map((item) => ({
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
      total: (announcements || []).length,
      recent,
    };
  }, [announcements]);

  const switchStudentUser = () => {};

  const getTotalCredits = useCallback(() => {
    const currentAcademicProfile = getCurrentAcademicProfile();
    const profileSubjects = currentAcademicProfile?.subjects || [];

    if (profileSubjects.length > 0) {
      return calculateCredits(profileSubjects);
    }

    return calculateCredits(getSubjectsByCurrentCampus());
  }, [getCurrentAcademicProfile, getSubjectsByCurrentCampus]);

  const getCurrentCgpa = useCallback(() => {
    const semesters = buildResultSemesters(results || [], enrolledSubjects);
    const calculatedCgpa = calculateCgpaFromSemesters(semesters);

    if (calculatedCgpa !== null && calculatedCgpa !== undefined) {
      return calculatedCgpa;
    }

    const directCgpa = currentStudent?.cgpa;
    if (directCgpa !== null && directCgpa !== undefined && Number.isFinite(Number(directCgpa))) {
      return Number(directCgpa);
    }

    return null;
  }, [currentStudent?.cgpa, enrolledSubjects, results]);

  const getDetailedResultsByCurrentCampus = useCallback(() => {
    const semesters = buildResultSemesters(results || [], enrolledSubjects);

    return { semesters, currentAcademicProfile: getCurrentAcademicProfile() };
  }, [enrolledSubjects, getCurrentAcademicProfile, results]);

  const toggleDarkMode = useCallback(() => {
    dispatch(toggleDarkModeAction());
  }, [dispatch]);

  return {
    currentStudent,
    enrolledSubjects,
    isDarkMode,
    getCurrentCampus,
    getSubjectsByCurrentCampus,
    getAnnouncementsByCurrentCampus,
    getDetailedResultsByCurrentCampus,
    getCurrentAcademicProfile,
    getTotalCredits,
    getCurrentCgpa,
    switchStudentUser,
    toggleDarkMode,
  };
};
