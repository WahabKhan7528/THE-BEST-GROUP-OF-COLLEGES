import mongoose from "mongoose";
import Announcement from "../models/Announcement.js";
import Assignment from "../models/Assignment.js";
import ClassRoom from "../models/ClassRoom.js";
import Material from "../models/Material.js";
import Result from "../models/Result.js";
import Submission from "../models/Submission.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { buildGeneratedId } from "../utils/generatedId.js";
import {
  deleteFromCloudinary,
  uploadBufferToCloudinary,
} from "../utils/cloudinary.js";

const getIdValue = (value) => {
  const rawValue = value?._id || value?.id || value;
  return rawValue ? String(rawValue) : null;
};

const isLockedSemester = (term) =>
  Boolean(
    term?.status === "completed" ||
    term?.status === "locked" ||
    term?.resultPublished,
  );

const getSemesterLabel = (term) => {
  if (!term) return "Term";
  if (term.semesterNumber) return `Term ${term.semesterNumber}`;
  return term.annualYear || "Term";
};

const isValidObjectId = (value) => mongoose.isValidObjectId(value);

const assertValidObjectId = (value, fieldName) => {
  if (!isValidObjectId(value)) {
    throw new ApiError(400, `Invalid ${fieldName}`);
  }
};

const cleanupUploadedAsset = async (asset) => {
  if (!asset?.publicId) return;
  await deleteFromCloudinary(asset.publicId, asset.resourceType || "auto");
};

const getClassFacultyIds = (classRoom) => {
  const facultyIds = new Set();
  (Array.isArray(classRoom?.faculty) ? classRoom.faculty : []).forEach(
    (item) => {
      const facultyId = getIdValue(item);
      if (facultyId) facultyIds.add(facultyId);
    },
  );

  (Array.isArray(classRoom?.semesterSubjects)
    ? classRoom.semesterSubjects
    : []
  ).forEach((term) => {
    (Array.isArray(term?.faculty) ? term.faculty : []).forEach((item) => {
      const facultyId = getIdValue(item);
      if (facultyId) facultyIds.add(facultyId);
    });

    (Array.isArray(term?.subjectAssignments)
      ? term.subjectAssignments
      : []
    ).forEach((assignment) => {
      const facultyId = getIdValue(assignment?.faculty);
      if (facultyId) facultyIds.add(facultyId);
    });
  });

  return facultyIds;
};

const facultyCanManageClass = (classRoom, facultyId) => {
  if (!classRoom || !facultyId) return false;
  return getClassFacultyIds(classRoom).has(String(facultyId));
};

const facultyCanManageSubject = (classRoom, subjectId, facultyId) => {
  if (!classRoom || !facultyId || !subjectId) return false;

  const normalizedFacultyId = String(facultyId);
  const normalizedSubjectId = String(subjectId);

  if (
    Array.isArray(classRoom.subjects) &&
    classRoom.subjects.some(
      (subject) => String(subject?._id || subject) === normalizedSubjectId,
    )
  ) {
    if (facultyCanManageClass(classRoom, normalizedFacultyId)) {
      return true;
    }
  }

  return (
    Array.isArray(classRoom.semesterSubjects) ? classRoom.semesterSubjects : []
  ).some(
    (term) =>
      Array.isArray(term?.subjectAssignments) &&
      term.subjectAssignments.some(
        (assignment) =>
          String(assignment?.subject?._id || assignment?.subject) ===
            normalizedSubjectId &&
          String(assignment?.faculty?._id || assignment?.faculty) ===
            normalizedFacultyId,
      ),
  );
};

