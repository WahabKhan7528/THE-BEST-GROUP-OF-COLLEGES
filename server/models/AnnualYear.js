import mongoose from "mongoose";
import { attachGeneratedId } from "../utils/generatedId.js";

const annualYearSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    annualYearId: {
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
      max: 5,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    examSystem: {
      type: String,
      default: "annual",
      lowercase: true,
      enum: ["annual"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, id: false },
);

attachGeneratedId(annualYearSchema, { modelName: "AnnualYear", sourceField: "title", prefix: "AYR" });

annualYearSchema.index({ number: 1, examSystem: 1 }, { unique: true });

const AnnualYear = mongoose.model("AnnualYear", annualYearSchema);

export default AnnualYear;
