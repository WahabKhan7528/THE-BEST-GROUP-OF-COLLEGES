import mongoose from "mongoose";
import { attachGeneratedId } from "../utils/generatedId.js";

const submissionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    file: {
      publicId: String,
      url: String,
      resourceType: String,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["on_time", "late", "pending"],
      default: "pending",
    },
    marks: {
      type: Number,
      default: null,
    },
    remarks: String,
    gradedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true, id: false },
);

attachGeneratedId(submissionSchema, { modelName: "Submission", sourceField: "status", prefix: "SBD" });

submissionSchema.index({ assignment: 1, student: 1 }, { unique: true });

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
