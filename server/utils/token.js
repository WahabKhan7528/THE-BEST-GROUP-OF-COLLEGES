import jwt from "jsonwebtoken";
import crypto from "crypto";

export const signAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE || "15m",
  });
};

export const signRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: `${Number(process.env.REFRESH_TOKEN_EXPIRE_DAYS || 7)}d`,
  });
};

export const verifyAccessToken = (token) => jwt.verify(token, process.env.JWT_ACCESS_SECRET);
export const verifyRefreshToken = (token) => jwt.verify(token, process.env.JWT_REFRESH_SECRET);

export const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
