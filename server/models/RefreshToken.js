import mongoose from "mongoose";
import { attachGeneratedId } from "../utils/generatedId.js";

const refreshTokenSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    tokenHash: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
    revokedAt: Date,
    userAgent: String,
    ipAddress: String,
  },
  { timestamps: true, id: false },
);

attachGeneratedId(refreshTokenSchema, { modelName: "RefreshToken", sourceField: "tokenHash", prefix: "RTK" });

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

export default RefreshToken;
