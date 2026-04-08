import app from "./app.js";
import { connectDB } from "./database/db.js";
import { configureCloudinary } from "./utils/cloudinary.js";
import "./utils/loadEnv.js";


const startServer = async () => {
  try {
    await connectDB();
    configureCloudinary();

    const port = Number(process.env.PORT) || 5000;
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Server startup failed", error);
    process.exit(1);
  }
};

startServer();
