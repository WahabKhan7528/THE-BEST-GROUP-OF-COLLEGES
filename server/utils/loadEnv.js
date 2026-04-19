import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Handles environment variable loading from several candidate locations.

const loadEnv = () => {
  const rootDir = path.join(import.meta.dirname, "..");

  const envCandidates = [
    path.join(rootDir, ".env"),
    path.join(rootDir, "config", "config.env"),
  ];

  for (const envPath of envCandidates) {
    if (fs.existsSync(envPath)) {
      dotenv.config({ path: envPath });
      return;
    }
  }
};

loadEnv();

export default loadEnv;
