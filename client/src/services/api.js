import http from "./http";

export const authApi = {
  login: (payload) => http.post("/auth/login", payload),
  me: () => http.get("/auth/me"),
  logout: () => http.post("/auth/logout"),
};

export const publicApi = {
  campuses: (params) => http.get("/public/campuses", { params }),
  courses: (params) => http.get("/public/courses", { params }),
  faculty: (params) => http.get("/public/faculty", { params }),
  newsEvents: (params) => http.get("/public/news-events", { params }),
  gallery: (params) => http.get("/public/gallery", { params }),
};

export const adminApi = {
  createCampus: (payload) => http.post("/admin/campuses", payload),
  campuses: () => http.get("/admin/campuses"),
  updateCampus: (id, payload) => http.put(`/admin/campuses/${id}`, payload),
  deleteCampus: (id) => http.delete(`/admin/campuses/${id}`),

  createUser: (payload) => http.post("/admin/users", payload),
  users: (params) => http.get("/admin/users", { params }),
  updateUser: (id, payload) => http.put(`/admin/users/${id}`, payload),
  deactivateUser: (id) => http.delete(`/admin/users/${id}`),

  createCourse: (payload) => http.post("/admin/courses", payload),
  courses: () => http.get("/admin/courses"),
  updateCourse: (id, payload) => http.put(`/admin/courses/${id}`, payload),
  deleteCourse: (id) => http.delete(`/admin/courses/${id}`),

  createClass: (payload) => http.post("/admin/classes", payload),
  classes: () => http.get("/admin/classes"),
  updateClass: (id, payload) => http.put(`/admin/classes/${id}`, payload),
  deleteClass: (id) => http.delete(`/admin/classes/${id}`),

  createSubject: (payload) => http.post("/admin/subjects", payload),
  subjects: () => http.get("/admin/subjects"),
  updateSubject: (id, payload) => http.put(`/admin/subjects/${id}`, payload),
  deleteSubject: (id) => http.delete(`/admin/subjects/${id}`),

  createNewsEvent: (formData) =>
    http.post("/admin/news-events", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  newsEvents: (params) => http.get("/admin/news-events", { params }),
  updateNewsEvent: (id, formData) =>
    http.put(`/admin/news-events/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteNewsEvent: (id) => http.delete(`/admin/news-events/${id}`),

  galleryItems: (params) => http.get("/admin/gallery", { params }),
  uploadGalleryItem: (formData) =>
    http.post("/admin/gallery", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  updateGalleryItem: (id, formData) =>
    http.put(`/admin/gallery/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteGalleryItem: (id) => http.delete(`/admin/gallery/${id}`),
};

export const portalApi = {
  announcements: () => http.get("/portal/announcements"),
  createAnnouncement: (formData) =>
    http.post("/portal/announcements", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteAnnouncement: (id) => http.delete(`/portal/announcements/${id}`),
  createAssignment: (formData) =>
    http.post("/portal/assignments", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  updateAssignment: (id, formData) =>
    http.put(`/portal/assignments/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteAssignment: (id) => http.delete(`/portal/assignments/${id}`),
  assignments: () => http.get("/portal/assignments"),
  submitAssignment: (formData) =>
    http.post("/portal/submissions", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  submissionsByAssignment: (assignmentId) =>
    http.get(`/portal/submissions/assignment/${assignmentId}`),
  mySubmissions: () => http.get("/portal/submissions"),
  gradeSubmission: (id, payload) => http.put(`/portal/submissions/${id}/grade`, payload),
  createMaterial: (formData) =>
    http.post("/portal/materials", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  updateMaterial: (id, formData) =>
    http.put(`/portal/materials/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteMaterial: (id) => http.delete(`/portal/materials/${id}`),
  materials: () => http.get("/portal/materials"),
  publishResult: (payload) => http.post("/portal/results", payload),
  results: (params) => http.get("/portal/results", { params }),
  facultySubjects: () => http.get("/portal/faculty/subjects"),
  classes: () => http.get("/portal/classes"),
};
