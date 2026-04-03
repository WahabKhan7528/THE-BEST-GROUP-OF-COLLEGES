import mongoose from "mongoose";
import { attachGeneratedId } from "../utils/generatedId.js";
import { buildSequentialCode } from "../utils/identifier.js";

const courseSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    duration: String,
    eligibility: String,
    examSystem: {
      type: String,
      enum: ["semester", "annual", "other"],
      default: "semester",
    },
    totalSemesters: {
      type: Number,
      default: null,
    },
    totalYears: {
      type: Number,
      default: null,
    },
    totalCreditHours: {
      type: Number,
      default: null,
    },
    description: String,
    fee: Number,
    campuses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Campus" }],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, id: false },
);

attachGeneratedId(courseSchema, { modelName: "Course", sourceField: "title", prefix: "CRS" });

courseSchema.pre("validate", async function generateCode(next) {
  if (!this.isNew || this.code) {
    next();
    return;
  }

  const count = await mongoose.models.Course.countDocuments();
  this.code = buildSequentialCode({ prefix: this.title, number: count + 1 });
  next();
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
