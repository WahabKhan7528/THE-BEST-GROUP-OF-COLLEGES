import mongoose from "mongoose";
import { attachGeneratedId } from "../utils/generatedId.js";

const studentEnrollmentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    classRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassRoom",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    semester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
      default: null,
    },
    annualYear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AnnualYear",
      default: null,
    },
    status: {
      type: String,
      enum: ["Active", "Completed", "Backlog", "Dropped", "Graduated"],
      default: "Active",
    },
    sgpa: {
      type: Number,
      default: null,
    },
    completedDate: {
      type: Date,
      default: null,
    },
    promotedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentEnrollment",
      default: null,
    },
  },
  { timestamps: true, id: false },
);

attachGeneratedId(studentEnrollmentSchema, { modelName: "StudentEnrollment", sourceField: "status", prefix: "ENR" });

studentEnrollmentSchema.index({ student: 1, classRoom: 1, semester: 1, annualYear: 1 }, { unique: true });

const StudentEnrollment = mongoose.model("StudentEnrollment", studentEnrollmentSchema);

export default StudentEnrollment;
