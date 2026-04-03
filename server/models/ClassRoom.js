import mongoose from "mongoose";
import { attachGeneratedId } from "../utils/generatedId.js";
import { buildSequentialCode } from "../utils/identifier.js";

const semesterSubjectSchema = new mongoose.Schema(
  {
    semesterNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      default: "planned",
      enum: ["planned", "active", "completed", "locked"],
    },
    resultPublished: {
      type: Boolean,
      default: false,
    },
    lockedAt: {
      type: Date,
      default: null,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    subjectAssignments: {
      type: [
        new mongoose.Schema(
          {
            subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
            faculty: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
          },
          { _id: false },
        ),
      ],
      default: [],
    },
    subjects: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
      validate: [
        (value) => Array.isArray(value) && value.length <= 6,
        "Each semester can have at most 6 subjects",
      ],
      default: [],
    },
    faculty: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { _id: false },
);

const classRoomSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    classCode: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    section: {
      type: String,
      default: "A",
      trim: true,
    },
    semester: String,
    annualYear: {
      type: String,
      default: null,
    },
    session: String,
    campus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campus",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      default: null,
    },
    faculty: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
    semesterSubjects: [semesterSubjectSchema],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, id: false },
);

attachGeneratedId(classRoomSchema, { modelName: "ClassRoom", sourceField: "name", prefix: "CLS" });

classRoomSchema.pre("validate", async function generateCode(next) {
  if (!this.isNew || this.classCode) {
    next();
    return;
  }

  const count = await mongoose.models.ClassRoom.countDocuments();
  this.classCode = buildSequentialCode({ prefix: this.name, number: count + 1 });
  next();
});

const ClassRoom = mongoose.model("ClassRoom", classRoomSchema);

export default ClassRoom;
