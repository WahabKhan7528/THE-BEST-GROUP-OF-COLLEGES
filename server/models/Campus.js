import mongoose from "mongoose";
import { buildGeneratedId } from "../utils/generatedId.js";

const buildCampusCode = (name) => {
  const words = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return "CMP";
  }

  const acronym = words
    .map((word) => word[0])
    .join("")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase();

  if (acronym.length >= 2) {
    return acronym.slice(0, 5);
  }

  return String(words[0]).replace(/[^a-zA-Z0-9]/g, "").slice(0, 5).toUpperCase() || "CMP";
};

const campusSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    campusId: {
      type: String,
      unique: true,
      uppercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      unique: true,
      uppercase: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    established: String,
    dean: String,
    contact: {
      phone: String,
      email: String,
      website: String,
    },
    image: {
      publicId: String,
      url: String,
    },
  },
  { timestamps: true, id: false },
);

campusSchema.pre("validate", async function generateCampusIdentifiers(next) {
  if (!this.isNew) {
    next();
    return;
  }

  if (!this.id) {
    this.id = buildGeneratedId({ modelName: "Campus", seed: this.name, prefix: "CAM" });
  }

  if (!this.campusId) {
    this.campusId = buildGeneratedId({ modelName: "Campus", seed: this.name, prefix: String(this.name || "CAM").trim().slice(0, 3) || "CAM" });
  }

  if (!this.code) {
    this.code = buildCampusCode(this.name);
  }

  if (!this.slug) {
    this.slug = String(this.name || this.code || this.campusId)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  next();
});

const Campus = mongoose.model("Campus", campusSchema);

export default Campus;
