import { useParams, Link } from 'react-router-dom';
import SubmissionCard from '../../components/faculty/SubmissionCard';
import PortalPageHeader from '../../components/shared/PortalPageHeader';
import Badge from '../../components/public_site/Badge';
import { useFacultyContext } from '../../context/FacultyContext';
import { useToast } from '../../context/ToastContext';
import { ArrowLeft, CheckCircle } from 'lucide-react';

import { mockSubmissions } from "../../data/facultyPortalData";
import PublicButton from '../../components/shared/PublicButton';

const Submissions = () => {
  const { assignmentId } = useParams();
  const { isDarkMode } = useFacultyContext();
  const toast = useToast();

  return (
    <div className="space-y-6 pb-10">
      <PortalPageHeader
        badge={
          <div className="whitespace-nowrap flex items-center gap-2">
            <Badge variant={isDarkMode ? "gold" : "navy"}>
              BSCS - A • Operating Systems
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
              onClick={() => toast.success('Grading process finalized')}
              variant="secondary"
              shape="slanted"
              className="w-full"
            >
              Mark Grades
            </PublicButton>
          </div>
        }
      />

      <div className="space-y-4">
        {mockSubmissions.map((submission) => (
          <SubmissionCard key={submission.studentId} submission={submission} />
        ))}
      </div>
    </div>
  );
};

export default Submissions;
