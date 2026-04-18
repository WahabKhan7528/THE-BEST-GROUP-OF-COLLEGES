import ClassRoom from "../models/ClassRoom.js";
import Campus from "../models/Campus.js";
import AnnualYear from "../models/AnnualYear.js";
import AnnualYearMapping from "../models/AnnualYearMapping.js";
import Course from "../models/Course.js";
import CourseSemesterMapping from "../models/CourseSemesterMapping.js";
import ClassSubject from "../models/ClassSubject.js";
import GalleryItem from "../models/GalleryItem.js";
import NewsEvent from "../models/NewsEvent.js";
import RefreshToken from "../models/RefreshToken.js";
import mongoose from "mongoose";
import ResultCalculationLog from "../models/ResultCalculationLog.js";
import Semester from "../models/Semester.js";
import Subject from "../models/Subject.js";
import StudentEnrollment from "../models/StudentEnrollment.js";
import User from "../models/User.js";
import { ROLES } from "../config/constants.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  deleteFromCloudinary,
  uploadBufferToCloudinary,
} from "../utils/cloudinary.js";

const uniqueIds = (items = []) => [
  ...new Set(
    items.map((item) => String(item?._id || item || "")).filter(Boolean),
  ),
];
const assertValidObjectId = (value, fieldName) => {
  if (!mongoose.isValidObjectId(value)) {
    throw new ApiError(400, `Invalid ${fieldName}`);
  }
};
const getIdValue = (value) => {
  const rawValue = value?._id || value?.id || value;
  return rawValue ? String(rawValue) : null;
};

const ALLOWED_ADMIN_MANAGED_ROLES = [ROLES.FACULTY, ROLES.STUDENT];

const isCampusMismatch = (classCampus, userCampus) => {
  const classCampusId = getIdValue(classCampus);
  const userCampusId = getIdValue(userCampus);
  if (!classCampusId || !userCampusId) return false;
  return classCampusId !== userCampusId;
};

const applyRoleScopedFields = (payload, role) => {
  if (role !== ROLES.FACULTY) {
    payload.department = null;
    payload.designation = null;
    payload.subjects = [];
  }

  if (role !== ROLES.STUDENT) {
    payload.currentCourse = null;
    payload.currentClassRoom = null;
    payload.classSection = null;
    payload.currentSemester = null;
    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        portalId: user.portalId,
        name: user.name,
        email: user.email,
        role: user.role,
        campus: user.campus,
        currentCourse: user.currentCourse,
        currentClassRoom: user.currentClassRoom,
      },
    });
    payload.semester = null;
    payload.enrollmentYear = null;
    payload.cgpa = null;
    payload.totalCreditHours = null;
  }

  if (role === ROLES.SUPER_ADMIN) {
    payload.campus = null;
  }
};

const syncStudentClassMembership = async ({
  studentId,
  previousClassRoom,
  nextClassRoom,
}) => {
  const previousId = getIdValue(previousClassRoom);
  const nextId = getIdValue(nextClassRoom);

  if (previousId && previousId !== nextId) {
    await ClassRoom.findByIdAndUpdate(previousId, {
      $pull: { students: studentId },
    });
  }

  if (nextId) {
    await ClassRoom.findByIdAndUpdate(nextId, {
      $addToSet: { students: studentId },
    });
  }
};

const validateAndHydrateStudentClass = async ({
  payload,
  actingUser,
  fallbackCampus,
}) => {
  const classRoomId = getIdValue(payload.currentClassRoom);
  if (!classRoomId) {
    payload.currentClassRoom = null;
    payload.classSection = null;
    return;
  }

  const classRoom =
    await ClassRoom.findById(classRoomId).select("_id section campus");
  if (!classRoom) {
    throw new ApiError(400, "Assigned class was not found");
  }

  if (
    actingUser.role === ROLES.ADMIN &&
    isCampusMismatch(classRoom.campus, actingUser.campus)
  ) {
    throw new ApiError(
      403,
      "You can only assign students to classes in your campus",
    );
  }

  const payloadCampus =
    getIdValue(payload.campus) || getIdValue(fallbackCampus);
  if (payloadCampus && isCampusMismatch(classRoom.campus, payloadCampus)) {
    throw new ApiError(400, "Student campus and class campus must match");
  }

  payload.currentClassRoom = classRoom._id;
  payload.classSection = payload.classSection || classRoom.section || null;
  payload.campus = payloadCampus || classRoom.campus;
};