const classHasSubject = (classRoom, subjectId) => {
  if (!classRoom || !subjectId) return false;
  const normalizedSubjectId = String(subjectId);

  if (
    Array.isArray(classRoom.subjects) &&
    classRoom.subjects.some(
      (subject) => String(subject?._id || subject) === normalizedSubjectId,
    )
  ) {
    return true;
  }

  return (
    Array.isArray(classRoom.semesterSubjects) ? classRoom.semesterSubjects : []
  ).some((term) => {
    const termSubjects = Array.isArray(term?.subjects) ? term.subjects : [];
    const assignmentSubjects = Array.isArray(term?.subjectAssignments)
      ? term.subjectAssignments.map((assignment) => assignment?.subject)
      : [];

    return [...termSubjects, ...assignmentSubjects].some(
      (subject) => String(subject?._id || subject) === normalizedSubjectId,
    );
  });
};

const ensureFacultyClassAccess = async (classRoomId, facultyId) => {
  assertValidObjectId(classRoomId, "classRoom");
  const classRoom = await ClassRoom.findById(classRoomId)
    .select("faculty semesterSubjects subjects")
    .populate("faculty", "_id")
    .populate("semesterSubjects.faculty", "_id")
    .populate("semesterSubjects.subjectAssignments.faculty", "_id")
    .populate("subjects", "_id");

  if (!classRoom) {
    throw new ApiError(404, "Class not found");
  }

  if (!facultyCanManageClass(classRoom, facultyId)) {
    throw new ApiError(403, "You are not authorized for this class");
  }

  return classRoom;
};

const ensureFacultyClassSubjectAccess = async (
  classRoomId,
  subjectId,
  facultyId,
) => {
  const classRoom = await ensureFacultyClassAccess(classRoomId, facultyId);
  assertValidObjectId(subjectId, "subject");

  if (!facultyCanManageSubject(classRoom, subjectId, facultyId)) {
    throw new ApiError(403, "You are not authorized for this subject");
  }

  return classRoom;
};

const getStudentClassIds = async (user) => {
  const currentClassRoomId = getIdValue(user?.currentClassRoom);
  const classFilter = currentClassRoomId
    ? { $or: [{ students: user._id }, { _id: currentClassRoomId }] }
    : { students: user._id };

  const classes = await ClassRoom.find(classFilter).select("_id");
  return [...new Set(classes.map((item) => String(item._id)))];
};

