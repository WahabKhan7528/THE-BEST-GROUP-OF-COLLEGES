import { useParams, Link } from 'react-router-dom';
import SubmissionCard from '../../components/faculty/SubmissionCard';
import { ArrowLeft } from 'lucide-react';

const mockSubmissions = [
  {
    studentId: 'STU-0145',
    studentName: 'Ayesha Khan',
    submittedAt: 'Sept 12, 2025 • 9:30 AM',
    file: '#',
    status: 'On-time',
    remarks: 'Well structured',
  },
  {
    studentId: 'STU-0172',
    studentName: 'Bilal Ahmed',
    submittedAt: 'Sept 12, 2025 • 10:05 AM',
    file: '#',
    status: 'On-time',
  },
  {
    studentId: 'STU-0198',
    studentName: 'Sara Malik',
    submittedAt: 'Sept 13, 2025 • 8:10 AM',
    file: '#',
    status: 'Late',
  },
];

const Submissions = () => {
  const { assignmentId } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Submissions</p>
          <h1 className="text-2xl font-semibold text-gray-900">Assignment {assignmentId}</h1>
          <p className="text-sm text-gray-600">Class: BSCS - A • Subject: Operating Systems</p>
        </div>
        <Link to="/faculty/assignments" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
          <ArrowLeft size={16} />
          Back to assignments
        </Link>
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

