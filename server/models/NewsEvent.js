import mongoose from "mongoose";
import { NEWS_TYPES } from "../config/constants.js";
import { attachGeneratedId } from "../utils/generatedId.js";

const newsEventSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    type: {
      type: String,
      enum: NEWS_TYPES,
      default: "news",
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
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: Date,
    time: String,
    location: String,
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
    },
    image: {
      publicId: String,
      url: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, id: false },
);

attachGeneratedId(newsEventSchema, { modelName: "NewsEvent", sourceField: "title", prefix: "NWS" });

const NewsEvent = mongoose.model("NewsEvent", newsEventSchema);

export default NewsEvent;
