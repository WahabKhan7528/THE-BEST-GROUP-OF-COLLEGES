import { connectDB } from "../database/db.js";
import "./loadEnv.js";
import { ROLES } from "../config/constants.js";
import AnnualYear from "../models/AnnualYear.js";
import AnnualYearMapping from "../models/AnnualYearMapping.js";
import Announcement from "../models/Announcement.js";
import Assignment from "../models/Assignment.js";
import Campus from "../models/Campus.js";
import ClassRoom from "../models/ClassRoom.js";
import ClassSubject from "../models/ClassSubject.js";
import Course from "../models/Course.js";
import CourseSemesterMapping from "../models/CourseSemesterMapping.js";
import GalleryItem from "../models/GalleryItem.js";
import Material from "../models/Material.js";
import NewsEvent from "../models/NewsEvent.js";
import RefreshToken from "../models/RefreshToken.js";
import Result from "../models/Result.js";
import ResultCalculationLog from "../models/ResultCalculationLog.js";
import Semester from "../models/Semester.js";
import StudentEnrollment from "../models/StudentEnrollment.js";
import Submission from "../models/Submission.js";
import Subject from "../models/Subject.js";
import User from "../models/User.js";


const demoPassword = "admin@123";
const demoEmailDomain = "tbc.edu.pk";

const slugify = (value) => String(value || "")
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

const addDays = (date, days) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000);

const addMonths = (date, months) => {
  const nextDate = new Date(date);
  nextDate.setMonth(nextDate.getMonth() + months);
  return nextDate;
};

const formatDateInput = (date) => new Date(date).toISOString().slice(0, 10);

const termLabel = (number, examSystem = "semester") => {
  if (examSystem === "annual") {
    const suffix = number === 1 ? "st" : number === 2 ? "nd" : number === 3 ? "rd" : "th";
    return `${number}${suffix} Year`;
  }

  const suffix = number === 1 ? "st" : number === 2 ? "nd" : number === 3 ? "rd" : "th";
  return `${number}${suffix} Semester`;
};

const buildPortalId = (role, number) => {
  const prefixMap = {
    [ROLES.SUPER_ADMIN]: "ADM",
    [ROLES.ADMIN]: "ADM",
    [ROLES.FACULTY]: "FAC",
    [ROLES.STUDENT]: "STD",
  };

  const prefix = prefixMap[role] || "STD";
  return `${prefix}-${String(number).padStart(4, "0")}`;
};

const campusShortCodes = {
  main: "MC",
  law: "LC",
  hala: "HC",
};

const courseShortNames = {
  BSCS: "CS",
  BBA: "BBA",
  BSMATH: "Math",
  BSENG: "Eng",
  LLB5: "LLB",
  LLM: "LLM",
  FSCMED: "FSc Med",
  FSCENG: "FSc Eng",
  ICS: "ICS",
  ICOM: "I.Com",
};

const studentFirstNames = [
  "Ahsan",
  "Amina",
  "Bilal",
  "Hira",
  "Imran",
  "Sana",
  "Usman",
  "Maryam",
  "Zain",
  "Noor",
  "Hassan",
  "Fatima",
  "Tariq",
  "Khadija",
  "Hamza",
  "Maham",
  "Shahzaib",
  "Areeba",
  "Danish",
  "Iqra",
];

const studentLastNames = [
  "Khan",
  "Ahmed",
  "Malik",
  "Ali",
  "Hussain",
  "Raza",
  "Sheikh",
  "Iqbal",
  "Farooq",
  "Saeed",
];

const buildStudentName = (index) => {
  const first = studentFirstNames[index % studentFirstNames.length];
  const last = studentLastNames[Math.floor(index / studentFirstNames.length) % studentLastNames.length];
  return `${first} ${last}`;
};

const buildShortTermLabel = (number, examSystem = "semester") => {
  const suffix = number === 1 ? "st" : number === 2 ? "nd" : number === 3 ? "rd" : "th";
  return examSystem === "annual" ? `${number}${suffix} Yr` : `${number}${suffix} Sem`;
};

const buildDemoClassName = (campusSlug, courseSeed, classSeed) => {
  const campusCode = campusShortCodes[campusSlug] || campusSlug.slice(0, 2).toUpperCase();
  const courseLabel = courseShortNames[courseSeed.code] || courseSeed.code;
  const termLabelText = buildShortTermLabel(classSeed.semester, courseSeed.examSystem);

  return `${campusCode} ${courseLabel} ${termLabelText} ${classSeed.section}`.trim();
};

const buildTermWindow = (index, examSystem) => {
  const startDate = addMonths(new Date("2026-01-01"), index * (examSystem === "annual" ? 12 : 6));
  const endDate = addMonths(startDate, examSystem === "annual" ? 12 : 6);
  endDate.setDate(endDate.getDate() - 1);

  return {
    startDate: formatDateInput(startDate),
    endDate: formatDateInput(endDate),
  };
};

