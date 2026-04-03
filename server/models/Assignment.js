import mongoose from "mongoose";
import { attachGeneratedId } from "../utils/generatedId.js";

const assignmentSchema = new mongoose.Schema(
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
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    maxMarks: {
      type: Number,
      required: true,
    },
    attachment: {
      publicId: String,
      url: String,
      resourceType: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, id: false },
);

attachGeneratedId(assignmentSchema, { modelName: "Assignment", sourceField: "title", prefix: "ASM" });

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
