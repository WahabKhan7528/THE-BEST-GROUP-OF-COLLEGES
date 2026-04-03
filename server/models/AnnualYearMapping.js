import mongoose from "mongoose";
import { attachGeneratedId } from "../utils/generatedId.js";

const annualYearMappingSchema = new mongoose.Schema(
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
    annualYear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AnnualYear",
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

attachGeneratedId(annualYearMappingSchema, { modelName: "AnnualYearMapping", sourceField: "order", prefix: "AYM" });

annualYearMappingSchema.index({ course: 1, annualYear: 1 }, { unique: true });

const AnnualYearMapping = mongoose.model("AnnualYearMapping", annualYearMappingSchema);

export default AnnualYearMapping;