const normalizeFacultySubjects = (classes, facultyId) => {
  const uniqueItems = new Map();

  classes.forEach((classRoom) => {
    const classRoomId = getIdValue(classRoom);
    if (!classRoomId) return;

    const classInfo = {
      _id: classRoomId,
      id: classRoom?.id || classRoomId,
      name: classRoom?.name || "Class",
      section: classRoom?.section || "A",
      semester: classRoom?.semester || null,
      annualYear: classRoom?.annualYear || null,
      course: classRoom?.course || null,
      campus: classRoom?.campus || null,
    };

    const semesterSubjects = Array.isArray(classRoom?.semesterSubjects)
      ? classRoom.semesterSubjects
      : [];

    semesterSubjects.forEach((term) => {
      const isOld = isLockedSemester(term);
      const termInfo = {
        semesterNumber: term?.semesterNumber || null,
        status: term?.status || "planned",
        resultPublished: Boolean(term?.resultPublished),
        lockedAt: term?.lockedAt || null,
        completedAt: term?.completedAt || null,
        label: getSemesterLabel(term),
      };

      const hasSpecificAssignments =
        Array.isArray(term?.subjectAssignments) &&
        term.subjectAssignments.length > 0;
      const assignments = hasSpecificAssignments
        ? term.subjectAssignments
        : (term?.subjects || []).map((subject) => ({ subject }));

      if (hasSpecificAssignments) {
        assignments.forEach((assignment) => {
          const assignedFacultyId = getIdValue(assignment?.faculty);
          if (facultyId && assignedFacultyId && assignedFacultyId !== facultyId)
            return;
          if (facultyId && !assignedFacultyId) return;

          const subject = assignment?.subject;
          const subjectId = getIdValue(subject);
          if (!subjectId) return;

          const key = [
            classRoomId,
            termInfo.semesterNumber || termInfo.label,
            subjectId,
          ].join("::");
          uniqueItems.set(key, {
            id: key,
            classRoom: classInfo,
            term: termInfo,
            subject: {
              _id: subjectId,
              name: subject?.name || "Subject",
              code: subject?.code || "",
              creditHours: subject?.creditHours || null,
            },
            faculty: assignment?.faculty || null,
            locked: isOld,
            canEdit: !isOld,
          });
        });
        return;
      }

      const classFacultyIds = (classRoom?.faculty || [])
        .map((item) => getIdValue(item))
        .filter(Boolean);
      if (
        facultyId &&
        classFacultyIds.length > 0 &&
        !classFacultyIds.includes(facultyId)
      ) {
        return;
      }

      assignments.forEach((assignment) => {
        const subject = assignment?.subject;
        const subjectId = getIdValue(subject);
        if (!subjectId) return;

        const key = [
          classRoomId,
          termInfo.semesterNumber || termInfo.label,
          subjectId,
        ].join("::");
        uniqueItems.set(key, {
          id: key,
          classRoom: classInfo,
          term: termInfo,
          subject: {
            _id: subjectId,
            name: subject?.name || "Subject",
            code: subject?.code || "",
            creditHours: subject?.creditHours || null,
          },
          faculty: null,
          locked: isOld,
          canEdit: !isOld,
        });
      });
    });

    if (semesterSubjects.length === 0) {
      const classFacultyIds = (classRoom?.faculty || [])
        .map((item) => getIdValue(item))
        .filter(Boolean);
      if (
        facultyId &&
        classFacultyIds.length > 0 &&
        !classFacultyIds.includes(facultyId)
      ) {
        return;
      }

      (classRoom?.subjects || []).forEach((subject) => {
        const subjectId = getIdValue(subject);
        if (!subjectId) return;

        const key = [classRoomId, "open", subjectId].join("::");
        uniqueItems.set(key, {
          id: key,
          classRoom: classInfo,
          term: {
            semesterNumber: null,
            status: "active",
            resultPublished: false,
            label: "Open term",
          },
          subject: {
            _id: subjectId,
            name: subject?.name || "Subject",
            code: subject?.code || "",
            creditHours: subject?.creditHours || null,
          },
          faculty: null,
          locked: false,
          canEdit: true,
        });
      });
    }
  });

  return Array.from(uniqueItems.values());
};

export const createAnnouncement = asyncHandler(async (req, res) => {
  const payload = {
    title: req.body.title,
    description: req.body.description,
    targetClasses: req.body.classes || req.body.targetClasses || [],
    createdBy: req.user._id,
  };

  if (req.user.role === "faculty") {
    const targetClassIds = Array.isArray(payload.targetClasses)
      ? payload.targetClasses
      : [];
    if (targetClassIds.length === 0) {
      throw new ApiError(400, "At least one target class is required");
    }

    for (const classRoomId of targetClassIds) {
      await ensureFacultyClassAccess(classRoomId, req.user._id);
    }
  }

  if (req.file) {
    const uploaded = await uploadBufferToCloudinary(
      req.file.buffer,
      "the-best-college/announcements",
      "auto",
      {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
      },
    );
    payload.attachment = {
      publicId: uploaded.public_id,
      url: uploaded.secure_url,
      resourceType: uploaded.resource_type,
    };
  }

  try {
    const item = await Announcement.create(payload);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    await cleanupUploadedAsset(payload.attachment);
    throw error;
  }
});

export const deleteAnnouncement = asyncHandler(async (req, res) => {
  const item = await Announcement.findById(req.params.id);
  if (!item) throw new ApiError(404, "Announcement not found");

  if (
    req.user.role === "faculty" &&
    String(item.createdBy) !== String(req.user._id)
  ) {
    throw new ApiError(403, "You can only delete your own announcements");
  }

  await deleteFromCloudinary(
    item.attachment?.publicId,
    item.attachment?.resourceType || "auto",
  );
  await item.deleteOne();
  res.status(200).json({ success: true, message: "Announcement deleted" });
});

