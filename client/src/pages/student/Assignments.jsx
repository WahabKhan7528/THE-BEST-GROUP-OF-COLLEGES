import { useEffect, useMemo, useState } from "react";
import { useStudentContext } from "../../store/hooks/useStudentReduxContext";
import AssignmentCard from "../../components/portal-shared/AssignmentCard";
import PortalPageHeader from "../../components/portal-shared/PortalPageHeader";
import Badge from "../../components/shared/Badge";
import { CheckCircle } from "lucide-react";
import { portalApi } from "../../services/api";

const campusNames = {
  main: "Main Campus",
  law: "Law Campus",
  hala: "Hala Campus",
};

const Assignments = () => {
  const { getCurrentCampus, isDarkMode } = useStudentContext();
  const campus = getCurrentCampus();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadAssignments = async () => {
      try {
        const [assignmentRes, submissionRes] = await Promise.all([
          portalApi.assignments(),
          portalApi.mySubmissions(),
        ]);

        const submissions = submissionRes.data.data || [];
        const submissionMap = new Map(
          submissions.map((submission) => [submission.assignment?._id || submission.assignment, submission]),
        );

        const mappedAssignments = (assignmentRes.data.data || []).map((assignment) => {
          const submission = submissionMap.get(assignment._id);
          const status = submission
            ? submission.status === "late"
              ? "Late"
              : "Submitted"
            : "Pending";

          return {
            id: assignment._id,
            title: assignment.title,
            description: assignment.description,
            dueDate: assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : "-",
            attachment: assignment.attachment?.url || "#",
            status,
            classSection: assignment.classRoom?.name || assignment.classRoom?.section || assignment.classRoom || "-",
            subject: assignment.subject?.name || assignment.subject?.code || assignment.subject || "-",
            maxMarks: assignment.maxMarks,
          };
        });

        if (isMounted) {
          setAssignments(mappedAssignments);
        }
      } catch {
        if (isMounted) {
          setAssignments([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadAssignments();

    return () => {
      isMounted = false;
    };
  }, []);

  const pendingCount = useMemo(() => assignments.filter((assignment) => assignment.status === "Pending").length, [assignments]);

  return (
    <div className="space-y-6 pb-10">
      <PortalPageHeader
        badge={
          <Badge variant={isDarkMode ? "gold" : "navy"}>
            {campusNames[campus]}
          </Badge>
        }
        title="Assignments"
        subtitle="Manage your coursework, track deadlines, and submit your assignments on time."
        action={
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-2">
              <p className="text-2xl md:text-3xl font-bold text-college-navy dark:text-college-gold">{pendingCount}</p>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">Pending Tasks</p>
            </div>
          </div>
        }
      />

      {loading ? (
        <div className="py-10 text-center text-gray-500 dark:text-gray-400">Loading assignments...</div>
      ) : assignments.length > 0 ? (
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} role="student" />
          ))}
        </div>
      ) : (
        <div className="bg-white/60 dark:bg-college-navy/40 backdrop-blur-sm border border-dashed border-gray-300 dark:border-college-gold/30 rounded-sm p-12 text-center">
          <div className="w-16 h-16 bg-college-navy/5 dark:bg-college-gold/10 text-college-navy dark:text-college-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={30} />
          </div>
          <h3 className="text-lg font-semibold text-college-navy dark:text-white">All caught up!</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-sm mx-auto">
            No pending assignments for {campusNames[campus]} at this time.
          </p>
        </div>
      )}
    </div>
  );
};

export default Assignments;
