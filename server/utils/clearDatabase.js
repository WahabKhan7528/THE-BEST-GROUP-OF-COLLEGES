import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "../database/db.js";
import AnnualYear from "../models/AnnualYear.js";
import AnnualYearMapping from "../models/AnnualYearMapping.js";
import Announcement from "../models/Announcement.js";
import Assignment from "../models/Assignment.js";
import Campus from "../models/Campus.js";
import ClassRoom from "../models/ClassRoom.js";
import ClassSubject from "../models/ClassSubject.js";
import Course from "../models/Course.js";
import CourseSemesterMapping from "../models/CourseSemesterMapping.js";
import GalleryItem from "../models/GalleryItem.js";
import Material from "../models/Material.js";
import NewsEvent from "../models/NewsEvent.js";
import RefreshToken from "../models/RefreshToken.js";
import Result from "../models/Result.js";
import ResultCalculationLog from "../models/ResultCalculationLog.js";
import Semester from "../models/Semester.js";
import StudentEnrollment from "../models/StudentEnrollment.js";
import Submission from "../models/Submission.js";
import Subject from "../models/Subject.js";
import User from "../models/User.js";
import { ROLES } from "../config/constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envCandidates = [
  path.join(__dirname, "..", ".env"),
  path.join(__dirname, "..", "config", "config.env"),
  path.join(__dirname, "..", ".env.example"),
];

for (const envPath of envCandidates) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    break;
  }
}

const collections = [
  RefreshToken,
  ResultCalculationLog,
  Result,
  Submission,
  Assignment,
  StudentEnrollment,
  ClassSubject,
  ClassRoom,
  Subject,
  CourseSemesterMapping,
  AnnualYearMapping,
  User,
  Campus,
  Course,
  Semester,
  AnnualYear,
  NewsEvent,
  GalleryItem,
  Material,
  Announcement,
];

const run = async () => {
  try {
    await connectDB();

    for (const model of collections) {
      await model.deleteMany({});
    }

    const portalId = process.env.SEED_SUPER_ADMIN_ID || "ADM-1000";
    const email = process.env.SEED_SUPER_ADMIN_EMAIL || "admin@bestcollege.edu";
    const password = process.env.SEED_SUPER_ADMIN_PASSWORD || "admin@123";

    await User.create({
      portalId,
      name: "System Super Admin",
      email,
      password,
      role: ROLES.SUPER_ADMIN,
      isActive: true,
    });

    console.log("Database cleared successfully and super admin reseeded", {
      id: portalId,
      email,
    });
    process.exit(0);
  } catch (error) {
    console.error("Failed to clear database", error);
    process.exit(1);
  }
};

run();