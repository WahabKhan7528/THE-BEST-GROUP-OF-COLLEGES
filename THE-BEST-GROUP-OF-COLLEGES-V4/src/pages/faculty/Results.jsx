import React, { useState } from "react";
import { useFacultyContext } from "../../context/FacultyContext";
import { useToast } from "../../context/ToastContext";
import ResultEntryTable from "../../components/faculty/ResultEntryTable";
import PortalPageHeader from "../../components/shared/PortalPageHeader";
import Badge from "../../components/public_site/Badge";
import PublicButton from "../../components/shared/PublicButton";
import { UploadCloud } from "lucide-react";

// Mock student roster data organized by class
const studentByClassByCampus = {
  main: {
    "cls-001": [
      {
        studentId: "STU-0145",
        studentName: "Ayesha Khan",
        rollNo: "A-001",
        marks: 18,
        maxMarks: 20,
        remarks: "Great analysis",
        status: "Graded",
      },
      {
        studentId: "STU-0172",
        studentName: "Bilal Ahmed",
        rollNo: "A-002",
        marks: 16,
        maxMarks: 20,
        remarks: "Add more charts",
        status: "Graded",
      },
      {
        studentId: "STU-0198",
        studentName: "Sara Malik",
        rollNo: "A-003",
        marks: 0,
        maxMarks: 20,
        remarks: "",
        status: "Pending",
      },
      {
        studentId: "STU-0210",
        studentName: "Ahmed Hassan",
        rollNo: "A-004",
        marks: 19,
        maxMarks: 20,
        remarks: "Excellent work",
        status: "Graded",
      },
    ],
    "cls-002": [
      {
        studentId: "STU-0151",
        studentName: "Zainab Ali",
        rollNo: "B-001",
        marks: 17,
        maxMarks: 20,
        remarks: "Good effort",
        status: "Graded",
      },
      {
        studentId: "STU-0168",
        studentName: "Hassan Ali",
        rollNo: "B-002",
        marks: 15,
        maxMarks: 20,
        remarks: "",
        status: "Pending",
      },
      {
        studentId: "STU-0175",
        studentName: "Fatima Khan",
        rollNo: "B-003",
        marks: 0,
        maxMarks: 20,
        remarks: "",
        status: "Pending",
      },
    ],
    "cls-003": [
      {
        studentId: "STU-0190",
        studentName: "Muhammad Ali",
        rollNo: "A-001",
        marks: 16,
        maxMarks: 15,
        remarks: "Well done",
        status: "Graded",
      },
      {
        studentId: "STU-0205",
        studentName: "Hira Malik",
        rollNo: "A-002",
        marks: 14,
        maxMarks: 15,
        remarks: "",
        status: "Pending",
      },
      {
        studentId: "STU-0218",
        studentName: "Omar Khan",
        rollNo: "A-003",
        marks: 0,
        maxMarks: 15,
        remarks: "",
        status: "Pending",
      },
    ],
  },
  law: {
    "cls-004": [
      {
        studentId: "STU-0201",
        studentName: "Fatima Hassan",
        rollNo: "LLB-001",
        marks: 28,
        maxMarks: 30,
        remarks: "Excellent precedent research",
        status: "Graded",
      },
      {
        studentId: "STU-0215",
        studentName: "Ali Khan",
        rollNo: "LLB-002",
        marks: 0,
        maxMarks: 30,
        remarks: "",
        status: "Pending",
      },
      {
        studentId: "STU-0225",
        studentName: "Amina Siddiqui",
        rollNo: "LLB-003",
        marks: 25,
        maxMarks: 30,
        remarks: "Good analysis",
        status: "Graded",
      },
    ],
    "cls-005": [
      {
        studentId: "STU-0235",
        studentName: "Hassan Ibrahim",
        rollNo: "LLB-001",
        marks: 22,
        maxMarks: 20,
        remarks: "Very good",
        status: "Graded",
      },
      {
        studentId: "STU-0240",
        studentName: "Sarah Khan",
        rollNo: "LLB-002",
        marks: 0,
        maxMarks: 20,
        remarks: "",
        status: "Pending",
      },
    ],
  },
  hala: {
    "cls-006": [
      {
        studentId: "STU-0301",
        studentName: "Hassan Ahmed",
        rollNo: "BBA-001",
        marks: 22,
        maxMarks: 25,
        remarks: "Good projections",
        status: "Graded",
      },
      {
        studentId: "STU-0312",
        studentName: "Nida Khan",
        rollNo: "BBA-002",
        marks: 0,
        maxMarks: 25,
        remarks: "",
        status: "Pending",
      },
      {
        studentId: "STU-0325",
        studentName: "Karim Ali",
        rollNo: "BBA-003",
        marks: 18,
        maxMarks: 25,
        remarks: "Needs improvement",
        status: "Graded",
      },
    ],
  },
};

