import express from "express";
import {
  createAnnouncement,
  createAssignment,
  createMaterial,
  deleteAnnouncement,
  deleteAssignment,
  deleteMaterial,
  gradeSubmission,
  listAnnouncements,
  listAssignments,
  listPortalClasses,
  listMaterials,
  listResults,
  listSubmissions,
  listFacultySubjects,
  publishResult,
  submitAssignment,
  updateAssignment,
  updateMaterial,
} from "../controllers/portalController.js";
import { authorize, protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { ROLES } from "../config/constants.js";

const router = express.Router();

router.use(protect);

router
  .route("/announcements")
  .post(authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.FACULTY), upload.single("attachment"), createAnnouncement)
  .get(listAnnouncements);

router
  .route("/announcements/:id")
  .delete(authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.FACULTY), deleteAnnouncement);

router
  .route("/assignments")
  .post(authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.FACULTY), upload.single("attachment"), createAssignment)
  .get(listAssignments);

router
  .route("/assignments/:id")
  .put(authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.FACULTY), upload.single("attachment"), updateAssignment)
  .delete(authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.FACULTY), deleteAssignment);

router
  .route("/materials")
  .post(authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.FACULTY), upload.single("file"), createMaterial)
  .get(listMaterials);

router
  .route("/materials/:id")
  .put(authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.FACULTY), upload.single("file"), updateMaterial)
  .delete(authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.FACULTY), deleteMaterial);

router
  .route("/submissions")
  .post(authorize(ROLES.STUDENT), upload.single("file"), submitAssignment)
  .get(authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.FACULTY, ROLES.STUDENT), listSubmissions);

router
  .route("/submissions/assignment/:assignmentId")
  .get(authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.FACULTY), listSubmissions);

router
  .route("/submissions/:id/grade")
  .put(authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.FACULTY), gradeSubmission);

router
  .route("/results")
  .post(authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.FACULTY), publishResult)
  .get(listResults);

router.route("/faculty/subjects").get(authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.FACULTY), listFacultySubjects);

router.route("/classes").get(listPortalClasses);

export default router;