export const listAnnouncements = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.user.role === "student") {
    const classIds = await getStudentClassIds(req.user);
    filter.targetClasses = { $in: classIds };
  }

  const items = await Announcement.find(filter)
    .populate("createdBy", "name portalId role")
    .populate("targetClasses", "name section")
    .sort("-createdAt");

  res.status(200).json({ success: true, data: items });
});

export const createAssignment = asyncHandler(async (req, res) => {
  const payload = {
    classRoom: req.body.classRoom || req.body.classSection,
    subject: req.body.subject,
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    maxMarks: req.body.maxMarks,
    createdBy: req.user._id,
  };

  if (req.user.role === "faculty") {
    await ensureFacultyClassSubjectAccess(
      payload.classRoom,
      payload.subject,
      req.user._id,
    );
  }

  if (req.file) {
    const uploaded = await uploadBufferToCloudinary(
      req.file.buffer,
      "the-best-college/assignments",
      "auto",
      {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
      },
    );
    payload.attachment = {
      publicId: uploaded.public_id,
      url: uploaded.secure_url,
      resourceType: uploaded.resource_type,
    };
  }

  try {
    const assignment = await Assignment.create(payload);
    res.status(201).json({ success: true, data: assignment });
  } catch (error) {
    await cleanupUploadedAsset(payload.attachment);
    throw error;
  }
});

export const listAssignments = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.user.role === "faculty") {
    filter.createdBy = req.user._id;
  }

  if (req.user.role === "student") {
    const classIds = await getStudentClassIds(req.user);
    filter.classRoom = { $in: classIds };
  }

  const items = await Assignment.find(filter)
    .populate("classRoom", "name section")
    .populate("subject", "name code")
    .populate("createdBy", "name portalId")
    .sort("-createdAt");

  res.status(200).json({ success: true, data: items });
});

export const updateAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  if (!assignment) throw new ApiError(404, "Assignment not found");

  if (
    req.user.role === "faculty" &&
    String(assignment.createdBy) !== String(req.user._id)
  ) {
    throw new ApiError(403, "You can only edit your own assignments");
  }

  const nextClassRoomId =
    req.body.classRoom || req.body.classSection || assignment.classRoom;
  const nextSubjectId = req.body.subject || assignment.subject;

  if (req.user.role === "faculty") {
    await ensureFacultyClassSubjectAccess(
      nextClassRoomId,
      nextSubjectId,
      req.user._id,
    );
  }

  const payload = { ...req.body };

  if (req.file) {
    const uploaded = await uploadBufferToCloudinary(
      req.file.buffer,
      "the-best-college/assignments",
      "auto",
      {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
      },
    );
    payload.attachment = {
      publicId: uploaded.public_id,
      url: uploaded.secure_url,
      resourceType: uploaded.resource_type,
    };

    try {
      const updated = await Assignment.findByIdAndUpdate(
        req.params.id,
        payload,
        { new: true, runValidators: true },
      );
      await deleteFromCloudinary(
        assignment.attachment?.publicId,
        assignment.attachment?.resourceType || "auto",
      );
      res.status(200).json({ success: true, data: updated });
      return;
    } catch (error) {
      await cleanupUploadedAsset(payload.attachment);
      throw error;
    }
  }

  const updated = await Assignment.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: updated });
});

export const deleteAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  if (!assignment) throw new ApiError(404, "Assignment not found");

  if (
    req.user.role === "faculty" &&
    String(assignment.createdBy) !== String(req.user._id)
  ) {
    throw new ApiError(403, "You can only delete your own assignments");
  }

  await deleteFromCloudinary(
    assignment.attachment?.publicId,
    assignment.attachment?.resourceType || "auto",
  );
  await assignment.deleteOne();
  res.status(200).json({ success: true, message: "Assignment deleted" });
});

