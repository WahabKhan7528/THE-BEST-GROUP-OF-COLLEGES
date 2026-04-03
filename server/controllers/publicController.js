import Campus from "../models/Campus.js";
import Course from "../models/Course.js";
import GalleryItem from "../models/GalleryItem.js";
import NewsEvent from "../models/NewsEvent.js";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getPublishedNewsEvents = asyncHandler(async (req, res) => {
  const type = req.query.type;
  const filter = { status: "published" };
  if (type) filter.type = type;

  const items = await NewsEvent.find(filter).sort("-createdAt");
  res.status(200).json({ success: true, count: items.length, data: items });
});

export const getGallery = asyncHandler(async (req, res) => {
  const category = req.query.category;
  const filter = {};
  if (category) filter.category = category;

  const items = await GalleryItem.find(filter).sort("-createdAt");
  res.status(200).json({ success: true, count: items.length, data: items });
});

export const getCampuses = asyncHandler(async (req, res) => {
  const campuses = await Campus.find().sort("name");
  res.status(200).json({ success: true, data: campuses });
});

export const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({ isActive: true }).populate("campuses", "name code slug").sort("title");
  res.status(200).json({ success: true, data: courses });
});

export const getFacultyDirectory = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
  const skip = (page - 1) * limit;

  const filter = { role: "faculty", isActive: true };

  if (req.query.campus) {
    const campusQuery = String(req.query.campus).trim();
    const campusOrConditions = [
      { id: campusQuery },
      { slug: campusQuery.toLowerCase() },
      { code: campusQuery.toUpperCase() },
      { name: { $regex: `^${campusQuery}$`, $options: "i" } },
    ];

    if (/^[a-f\d]{24}$/i.test(campusQuery)) {
      campusOrConditions.unshift({ _id: campusQuery });
    }

    const campus = await Campus.findOne({
      $or: campusOrConditions,
    }).select("_id");

    if (campus) {
      filter.campus = campus._id;
    } else {
      filter.campus = null;
    }
  }

  if (req.query.q) {
    filter.$or = [
      { name: { $regex: req.query.q, $options: "i" } },
      { email: { $regex: req.query.q, $options: "i" } },
      { department: { $regex: req.query.q, $options: "i" } },
      { designation: { $regex: req.query.q, $options: "i" } },
    ];
  }

  const [data, total] = await Promise.all([
    User.find(filter)
      .populate("campus", "name code slug")
      .sort("name")
      .skip(skip)
      .limit(limit),
    User.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data,
    pagination: { page, limit, total },
  });
});