const normalizeSemesterSubjects = (semesterSubjects = []) => {
  const seenSubjects = new Set();

  return semesterSubjects
    .map((entry) => ({
      semesterNumber: Number(entry?.semesterNumber),
      startDate: entry?.startDate ? new Date(entry.startDate) : null,
      endDate: entry?.endDate ? new Date(entry.endDate) : null,
      status: entry?.status || "planned",
      resultPublished: Boolean(entry?.resultPublished),
      lockedAt: entry?.lockedAt ? new Date(entry.lockedAt) : null,
      completedAt: entry?.completedAt ? new Date(entry.completedAt) : null,
      subjectAssignments: Array.isArray(entry?.subjectAssignments)
        ? entry.subjectAssignments
            .map((assignment) => ({
              subject: String(
                assignment?.subject?._id ||
                  assignment?.subject ||
                  assignment?.subjectId ||
                  "",
              ),
              faculty: String(
                assignment?.faculty?._id ||
                  assignment?.faculty ||
                  assignment?.facultyId ||
                  "",
              ),
            }))
            .filter((assignment) => assignment.subject && assignment.faculty)
        : [],
      subjects: uniqueIds(entry?.subjects || []),
      faculty: uniqueIds(entry?.faculty || []),
    }))
    .filter(
      (entry) =>
        Number.isFinite(entry.semesterNumber) && entry.semesterNumber > 0,
    )
    .map((entry) => {
      if (entry.subjectAssignments.length > 6 || entry.subjects.length > 6) {
        throw new ApiError(400, "Each semester can have at most 6 subjects");
      }

      const subjectIds = entry.subjectAssignments.length
        ? entry.subjectAssignments.map((assignment) => assignment.subject)
        : entry.subjects;

      for (const subjectId of subjectIds) {
        if (seenSubjects.has(subjectId)) {
          throw new ApiError(400, "Subjects cannot repeat across semesters");
        }
        seenSubjects.add(subjectId);
      }

      return entry;
    });
};

const getSemesterClassPayload = (body) => {
  const semesterSubjects = normalizeSemesterSubjects(
    body.semesterSubjects || [],
  );
  const subjects = semesterSubjects.length
    ? uniqueIds(
        semesterSubjects.flatMap((entry) =>
          entry.subjectAssignments.map((assignment) => assignment.subject),
        ),
      )
    : uniqueIds(body.subjects || []);
  const faculty = semesterSubjects.length
    ? uniqueIds(
        semesterSubjects.flatMap((entry) =>
          entry.subjectAssignments.map((assignment) => assignment.faculty),
        ),
      )
    : uniqueIds(body.faculty || []);

  return {
    ...body,
    subjects,
    faculty,
    semesterSubjects,
  };
};

export const createUser = asyncHandler(async (req, res) => {
  const payload = { ...req.body };

  if (req.user.role === ROLES.ADMIN) {
    if (!ALLOWED_ADMIN_MANAGED_ROLES.includes(payload.role)) {
      throw new ApiError(
        403,
        "Sub-admin can only create faculty and student accounts",
      );
    }
    payload.campus = req.user.campus?._id || req.user.campus || null;
  }

  applyRoleScopedFields(payload, payload.role);

  if (payload.role === ROLES.STUDENT) {
    await validateAndHydrateStudentClass({ payload, actingUser: req.user });
  }

  const user = await User.create(payload);

  if (user.role === ROLES.STUDENT) {
    await syncStudentClassMembership({
      studentId: user._id,
      previousClassRoom: null,
      nextClassRoom: user.currentClassRoom,
    });
  }

  res.status(201).json({
    success: true,
    data: {
      id: user._id,
      portalId: user.portalId,
      name: user.name,
      email: user.email,
      role: user.role,
      campus: user.campus,
      currentCourse: user.currentCourse,
      currentClassRoom: user.currentClassRoom,
    },
  });
});