export const createMaterial = asyncHandler(async (req, res) => {
  const payload = {
    classRoom: req.body.classRoom || req.body.classSection,
    subject: req.body.subject,
    title: req.body.title,
    type: String(req.body.type || "other").toLowerCase(),
    link: req.body.link,
    uploadedBy: req.user._id,
  };

  if (req.user.role === "faculty") {
    await ensureFacultyClassSubjectAccess(
      payload.classRoom,
      payload.subject,
      req.user._id,
    );
  }

  if (req.file) {
    const uploaded = await uploadBufferToCloudinary(
      req.file.buffer,
      "the-best-college/materials",
      "auto",
      {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
      },
    );
    payload.file = {
      publicId: uploaded.public_id,
      url: uploaded.secure_url,
      resourceType: uploaded.resource_type,
    };
  }

  try {
    const material = await Material.create(payload);
    res.status(201).json({ success: true, data: material });
  } catch (error) {
    await cleanupUploadedAsset(payload.file);
    throw error;
  }
});

export const listMaterials = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.user.role === "faculty") {
    filter.uploadedBy = req.user._id;
  }

  if (req.user.role === "student") {
    const classIds = await getStudentClassIds(req.user);
    filter.classRoom = { $in: classIds };
  }

  const materials = await Material.find(filter)
    .populate("classRoom", "name section")
    .populate("subject", "name code")
    .populate("uploadedBy", "name portalId")
    .sort("-createdAt");

  res.status(200).json({ success: true, data: materials });
});

export const updateMaterial = asyncHandler(async (req, res) => {
  const material = await Material.findById(req.params.id);
  if (!material) throw new ApiError(404, "Material not found");

  if (
    req.user.role === "faculty" &&
    String(material.uploadedBy) !== String(req.user._id)
  ) {
    throw new ApiError(403, "You can only edit your own materials");
  }

  const nextClassRoomId =
    req.body.classRoom || req.body.classSection || material.classRoom;
  const nextSubjectId = req.body.subject || material.subject;

  if (req.user.role === "faculty") {
    await ensureFacultyClassSubjectAccess(
      nextClassRoomId,
      nextSubjectId,
      req.user._id,
    );
  }

  const payload = {
    ...req.body,
    type: req.body.type ? String(req.body.type).toLowerCase() : req.body.type,
  };

  if (req.file) {
    const uploaded = await uploadBufferToCloudinary(
      req.file.buffer,
      "the-best-college/materials",
      "auto",
      {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
      },
    );
    payload.file = {
      publicId: uploaded.public_id,
      url: uploaded.secure_url,
      resourceType: uploaded.resource_type,
    };

    try {
      const updated = await Material.findByIdAndUpdate(req.params.id, payload, {
        new: true,
        runValidators: true,
      });
      await deleteFromCloudinary(
        material.file?.publicId,
        material.file?.resourceType || "auto",
      );
      res.status(200).json({ success: true, data: updated });
      return;
    } catch (error) {
      await cleanupUploadedAsset(payload.file);
      throw error;
    }
  }

  const updated = await Material.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: updated });
});

export const deleteMaterial = asyncHandler(async (req, res) => {
  const material = await Material.findById(req.params.id);
  if (!material) throw new ApiError(404, "Material not found");

  if (
    req.user.role === "faculty" &&
    String(material.uploadedBy) !== String(req.user._id)
  ) {
    throw new ApiError(403, "You can only delete your own materials");
  }

  await deleteFromCloudinary(
    material.file?.publicId,
    material.file?.resourceType || "auto",
  );
  await material.deleteOne();
  res.status(200).json({ success: true, message: "Material deleted" });
});

