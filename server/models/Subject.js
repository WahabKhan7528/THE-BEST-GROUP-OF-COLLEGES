import mongoose from "mongoose";
import { attachGeneratedId } from "../utils/generatedId.js";
import { buildSequentialCode } from "../utils/identifier.js";

const subjectSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      unique: true,
    },
    description: String,
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
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
    creditHours: {
      type: Number,
      default: 3,
    },
    isElective: {
      type: Boolean,
      default: false,
    },
    faculty: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    campuses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Campus" }],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, id: false },
);

attachGeneratedId(subjectSchema, { modelName: "Subject", sourceField: "name", prefix: "SUB" });

subjectSchema.pre("validate", async function generateCode(next) {
  if (!this.isNew || this.code) {
    next();
    return;
  }

  const count = await mongoose.models.Subject.countDocuments();
  this.code = buildSequentialCode({ prefix: this.name, number: count + 1 });
  next();
});

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;