export const listUsers = asyncHandler(async (req, res) => {
  const filter = { isActive: true, status: { $ne: "Inactive" } };
  if (req.query.role) filter.role = req.query.role;
  if (req.query.campus) filter.campus = req.query.campus;
  if (req.user.role === ROLES.ADMIN) {
    filter.campus = req.user.campus?._id || req.user.campus;
    if (
      req.query.role &&
      ALLOWED_ADMIN_MANAGED_ROLES.includes(req.query.role)
    ) {
      filter.role = req.query.role;
    } else {
      filter.role = { $in: ALLOWED_ADMIN_MANAGED_ROLES };
    }
  }
  if (req.query.includeInactive === "true") {
    delete filter.isActive;
    delete filter.status;
  }

  const users = await User.find(filter)
    .populate("campus", "name code slug")
    .sort("name");
  res.status(200).json({ success: true, count: users.length, data: users });
});

export const updateUser = asyncHandler(async (req, res) => {
  assertValidObjectId(req.params.id, "user id");

  const payload = { ...req.body };
  delete payload.portalId;

  if (payload.password !== undefined) {
    payload.password =
      typeof payload.password === "string"
        ? payload.password.trim()
        : payload.password;
    if (typeof payload.password !== "string" || payload.password.length < 8) {
      throw new ApiError(400, "Password must be at least 8 characters long");
    }
  }

  const existingUser = await User.findById(req.params.id).select(
    "role campus currentClassRoom",
  );
  if (!existingUser) throw new ApiError(404, "User not found");

  const targetRole = payload.role || existingUser.role;

  if (req.user.role === ROLES.ADMIN) {
    if (!ALLOWED_ADMIN_MANAGED_ROLES.includes(existingUser.role)) {
      throw new ApiError(
        403,
        "Sub-admin cannot edit admin or super admin accounts",
      );
    }

    if (!ALLOWED_ADMIN_MANAGED_ROLES.includes(targetRole)) {
      throw new ApiError(
        403,
        "Sub-admin can only assign faculty or student roles",
      );
    }

    payload.campus =
      req.user.campus?._id || req.user.campus || existingUser.campus || null;
  }

  applyRoleScopedFields(payload, targetRole);

  if (targetRole === ROLES.STUDENT) {
    if (payload.currentClassRoom === undefined) {
      payload.currentClassRoom = existingUser.currentClassRoom;
    }

    await validateAndHydrateStudentClass({
      payload,
      actingUser: req.user,
      fallbackCampus: existingUser.campus,
    });
  }

  let user = null;
  if (payload.password !== undefined) {
    user = await User.findById(req.params.id);
    if (!user) throw new ApiError(404, "User not found");

    Object.assign(user, payload);
    await user.save();

    await RefreshToken.updateMany(
      { user: user._id, revokedAt: { $exists: false } },
      { revokedAt: new Date() },
    );
  } else {
    user = await User.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    if (!user) throw new ApiError(404, "User not found");
  }

  if (user.role === ROLES.STUDENT) {
    await syncStudentClassMembership({
      studentId: user._id,
      previousClassRoom: existingUser.currentClassRoom,
      nextClassRoom: user.currentClassRoom,
    });
  } else {
    await syncStudentClassMembership({
      studentId: user._id,
      previousClassRoom: existingUser.currentClassRoom,
      nextClassRoom: null,
    });
  }

  res.status(200).json({ success: true, data: user });
});