export const submitAssignment = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, "Submission file is required");

  const assignment = await Assignment.findById(
    req.body.assignmentId || req.params.assignmentId,
  );
  if (!assignment) throw new ApiError(404, "Assignment not found");

  const studentClassIds = await getStudentClassIds(req.user);
  if (!studentClassIds.includes(String(assignment.classRoom))) {
    throw new ApiError(
      403,
      "You are not authorized to submit for this assignment",
    );
  }

  const existingSubmission = await Submission.findOne({
    assignment: assignment._id,
    student: req.user._id,
  });

  const uploaded = await uploadBufferToCloudinary(
    req.file.buffer,
    "the-best-college/submissions",
    "auto",
    {
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
    },
  );

  const isLate = new Date() > new Date(assignment.dueDate);

  try {
    const submission = await Submission.findOneAndUpdate(
      { assignment: assignment._id, student: req.user._id },
      {
        assignment: assignment._id,
        student: req.user._id,
        file: {
          publicId: uploaded.public_id,
          url: uploaded.secure_url,
          resourceType: uploaded.resource_type,
        },
        submittedAt: new Date(),
        status: isLate ? "late" : "on_time",
      },
      { upsert: true, new: true, runValidators: true },
    );

    await deleteFromCloudinary(
      existingSubmission?.file?.publicId,
      existingSubmission?.file?.resourceType || "auto",
    );
    res.status(201).json({ success: true, data: submission });
  } catch (error) {
    await cleanupUploadedAsset({
      publicId: uploaded.public_id,
      resourceType: uploaded.resource_type,
    });
    throw error;
  }
});

export const listSubmissions = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.user.role === "student") {
    filter.student = req.user._id;
  }

  if (req.user.role === "faculty") {
    const classes = await ClassRoom.find({
      $or: [
        { faculty: req.user._id },
        { "semesterSubjects.subjectAssignments.faculty": req.user._id },
      ],
    }).select("_id faculty subjects semesterSubjects");

    const classesById = new Map(
      classes.map((classRoom) => [String(classRoom._id), classRoom]),
    );

    const classIds = classes.map((classRoom) => classRoom._id);
    const assignmentFilter = { classRoom: { $in: classIds } };

    if (req.params.assignmentId) {
      assignmentFilter._id = req.params.assignmentId;
    }

    const assignments =
      classIds.length > 0
        ? await Assignment.find(assignmentFilter).select("_id classRoom subject")
        : [];

    const allowedAssignments = assignments.filter((assignment) => {
      const classRoom = classesById.get(String(assignment.classRoom));
      if (!classRoom) return false;
      return facultyCanManageSubject(classRoom, assignment.subject, req.user._id);
    });

    if (req.params.assignmentId && allowedAssignments.length === 0) {
      throw new ApiError(
        403,
        "You are not authorized to view submissions for this assignment",
      );
    }

    filter.assignment = { $in: allowedAssignments.map((item) => item._id) };
  }

  if (req.params.assignmentId && req.user.role !== "faculty") {
    filter.assignment = req.params.assignmentId;
  }

  const submissions = await Submission.find(filter)
    .populate("assignment", "title dueDate maxMarks")
    .populate("student", "name portalId")
    .populate("gradedBy", "name portalId")
    .sort("-updatedAt");

  res.status(200).json({ success: true, data: submissions });
});

export const gradeSubmission = asyncHandler(async (req, res) => {
  assertValidObjectId(req.params.id, "submission id");

  const submission = await Submission.findById(req.params.id).populate(
    "assignment",
    "maxMarks classRoom subject",
  );
  if (!submission) throw new ApiError(404, "Submission not found");

  if (req.user.role === "faculty") {
    await ensureFacultyClassSubjectAccess(
      submission.assignment.classRoom,
      submission.assignment.subject,
      req.user._id,
    );
  }

  const marks = Number(req.body.marks);
  if (
    Number.isNaN(marks) ||
    marks < 0 ||
    marks > submission.assignment.maxMarks
  ) {
    throw new ApiError(
      400,
      `Marks must be between 0 and ${submission.assignment.maxMarks}`,
    );
  }

  const updated = await Submission.findByIdAndUpdate(
    submission._id,
    {
      $set: {
        marks,
        remarks: req.body.remarks || submission.remarks,
        gradedBy: req.user._id,
      },
    },
    { new: true },
  )
    .populate("assignment", "maxMarks")
    .populate("student", "name portalId")
    .populate("gradedBy", "name portalId");

  res.status(200).json({ success: true, data: updated });
});

