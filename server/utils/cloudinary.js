import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsRoot = path.join(__dirname, "..", "uploads");
const localBaseUrl = (process.env.SERVER_URL || process.env.BACKEND_URL || "http://localhost:5000").replace(/\/$/, "");

const isPlaceholderValue = (value) => {
  if (!value) return true;
  const normalized = String(value).trim().toLowerCase();
  return normalized.includes("replace_api_key") || normalized.includes("replace_api_secret") || normalized.includes("your_") || normalized.includes("your-") || normalized.includes("example");
};

const hasCloudinaryConfig = () => {
  return !isPlaceholderValue(process.env.CLOUDINARY_CLOUD_NAME)
    && !isPlaceholderValue(process.env.CLOUDINARY_API_KEY)
    && !isPlaceholderValue(process.env.CLOUDINARY_API_SECRET);
};

const getFileExtension = (originalName = "", resourceType = "auto") => {
  const extension = path.extname(originalName || "");
  if (extension) return extension.toLowerCase();

  if (resourceType === "image") return ".jpg";
  return ".bin";
};

const buildLocalUploadResult = async (buffer, folder, resourceType, metadata = {}) => {
  const originalName = metadata.originalName || "upload";
  const extension = getFileExtension(originalName, resourceType);
  const fileBaseName = path.basename(originalName, path.extname(originalName) || undefined)
    .replace(/[^a-zA-Z0-9._-]+/g, "_")
    .slice(0, 80) || "upload";
  const fileName = `${Date.now()}-${randomUUID()}-${fileBaseName}${extension}`;
  const safeFolder = folder.split(/[\\/]+/).filter(Boolean);
  const absoluteFolder = path.join(uploadsRoot, ...safeFolder);
  const absolutePath = path.join(absoluteFolder, fileName);
  const relativePath = path.posix.join(...safeFolder.map((segment) => segment.replace(/\\/g, "/")), fileName).replace(/\\/g, "/");

  await fs.mkdir(absoluteFolder, { recursive: true });
  await fs.writeFile(absolutePath, buffer);

  return {
    public_id: `local:${relativePath}`,
    secure_url: new URL(`/uploads/${relativePath}`, localBaseUrl).toString(),
    resource_type: resourceType,
  };
};

export const configureCloudinary = () => {
  if (!hasCloudinaryConfig()) {
    return;
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

export const uploadBufferToCloudinary = async (buffer, folder, resourceType = "auto", metadata = {}) => {
  if (hasCloudinaryConfig()) {
    try {
      return await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder, resource_type: resourceType },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          },
        );

        streamifier.createReadStream(buffer).pipe(uploadStream);
      });
    } catch (error) {
      return buildLocalUploadResult(buffer, folder, resourceType, metadata);
    }
  }

  return buildLocalUploadResult(buffer, folder, resourceType, metadata);
};

export const deleteFromCloudinary = async (publicId, resourceType = "image") => {
  if (!publicId) return;

  if (String(publicId).startsWith("local:")) {
    const relativePath = String(publicId).slice("local:".length);
    const absolutePath = path.join(uploadsRoot, ...relativePath.split("/").filter(Boolean));

    try {
      await fs.unlink(absolutePath);
    } catch {
      // Ignore missing local files.
    }

    return;
  }

  if (!hasCloudinaryConfig()) return;

  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch {
    // Ignore remote delete failures so cleanup remains best-effort.
  }
};
