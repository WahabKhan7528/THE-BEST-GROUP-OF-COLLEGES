import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { assignmentSchema } from "../../schemas/assignmentSchema";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { useConfirm } from "../../context/ConfirmContext";
import PortalForm from "../../components/portal-shared/PortalForm";
import {
  Save,
  Database,
  AlignLeft,
  Calendar,
  FileText,
  Trash2,
} from "lucide-react";
import PublicButton from "../../components/shared/PublicButton";
import { portalApi } from "../../services/api";
import SkeletonLoading from "../../components/shared/SkeletonLoading";

const EditAssignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const confirmDialog = useConfirm();

  const [loading, setLoading] = useState(true);
  const [attachmentName, setAttachmentName] = useState("");
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [classes, setClasses] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      classSection: "",
      subject: "",
      title: "",
      description: "",
      dueDate: "",
      maxMarks: "",
    },
  });

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const { data } = await portalApi.classes();
        setClasses(data.data || []);
      } catch {
        setClasses([]);
      }
    };

    const loadAssignment = async () => {
      try {
        const { data } = await portalApi.assignments();
        const assignment = (data.data || []).find((item) => item._id === id);

        if (assignment) {
          reset({
            classSection:
              assignment.classRoom?._id || assignment.classRoom || "",
            subject: assignment.subject?._id || assignment.subject || "",
            title: assignment.title || "",
            description: assignment.description || "",
            dueDate: assignment.dueDate
              ? String(assignment.dueDate).slice(0, 10)
              : "",
            maxMarks: String(assignment.maxMarks ?? ""),
          });
          setAttachmentName(
            assignment.attachment?.url ? "Existing Attachment" : "",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadClasses();
    loadAssignment();
  }, [id, reset]);

  const selectedClassId = watch("classSection");
  const selectedSubjectId = watch("subject");

  const isSelectableSemester = (entry) => {
    if (!entry) return false;
    return (
      entry.status !== "locked" &&
      entry.status !== "completed" &&
      !entry.resultPublished
    );
  };

  const subjectOptions = useMemo(() => {
    const selectedClass = classes.find((item) => item._id === selectedClassId);
    if (!selectedClass) {
      return [];
    }

    const semesterAssignments = (selectedClass.semesterSubjects || [])
      .filter(isSelectableSemester)
      .flatMap((entry) => {
        const assignments =
          Array.isArray(entry.subjectAssignments) &&
          entry.subjectAssignments.length > 0
            ? entry.subjectAssignments
            : (entry.subjects || []).map((subject) => ({ subject }));

        return assignments
          .map((assignment) => assignment.subject)
          .filter(Boolean);
      });

    const hasSemesterSetup =
      Array.isArray(selectedClass.semesterSubjects) &&
      selectedClass.semesterSubjects.length > 0;
    const subjects =
      semesterAssignments.length > 0
        ? semesterAssignments
        : hasSemesterSetup
          ? []
          : selectedClass.subjects || [];

    return subjects.map((subject) => ({
      id: subject._id,
      label: `${subject.name || "Subject"}${subject.code ? ` (${subject.code})` : ""}`,
    }));
  }, [classes, selectedClassId]);

  useEffect(() => {
    if (subjectOptions.length === 0) {
      return;
    }

    if (
      !selectedSubjectId ||
      !subjectOptions.some((subject) => subject.id === selectedSubjectId)
    ) {
      setValue("subject", subjectOptions[0].id);
    }
  }, [selectedSubjectId, subjectOptions, setValue]);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    setAttachmentName(file ? file.name : "");
    setAssignmentFile(file || null);
  };

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("classSection", values.classSection);
      formData.append("subject", values.subject);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("dueDate", values.dueDate);
      formData.append("maxMarks", values.maxMarks);

      if (assignmentFile) {
        formData.append("attachment", assignmentFile);
      }

      await portalApi.updateAssignment(id, formData);
      toast.success(`Assignment ${id} updated successfully`);
      navigate("/faculty/assignments");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update assignment",
      );
    }
  };

  const handleDelete = async () => {
    try {
      const confirmed = await confirmDialog({
        title: "Delete Assignment",
        message: "Are you sure you want to delete this assignment?",
        confirmText: "Delete",
        variant: "danger",
      });
      if (confirmed) {
        await portalApi.deleteAssignment(id);
        toast.success(`Assignment ${id} deleted successfully`);
        navigate("/faculty/assignments");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete assignment",
      );
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8 space-y-8 animate-pulse">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-college-gold/10 pb-8">
          <div className="space-y-3">
            <SkeletonLoading variant="textLine" className="h-4 w-24" />
            <SkeletonLoading variant="textLine" className="h-10 w-64" />
            <SkeletonLoading variant="textLine" className="h-5 w-48" />
          </div>
          <div className="flex gap-3">
            <SkeletonLoading
              variant="textLine"
              className="h-10 w-24 rounded-sm"
            />
            <SkeletonLoading
              variant="textLine"
              className="h-10 w-32 rounded-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <SkeletonLoading variant="panel" className="h-64" />
            <SkeletonLoading variant="panel" className="h-48" />
          </div>
          <div className="space-y-6">
            <SkeletonLoading variant="panel" className="h-[400px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <PortalForm
      title="Edit Assignment"
      subtitle="Update assignment details for your students"
      backPath="/faculty/assignments"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => navigate("/faculty/assignments")}
      submitLabel="Save Changes"
      submitIcon={Save}
      submitting={isSubmitting}
      headerActions={
        <PublicButton
          onClick={handleDelete}
          variant="danger"
          size="sm"
          icon={Trash2}
          type="button"
          className="px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-1.5 min-w-0 h-8 sm:h-auto"
          style={{ lineHeight: 1.1 }}
        >
          <span className="hidden min-[480px]:inline">Delete</span>
        </PublicButton>
      }
    >
      <PortalForm.Section
        title="Assignment Basic Info"
        icon={
          <Database
            size={20}
            className="text-college-navy dark:text-college-gold"
          />
        }
      >
        <PortalForm.Select
          label="Class / Section"
          registration={register("classSection")}
          error={errors.classSection?.message}
          required
          options={classes.map((c) => ({
            id: c._id,
            label: `${c.name} - ${c.section}`,
          }))}
          placeholder="Select a class"
        />
        <PortalForm.Select
          label="Subject"
          registration={register("subject")}
          error={errors.subject?.message}
          required
          disabled={subjectOptions.length === 0}
          options={subjectOptions}
          placeholder={
            subjectOptions.length > 0
              ? "Select a subject"
              : "Select a class first"
          }
        />
        <div className="md:col-span-2">
          <PortalForm.Input
            label="Assignment Title"
            registration={register("title")}
            error={errors.title?.message}
            placeholder="e.g. CPU Scheduling Algorithm Report"
            required
          />
        </div>
      </PortalForm.Section>

      <PortalForm.Section
        title="Instructions & Content"
        icon={
          <AlignLeft
            size={20}
            className="text-college-navy dark:text-college-gold"
          />
        }
      >
        <div className="md:col-span-2">
          <PortalForm.Input
            label="Description & Instructions"
            type="textarea"
            registration={register("description")}
            error={errors.description?.message}
            placeholder="Detailed instructions for the assignment..."
            required
          />
        </div>
      </PortalForm.Section>

      <PortalForm.Section
        title="Deadlines & Attachments"
        icon={
          <Calendar
            size={20}
            className="text-college-navy dark:text-college-gold"
          />
        }
      >
        <div>
          <PortalForm.Input
            label="Due Date"
            type="date"
            registration={register("dueDate")}
            error={errors.dueDate?.message}
            required
          />
        </div>
        <div>
          <PortalForm.Input
            label="Maximum Marks"
            type="number"
            registration={register("maxMarks")}
            error={errors.maxMarks?.message}
            placeholder="20"
            required
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] block px-0.5">
            Attachment (Optional)
          </label>
          <div className="relative group">
            <input
              type="file"
              onChange={handleFile}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="w-full px-4 py-3 rounded-sm border border-dashed border-gray-300 dark:border-college-gold/40 bg-gray-50 dark:bg-college-navy/50 text-gray-500 dark:text-gray-400 group-hover:bg-college-navy/5 dark:group-hover:bg-college-gold/10 group-hover:border-college-navy dark:group-hover:border-college-gold transition-all flex items-center gap-2 truncate">
              <FileText
                size={18}
                className="text-college-navy dark:text-college-gold/60"
              />
              <span className="truncate group-hover:text-college-navy dark:group-hover:text-college-gold transition-colors">
                {attachmentName || "Choose file..."}
              </span>
            </div>
          </div>
        </div>
      </PortalForm.Section>
    </PortalForm>
  );
};

export default EditAssignment;
