import RefreshToken from "../models/RefreshToken.js";
import { hashToken, signAccessToken, signRefreshToken } from "../utils/token.js";

const resolveCookieSecurity = (req) => {
  const explicitSecure = process.env.COOKIE_SECURE?.trim().toLowerCase();
  if (explicitSecure === "true") {
    return { secure: true, sameSite: "none" };
  }
  if (explicitSecure === "false") {
    return { secure: false, sameSite: "lax" };
  }

  const forwardedProto = req?.headers?.["x-forwarded-proto"];
  const isHttpsViaProxy =
    typeof forwardedProto === "string" &&
    forwardedProto.split(",")[0].trim().toLowerCase() === "https";
  const secure = Boolean(req?.secure) || isHttpsViaProxy;

  return {
    secure,
    sameSite: secure ? "none" : "lax",
  };
};

const getCookieConfig = (req) => {
  const { secure, sameSite } = resolveCookieSecurity(req);
  return {
    httpOnly: true,
    secure,
    sameSite,
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

export const setAuthCookies = (res, accessToken, refreshToken, req) => {
  const cookieConfig = getCookieConfig(req);

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
  const clearCandidates = [
    { path: "/", httpOnly: true, secure: true, sameSite: "none" },
    { path: "/", httpOnly: true, secure: false, sameSite: "lax" },
  ];

  for (const cookieConfig of clearCandidates) {
    res.clearCookie("accessToken", cookieConfig);
    res.clearCookie("refreshToken", cookieConfig);
  }
};
