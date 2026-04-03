import mongoose from "mongoose";
import { attachGeneratedId } from "../utils/generatedId.js";

const resultCalculationLogSchema = new mongoose.Schema(
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
    enrollment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentEnrollment",
      default: null,
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
    oldCgpa: {
      type: Number,
      default: null,
    },
    newCgpa: {
      type: Number,
      default: null,
    },
    sgpaCalculated: {
      type: Number,
      default: null,
    },
    triggerType: {
      type: String,
      enum: ["ResultUpload", "Manual", "Backfill"],
      default: "ResultUpload",
    },
    triggeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true, id: false },
);

attachGeneratedId(resultCalculationLogSchema, { modelName: "ResultCalculationLog", sourceField: "triggerType", prefix: "RCL" });

const ResultCalculationLog = mongoose.model("ResultCalculationLog", resultCalculationLogSchema);

export default ResultCalculationLog;
