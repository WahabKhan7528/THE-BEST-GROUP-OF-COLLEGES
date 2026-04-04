const gradeBands = [
  { min: 85, grade: "A", qp: 4.0 },
  { min: 80, grade: "A-", qp: 3.7 },
  { min: 75, grade: "B+", qp: 3.3 },
  { min: 70, grade: "B", qp: 3.0 },
  { min: 65, grade: "B-", qp: 2.7 },
  { min: 61, grade: "C+", qp: 2.3 },
  { min: 58, grade: "C", qp: 2.0 },
  { min: 55, grade: "C-", qp: 1.7 },
  { min: 50, grade: "D", qp: 1.0 },
];

const normalizeMarks = (value) => {
  const marks = Number(value);
  return Number.isFinite(marks) ? marks : 0;
};

const normalizeCredits = (subject) => {
  const credits = Number(subject?.credits ?? subject?.creditHours ?? 0);
  return Number.isFinite(credits) && credits > 0 ? credits : 0;
};

export const getGradeDetails = (marks) => {
  const normalizedMarks = normalizeMarks(marks);
  const matchedBand = gradeBands.find((band) => normalizedMarks >= band.min);

  if (matchedBand) {
    return {
      grade: matchedBand.grade,
      qp: matchedBand.qp,
      color:
        matchedBand.qp >= 3
          ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30"
          : matchedBand.qp >= 2
            ? "text-college-gold dark:text-college-gold bg-college-navy/5 dark:bg-college-gold/10"
            : matchedBand.qp >= 1
              ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30"
              : "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30",
    };
  }

  return {
    grade: "F",
    qp: 0.0,
    color: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30",
  };
};

export const calculateCredits = (subjects = []) => {
  if (!Array.isArray(subjects) || subjects.length === 0) {
    return 0;
  }

  return subjects.reduce((sum, subject) => sum + normalizeCredits(subject), 0);
};

export const calculateWeightedGpa = (subjects = []) => {
  if (!Array.isArray(subjects) || subjects.length === 0) {
    return null;
  }

  let totalQualityPoints = 0;
  let totalCredits = 0;

  subjects.forEach((subject) => {
    const marks = normalizeMarks(subject?.marks);
    const credits = normalizeCredits(subject);

    if (marks <= 0 || credits <= 0) {
      return;
    }

    const { qp } = getGradeDetails(marks);
    totalQualityPoints += qp * credits;
    totalCredits += credits;
  });

  if (totalCredits <= 0) {
    return null;
  }

  return Number((totalQualityPoints / totalCredits).toFixed(2));
};

export const calculateCgpaFromSemesters = (semesters = []) => {
  const allSubjects = Array.isArray(semesters)
    ? semesters.flatMap((semester) => semester?.subjects || [])
    : [];

  return calculateWeightedGpa(allSubjects);
};
