import express from "express";
import {
  getCampuses,
  getCourses,
  getFacultyDirectory,
  getGallery,
  getPublishedNewsEvents,
} from "../controllers/publicController.js";

const router = express.Router();

router.get("/campuses", getCampuses);
router.get("/courses", getCourses);
router.get("/faculty", getFacultyDirectory);
router.get("/news-events", getPublishedNewsEvents);
router.get("/gallery", getGallery);

export default router;