export const deactivateUser = asyncHandler(async (req, res) => {
  assertValidObjectId(req.params.id, "user id");

  const existingUser = await User.findById(req.params.id).select(
    "role currentClassRoom",
  );
  if (!existingUser) throw new ApiError(404, "User not found");

  if (
    req.user.role === ROLES.ADMIN &&
    !ALLOWED_ADMIN_MANAGED_ROLES.includes(existingUser.role)
  ) {
    throw new ApiError(
      403,
      "Sub-admin cannot deactivate admin or super admin accounts",
    );
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isActive: false, status: "Inactive" },
    { new: true },
  );
  if (!user) throw new ApiError(404, "User not found");

  if (existingUser.role === ROLES.STUDENT && existingUser.currentClassRoom) {
    await syncStudentClassMembership({
      studentId: user._id,
      previousClassRoom: existingUser.currentClassRoom,
      nextClassRoom: null,
    });
  }

  res
    .status(200)
    .json({ success: true, message: "User deactivated", data: user });
});

export const createCampus = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const location = req.body.location;

  if (!name || !location) {
    throw new ApiError(400, "name and location are required");
  }

  const payload = {
    name,
    location,
    description: req.body.description,
    established: req.body.established,
    dean: req.body.dean,
    contact: req.body.contact,
  };

  if (req.file) {
    const uploaded = await uploadBufferToCloudinary(
      req.file.buffer,
      "the-best-college/campuses",
      "image",
      {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
      },
    );
    payload.image = { publicId: uploaded.public_id, url: uploaded.secure_url };
  }

  const campus = await Campus.create(payload);
  res.status(201).json({ success: true, data: campus });
});

export const listCampuses = asyncHandler(async (req, res) => {
  const campuses = await Campus.find().sort("name");
  res.status(200).json({ success: true, data: campuses });
});

export const updateCampus = asyncHandler(async (req, res) => {
  assertValidObjectId(req.params.id, "campus id");

  const campus = await Campus.findById(req.params.id);
  if (!campus) throw new ApiError(404, "Campus not found");

  const updatePayload = { ...req.body };

  if (req.file) {
    await deleteFromCloudinary(campus.image?.publicId, "image");
    const uploaded = await uploadBufferToCloudinary(
      req.file.buffer,
      "the-best-college/campuses",
      "image",
      {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
      },
    );
    updatePayload.image = {
      publicId: uploaded.public_id,
      url: uploaded.secure_url,
    };
  }

  const updated = await Campus.findByIdAndUpdate(req.params.id, updatePayload, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: updated });
});

export const deleteCampus = asyncHandler(async (req, res) => {
  assertValidObjectId(req.params.id, "campus id");

  const campus = await Campus.findById(req.params.id);
  if (!campus) throw new ApiError(404, "Campus not found");

  await deleteFromCloudinary(campus.image?.publicId, "image");
  await campus.deleteOne();
  res.status(200).json({ success: true, message: "Campus deleted" });
});

export const createCourse = asyncHandler(async (req, res) => {
  const payload = { ...req.body };
  delete payload.code;
  const course = await Course.create(payload);
  res.status(201).json({ success: true, data: course });
});

export const listCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find()
    .populate("campuses", "name code slug")
    .sort("title");
  res.status(200).json({ success: true, data: courses });
});

export const updateCourse = asyncHandler(async (req, res) => {
  assertValidObjectId(req.params.id, "course id");

  const payload = { ...req.body };
  delete payload.code;
  const course = await Course.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });
  if (!course) throw new ApiError(404, "Course not found");
  res.status(200).json({ success: true, data: course });
});

export const deleteCourse = asyncHandler(async (req, res) => {
  assertValidObjectId(req.params.id, "course id");

  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) throw new ApiError(404, "Course not found");
  res.status(200).json({ success: true, message: "Course deleted" });
});

export const createClassRoom = asyncHandler(async (req, res) => {
  const payload = getSemesterClassPayload(req.body);
  delete payload.classCode;
  delete payload.academicSession;
  const classRoom = await ClassRoom.create(payload);
  res.status(201).json({ success: true, data: classRoom });
});

