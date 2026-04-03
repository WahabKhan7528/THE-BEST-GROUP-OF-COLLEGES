import mongoose from "mongoose";
import { attachGeneratedId } from "../utils/generatedId.js";

const resultSchema = new mongoose.Schema(
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
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    enrollment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentEnrollment",
      default: null,
    },
    semester: {
      type: String,
      required: true,
    },
    annualYear: {
      type: String,
      default: null,
    },
    marksObtained: {
      type: Number,
      required: true,
    },
    totalMarks: {
      type: Number,
      required: true,
    },
    gradePoint: {
      type: Number,
      default: null,
    },
    status: {
      type: String,
      enum: ["Pass", "Fail", "Incomplete"],
      default: "Incomplete",
    },
    grade: String,
    remarks: String,
    publishedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, id: false },
);

attachGeneratedId(resultSchema, { modelName: "Result", sourceField: "semester", prefix: "RES" });

resultSchema.index({ student: 1, classRoom: 1, subject: 1, semester: 1 }, { unique: true });

const Result = mongoose.model("Result", resultSchema);

export default Result;
