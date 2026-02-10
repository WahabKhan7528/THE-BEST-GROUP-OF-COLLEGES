import React, { useState } from "react";
import { useFacultyContext } from "../../context/FacultyContext";
import ResultEntryTable from "../../components/faculty/ResultEntryTable";

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
  const { getCurrentCampus, getClassesByCurrentCampus } = useFacultyContext();
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
    alert("Marks saved successfully! (This is a mock action)");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Student Results Management</p>
            <h1 className="text-2xl font-semibold text-gray-900">
              Enter marks & grades
            </h1>
            <p className="text-sm text-blue-600 mt-2">
              📍 {campusNames[campus]}
            </p>
          </div>
          <button
            onClick={handleSaveMarks}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/20"
          >
            Save marks
          </button>
        </div>
      </div>

      {/* Class & Subject Selector */}
      {classes.length > 0 ? (
        <div className="bg-white border rounded-2xl shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Select Course & Class
              </h2>
              <p className="text-sm text-gray-500">Choose a subject to enter marks for</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">
              {classes.length} assigned courses
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map((cls) => (
              <button
                key={cls.id}
                onClick={() => setSelectedClassId(cls.id)}
                className={`group relative border rounded-2xl p-5 text-left transition-all duration-200 overflow-hidden ${selectedClassId === cls.id
                  ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500 shadow-md"
                  : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                  }`}
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${selectedClassId === cls.id ? "bg-blue-200 text-blue-800" : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700"
                      }`}>
                      {cls.code}
                    </span>
                    <span className="text-xs font-medium text-gray-500">Sem {cls.semester}</span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                    {cls.name}
                  </h3>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 group-hover:border-blue-100">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-gray-400 font-semibold">Class</span>
                      <span className="text-sm font-semibold text-gray-700">Section {cls.section}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-lg font-bold text-gray-900 leading-none">{cls.students}</span>
                      <span className="text-[10px] text-gray-500 font-medium">Students</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white border rounded-2xl shadow-sm p-8 text-center">
          <p className="text-gray-600 text-lg">
            No classes assigned for {campusNames[campus]}.
          </p>
        </div>
      )}

      {/* Class Details & Stats - Clarified Relationship */}
      {selectedClass && selectedStudents.length > 0 && (
        <>
          <div className="bg-white border rounded-2xl shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-transparent rounded-bl-full -mr-8 -mt-8"></div>

            <div className="relative z-10">
              <h2 className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-4">Current Selection Logic</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Step 1: Subject */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm border-2 border-white shadow-sm shrink-0">1</div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase">Subject</p>
                    <p className="text-sm font-bold text-gray-900">{selectedClass.name}</p>
                    <p className="text-xs text-gray-500">{selectedClass.code}</p>
                  </div>
                </div>

                {/* Step 2: Class */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm border-2 border-white shadow-sm shrink-0">2</div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase">Class / Section</p>
                    <p className="text-sm font-bold text-gray-900">Section {selectedClass.section}</p>
                    <p className="text-xs text-gray-500">Semester {selectedClass.semester}</p>
                  </div>
                </div>

                {/* Step 3: Students */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm border-2 border-white shadow-sm shrink-0">3</div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase">Target Group</p>
                    <p className="text-sm font-bold text-gray-900">{totalStudents} Students</p>
                    <p className="text-xs text-gray-500">{gradedCount} Graded</p>
                  </div>
                </div>

                {/* Stat: Avg */}
                <div className="pl-4 md:border-l border-gray-100 flex flex-col justify-center">
                  <p className="text-xs text-gray-500 font-medium">Class Average</p>
                  <p className="text-2xl font-bold text-gray-900">{averageMarks}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-white border rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Student Marks
              </h3>
              <button className="text-sm text-blue-700 font-semibold hover:text-blue-800">
                Download Sheet
              </button>
            </div>
            <ResultEntryTable rows={selectedStudents} />
          </div>
        </>
      )}

      {/* No Students Selected */}
      {selectedClassId && selectedStudents.length === 0 && (
        <div className="bg-white border rounded-2xl shadow-sm p-8 text-center">
          <p className="text-gray-600 text-lg">
            No students in this class yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default Results;