export const listClassRooms = asyncHandler(async (req, res) => {
  const list = await ClassRoom.find()
    .populate("campus", "name code slug")
    .populate("course", "title code")
    .populate("subjects", "name code")
    .populate("faculty", "name portalId")
    .populate("semesterSubjects.subjects", "name code")
    .populate("semesterSubjects.faculty", "name portalId")
    .sort("-createdAt");

  const classIds = list.map((item) => item._id);
  const students = await User.find({
    role: ROLES.STUDENT,
    isActive: true,
    currentClassRoom: { $in: classIds },
  }).select("_id name portalId currentClassRoom");

  const studentsByClass = new Map();
  students.forEach((student) => {
    const classId = getIdValue(student.currentClassRoom);
    if (!classId) return;
    if (!studentsByClass.has(classId)) {
      studentsByClass.set(classId, []);
    }
    studentsByClass.get(classId).push({
      _id: student._id,
      name: student.name,
      portalId: student.portalId,
    });
  });

  const hydratedList = list.map((classRoom) => {
    const data = classRoom.toObject();
    const classId = String(classRoom._id);
    if (studentsByClass.has(classId)) {
      data.students = studentsByClass.get(classId);
    }
    return data;
  });

  res.status(200).json({ success: true, data: hydratedList });
});

export const updateClassRoom = asyncHandler(async (req, res) => {
  assertValidObjectId(req.params.id, "class id");

  const payload = getSemesterClassPayload(req.body);
  delete payload.classCode;
  delete payload.academicSession;
  const classRoom = await ClassRoom.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });
  if (!classRoom) throw new ApiError(404, "Class not found");
  res.status(200).json({ success: true, data: classRoom });
});

export const deleteClassRoom = asyncHandler(async (req, res) => {
  assertValidObjectId(req.params.id, "class id");

  const classRoom = await ClassRoom.findByIdAndDelete(req.params.id);
  if (!classRoom) throw new ApiError(404, "Class not found");
  res.status(200).json({ success: true, message: "Class deleted" });
});

export const createSubject = asyncHandler(async (req, res) => {
  const payload = { ...req.body };
  delete payload.code;
  payload.semester = null;
  payload.annualYear = null;
  payload.faculty = [];

  const selectedCourse = payload.course
    ? await Course.findById(payload.course).select("campuses")
    : null;
  const selectedCourseCampuses = selectedCourse?.campuses || [];
  const requestCampuses = Array.isArray(payload.campuses)
    ? payload.campuses
    : [];

  if (req.user.role === "admin") {
    payload.campuses = req.user.campus ? [req.user.campus] : [];
  } else if (requestCampuses.length > 0) {
    payload.campuses = requestCampuses;
  } else {
    payload.campuses = selectedCourseCampuses;
  }

  const subject = await Subject.create(payload);
  res.status(201).json({ success: true, data: subject });
});

