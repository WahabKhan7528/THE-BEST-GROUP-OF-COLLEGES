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
            className="px-4 py-2 bg-purple-700 text-white rounded-lg text-sm font-semibold hover:bg-purple-800"
          >
            Save marks
          </button>
        </div>
      </div>

      {/* Class & Subject Selector */}
      {classes.length > 0 ? (
        <div className="bg-white border rounded-2xl shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Select Class
            </h2>
            <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
              {classes.length} classes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {classes.map((cls) => (
              <button
                key={cls.id}
                onClick={() => setSelectedClassId(cls.id)}
                className={`border rounded-xl p-4 text-left transition-all ${
                  selectedClassId === cls.id
                    ? "border-purple-500 bg-purple-50 ring-2 ring-purple-300"
                    : "border-gray-200 bg-white hover:border-purple-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {cls.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {cls.code} • Section {cls.section}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Semester {cls.semester}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-purple-700">
                      {cls.students}
                    </p>
                    <p className="text-xs text-gray-500">students</p>
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

      {/* Class Details & Stats */}
      {selectedClass && selectedStudents.length > 0 && (
        <>
          <div className="bg-white border rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedClass.name}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedClass.code} • Section {selectedClass.section} •
                  Semester {selectedClass.semester}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="border rounded-xl p-4 bg-blue-50 border-blue-200">
                <p className="text-sm text-gray-600 font-medium">
                  Total Students
                </p>
                <p className="text-2xl font-bold text-blue-700 mt-2">
                  {totalStudents}
                </p>
              </div>
              <div className="border rounded-xl p-4 bg-emerald-50 border-emerald-200">
                <p className="text-sm text-gray-600 font-medium">Graded</p>
                <p className="text-2xl font-bold text-emerald-700 mt-2">
                  {gradedCount}
                </p>
              </div>
              <div className="border rounded-xl p-4 bg-amber-50 border-amber-200">
                <p className="text-sm text-gray-600 font-medium">Pending</p>
                <p className="text-2xl font-bold text-amber-700 mt-2">
                  {pendingCount}
                </p>
              </div>
              <div className="border rounded-xl p-4 bg-purple-50 border-purple-200">
                <p className="text-sm text-gray-600 font-medium">
                  Average Marks
                </p>
                <p className="text-2xl font-bold text-purple-700 mt-2">
                  {averageMarks}
                </p>
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-white border rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Student Marks
              </h3>
              <button className="text-sm text-purple-700 font-semibold hover:text-purple-800">
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
