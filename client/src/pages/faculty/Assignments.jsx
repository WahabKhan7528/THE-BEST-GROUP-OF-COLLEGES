import { useEffect, useMemo, useState } from "react";
import { useFacultyContext } from "../../store/hooks/useFacultyReduxContext";
import AssignmentCard from "../../components/portal-shared/AssignmentCard";
import PortalPageHeader from "../../components/portal-shared/PortalPageHeader";
import Badge from "../../components/shared/Badge";
import { Plus, Search, BookOpen } from "lucide-react";
import FormInput from "../../components/shared/FormInput";
import Card from "../../components/shared/Card";
import PublicButton from "../../components/shared/PublicButton";
import { portalApi } from "../../services/api";

const campusNames = {
  main: "Main Campus",
  law: "Law Campus",
  hala: "Hala Campus",
};

const Assignments = () => {
  const { getCurrentCampus, isDarkMode } = useFacultyContext();
  const campus = getCurrentCampus();
  const [searchTerm, setSearchTerm] = useState("");
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        const { data } = await portalApi.assignments();
        setAssignments((data.data || []).map((assignment) => ({
          id: assignment._id,
          title: assignment.title,
          description: assignment.description,
          dueDate: assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : "-",
          attachment: assignment.attachment?.url,
          classSection: assignment.classRoom?.name || assignment.classRoom?.section || assignment.classRoom || "-",
          subject: assignment.subject?.name || assignment.subject?.code || assignment.subject || "-",
          maxMarks: assignment.maxMarks,
        })));
      } catch {
        setAssignments([]);
      }
    };

    loadAssignments();
  }, []);

  const filteredAssignments = useMemo(() => {
    if (!searchTerm.trim()) return assignments;
    
    return assignments.filter((a) => 
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.classSection.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [assignments, searchTerm]);

  const handleAssignmentDeleted = (deletedId) => {
    setAssignments((prev) => prev.filter((item) => String(item.id) !== String(deletedId)));
  };

  return (
    <div className="space-y-6 pb-10">
      <PortalPageHeader
        badge={
          <Badge variant={isDarkMode ? "gold" : "navy"}>
            {campusNames[campus]}
          </Badge>
        }
        title="Assignments"
        subtitle="Manage and publish assignments for your classes. Track submissions and grade student work efficiently."
        action={
          <PublicButton
            to="/faculty/assignments/create"
            variant={isDarkMode ? "secondary" : "primary"}
            shape="slanted"
            size="md"
            icon={Plus}
            className="shadow-md transition-all duration-200"
          >
            Create Assignment
          </PublicButton>
        }
      />

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={20} />
          <FormInput
            value={searchTerm}
            onChange={setSearchTerm}
            label={""}
            placeholder="Search assignments by title, subject or class..."
            className="w-full pl-12 pr-4 py-3.5 rounded-sm border border-gray-200 dark:border-college-gold/20 bg-white/50 dark:bg-college-navy/50 focus:bg-white dark:focus:bg-college-navy focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all outline-none dark:text-white"
          />
        </div>
      </div>

      {filteredAssignments.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredAssignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onDeleted={handleAssignmentDeleted}
            />
          ))}
        </div>
      ) : (
        <Card hover={false} className="backdrop-blur-sm border-dashed border-gray-300 dark:border-college-gold/30 p-12 text-center">
          <div className="w-16 h-16 bg-college-navy/5 dark:bg-college-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-college-navy dark:text-college-gold">
            <BookOpen size={30} />
          </div>
          <h3 className="text-lg font-semibold text-college-navy dark:text-white">No assignments found</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6 max-w-sm mx-auto">
            You haven't created any assignments for {campusNames[campus]} yet. Get started by creating your first assignment.
          </p>
        </Card>
      )}
    </div>
  );
};

export default Assignments;

