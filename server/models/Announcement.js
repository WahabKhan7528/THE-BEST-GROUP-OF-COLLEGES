import mongoose from "mongoose";
import { attachGeneratedId } from "../utils/generatedId.js";

const announcementSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
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
    targetClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: "ClassRoom" }],
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
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, id: false },
);

attachGeneratedId(announcementSchema, { modelName: "Announcement", sourceField: "title", prefix: "ANN" });

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;
