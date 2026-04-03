import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/token.js";

const parseToken = (req) => req.cookies?.accessToken || null;

export const protect = asyncHandler(async (req, res, next) => {
  const token = parseToken(req);
  if (!token) throw new ApiError(401, "Access token is required");

  const decoded = verifyAccessToken(token);
  const user = await User.findById(decoded.id)
    .populate("campus", "name code slug")
    .populate("currentCourse", "title code")
    .populate("currentClassRoom", "name section campus")
    .populate("subjects", "name code");

  if (!user || !user.isActive) {
    throw new ApiError(401, "User not found or inactive");
  }

  req.user = user;
  next();
});

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    throw new ApiError(403, "You are not authorized for this action");
  }
  next();
};
