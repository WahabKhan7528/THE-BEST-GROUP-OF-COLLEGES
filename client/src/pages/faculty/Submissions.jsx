import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SubmissionCard from "../../components/portal-shared/SubmissionCard";
import PortalPageHeader from "../../components/portal-shared/PortalPageHeader";
import Badge from "../../components/shared/Badge";
import { useFacultyContext } from "../../store/hooks/useFacultyReduxContext";
import { useToast } from "../../context/ToastContext";
import { ArrowLeft, CheckCircle } from "lucide-react";
import PublicButton from "../../components/shared/PublicButton";
import { portalApi } from "../../services/api";
import SkeletonLoading from "../../components/shared/SkeletonLoading";

const Submissions = () => {
  const { assignmentId } = useParams();
  const { isDarkMode } = useFacultyContext();
  const toast = useToast();
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const { data } = await portalApi.submissionsByAssignment(assignmentId);
        const mapped = (data.data || []).map((submission) => ({
          id: submission._id || submission.id,
          studentId: submission.student?.portalId,
          studentName: submission.student?.name,
          submittedAt: submission.submittedAt ? new Date(submission.submittedAt).toLocaleString() : "-",
          file: submission.file?.url,
          status: submission.status === "on_time" ? "On-time" : submission.status,
          remarks: submission.remarks,
          marks: submission.marks,
          maxMarks: submission.assignment?.maxMarks || 100,
        }));
        setSubmissions(mapped);
      } catch {
        setSubmissions([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadSubmissions();
  }, [assignmentId]);

  const handleGrade = async ({ id, marks, remarks }) => {
    try {
      if (!id) {
        throw new Error("Missing submission id");
      }

      await portalApi.gradeSubmission(id, { marks, remarks });
      toast.success("Grading saved");

      const { data } = await portalApi.submissionsByAssignment(assignmentId);
      setSubmissions((data.data || []).map((submission) => ({
        id: submission._id || submission.id,
        studentId: submission.student?.portalId,
        studentName: submission.student?.name,
        submittedAt: submission.submittedAt ? new Date(submission.submittedAt).toLocaleString() : "-",
        file: submission.file?.url,
        status: submission.status === "on_time" ? "On-time" : submission.status,
        remarks: submission.remarks,
        marks: submission.marks,
        maxMarks: submission.assignment?.maxMarks || 100,
      })));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save grading");
      throw error;
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <PortalPageHeader
        badge={
          <div className="flex items-center gap-2 max-w-full">
            <Badge variant={isDarkMode ? "gold" : "navy"}>
              BSCS - A â€¢ Operating Systems
            </Badge>
          </div>
        }
        title={`Assignment ${assignmentId}`}
        subtitle="Review and grade student submissions."
        action={
          <div className="flex items-center gap-2 md:gap-3 flex-col sm:flex-row w-full sm:w-auto">
            <PublicButton
              to="/faculty/assignments"
              variant="primary"
              shape="slanted"
              className="w-full border-2 border-white/10"
            >
              Assignments
            </PublicButton>
            <PublicButton
              onClick={() => toast.success("Grading process finalized")}
              variant="secondary"
              shape="slanted"
              className="w-full"
            >
              Mark Grades
            </PublicButton>
          </div>
        }
      />

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, idx) => (
             <SkeletonLoading key={idx} variant="card" className="h-32" />
          ))}
        </div>
      ) : submissions.length > 0 ? (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <SubmissionCard key={submission.id} submission={submission} onGrade={handleGrade} />
          ))}
        </div>
      ) : (
        <div className="bg-white/60 dark:bg-college-navy/40 backdrop-blur-sm border border-dashed border-gray-300 dark:border-college-gold/30 rounded-sm p-12 text-center">
           <div className="w-16 h-16 bg-college-navy/5 dark:bg-college-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-college-navy dark:text-college-gold">
             <CheckCircle size={30} />
           </div>
           <h3 className="text-lg font-semibold text-college-navy dark:text-white">No submissions found</h3>
           <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-sm mx-auto">
             Students haven't submitted any work for this assignment yet.
           </p>
        </div>
      )}
    </div>
  );
};

export default Submissions;

