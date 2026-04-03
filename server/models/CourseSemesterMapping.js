import mongoose from "mongoose";
import { attachGeneratedId } from "../utils/generatedId.js";

const courseSemesterMappingSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    semester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },
    order: {
      type: Number,
      required: true,
      min: 1,
    },
    requiredSubjects: {
      type: Number,
      default: 0,
    },
    totalCreditHours: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, id: false },
);

attachGeneratedId(courseSemesterMappingSchema, { modelName: "CourseSemesterMapping", sourceField: "order", prefix: "CSM" });

courseSemesterMappingSchema.index({ course: 1, semester: 1 }, { unique: true });

const CourseSemesterMapping = mongoose.model("CourseSemesterMapping", courseSemesterMappingSchema);

export default CourseSemesterMapping;
