import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri || typeof mongoUri !== "string") {
    throw new Error(
      "MONGO_URI is not set. Create server/.env from server/.env.example or define MONGO_URI in your environment.",
    );
  }

  await mongoose.connect(mongoUri);
  // Keep logs minimal but explicit for deployment diagnostics.
  console.log("MongoDB Atlas connected");
};