const campusNames = {
  main: "Main Campus",
  law: "Law Campus",
  hala: "Hala Campus",
};

const Results = () => {
  const { getCurrentCampus, getClassesByCurrentCampus, isDarkMode } = useFacultyContext();
  const toast = useToast();
  const campus = getCurrentCampus();
  const classes = getClassesByCurrentCampus();
  const studentsByClass = studentByClassByCampus[campus] || {};

  // State for class selection
  const [selectedClassId, setSelectedClassId] = useState(
    classes.length > 0 ? classes[0].id : null,
  );

  // Get selected class details
  const selectedClass = classes.find((cls) => cls.id === selectedClassId);
  const selectedStudents = selectedClassId
    ? studentsByClass[selectedClassId] || []
    : [];

  // Calculate stats
  const totalStudents = selectedStudents.length;
  const gradedCount = selectedStudents.filter(
    (s) => s.status === "Graded",
  ).length;
  const pendingCount = totalStudents - gradedCount;
  const averageMarks =
    gradedCount > 0
      ? (
        selectedStudents.reduce((sum, s) => sum + (s.marks || 0), 0) /
        gradedCount
      ).toFixed(2)
      : 0;

  const handleSaveMarks = () => {
    toast.success("Marks saved successfully!");
  };

  return (
    <div className="space-y-6">
      <PortalPageHeader
        badge={
          <Badge variant={isDarkMode ? "gold" : "navy"}>
            {campusNames[campus]}
          </Badge>
        }
        title="Results Management"
        subtitle="Manage student grades, track performance analytics, and finalize academic records."
        action={
          <div className="flex items-center gap-6 bg-white dark:bg-college-navy/60 px-6 py-3 rounded-2xl border border-college-navy/10 dark:border-college-gold/20 shadow-lg">
            <div className="text-center sm:text-right border-r border-college-navy/10 dark:border-white/10 pr-6">
              <span className="text-[10px] text-college-navy/60 dark:text-college-gold font-bold uppercase tracking-widest">Assigned</span>
              <p className="text-xl font-black text-college-navy dark:text-white leading-none mt-1">{classes.length}</p>
            </div>
            <div className="text-center sm:text-right">
              <span className="text-[10px] text-college-navy/60 dark:text-college-gold font-bold uppercase tracking-widest">Avg Performance</span>
              <p className="text-xl font-black text-college-navy dark:text-white leading-none mt-1">{averageMarks > 0 ? averageMarks : 'N/A'}</p>
            </div>
          </div>
        }
      />

      {/* Class & Subject Selector */}
      {classes.length > 0 ? (
        <div className="bg-white dark:bg-college-navy border border-gray-100 dark:border-college-navy/20 rounded-2xl shadow-sm p-6 space-y-4 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-college-navy dark:text-white">
                Select Course & Class
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Choose a subject to enter marks for</p>
            </div>
            <span className="inline-flex items-center justify-center text-center shrink-0 whitespace-nowrap text-xs px-3 py-1.5 rounded-full bg-gray-100 dark:bg-college-gold/10 text-gray-700 dark:text-college-gold font-medium border border-transparent dark:border-college-gold/20 self-start sm:self-auto w-fit">
              {classes.length} assigned courses
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map((cls) => (
              <button
                key={cls.id}
                onClick={() => setSelectedClassId(cls.id)}
                className={`group relative border rounded-2xl p-5 text-left transition-all duration-200 overflow-hidden ${selectedClassId === cls.id
                  ? "border-blue-500 dark:border-college-gold bg-blue-50 dark:bg-college-gold/10 ring-1 ring-blue-500 dark:ring-college-gold shadow-md"
                  : "border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-blue-300 dark:hover:border-college-gold/50 hover:shadow-md"
                  }`}
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors ${selectedClassId === cls.id ? "bg-blue-200 dark:bg-college-gold text-blue-800 dark:text-college-navy" : "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 group-hover:bg-blue-100 group-hover:text-blue-700 dark:group-hover:bg-college-gold/20 dark:group-hover:text-college-gold"
                      }`}>
                      {cls.code}
                    </span>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Sem {cls.semester}</span>
                  </div>

                  <h3 className={`text-base font-bold mb-1 transition-colors ${selectedClassId === cls.id ? "text-college-navy dark:text-college-gold" : "text-college-navy dark:text-white group-hover:text-blue-700 dark:group-hover:text-college-gold/80"}`}>
                    {cls.name}
                  </h3>

                  <div className={`flex items-center justify-between mt-3 pt-3 border-t transition-colors ${selectedClassId === cls.id ? "border-blue-200 dark:border-college-gold/20" : "border-gray-100 dark:border-white/10 group-hover:border-blue-100 dark:group-hover:border-college-gold/10"}`}>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-gray-400 dark:text-gray-500 font-semibold">Class</span>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Section {cls.section}</span>
                    </div>
                    <div className="text-right">
                      <span className={`block text-lg font-bold leading-none ${selectedClassId === cls.id ? "text-college-navy dark:text-college-gold" : "text-college-navy dark:text-white"}`}>{cls.students}</span>
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Students</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-college-navy border border-gray-100 dark:border-college-navy/20 rounded-2xl shadow-sm p-8 text-center transition-colors">
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            No classes assigned for {campusNames[campus]}.
          </p>
        </div>
      )}

      {/* Class Details & Stats - Clarified Relationship */}
      {selectedClass && selectedStudents.length > 0 && (
        <>
          <div className="bg-white dark:bg-college-navy border border-gray-100 dark:border-college-navy/20 rounded-2xl shadow-sm p-6 relative overflow-hidden transition-colors">

            <div className="relative z-10">
              <h2 className="text-sm font-bold text-blue-700 dark:text-college-gold uppercase tracking-wider mb-4">Current Selection Logic</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {/* Step 1: Subject */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-white/10 flex items-center justify-center text-blue-700 dark:text-college-gold font-bold text-sm border-2 border-white dark:border-transparent shadow-sm shrink-0">1</div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">Subject</p>
                    <p className="text-sm font-bold text-college-navy dark:text-white">{selectedClass.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{selectedClass.code}</p>
                  </div>
                </div>

                {/* Step 2: Class */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-white/10 flex items-center justify-center text-blue-700 dark:text-college-gold font-bold text-sm border-2 border-white dark:border-transparent shadow-sm shrink-0">2</div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">Class / Section</p>
                    <p className="text-sm font-bold text-college-navy dark:text-white">Section {selectedClass.section}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Semester {selectedClass.semester}</p>
                  </div>
                </div>

                {/* Step 3: Students */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold text-sm border-2 border-white dark:border-transparent shadow-sm shrink-0">3</div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">Target Group</p>
                    <p className="text-sm font-bold text-college-navy dark:text-white">{totalStudents} Students</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{gradedCount} Graded</p>
                  </div>
                </div>

                {/* Stat: Avg */}
                <div className="pl-4 md:border-l border-gray-100 dark:border-white/10 flex flex-col justify-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Class Average</p>
                  <p className="text-2xl font-bold text-college-navy dark:text-college-gold">{averageMarks}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-white dark:bg-college-navy border border-gray-100 dark:border-college-navy/20 rounded-2xl shadow-sm p-5 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-college-navy dark:text-white">
                Student Marks
              </h3>

            </div>
            <ResultEntryTable rows={selectedStudents} />
          </div>
        </>
      )}

      {/* No Students Selected */}
      {selectedClassId && selectedStudents.length === 0 && (
        <div className="bg-white dark:bg-college-navy border border-gray-100 dark:border-college-navy/20 rounded-2xl shadow-sm p-8 text-center transition-colors">
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            No students in this class yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default Results;
