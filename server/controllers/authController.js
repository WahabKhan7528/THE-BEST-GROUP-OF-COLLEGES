import RefreshToken from "../models/RefreshToken.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { hashToken, verifyRefreshToken } from "../utils/token.js";
import {
  clearAuthCookies,
  issueTokens,
  setAuthCookies,
} from "../services/authService.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const portalId =
    typeof req.body.portalId === "string" ? req.body.portalId.trim() : "";

  if (!name || !email || !password) {
    throw new ApiError(400, "name, email and password are required");
  }

  const exists = await User.findOne({
    $or: [{ email }, ...(portalId ? [{ portalId }] : [])],
  });
  if (exists)
    throw new ApiError(409, "User with this portalId or email already exists");

  const user = await User.create({
    ...(portalId ? { portalId } : {}),
    name,
    email,
    password,
    role: "student",
  });

  res.status(201).json({
    success: true,
    message: "Registration successful",
    user: {
      id: user._id,
      portalId: user.portalId,
      name: user.name,
      email: user.email,
      role: user.role,
      campus: user.campus,
    },
  });
});

export const login = asyncHandler(async (req, res) => {
  const rawLoginId =
    req.body.loginId || req.body.id || req.body.portalId || req.body.email;
  const loginId = typeof rawLoginId === "string" ? rawLoginId.trim() : "";
  const { password } = req.body;

  if (!loginId || !password) {
    throw new ApiError(400, "loginId and password are required");
  }

  const user = await User.findOne({
    $or: [
      { portalId: loginId.toUpperCase() },
      { email: loginId.toLowerCase() },
    ],
  }).select("+password");

  if (!user || !user.isActive) throw new ApiError(401, "Invalid credentials");

  const validPassword = await user.comparePassword(password);
  if (!validPassword) throw new ApiError(401, "Invalid credentials");

  const tokens = await issueTokens(user, req);
  setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

  user.lastLoginAt = new Date();
  await user.save();

  res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      id: user._id,
      portalId: user.portalId,
      name: user.name,
      email: user.email,
      role: user.role,
      campus: user.campus,
    },
  });
});

export const refreshSession = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) throw new ApiError(401, "refreshToken is required");

  const decoded = verifyRefreshToken(refreshToken);
  const storedToken = await RefreshToken.findOne({
    tokenHash: hashToken(refreshToken),
  });

  if (
    !storedToken ||
    storedToken.revokedAt ||
    storedToken.expiresAt < new Date()
  ) {
    throw new ApiError(401, "Refresh token is invalid or expired");
  }

  const user = await User.findById(decoded.id);
  if (!user || !user.isActive) throw new ApiError(401, "User no longer active");

  storedToken.revokedAt = new Date();
  await storedToken.save();

  const tokens = await issueTokens(user, req);
  setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

  res.status(200).json({
    success: true,
    message: "Session refreshed",
  });
});

export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (refreshToken) {
    await RefreshToken.findOneAndUpdate(
      { tokenHash: hashToken(refreshToken) },
      { revokedAt: new Date() },
    );
  }

  clearAuthCookies(res);

  res.status(200).json({ success: true, message: "Logged out" });
});

export const me = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "currentPassword and newPassword are required");
  }

  const user = await User.findById(req.user._id).select("+password");
  const valid = await user.comparePassword(currentPassword);
  if (!valid) throw new ApiError(400, "Current password is incorrect");

  user.password = newPassword;
  await user.save();

  await RefreshToken.updateMany(
    { user: user._id, revokedAt: { $exists: false } },
    { revokedAt: new Date() },
  );

  res
    .status(200)
    .json({ success: true, message: "Password changed. Please login again." });
});
