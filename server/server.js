import "./utils/loadEnv.js";
import app from "./app.js";
import { connectDB } from "./database/db.js";
import { configureCloudinary } from "./utils/cloudinary.js";
import { startRefreshTokenCleanupSchedule } from "./utils/refreshTokenCleanup.js";

const startServer = async () => {
  try {
    await connectDB();
    configureCloudinary();
    startRefreshTokenCleanupSchedule();

    const port = Number(process.env.PORT) || 5000;
    app.listen(port, () => {
      const publicUrl =
        process.env.RENDER_EXTERNAL_URL ||
        process.env.SERVER_PUBLIC_URL ||
        `http://localhost:${port}`;
      console.log(`Server running at ${publicUrl}`);
    });
  } catch (error) {
    console.error("Server startup failed", error);
    process.exit(1);
  }
};

startServer();
