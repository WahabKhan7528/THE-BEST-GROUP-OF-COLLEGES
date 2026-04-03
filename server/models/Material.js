import mongoose from "mongoose";
import { FILE_TYPES } from "../config/constants.js";
import { attachGeneratedId } from "../utils/generatedId.js";

const materialSchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: FILE_TYPES,
      default: "other",
    },
    link: String,
    file: {
      publicId: String,
      url: String,
      resourceType: String,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, id: false },
);

attachGeneratedId(materialSchema, { modelName: "Material", sourceField: "title", prefix: "MAT" });

const Material = mongoose.model("Material", materialSchema);

export default Material;
