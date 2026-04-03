import mongoose from "mongoose";
import { attachGeneratedId } from "../utils/generatedId.js";

const galleryItemSchema = new mongoose.Schema(
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
    category: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [String],
    description: String,
    image: {
      publicId: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, id: false },
);

attachGeneratedId(galleryItemSchema, { modelName: "GalleryItem", sourceField: "title", prefix: "GAL" });

const GalleryItem = mongoose.model("GalleryItem", galleryItemSchema);

export default GalleryItem;
