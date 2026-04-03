import express from "express";
import {
  createAnnualYear,
  createAnnualYearMapping,
  createClassRoom,
  createClassSubject,
  createCampus,
  createCourse,
  createCourseSemesterMapping,
  createResultCalculationLog,
  createSemester,
  createStudentEnrollment,
  createNewsEvent,
  createSubject,
  createUser,
  deactivateUser,
  deleteCampus,
  deleteClassRoom,
  deleteCourse,
  deleteGalleryItem,
  deleteNewsEvent,
  deleteSubject,
  listAnnualYearMappings,
  listAnnualYears,
  listCampuses,
  listClassSubjects,
  listClassRooms,
  listCourses,
  listCourseSemesterMappings,
  listResultCalculationLogs,
  listSemesters,
  listStudentEnrollments,
  listNewsEvents,
  listGalleryItems,
  listSubjects,
  listUsers,
  updateCampus,
  updateClassRoom,
  updateCourse,
  updateGalleryItem,
  updateNewsEvent,
  updateSubject,
  updateUser,
  uploadGalleryItem,
} from "../controllers/adminController.js";
import { authorize, protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { ROLES } from "../config/constants.js";

const router = express.Router();

router.use(protect);

router.route("/users").get(authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), listUsers).post(authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), createUser);
router.route("/users/:id").put(authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), updateUser).delete(authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), deactivateUser);

router.route("/campuses").get(authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), listCampuses).post(authorize(ROLES.SUPER_ADMIN), upload.single("image"), createCampus);
router.route("/campuses/:id").put(authorize(ROLES.SUPER_ADMIN), upload.single("image"), updateCampus).delete(authorize(ROLES.SUPER_ADMIN), deleteCampus);

router.route("/courses").get(authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), listCourses).post(authorize(ROLES.ADMIN), createCourse);
router.route("/courses/:id").put(authorize(ROLES.ADMIN), updateCourse).delete(authorize(ROLES.ADMIN), deleteCourse);

router.route("/classes").get(authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), listClassRooms).post(authorize(ROLES.ADMIN), createClassRoom);
router.route("/classes/:id").put(authorize(ROLES.ADMIN), updateClassRoom).delete(authorize(ROLES.ADMIN), deleteClassRoom);

router.route("/subjects").get(authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), listSubjects).post(authorize(ROLES.ADMIN), createSubject);
router.route("/subjects/:id").put(authorize(ROLES.ADMIN), updateSubject).delete(authorize(ROLES.ADMIN), deleteSubject);

router.route("/news-events").get(authorize(ROLES.SUPER_ADMIN), listNewsEvents).post(authorize(ROLES.SUPER_ADMIN), upload.single("image"), createNewsEvent);
router.route("/news-events/:id").put(authorize(ROLES.SUPER_ADMIN), upload.single("image"), updateNewsEvent).delete(authorize(ROLES.SUPER_ADMIN), deleteNewsEvent);

router.route("/gallery").get(authorize(ROLES.SUPER_ADMIN), listGalleryItems).post(authorize(ROLES.SUPER_ADMIN), upload.single("image"), uploadGalleryItem);
router.route("/gallery/:id").put(authorize(ROLES.SUPER_ADMIN), upload.single("image"), updateGalleryItem).delete(authorize(ROLES.SUPER_ADMIN), deleteGalleryItem);

router.route("/semesters").get(authorize(ROLES.ADMIN), listSemesters).post(authorize(ROLES.ADMIN), createSemester);
router.route("/annual-years").get(authorize(ROLES.ADMIN), listAnnualYears).post(authorize(ROLES.ADMIN), createAnnualYear);
router.route("/course-semester-mappings").get(authorize(ROLES.ADMIN), listCourseSemesterMappings).post(authorize(ROLES.ADMIN), createCourseSemesterMapping);
router.route("/annual-year-mappings").get(authorize(ROLES.ADMIN), listAnnualYearMappings).post(authorize(ROLES.ADMIN), createAnnualYearMapping);
router.route("/class-subjects").get(authorize(ROLES.ADMIN), listClassSubjects).post(authorize(ROLES.ADMIN), createClassSubject);
router.route("/enrollments").get(authorize(ROLES.ADMIN), listStudentEnrollments).post(authorize(ROLES.ADMIN), createStudentEnrollment);
router.route("/result-logs").get(authorize(ROLES.ADMIN), listResultCalculationLogs).post(authorize(ROLES.ADMIN), createResultCalculationLog);

export default router;