export const publishResult = asyncHandler(async (req, res) => {
  const payload = {
    student: String(req.body.student || "").trim(),
    classRoom: String(req.body.classRoom || "").trim(),
    subject: String(req.body.subject || "").trim(),
    semester: String(req.body.semester || "").trim(),
    marksObtained: req.body.marksObtained,
    totalMarks: req.body.totalMarks,
    grade: req.body.grade,
    remarks: req.body.remarks,
    publishedBy: req.user._id,
  };

  if (
    !payload.student ||
    !payload.classRoom ||
    !payload.subject ||
    !payload.semester
  ) {
    throw new ApiError(
      400,
      "student, classRoom, subject, and semester are required",
    );
  }

  assertValidObjectId(payload.student, "student");
  assertValidObjectId(payload.classRoom, "classRoom");
  assertValidObjectId(payload.subject, "subject");

  const student = await User.findById(payload.student).select(
    "name portalId role currentClassRoom",
  );
  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  if (student.role !== "student") {
    throw new ApiError(400, "Results can only be published for student accounts");
  }

  const classRoom = await ClassRoom.findById(payload.classRoom)
    .select("faculty semesterSubjects subjects")
    .populate("faculty", "_id")
    .populate("semesterSubjects.faculty", "_id")
    .populate("semesterSubjects.subjectAssignments.faculty", "_id")
    .populate("subjects", "_id");

  if (!classRoom) {
    throw new ApiError(404, "Class not found");
  }

  const studentClassIds = await getStudentClassIds(student);
  if (!studentClassIds.includes(String(classRoom._id))) {
    throw new ApiError(400, "Student is not enrolled in the selected class");
  }

  if (!classHasSubject(classRoom, payload.subject)) {
    throw new ApiError(400, "Subject is not assigned to the selected class");
  }

  if (
    req.user.role === "faculty" &&
    !facultyCanManageSubject(classRoom, payload.subject, req.user._id)
  ) {
    throw new ApiError(403, "You are not authorized to publish this result");
  }

  const marksObtained = Number(payload.marksObtained);
  const totalMarks = Number(payload.totalMarks);
  const gradePoint =
    Number.isFinite(marksObtained) &&
    Number.isFinite(totalMarks) &&
    totalMarks > 0
      ? Number(((marksObtained / totalMarks) * 4).toFixed(2))
      : null;
  const status = payload.grade === "F" ? "Fail" : "Pass";

  console.log("[portal/results] updating result", {
    student: student?.name || payload.student,
    rollNo: student?.portalId || "N/A",
    subject: payload.subject,
    semester: payload.semester,
    oldMarks: null,
    newMarks: payload.marksObtained,
  });

  const resultFilter = {
    student: payload.student,
    classRoom: payload.classRoom,
    subject: payload.subject,
    semester: payload.semester,
  };

  const resultUpdate = {
    $set: {
      student: payload.student,
      classRoom: payload.classRoom,
      subject: payload.subject,
      semester: payload.semester,
      annualYear: payload.annualYear || null,
      marksObtained,
      totalMarks,
      grade: payload.grade,
      gradePoint,
      status,
      remarks: payload.remarks,
      publishedBy: payload.publishedBy,
    },
    $setOnInsert: {
      id: buildGeneratedId({
        modelName: "Result",
        prefix: "RES",
        seed: `${payload.student}-${payload.classRoom}-${payload.subject}-${payload.semester}`,
      }),
    },
  };

  const result = await Result.findOneAndUpdate(resultFilter, resultUpdate, {
    upsert: true,
    new: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  });

  console.log("[portal/results] update success", {
    student: student?.name || payload.student,
    rollNo: student?.portalId || "N/A",
    marksObtained: result.marksObtained,
    totalMarks: result.totalMarks,
  });

  res.status(201).json({ success: true, data: result });
});