const campusSeeds = [
  {
    name: "Main Campus",
    slug: "main",
    location: "Main Campus, Punjab, Pakistan",
    description: "Primary campus focused on computer science, business administration, mathematics, and English programs.",
    established: "1985",
    dean: "Dr. Muhammad Usman",
    contact: { phone: "0300-1001001", email: "main@tbc.edu.pk", website: "https://main.tbc.edu.pk" },
  },
  {
    name: "Law College",
    slug: "law",
    location: "Law College, Punjab, Pakistan",
    description: "Law college campus for LLB and LLM degree programs with practical legal training.",
    established: "1994",
    dean: "Dr. Sarah Ahmed",
    contact: { phone: "0300-1001002", email: "law@tbc.edu.pk", website: "https://law.tbc.edu.pk" },
  },
  {
    name: "Hala Campus",
    slug: "hala",
    location: "Hala Campus, Punjab, Pakistan",
    description: "Intermediate campus offering science and commerce streams for pre-university students.",
    established: "2002",
    dean: "Prof. Zainab Malik",
    contact: { phone: "0300-1001003", email: "hala@tbc.edu.pk", website: "https://hala.tbc.edu.pk" },
  },
];

const campusDirectory = {
  main: {
    coursePrefix: "Main Campus",
    faculty: [
      {
        name: "Dr. Muhammad Usman",
        designation: "Professor",
        subjectSpecialization: "Physics",
        education: "PhD in Physics, MIT",
        experienceYears: 18,
        email: "m.usman@tbc.edu.pk",
        department: "Physics",
      },
      {
        name: "Dr. Fatima Hassan",
        designation: "Associate Professor",
        subjectSpecialization: "Chemistry",
        education: "PhD in Chemistry, Stanford University",
        experienceYears: 12,
        email: "fatima.hassan@tbc.edu.pk",
        department: "Chemistry",
      },
      {
        name: "Mr. Bilal Ahmed",
        designation: "Lecturer",
        subjectSpecialization: "Mathematics",
        education: "MS Mathematics, LUMS",
        experienceYears: 5,
        email: "bilal.ahmed@tbc.edu.pk",
        department: "Mathematics",
      },
      {
        name: "Dr. Muhammad Ali",
        designation: "HOD & Professor",
        subjectSpecialization: "Artificial Intelligence",
        education: "PhD CS, MIT",
        experienceYears: 15,
        email: "m.ali@tbc.edu.pk",
        department: "Computer Science",
      },
      {
        name: "Ms. Ayesha Khan",
        designation: "Assistant Professor",
        subjectSpecialization: "Data Science",
        education: "MS Data Science, NUST",
        experienceYears: 6,
        email: "ayesha.khan@tbc.edu.pk",
        department: "Computer Science",
      },
    ],
    courses: [
      {
        title: "BS Computer Science",
        code: "BSCS",
        duration: "4 Years",
        eligibility: "Intermediate with Mathematics",
        examSystem: "semester",
        totalSemesters: 8,
        totalYears: null,
        totalCreditHours: 124,
        description: "A comprehensive four-year program designed to mold future tech leaders. Covers algorithms, software engineering, AI, and more.",
      },
      {
        title: "Bachelor of Business Admin",
        code: "BBA",
        duration: "4 Years",
        eligibility: "Intermediate in any stream",
        examSystem: "semester",
        totalSemesters: 8,
        totalYears: null,
        totalCreditHours: 120,
        description: "Develop strong management and leadership skills. Focuses on marketing, finance, human resources, and entrepreneurship.",
      },
      {
        title: "BS Mathematics",
        code: "BSMATH",
        duration: "4 Years",
        eligibility: "Intermediate with Mathematics",
        examSystem: "semester",
        totalSemesters: 8,
        totalYears: null,
        totalCreditHours: 118,
        description: "Explore the world of numbers and logic. Prepares students for careers in data science, research, and academia.",
      },
      {
        title: "BS English",
        code: "BSENG",
        duration: "4 Years",
        eligibility: "Intermediate in any stream",
        examSystem: "semester",
        totalSemesters: 8,
        totalYears: null,
        totalCreditHours: 116,
        description: "Master the art of communication and literature. Ideal for aspiring writers, editors, and educators.",
      },
    ],
    classes: [
      { courseCode: "BSCS", name: "MC CS 5th Sem A", section: "A", semester: 5, classType: "semester", special: true },
      { courseCode: "BSCS", name: "MC CS 3rd Sem B", section: "B", semester: 3, classType: "semester" },
      { courseCode: "BBA", name: "MC BBA 3rd Sem A", section: "A", semester: 3, classType: "semester" },
      { courseCode: "BSMATH", name: "MC Math 5th Sem A", section: "A", semester: 5, classType: "semester" },
      { courseCode: "BSENG", name: "MC Eng 7th Sem A", section: "A", semester: 7, classType: "semester" },
      { courseCode: "BSCS", name: "MC CS 2nd Sem A", section: "A", semester: 2, classType: "semester" },
    ],
    curriculum: {
      BSCS: [
        ["Programming Fundamentals", "Calculus", "Computer Applications", "English Composition", "Islamic Studies"],
        ["Object Oriented Programming", "Discrete Mathematics", "Data Structures", "Database Concepts", "Pakistan Studies"],
        ["Database Systems", "Software Engineering", "Linear Algebra", "Statistics", "Technical Writing"],
        ["Operating Systems", "Computer Networks", "Algorithms", "Web Development", "Entrepreneurship"],
        ["Artificial Intelligence", "Machine Learning", "Theory of Automata", "Mobile App Development", "Final Year Project"],
      ],
      BBA: [
        ["Principles of Management", "Financial Accounting", "Business Mathematics", "Business Communication", "Islamic Studies"],
        ["Marketing Management", "Organizational Behavior", "Cost Accounting", "Business Statistics", "Pakistan Studies"],
        ["Human Resource Management", "Financial Management", "Economics", "Business Law", "Research Methods"],
        ["Entrepreneurship", "Supply Chain Management", "Auditing", "E-Commerce", "Project Management"],
        ["Strategic Management", "Corporate Finance", "International Business", "Business Ethics", "Final Project"],
      ],
      BSMATH: [
        ["Calculus I", "Algebra", "Analytical Geometry", "Physics", "English Communication"],
        ["Calculus II", "Probability", "Differential Equations", "Discrete Mathematics", "Pakistan Studies"],
        ["Linear Algebra", "Numerical Analysis", "Statistics", "Real Analysis", "Computer Skills"],
        ["Complex Analysis", "Topology", "Operations Research", "Optimization", "Research Methods"],
        ["Functional Analysis", "Applied Mathematics", "Mathematical Modelling", "Computational Mathematics", "Thesis"],
      ],
      BSENG: [
        ["English Grammar", "Introduction to Literature", "Linguistics", "Communication Skills", "Islamic Studies"],
        ["Poetry", "Prose", "Drama", "Language History", "Pakistan Studies"],
        ["Literary Criticism", "Translation Studies", "Research Writing", "Phonetics", "World Literature"],
        ["Novel Studies", "Advanced Grammar", "Media Writing", "Creative Writing", "Applied Linguistics"],
        ["Postcolonial Literature", "Modern Poetry", "Comparative Literature", "Teaching English", "Final Project"],
      ],
    },
  },
  law: {
    coursePrefix: "Law College",
    faculty: [
      {
        name: "Dr. Ahmed Khan",
        designation: "Professor",
        subjectSpecialization: "Constitutional Law",
        education: "PhD in Law, Harvard University",
        experienceYears: 20,
        email: "ahmed.khan@tbc.edu.pk",
        department: "Law",
      },
      {
        name: "Ms. Sarah Ali",
        designation: "Assistant Professor",
        subjectSpecialization: "Criminal Law",
        education: "LLM, Oxford University",
        experienceYears: 8,
        email: "sarah.ali@tbc.edu.pk",
        department: "Law",
      },
      {
        name: "Dr. Sarah Ahmed",
        designation: "Professor & Dean",
        subjectSpecialization: "Constitutional Law",
        education: "PhD Law, Harvard University",
        experienceYears: 18,
        email: "sarah.ahmed@tbc.edu.pk",
        department: "Law",
      },
      {
        name: "Mr. Kamran Khan",
        designation: "Associate Professor",
        subjectSpecialization: "Criminal Law",
        education: "LLM, University of London",
        experienceYears: 10,
        email: "kamran.khan@tbc.edu.pk",
        department: "Law",
      },
    ],
    courses: [
      {
        title: "LLB (5 Years)",
        code: "LLB5",
        duration: "5 Years",
        eligibility: "Intermediate or equivalent",
        examSystem: "annual",
        totalSemesters: null,
        totalYears: 5,
        totalCreditHours: 150,
        description: "A comprehensive five-year degree program recognized by the Pakistan Bar Council. Covers civil, criminal, and corporate law in depth.",
      },
      {
        title: "LLM",
        code: "LLM",
        duration: "2 Years",
        eligibility: "LLB or equivalent",
        examSystem: "annual",
        totalSemesters: null,
        totalYears: 2,
        totalCreditHours: 60,
        description: "Advanced Master of Laws program for specialization in International Law, Corporate Law, or Human Rights.",
      },
    ],
    classes: [
      { courseCode: "LLB5", name: "LC LLB 1st Yr A", section: "A", semester: 1, classType: "annual" },
      { courseCode: "LLB5", name: "LC LLB 2nd Yr A", section: "A", semester: 2, classType: "annual" },
      { courseCode: "LLB5", name: "LC LLB 3rd Yr A", section: "A", semester: 3, classType: "annual" },
      { courseCode: "LLM", name: "LC LLM 1st Yr A", section: "A", semester: 1, classType: "annual" },
      { courseCode: "LLM", name: "LC LLM 2nd Yr A", section: "A", semester: 2, classType: "annual" },
    ],
    curriculum: {
      LLB5: [
        ["Introduction to Law", "English for Law", "Constitutional Law I", "Islamic Jurisprudence", "Pakistan Studies"],
        ["Criminal Law I", "Civil Law I", "Legal Writing", "Qanoon-e-Shahadat", "Research Methods"],
        ["Constitutional Law II", "Criminal Law II", "Property Law", "Contract Law", "Family Law"],
        ["Administrative Law", "Labour Law", "Corporate Law", "Taxation Law", "Legal Drafting"],
        ["Human Rights Law", "International Law", "Professional Ethics", "Moot Court", "Thesis"],
      ],
      LLM: [
        ["Advanced Constitutional Law", "Research Methodology", "Comparative Law", "Legal Philosophy", "Seminar"],
        ["Corporate Governance", "International Human Rights", "Criminal Procedure", "Dispute Resolution", "Thesis"],
      ],
    },
  },
  hala: {
    coursePrefix: "Hala Campus",
    faculty: [
      {
        name: "Prof. Zainab Malik",
        designation: "Professor",
        subjectSpecialization: "English Literature",
        education: "PhD in Literature, Cambridge University",
        experienceYears: 22,
        email: "zainab.malik@tbc.edu.pk",
        department: "English",
      },
      {
        name: "Mr. Ali Raza",
        designation: "Assistant Professor",
        subjectSpecialization: "Economics",
        education: "MSc Economics, LSE",
        experienceYears: 7,
        email: "ali.raza@tbc.edu.pk",
        department: "Commerce",
      },
      {
        name: "Dr. Hina Shah",
        designation: "Associate Professor",
        subjectSpecialization: "Psychology",
        education: "PhD Psychology, Columbia University",
        experienceYears: 14,
        email: "hina.shah@tbc.edu.pk",
        department: "Science",
      },
    ],
    courses: [
      {
        title: "FSc Pre-Medical",
        code: "FSCMED",
        duration: "2 Years",
        eligibility: "Matric with Science",
        examSystem: "annual",
        totalSemesters: null,
        totalYears: 2,
        totalCreditHours: 60,
        description: "Comprehensive study of Biology, Physics, and Chemistry. Ideal for aspiring doctors and medical professionals.",
      },
      {
        title: "FSc Pre-Engineering",
        code: "FSCENG",
        duration: "2 Years",
        eligibility: "Matric with Science",
        examSystem: "annual",
        totalSemesters: null,
        totalYears: 2,
        totalCreditHours: 60,
        description: "A rigorous foundation in Mathematics, Physics, and Chemistry. Prepares students for top engineering universities.",
      },
      {
        title: "ICS",
        code: "ICS",
        duration: "2 Years",
        eligibility: "Matric with Science",
        examSystem: "annual",
        totalSemesters: null,
        totalYears: 2,
        totalCreditHours: 60,
        description: "Information & Computer Science. Perfect blend of computer science with mathematics or physics for future tech leaders.",
      },
      {
        title: "I.Com",
        code: "ICOM",
        duration: "2 Years",
        eligibility: "Matric with Commerce",
        examSystem: "annual",
        totalSemesters: null,
        totalYears: 2,
        totalCreditHours: 60,
        description: "Intermediate in Commerce. Building strong fundamentals in accounting, banking, and business finance.",
      },
    ],
    classes: [
      { courseCode: "FSCMED", name: "HC FSc Med 1st Yr A", section: "A", semester: 1, classType: "annual" },
      { courseCode: "FSCMED", name: "HC FSc Med 2nd Yr A", section: "A", semester: 2, classType: "annual" },
      { courseCode: "FSCENG", name: "HC FSc Eng 1st Yr A", section: "A", semester: 1, classType: "annual" },
      { courseCode: "ICS", name: "HC ICS 1st Yr A", section: "A", semester: 1, classType: "annual" },
      { courseCode: "ICOM", name: "HC I.Com 1st Yr A", section: "A", semester: 1, classType: "annual" },
    ],
    curriculum: {
      FSCMED: [
        ["Biology I", "Physics I", "Chemistry I", "English", "Islamic Studies"],
        ["Biology II", "Physics II", "Chemistry II", "Pak Studies", "Urdu"],
      ],
      FSCENG: [
        ["Mathematics I", "Physics I", "Chemistry I", "English", "Islamic Studies"],
        ["Mathematics II", "Physics II", "Chemistry II", "Pak Studies", "Urdu"],
      ],
      ICS: [
        ["Computer Science I", "Mathematics I", "Physics I", "English", "Islamic Studies"],
        ["Computer Science II", "Mathematics II", "Physics II", "Pak Studies", "Urdu"],
      ],
      ICOM: [
        ["Principles of Accounting I", "Economics I", "Commerce I", "English", "Islamic Studies"],
        ["Principles of Accounting II", "Economics II", "Commerce II", "Pak Studies", "Urdu"],
      ],
    },
  },
};