export const listSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.find({ isActive: true })
    .populate("course", "title code campuses")
    .populate("faculty", "name portalId")
    .sort("name");

  const subjectIds = subjects.map((subject) => subject._id);
  const classRooms = await ClassRoom.find({
    $or: [
      { subjects: { $in: subjectIds } },
      { "semesterSubjects.subjectAssignments.subject": { $in: subjectIds } },
      { "semesterSubjects.subjects": { $in: subjectIds } },
    ],
  })
    .select("campus subjects faculty semesterSubjects")
    .populate("faculty", "name portalId")
    .populate("semesterSubjects.faculty", "name portalId")
    .populate("semesterSubjects.subjectAssignments.subject", "name code")
    .populate("semesterSubjects.subjectAssignments.faculty", "name portalId");

  const facultyBySubjectId = new Map();
  const campusesBySubjectId = new Map();
  const addFaculty = (subjectId, faculty) => {
    const normalizedSubjectId = String(subjectId || "");
    const normalizedFacultyId = String(faculty?._id || faculty || "");
    if (!normalizedSubjectId || !normalizedFacultyId) return;

    if (!facultyBySubjectId.has(normalizedSubjectId)) {
      facultyBySubjectId.set(normalizedSubjectId, new Map());
    }

    facultyBySubjectId.get(normalizedSubjectId).set(normalizedFacultyId, {
      _id: normalizedFacultyId,
      name: faculty?.name || "Faculty",
      portalId: faculty?.portalId || "",
    });
  };

  const addCampus = (subjectId, campus) => {
    const normalizedSubjectId = String(subjectId || "");
    const normalizedCampusId = String(campus?._id || campus || "");
    if (!normalizedSubjectId || !normalizedCampusId) return;

    if (!campusesBySubjectId.has(normalizedSubjectId)) {
      campusesBySubjectId.set(normalizedSubjectId, new Set());
    }

    campusesBySubjectId.get(normalizedSubjectId).add(normalizedCampusId);
  };

  classRooms.forEach((classRoom) => {
    const classCampusId = String(
      classRoom?.campus?._id || classRoom?.campus || "",
    );
    const classFaculty = classRoom.faculty || [];

    (classRoom.subjects || []).forEach((subject) => {
      const subjectId = String(subject?._id || subject || "");
      addCampus(subjectId, classCampusId);
      classFaculty.forEach((faculty) => addFaculty(subjectId, faculty));
    });

    (classRoom.semesterSubjects || []).forEach((term) => {
      const termFaculty = term.faculty || [];
      const assignments = term.subjectAssignments || [];

      assignments.forEach((assignment) => {
        const subjectId = String(
          assignment?.subject?._id || assignment?.subject || "",
        );
        addCampus(subjectId, classCampusId);
        addFaculty(subjectId, assignment.faculty);
      });

      (term.subjects || []).forEach((subject) => {
        const subjectId = String(subject?._id || subject || "");
        addCampus(subjectId, classCampusId);
        termFaculty.forEach((faculty) => addFaculty(subjectId, faculty));
      });
    });
  });

  const hydratedSubjects = subjects
    .map((subject) => {
      const data = subject.toObject();
      if (!Array.isArray(data.campuses) || data.campuses.length === 0) {
        data.campuses = data.course?.campuses || [];
      }

      const subjectId = String(subject._id);
      if (
        (!Array.isArray(data.campuses) || data.campuses.length === 0) &&
        campusesBySubjectId.has(subjectId)
      ) {
        data.campuses = Array.from(campusesBySubjectId.get(subjectId));
      }

      const explicitFaculty = Array.isArray(data.faculty) ? data.faculty : [];
      if (!explicitFaculty.length && facultyBySubjectId.has(subjectId)) {
        data.faculty = Array.from(facultyBySubjectId.get(subjectId).values());
      }

      return data;
    })
    .filter((subject) => {
      if (req.user.role !== "admin") return true;
      const adminCampusId = String(
        req.user.campus?._id || req.user.campus || "",
      );
      if (!adminCampusId) return false;
      return (subject.campuses || []).some(
        (campus) => String(campus?._id || campus) === adminCampusId,
      );
    });

  res.status(200).json({ success: true, data: hydratedSubjects });
});

export const updateSubject = asyncHandler(async (req, res) => {
  assertValidObjectId(req.params.id, "subject id");

  const payload = { ...req.body };
  delete payload.code;
  payload.semester = null;
  payload.annualYear = null;
  payload.faculty = [];

  const selectedCourse = payload.course
    ? await Course.findById(payload.course).select("campuses")
    : null;
  const selectedCourseCampuses = selectedCourse?.campuses || [];
  const requestCampuses = Array.isArray(payload.campuses)
    ? payload.campuses
    : [];

  if (req.user.role === "admin") {
    payload.campuses = req.user.campus ? [req.user.campus] : [];
  } else if (requestCampuses.length > 0) {
    payload.campuses = requestCampuses;
  } else {
    payload.campuses = selectedCourseCampuses;
  }

  const subject = await Subject.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });
  if (!subject) throw new ApiError(404, "Subject not found");
  res.status(200).json({ success: true, data: subject });
});