export const listResults = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.user.role === "student") {
    filter.student = req.user._id;
  }

  if (req.user.role === "faculty") {
    const classes = await ClassRoom.find({ faculty: req.user._id }).select(
      "_id",
    );
    filter.classRoom = { $in: classes.map((c) => c._id) };
  }

  // Students must never be able to override their own result scope via query string.
  if (req.query.student && req.user.role !== "student") {
    filter.student = req.query.student;
  }

  const results = await Result.find(filter)
    .populate("student", "name portalId")
    .populate("classRoom", "name section")
    .populate("subject", "name code")
    .populate("publishedBy", "name portalId")
    .sort("-updatedAt");

  res.status(200).json({ success: true, data: results });
});

export const listPortalClasses = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.user.role === "faculty") {
    filter.$or = [
      { faculty: req.user._id },
      { "semesterSubjects.subjectAssignments.faculty": req.user._id },
    ];
  }

  if (req.user.role === "student") {
    const currentClassRoomId = getIdValue(req.user?.currentClassRoom);
    filter.$or = currentClassRoomId
      ? [{ students: req.user._id }, { _id: currentClassRoomId }]
      : [{ students: req.user._id }];
  }

  const classes = await ClassRoom.find(filter)
    .populate("campus", "name code slug")
    .populate("course", "title code")
    .populate("subjects", "name code")
    .populate("students", "name portalId")
    .populate("faculty", "name portalId email department designation")
    .populate("semesterSubjects.subjects", "name code creditHours")
    .populate(
      "semesterSubjects.faculty",
      "name portalId email department designation",
    )
    .populate(
      "semesterSubjects.subjectAssignments.subject",
      "name code creditHours",
    )
    .populate(
      "semesterSubjects.subjectAssignments.faculty",
      "name portalId email department designation",
    )
    .sort("name");

  const classIds = classes.map((item) => item._id);
  const activeStudents = await User.find({
    role: "student",
    isActive: true,
    currentClassRoom: { $in: classIds },
  }).select("_id name portalId currentClassRoom");

  const studentsByClass = new Map();
  activeStudents.forEach((student) => {
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

  const hydratedClasses = classes.map((classRoom) => {
    const data = classRoom.toObject();
    const classId = String(classRoom._id);
    if (studentsByClass.has(classId)) {
      data.students = studentsByClass.get(classId);
    }
    return data;
  });

  res.status(200).json({ success: true, data: hydratedClasses });
});

export const listFacultySubjects = asyncHandler(async (req, res) => {
  const classes = await ClassRoom.find({
    $or: [
      { faculty: req.user._id },
      { "semesterSubjects.subjectAssignments.faculty": req.user._id },
    ],
  })
    .populate("campus", "name code slug")
    .populate("course", "title code")
    .populate("subjects", "name code creditHours")
    .populate(
      "semesterSubjects.subjectAssignments.subject",
      "name code creditHours",
    )
    .populate(
      "semesterSubjects.subjectAssignments.faculty",
      "name portalId email department designation",
    )
    .sort("name");

  const allSubjects = normalizeFacultySubjects(classes, String(req.user._id));
  const newSubjects = allSubjects.filter((item) => !item.locked);
  const oldSubjects = allSubjects.filter((item) => item.locked);

  res.status(200).json({
    success: true,
    data: {
      allSubjects,
      newSubjects,
      oldSubjects,
    },
  });
});
