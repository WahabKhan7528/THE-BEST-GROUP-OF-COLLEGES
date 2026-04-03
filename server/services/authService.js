import RefreshToken from "../models/RefreshToken.js";
import { hashToken, signAccessToken, signRefreshToken } from "../utils/token.js";

const getCookieConfig = () => {
  const secure = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure,
    sameSite: secure ? "none" : "lax",
    path: "/",
  };
};

export const issueTokens = async (user, req) => {
  const payload = { id: user._id, role: user.role, portalId: user.portalId };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  const expiresAt = new Date(
    Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRE_DAYS || 7) * 24 * 60 * 60 * 1000,
  );

  await RefreshToken.create({
    user: user._id,
    tokenHash: hashToken(refreshToken),
    expiresAt,
    userAgent: req.headers["user-agent"] || "unknown",
    ipAddress: req.ip,
  });

  return { accessToken, refreshToken, expiresAt };
};

export const setAuthCookies = (res, accessToken, refreshToken) => {
  const cookieConfig = getCookieConfig();

  res.cookie("accessToken", accessToken, {
    ...cookieConfig,
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    ...cookieConfig,
    maxAge: Number(process.env.REFRESH_TOKEN_EXPIRE_DAYS || 7) * 24 * 60 * 60 * 1000,
  });
};

export const clearAuthCookies = (res) => {
  const cookieConfig = getCookieConfig();
  res.clearCookie("accessToken", cookieConfig);
  res.clearCookie("refreshToken", cookieConfig);
};