const courseTermSubjects = (courseCode, examSystem) => {
  const campusKey = Object.keys(campusDirectory).find((key) => campusDirectory[key].courses.some((course) => course.code === courseCode));
  const campus = campusDirectory[campusKey];
  const course = campus.courses.find((item) => item.code === courseCode);
  const curricula = campus.curriculum[courseCode] || [];

  return curricula.map((subjectNames, index) => subjectNames.map((name, subjectIndex) => ({
    name,
    code: `${courseCode}-${String(index + 1)}${String(subjectIndex + 1).padStart(2, "0")}`,
    description: `${name} for ${course.title}`,
    creditHours: examSystem === "semester" ? 3 : 4,
    isElective: subjectIndex === subjectNames.length - 1 && examSystem === "semester",
  })));
};

const buildPortalCampusData = () => campusSeeds.map((campus) => ({
  ...campus,
  slug: campus.slug,
}));
const resetCollections = [
  RefreshToken,
  ResultCalculationLog,
  Result,
  Submission,
  Assignment,
  StudentEnrollment,
  ClassSubject,
  ClassRoom,
  Subject,
  CourseSemesterMapping,
  AnnualYearMapping,
  User,
  Campus,
  Course,
  Semester,
  AnnualYear,
  NewsEvent,
  GalleryItem,
  Material,
  Announcement,
];
const createUsers = async (campusDocs) => {
  const superAdmin = await User.create({
    portalId: "ADM-1000",
    name: "System Super Admin",
    email: `admin@${demoEmailDomain}`,
    password: demoPassword,
    role: ROLES.SUPER_ADMIN,
    isActive: true,
  });

  const adminSeeds = [
    { name: "Main Campus Admin", email: `main.admin@${demoEmailDomain}`, campus: campusDocs.find((campus) => campus.slug === "main")._id },
    { name: "Law College Admin", email: `law.admin@${demoEmailDomain}`, campus: campusDocs.find((campus) => campus.slug === "law")._id },
    { name: "Hala Campus Admin", email: `hala.admin@${demoEmailDomain}`, campus: campusDocs.find((campus) => campus.slug === "hala")._id },
  ];

  const adminDocs = [];
  for (const [index, seed] of adminSeeds.entries()) {
    adminDocs.push(await User.create({
      portalId: buildPortalId(ROLES.ADMIN, 1001 + index),
      name: seed.name,
      email: seed.email,
      password: demoPassword,
      role: ROLES.ADMIN,
      campus: seed.campus,
      designation: "Campus Administrator",
      isActive: true,
    }));
  }

  const facultyDocs = [];
  for (const campus of campusDocs) {
    const roster = campusDirectory[campus.slug]?.faculty || [];
    for (const [index, member] of roster.entries()) {
      facultyDocs.push(await User.create({
        portalId: buildPortalId(ROLES.FACULTY, facultyDocs.length + 1001),
        name: member.name,
        email: member.email,
        password: demoPassword,
        role: ROLES.FACULTY,
        campus: campus._id,
        department: member.department,
        designation: member.designation,
        education: member.education,
        subjectSpecialization: member.subjectSpecialization,
        experienceYears: member.experienceYears,
        subjects: [],
        isActive: true,
      }));
    }
  }

  return { superAdmin, adminDocs, facultyDocs };
};