export const deleteSubject = asyncHandler(async (req, res) => {
  assertValidObjectId(req.params.id, "subject id");

  const subject = await Subject.findByIdAndDelete(req.params.id);
  if (!subject) throw new ApiError(404, "Subject not found");
  res.status(200).json({ success: true, message: "Subject deleted" });
});

export const createNewsEvent = asyncHandler(async (req, res) => {
  const payload = {
    ...req.body,
    createdBy: req.user._id,
    status: String(req.body.status || "published").toLowerCase(),
  };

  if (req.file) {
    const uploaded = await uploadBufferToCloudinary(
      req.file.buffer,
      "the-best-college/news",
      "image",
      {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
      },
    );
    payload.image = { publicId: uploaded.public_id, url: uploaded.secure_url };
  }

  const item = await NewsEvent.create(payload);
  res.status(201).json({ success: true, data: item });
});

export const listNewsEvents = asyncHandler(async (req, res) => {
  const items = await NewsEvent.find()
    .populate("createdBy", "name email campus")
    .sort("-createdAt");
  res.status(200).json({ success: true, data: items });
});

export const updateNewsEvent = asyncHandler(async (req, res) => {
  assertValidObjectId(req.params.id, "news/event id");

  const item = await NewsEvent.findById(req.params.id);
  if (!item) throw new ApiError(404, "News/Event not found");

  const payload = {
    ...req.body,
    status: String(req.body.status || item.status || "published").toLowerCase(),
  };
  if (req.file) {
    await deleteFromCloudinary(item.image?.publicId, "image");
    const uploaded = await uploadBufferToCloudinary(
      req.file.buffer,
      "the-best-college/news",
      "image",
      {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
      },
    );
    payload.image = { publicId: uploaded.public_id, url: uploaded.secure_url };
  }

  const updated = await NewsEvent.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: updated });
});

export const deleteNewsEvent = asyncHandler(async (req, res) => {
  assertValidObjectId(req.params.id, "news/event id");

  const item = await NewsEvent.findById(req.params.id);
  if (!item) throw new ApiError(404, "News/Event not found");

  await deleteFromCloudinary(item.image?.publicId, "image");
  await item.deleteOne();
  res.status(200).json({ success: true, message: "Deleted" });
});

export const uploadGalleryItem = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, "Image is required");

  const uploaded = await uploadBufferToCloudinary(
    req.file.buffer,
    "the-best-college/gallery",
    "image",
    {
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
    },
  );

  const item = await GalleryItem.create({
    title: req.body.title,
    category: req.body.category,
    tags: req.body.tags
      ? String(req.body.tags)
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [],
    description: req.body.description,
    image: { publicId: uploaded.public_id, url: uploaded.secure_url },
    uploadedBy: req.user._id,
  });

  res.status(201).json({ success: true, data: item });
});

export const listGalleryItems = asyncHandler(async (req, res) => {
  const items = await GalleryItem.find()
    .populate("uploadedBy", "name email campus")
    .sort("-createdAt");
  res.status(200).json({ success: true, data: items });
});

export const updateGalleryItem = asyncHandler(async (req, res) => {
  assertValidObjectId(req.params.id, "gallery item id");

  const item = await GalleryItem.findById(req.params.id);
  if (!item) throw new ApiError(404, "Gallery item not found");

  const payload = {
    title: req.body.title ?? item.title,
    category: req.body.category ?? item.category,
    description: req.body.description ?? item.description,
  };

  if (req.body.tags) {
    payload.tags = String(req.body.tags)
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  if (req.file) {
    await deleteFromCloudinary(item.image?.publicId, "image");
    const uploaded = await uploadBufferToCloudinary(
      req.file.buffer,
      "the-best-college/gallery",
      "image",
      {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
      },
    );
    payload.image = { publicId: uploaded.public_id, url: uploaded.secure_url };
  }

  const updated = await GalleryItem.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: updated });
});

