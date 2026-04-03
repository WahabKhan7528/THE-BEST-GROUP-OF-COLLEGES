import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PortalPageHeader from '../../components/portal-shared/PortalPageHeader';
import SubmissionCard from '../../components/portal-shared/SubmissionCard';
import Badge from '../../components/shared/Badge';
import { portalApi } from '../../services/api';

const Submissions = () => {
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const loadMySubmissions = async () => {
      try {
        const { data } = await portalApi.mySubmissions();
        const mapped = (data.data || []).map((item) => ({
          id: item._id,
          subject: item.assignment?.subject?.name || "Subject",
          title: item.assignment?.title || "Submission",
          submittedAt: item.submittedAt ? new Date(item.submittedAt).toLocaleString() : "-",
          status: item.status === "on_time" ? "On-time" : item.status,
          marks: item.marks,
          maxMarks: item.assignment?.maxMarks,
          remarks: item.remarks,
          file: item.file?.url,
        }));
        setSubmissions(mapped);
      } catch {
        setSubmissions([]);
      }
    };

    loadMySubmissions();
  }, []);

  return (
    <div className="space-y-6 pb-10">
      <PortalPageHeader
        badge={
          <Badge variant={isDarkMode ? "gold" : "navy"}>
            Session 2025 â€¢ Fall
          </Badge>
        }
        title="My Submissions"
        subtitle="Track your assignment grades and view instructor feedback."
      />

      <div className="space-y-4">
        {submissions.map((submission) => (
          <SubmissionCard 
            key={submission.id} 
            submission={submission} 
            role="student" 
          />
        ))}

        {submissions.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-college-navy/40 rounded-sm border border-dashed border-gray-200 dark:border-white/10">
            <p className="text-gray-500 dark:text-gray-400">No submissions found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Submissions;
