import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "../database/db.js";
import User from "../models/User.js";
import { ROLES } from "../config/constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envCandidates = [
  path.join(__dirname, "..", ".env"),
  path.join(__dirname, "..", "config", "config.env"),
  path.join(__dirname, "..", ".env.example"),
];

for (const envPath of envCandidates) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    break;
  }
}

const run = async () => {
  try {
    await connectDB();

    const portalId = process.env.SEED_SUPER_ADMIN_ID || "ADM-1000";
    const email = process.env.SEED_SUPER_ADMIN_EMAIL || "admin@bestcollege.edu";
    const password = process.env.SEED_SUPER_ADMIN_PASSWORD || "admin@123";

    const existing = await User.findOne({ $or: [{ portalId }, { email }] }).select("+password");
    if (existing) {
      existing.portalId = portalId;
      existing.name = "System Super Admin";
      existing.email = email;
      existing.password = password;
      existing.role = ROLES.SUPER_ADMIN;
      existing.isActive = true;
      await existing.save();

      console.log("Super admin updated:", {
        id: existing.portalId,
        email: existing.email,
        password,
      });
      process.exit(0);
    }

    const user = await User.create({
      portalId,
      name: "System Super Admin",
      email,
      password,
      role: ROLES.SUPER_ADMIN,
      isActive: true,
    });

    console.log("Super admin created:", {
      id: user.portalId,
      email: user.email,
      password,
    });

    process.exit(0);
  } catch (error) {
    console.error("Failed to seed super admin", error);
    process.exit(1);
  }
};

run();