export const deleteGalleryItem = asyncHandler(async (req, res) => {
  assertValidObjectId(req.params.id, "gallery item id");

  const item = await GalleryItem.findById(req.params.id);
  if (!item) throw new ApiError(404, "Gallery item not found");

  await deleteFromCloudinary(item.image?.publicId, "image");
  await item.deleteOne();
  res.status(200).json({ success: true, message: "Gallery item deleted" });
});

export const createSemester = asyncHandler(async (req, res) => {
  const semester = await Semester.create(req.body);
  res.status(201).json({ success: true, data: semester });
});

export const listSemesters = asyncHandler(async (req, res) => {
  const semesters = await Semester.find().sort("number");
  res.status(200).json({ success: true, data: semesters });
});

export const createAnnualYear = asyncHandler(async (req, res) => {
  const annualYear = await AnnualYear.create(req.body);
  res.status(201).json({ success: true, data: annualYear });
});

export const listAnnualYears = asyncHandler(async (req, res) => {
  const annualYears = await AnnualYear.find().sort("number");
  res.status(200).json({ success: true, data: annualYears });
});

export const createCourseSemesterMapping = asyncHandler(async (req, res) => {
  const mapping = await CourseSemesterMapping.create(req.body);
  res.status(201).json({ success: true, data: mapping });
});

export const listCourseSemesterMappings = asyncHandler(async (req, res) => {
  const mappings = await CourseSemesterMapping.find()
    .populate("course", "title code")
    .populate("semester", "semesterId number title")
    .sort("order");

  res.status(200).json({ success: true, data: mappings });
});

export const createAnnualYearMapping = asyncHandler(async (req, res) => {
  const mapping = await AnnualYearMapping.create(req.body);
  res.status(201).json({ success: true, data: mapping });
});

export const listAnnualYearMappings = asyncHandler(async (req, res) => {
  const mappings = await AnnualYearMapping.find()
    .populate("course", "title code")
    .populate("annualYear", "annualYearId number title")
    .sort("order");

  res.status(200).json({ success: true, data: mappings });
});

export const createClassSubject = asyncHandler(async (req, res) => {
  const classSubject = await ClassSubject.create(req.body);
  res.status(201).json({ success: true, data: classSubject });
});

export const listClassSubjects = asyncHandler(async (req, res) => {
  const classSubjects = await ClassSubject.find()
    .populate("classRoom", "name section classCode")
    .populate("subject", "name code")
    .populate("faculty", "name portalId role")
    .sort("-createdAt");

  res.status(200).json({ success: true, data: classSubjects });
});

export const createStudentEnrollment = asyncHandler(async (req, res) => {
  const enrollment = await StudentEnrollment.create(req.body);
  res.status(201).json({ success: true, data: enrollment });
});

export const listStudentEnrollments = asyncHandler(async (req, res) => {
  const enrollments = await StudentEnrollment.find()
    .populate("student", "name portalId email role cgpa")
    .populate("classRoom", "name section classCode")
    .populate("course", "title code examSystem")
    .populate("semester", "semesterId number title")
    .populate("annualYear", "annualYearId number title")
    .sort("-createdAt");

  res.status(200).json({ success: true, data: enrollments });
});

export const createResultCalculationLog = asyncHandler(async (req, res) => {
  const log = await ResultCalculationLog.create(req.body);
  res.status(201).json({ success: true, data: log });
});

export const listResultCalculationLogs = asyncHandler(async (req, res) => {
  const logs = await ResultCalculationLog.find()
    .populate("student", "name portalId email")
    .populate("enrollment")
    .populate("semester", "semesterId number title")
    .populate("annualYear", "annualYearId number title")
    .populate("triggeredBy", "name portalId role")
    .sort("-createdAt");

  res.status(200).json({ success: true, data: logs });
});
