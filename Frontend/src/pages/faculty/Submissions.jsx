import { useParams, Link } from 'react-router-dom';
import SubmissionCard from '../../components/faculty/SubmissionCard';
import { ArrowLeft, CheckCircle } from 'lucide-react';

import { mockSubmissions } from "../../data/facultyPortalData";

const Submissions = () => {
  const { assignmentId } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 md:gap-4">
        <div>
          <p className="text-xs md:text-sm text-gray-500">Submissions</p>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Assignment {assignmentId}</h1>
          <p className="text-xs md:text-sm text-gray-600">Class: BSCS - A • Subject: Operating Systems</p>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => alert('Navigate to grading (mock)')}
            className="flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 bg-primary-600 text-white rounded-lg md:rounded-xl text-xs md:text-sm font-semibold hover:bg-primary-700 transition-all shadow-md hover:shadow-lg"
          >
            <CheckCircle size={16} className="md:w-[18px] md:h-[18px]" />
            Mark Grades
          </button>
          <Link to="/faculty/assignments" className="inline-flex items-center gap-2 px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg md:rounded-xl hover:bg-gray-50 transition-all">
            <ArrowLeft size={14} className="md:w-4 md:h-4" />
            Back to assignments
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {mockSubmissions.map((submission) => (
          <SubmissionCard key={submission.studentId} submission={submission} />
        ))}
      </div>
    </div>
  );
};

export default Submissions;
