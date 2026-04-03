import mongoose from "mongoose";
import { attachGeneratedId } from "../utils/generatedId.js";

const semesterSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    semesterId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    number: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    examSystem: {
      type: String,
      default: "semester",
      lowercase: true,
      enum: ["semester"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, id: false },
);

attachGeneratedId(semesterSchema, { modelName: "Semester", sourceField: "title", prefix: "SEM" });

semesterSchema.index({ number: 1, examSystem: 1 }, { unique: true });

const Semester = mongoose.model("Semester", semesterSchema);

export default Semester;
