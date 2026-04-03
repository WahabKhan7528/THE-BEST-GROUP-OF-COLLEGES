import mongoose from "mongoose";
import { attachGeneratedId } from "../utils/generatedId.js";

const classSubjectSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
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
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, id: false },
);

attachGeneratedId(classSubjectSchema, { modelName: "ClassSubject", sourceField: "classRoom", prefix: "CST" });

classSubjectSchema.index({ classRoom: 1, subject: 1, faculty: 1 }, { unique: true });

const ClassSubject = mongoose.model("ClassSubject", classSubjectSchema);

export default ClassSubject;
