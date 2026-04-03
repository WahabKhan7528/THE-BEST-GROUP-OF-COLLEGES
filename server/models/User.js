import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ROLES } from "../config/constants.js";
import { attachGeneratedId } from "../utils/generatedId.js";
import { buildPortalId } from "../utils/identifier.js";

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    portalId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.STUDENT,
      index: true,
    },
    campus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campus",
      default: null,
    },
    currentCourse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      default: null,
    },
    currentClassRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassRoom",
      default: null,
    },
    classSection: {
      type: String,
      default: null,
    },
    department: String,
    designation: String,
    education: String,
    subjectSpecialization: String,
    experienceYears: Number,
    semester: String,
    currentSemester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
      default: null,
    },
    currentAnnualYear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AnnualYear",
      default: null,
    },
    enrollmentYear: Number,
    cgpa: {
      type: Number,
      default: null,
    },
    totalCreditHours: {
      type: Number,
      default: null,
    },
    phoneNumber: String,
    status: {
      type: String,
      enum: ["Active", "Inactive", "Graduated", "Suspended"],
      default: "Active",
    },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: Date,
  },
  { timestamps: true, id: false },
);

attachGeneratedId(userSchema, { modelName: "User", sourceField: "name", prefix: "USR" });

userSchema.pre("validate", async function generatePortalId(next) {
  if (!this.isNew || this.portalId) {
    next();
    return;
  }

  const count = await mongoose.models.User.countDocuments({ role: this.role || ROLES.STUDENT });
  this.portalId = buildPortalId({ role: this.role || ROLES.STUDENT, count: count + 1 });
  next();
});

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
