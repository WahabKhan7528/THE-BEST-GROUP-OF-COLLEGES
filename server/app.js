import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import authRoutes from "./routes/authRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import portalRoutes from "./routes/portalRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

const app = express();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, try again later." },
});

app.use(helmet({ crossOriginResourcePolicy: false }));

const allowedOrigins = [
  ...(process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(",").map((origin) => origin.trim())
    : []),
  "http://localhost:5173",
].filter(Boolean);

const allowedOriginRegexes = (process.env.FRONTEND_URL_REGEX || "")
  .split(",")
  .map((pattern) => pattern.trim())
  .filter(Boolean)
  .flatMap((pattern) => {
    try {
      return [new RegExp(pattern)];
    } catch {
      return [];
    }
  });

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests and approved browser origins.
      if (!origin || allowedOrigins.includes(origin) || allowedOriginRegexes.some((pattern) => pattern.test(origin))) {
        callback(null, true);
        return;
      }
      callback(new Error("CORS: origin not allowed"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

// Render/Vercel run behind proxies, so trust forwarded headers.
app.set("trust proxy", 1);

app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(mongoSanitize());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(import.meta.dirname, "uploads")));

// Apply rate limit to login only; keep auth session checks like /auth/me unaffected.
app.use("/api/v1/auth/login", authLimiter);

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/public", publicRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/portal", portalRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
