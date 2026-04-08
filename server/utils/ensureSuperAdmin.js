import "./loadEnv.js";
import User from "../models/User.js";
import { ROLES } from "../config/constants.js";

const getSeedConfig = () => ({
  portalId: (process.env.SEED_SUPER_ADMIN_ID || "").trim().toUpperCase(),
  email: (process.env.SEED_SUPER_ADMIN_EMAIL || "").trim().toLowerCase(),
  password: (process.env.SEED_SUPER_ADMIN_PASSWORD || "").trim(),
});

export const ensureSuperAdmin = async () => {
  const { portalId, email, password } = getSeedConfig();

  if (!portalId || !email || !password) {
    console.log("Super admin seed skipped: missing SEED_SUPER_ADMIN_* environment variables");
    return null;
  }

  const existing = await User.findOne({ $or: [{ portalId }, { email }] }).select("+password");

  if (existing) {
    existing.portalId = portalId;
    existing.name = existing.name || "System Super Admin";
    existing.email = email;
    existing.password = password;
    existing.role = ROLES.SUPER_ADMIN;
    existing.isActive = true;
    await existing.save();

    console.log(`Super admin ready: ${existing.portalId}`);
    return existing;
  }

  const user = await User.create({
    portalId,
    name: "System Super Admin",
    email,
    password,
    role: ROLES.SUPER_ADMIN,
    isActive: true,
  });

  console.log(`Super admin created: ${user.portalId}`);
  return user;
};

export default ensureSuperAdmin;