const createAcademicCatalog = async ({ campusDocs, facultyDocs, semesterDocs, annualYearDocs }) => {
  const courses = [];
  const subjects = [];
  const classes = [];
  const classBundles = [];

  for (const campus of campusDocs) {
    const campusKey = campus.slug;
    const campusRoster = facultyDocs.filter((faculty) => String(faculty.campus) === String(campus._id));
    const campusConfig = campusDirectory[campusKey];

    for (const courseSeed of campusConfig.courses) {
      const course = await Course.create({
        title: courseSeed.title,
        code: courseSeed.code,
        duration: courseSeed.duration,
        eligibility: courseSeed.eligibility,
        examSystem: courseSeed.examSystem,
        totalSemesters: courseSeed.totalSemesters,
        totalYears: courseSeed.totalYears,
        totalCreditHours: courseSeed.totalCreditHours,
        description: courseSeed.description,
        campuses: [campus._id],
        isActive: true,
      });

      courses.push(course);

      const curriculum = courseTermSubjects(courseSeed.code, courseSeed.examSystem);

      for (const [termIndex, termSubjects] of curriculum.entries()) {
        const termDoc = courseSeed.examSystem === "semester"
          ? semesterDocs[termIndex]
          : annualYearDocs[termIndex];

        for (const subjectSeed of termSubjects) {
          const subject = await Subject.create({
            name: subjectSeed.name,
            code: subjectSeed.code,
            description: subjectSeed.description,
            course: course._id,
            semester: courseSeed.examSystem === "semester" ? termDoc?._id || null : null,
            annualYear: courseSeed.examSystem === "annual" ? termDoc?._id || null : null,
            creditHours: subjectSeed.creditHours,
            isElective: subjectSeed.isElective,
            faculty: campusRoster.length ? [campusRoster[subjects.length % campusRoster.length]._id] : [],
            campuses: [campus._id],
            isActive: true,
          });

          subjects.push(subject);
        }
      }

      for (const [termIndex, termSubjects] of curriculum.entries()) {
        const termDoc = courseSeed.examSystem === "semester"
          ? semesterDocs[termIndex]
          : annualYearDocs[termIndex];

        if (courseSeed.examSystem === "semester" && termDoc) {
          await CourseSemesterMapping.create({
            course: course._id,
            semester: termDoc._id,
            order: termIndex + 1,
            requiredSubjects: termSubjects.length,
            totalCreditHours: termSubjects.length * 3,
          });
        }

        if (courseSeed.examSystem === "annual" && termDoc) {
          await AnnualYearMapping.create({
            course: course._id,
            annualYear: termDoc._id,
            order: termIndex + 1,
            requiredSubjects: termSubjects.length,
            totalCreditHours: termSubjects.length * 4,
          });
        }
      }

      const courseClasses = campusConfig.classes.filter((classSeed) => classSeed.courseCode === courseSeed.code);
      for (const [classIndex, classSeed] of courseClasses.entries()) {
        const termCount = classSeed.classType === "annual"
          ? (courseSeed.totalYears || 2)
          : (classSeed.special ? 5 : 1);
        const semesterSubjects = [];
        const classSubjects = [];
        const assignedFaculty = campusRoster.length ? campusRoster : facultyDocs.slice(0, 1);

        for (let termNumber = 1; termNumber <= termCount; termNumber += 1) {
          const subjectGroup = curriculum[(termNumber - 1) % curriculum.length] || [];
          const createdSubjects = [];

          for (const [subjectIndex, subjectSeed] of subjectGroup.entries()) {
            const subject = subjects.find((entry) => entry.code === subjectSeed.code) || await Subject.create({
              name: subjectSeed.name,
              code: subjectSeed.code,
              description: subjectSeed.description,
              course: course._id,
              creditHours: subjectSeed.creditHours,
              isElective: subjectSeed.isElective,
              faculty: assignedFaculty.length ? [assignedFaculty[subjectIndex % assignedFaculty.length]._id] : [],
              campuses: [campus._id],
              isActive: true,
            });
            createdSubjects.push(subject);
            classSubjects.push(subject._id);
          }

          semesterSubjects.push({
            semesterNumber: termNumber,
            ...buildTermWindow(termNumber - 1, courseSeed.examSystem),
            status: classSeed.special && termNumber < termCount ? "completed" : termNumber === termCount ? "active" : "completed",
            resultPublished: termNumber < termCount,
            lockedAt: termNumber < termCount ? addDays(new Date("2026-01-01"), -30) : null,
            completedAt: termNumber < termCount ? addDays(new Date("2026-01-01"), -15) : null,
            subjectAssignments: createdSubjects.map((subject, subjectIndex) => ({
              subject: subject._id,
              faculty: assignedFaculty[subjectIndex % assignedFaculty.length]?._id || assignedFaculty[0]._id,
            })),
            subjects: createdSubjects.map((subject) => subject._id),
            faculty: assignedFaculty.map((faculty) => faculty._id),
          });
        }

        const classRoom = await ClassRoom.create({
          name: buildDemoClassName(campus.slug, courseSeed, classSeed),
          section: classSeed.section,
          semester: classSeed.classType === "semester" ? termLabel(classSeed.semester, "semester") : null,
          annualYear: classSeed.classType === "annual" ? termLabel(classSeed.semester, "annual") : null,
          campus: campus._id,
          course: course._id,
          faculty: assignedFaculty.map((faculty) => faculty._id),
          subjects: semesterSubjects[semesterSubjects.length - 1]?.subjects || classSubjects.slice(0, 6),
          semesterSubjects,
          students: [],
          isActive: true,
        });

        classes.push(classRoom);
        classBundles.push({ campus, course, classRoom, semesterSubjects, faculties: assignedFaculty });
      }
    }
  }

  return { courses, subjects, classes, classBundles };
};

