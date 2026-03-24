import PortalPageHeader from '../../components/portal-shared/PortalPageHeader';
import SubmissionCard from '../../components/portal-shared/SubmissionCard';
import Badge from '../../components/shared/Badge';
import { useThemeContext } from '../../context/ThemeContext';
import { mockStudentSubmissions } from '../../data/studentPortalData';

const Submissions = () => {
  const { isDarkMode } = useThemeContext();

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
        {mockStudentSubmissions.map((submission) => (
          <SubmissionCard 
            key={submission.id} 
            submission={submission} 
            role="student" 
          />
        ))}

        {mockStudentSubmissions.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-college-navy/40 rounded-sm border border-dashed border-gray-200 dark:border-white/10">
            <p className="text-gray-500 dark:text-gray-400">No submissions found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Submissions;
