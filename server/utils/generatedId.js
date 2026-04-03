import crypto from "crypto";
import { buildPrefix } from "./identifier.js";

const MODEL_PREFIXES = {
  Campus: "CAM",
  User: "USR",
  Course: "CRS",
  Subject: "SUB",
  ClassRoom: "CLS",
  Announcement: "ANN",
  Assignment: "ASM",
  Submission: "SBD",
  Result: "RES",
  Semester: "SEM",
  AnnualYear: "AYR",
  CourseSemesterMapping: "CSM",
  AnnualYearMapping: "AYM",
  ClassSubject: "CST",
  StudentEnrollment: "ENR",
  ResultCalculationLog: "RCL",
  NewsEvent: "NWS",
  GalleryItem: "GAL",
  Material: "MAT",
  RefreshToken: "RTK",
};

const buildRandomDigits = (length = 10) => {
  const min = 10 ** (length - 1);
  const max = 10 ** length;
  return String(crypto.randomInt(min, max));
};

export const buildGeneratedId = ({ modelName, prefix, seed } = {}) => {
  const resolvedPrefix = String(prefix || MODEL_PREFIXES[modelName] || buildPrefix(seed || modelName || "XX", 3)).toUpperCase();
  return `${resolvedPrefix}-${Date.now()}-${buildRandomDigits(10)}`;
};

export const attachGeneratedId = (schema, { modelName, sourceField = "name", prefix } = {}) => {
  schema.set("id", false);
  schema.add({
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
  });

  schema.pre("validate", async function generateEntityId(next) {
    if (!this.isNew || this.id) {
      next();
      return;
    }

    const source = this[sourceField] || this.name || this.title || this.code || this.slug || this.campusId || this.portalId || this.constructor.modelName;
    this.id = buildGeneratedId({ modelName: modelName || this.constructor.modelName, prefix, seed: source });
    next();
  });
};