const createStudentsAndRecords = async ({ campusDocs, classBundles }) => {
  const studentDocs = [];
  const enrollmentDocs = [];
  const assignmentDocs = [];
  const submissionDocs = [];
  const resultDocs = [];
  const logDocs = [];
  const newsDocs = [];
  const galleryDocs = [];
  const materialDocs = [];
  const announcementDocs = [];

  let studentCounter = 1001;

  for (const bundle of classBundles) {
    const studentsForClass = [];

    for (let index = 0; index < 10; index += 1) {
      const student = await User.create({
        portalId: buildPortalId(ROLES.STUDENT, studentCounter),
        name: buildStudentName(studentCounter - 1001),
        email: `student${studentCounter}@${demoEmailDomain}`,
        password: demoPassword,
        role: ROLES.STUDENT,
        campus: bundle.campus._id,
        currentCourse: bundle.course._id,
        currentClassRoom: bundle.classRoom._id,
        classSection: bundle.classRoom.section,
        currentSemester: null,
        currentAnnualYear: null,
        semester: bundle.semesterSubjects[0]?.semesterNumber ? termLabel(bundle.semesterSubjects[0].semesterNumber, bundle.course.examSystem) : null,
        enrollmentYear: 2023,
        cgpa: 3.0 + ((index % 5) * 0.1),
        totalCreditHours: bundle.course.examSystem === "semester" ? 18 : 16,
        subjects: bundle.classRoom.subjects,
        status: "Active",
        isActive: true,
      });

      studentDocs.push(student);
      studentsForClass.push(student);
      studentCounter += 1;

      const enrollment = await StudentEnrollment.create({
        student: student._id,
        classRoom: bundle.classRoom._id,
        course: bundle.course._id,
        semester: null,
        annualYear: null,
        status: "Active",
        sgpa: 3.0 + ((index % 5) * 0.1),
      });

      enrollmentDocs.push(enrollment);
    }

    await ClassRoom.findByIdAndUpdate(bundle.classRoom._id, {
      students: studentsForClass.map((student) => student._id),
    });

    const firstTerm = bundle.semesterSubjects[0];
    const firstSubject = firstTerm?.subjectAssignments?.[0];
    const assignment = await Assignment.create({
      classRoom: bundle.classRoom._id,
      subject: firstSubject?.subject || bundle.classRoom.subjects[0],
      title: `${bundle.course.title} Assignment 1`,
      description: `Demo assignment for ${bundle.course.title}`,
      dueDate: addDays(new Date(), 14),
      maxMarks: 100,
      createdBy: firstSubject?.faculty || bundle.faculties[0]._id,
    });
    assignmentDocs.push(assignment);

    for (let index = 0; index < 2; index += 1) {
      const student = studentsForClass[index];
      const submission = await Submission.create({
        assignment: assignment._id,
        student: student._id,
        submittedAt: addDays(new Date(), index + 1),
        status: index === 0 ? "on_time" : "late",
        marks: index === 0 ? 86 : 74,
        remarks: "Seeded demo submission",
        gradedBy: bundle.faculties[0]._id,
      });
      submissionDocs.push(submission);
    }

    const semesterRows = bundle.semesterSubjects;
    if (bundle.campus.slug === "main" && String(bundle.course.code).toUpperCase() === "BSCS" && semesterRows.length >= 5) {
      for (const [termIndex, termRow] of semesterRows.entries()) {
        const subjectsForTerm = termRow.subjectAssignments || [];

        for (const [subjectIndex, assignmentRow] of subjectsForTerm.entries()) {
          for (const [studentIndex, student] of studentsForClass.entries()) {
            const marksObtained = Math.max(55, 92 - (termIndex * 2) - (subjectIndex * 2) - (studentIndex % 4));
            const result = await Result.create({
              student: student._id,
              classRoom: bundle.classRoom._id,
              subject: assignmentRow.subject,
              enrollment: enrollmentDocs.find((entry) => String(entry.student) === String(student._id) && String(entry.classRoom) === String(bundle.classRoom._id))?._id || null,
              semester: `Semester ${termRow.semesterNumber}`,
              annualYear: null,
              marksObtained,
              totalMarks: 100,
              gradePoint: Number((marksObtained / 25).toFixed(2)),
              status: marksObtained >= 50 ? "Pass" : "Fail",
              grade: marksObtained >= 85 ? "A" : marksObtained >= 75 ? "B+" : marksObtained >= 65 ? "B" : "C",
              remarks: termRow.resultPublished ? "Published semester result" : "Current semester result",
              publishedBy: bundle.faculties[0]._id,
            });
            resultDocs.push(result);
          }
        }
      }
    } else {
      const baseTerm = semesterRows[0];
      const baseSubject = baseTerm?.subjectAssignments?.[0]?.subject || bundle.classRoom.subjects[0];
      for (const [studentIndex, student] of studentsForClass.slice(0, 3).entries()) {
        const marksObtained = 70 + (studentIndex * 5);
        const result = await Result.create({
          student: student._id,
          classRoom: bundle.classRoom._id,
          subject: baseSubject,
          enrollment: enrollmentDocs.find((entry) => String(entry.student) === String(student._id) && String(entry.classRoom) === String(bundle.classRoom._id))?._id || null,
          semester: bundle.course.examSystem === "annual" ? `Year ${baseTerm?.semesterNumber || 1}` : `Semester ${baseTerm?.semesterNumber || 1}`,
          annualYear: bundle.course.examSystem === "annual" ? `Year ${baseTerm?.semesterNumber || 1}` : null,
          marksObtained,
          totalMarks: 100,
          gradePoint: Number((marksObtained / 25).toFixed(2)),
          status: marksObtained >= 50 ? "Pass" : "Fail",
          grade: marksObtained >= 85 ? "A" : marksObtained >= 75 ? "B+" : "B",
          remarks: "Seeded demo result",
          publishedBy: bundle.faculties[0]._id,
        });
        resultDocs.push(result);
      }
    }

    const log = await ResultCalculationLog.create({
      student: studentsForClass[0]._id,
      enrollment: enrollmentDocs.find((entry) => String(entry.student) === String(studentsForClass[0]._id))?._id || null,
      semester: null,
      annualYear: null,
      oldCgpa: 2.8,
      newCgpa: studentsForClass[0].cgpa,
      sgpaCalculated: studentsForClass[0].cgpa,
      triggerType: "Backfill",
      triggeredBy: bundle.faculties[0]._id,
    });
    logDocs.push(log);

    const material = await Material.create({
      classRoom: bundle.classRoom._id,
      subject: bundle.classRoom.subjects[0],
      title: `${bundle.course.title} Course Material`,
      type: "pdf",
      link: `https://example.com/materials/${slugify(bundle.course.title)}.pdf`,
      uploadedBy: bundle.faculties[0]._id,
    });
    materialDocs.push(material);

    const announcement = await Announcement.create({
      title: `${bundle.course.title} Weekly Update`,
      description: `Important notice for ${bundle.classRoom.name}.`,
      targetClasses: [bundle.classRoom._id],
      createdBy: bundle.faculties[0]._id,
      isPublished: true,
    });
    announcementDocs.push(announcement);
  }

  const newsSeeds = [
    {
      type: "news",
      title: "Admissions Open for Spring 2026",
      category: "Admissions",
      description: "Applications are now being accepted for the Spring 2024 semester across all our campuses. Early bird discount available until March 1st.",
      date: new Date("2024-02-10"),
      status: "published",
    },
    {
      type: "event",
      title: "Annual Sports Gala",
      category: "Sports",
      description: "Join us for our annual inter-campus sports competition featuring cricket, football, and athletics.",
      date: new Date("2026-03-08"),
      time: "07:11",
      location: "Bahawalpur, Punjab, Pakistan",
      status: "published",
    },
    {
      type: "news",
      title: "Career Fair 2026",
      category: "Career Services",
      description: "Meet recruiters and explore internship opportunities across IT, business, law, and science sectors.",
      date: new Date("2026-03-20"),
      status: "published",
    },
  ];

  for (const seed of newsSeeds) {
    newsDocs.push(await NewsEvent.create({
      ...seed,
      createdBy: campusDocs[0]._id,
    }));
  }

  const gallerySeeds = [
    {
      title: "Main Campus Convocation",
      category: "Convocation",
      tags: ["main", "convocation"],
      description: "Annual graduation ceremony at the main campus.",
      image: { publicId: "demo-gallery-1", url: "https://placehold.co/1200x800?text=Main+Campus" },
    },
    {
      title: "Law Moot Court",
      category: "Events",
      tags: ["law", "moot"],
      description: "Students participating in moot court competition.",
      image: { publicId: "demo-gallery-2", url: "https://placehold.co/1200x800?text=Law+College" },
    },
    {
      title: "Hala Science Fair",
      category: "Campus Life",
      tags: ["hala", "science"],
      description: "Students showcasing projects at Hala Campus.",
      image: { publicId: "demo-gallery-3", url: "https://placehold.co/1200x800?text=Hala+Campus" },
    },
  ];

  for (const seed of gallerySeeds) {
    galleryDocs.push(await GalleryItem.create({
      ...seed,
      uploadedBy: campusDocs[0]._id,
    }));
  }

  return {
    studentDocs,
    enrollmentDocs,
    assignmentDocs,
    submissionDocs,
    resultDocs,
    logDocs,
    newsDocs,
    galleryDocs,
    materialDocs,
    announcementDocs,
  };
};

const run = async () => {
  try {
    await connectDB();

    for (const model of resetCollections) {
      await model.deleteMany({});
    }

    const semesterDocs = [];
    for (let number = 1; number <= 8; number += 1) {
      semesterDocs.push(await Semester.create({
        semesterId: `SEM-${number}`,
        number,
        title: termLabel(number, "semester"),
        examSystem: "semester",
        isActive: true,
      }));
    }

    const annualYearDocs = [];
    for (let number = 1; number <= 5; number += 1) {
      annualYearDocs.push(await AnnualYear.create({
        annualYearId: `Y${number}`,
        number,
        title: termLabel(number, "annual"),
        examSystem: "annual",
        isActive: true,
      }));
    }

    const campusDocs = [];
    for (const campusSeed of campusSeeds) {
      campusDocs.push(await Campus.create({
        ...campusSeed,
        slug: campusSeed.slug || slugify(campusSeed.name),
      }));
    }

    const { superAdmin, adminDocs, facultyDocs } = await createUsers(campusDocs);
    const { courses, subjects, classes, classBundles } = await createAcademicCatalog({
      campusDocs, 
      facultyDocs,
      semesterDocs,
      annualYearDocs,
    });
    const payload = await createStudentsAndRecords({ campusDocs, classBundles });

    console.log("Demo seed completed successfully");
    console.log({
      superAdmin: { portalId: superAdmin.portalId, email: superAdmin.email, password: demoPassword },
      admins: adminDocs.map((admin) => ({ portalId: admin.portalId, email: admin.email })),
      campuses: campusDocs.length,
      courses: courses.length,
      subjects: subjects.length,
      classes: classes.length,
      faculty: facultyDocs.length,
      students: payload.studentDocs.length,
      enrollments: payload.enrollmentDocs.length,
      assignments: payload.assignmentDocs.length,
      submissions: payload.submissionDocs.length,
      results: payload.resultDocs.length,
      news: payload.newsDocs.length,
      gallery: payload.galleryDocs.length,
      materials: payload.materialDocs.length,
    });

    process.exit(0);
  } catch (error) {
    console.error("Demo seed failed", error);
    process.exit(1);
  }
};

run();