import { useState, useEffect } from "react";
import { useStudentContext } from "../../context/StudentContext";
import { mockClassAnnouncements } from "../../data/studentPortalData";
import AnnouncementCard from "../../components/portal-shared/AnnouncementCard";
import PortalPageHeader from "../../components/portal-shared/PortalPageHeader";
import Badge from "../../components/shared/Badge";
import { Bell } from "lucide-react";

const StudentAnnouncements = () => {
    const { getCurrentCampus, getSubjectsByCurrentCampus, isDarkMode } = useStudentContext();
    const campus = getCurrentCampus();
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Get enrolled subject codes
        const subjects = getSubjectsByCurrentCampus() || [];
        const subjectCodes = subjects.map((s) => s.code);

        // 2. Fetch announcements from localStorage + Mock Data
        const saved = localStorage.getItem("college_announcements");
        let allCampusAnnouncements = [...(mockClassAnnouncements[campus] || [])];

        if (saved) {
            const parsed = JSON.parse(saved);
            const savedCampusAnnouncements = parsed[campus] || [];
            // Merge saved with mock, avoiding duplicates if they share the same ID
            const savedIds = new Set(savedCampusAnnouncements.map(a => a.id));
            allCampusAnnouncements = [
                ...savedCampusAnnouncements,
                ...allCampusAnnouncements.filter(a => !savedIds.has(a.id))
            ];
        }

        // 3. Filter announcements relevant to the student
        const relevant = allCampusAnnouncements.filter((announcement) => {
            if (!announcement.classSection) return false;
            // Check if announcement is for a subject the student is enrolled in
            return subjectCodes.some(code => announcement.classSection.includes(code));
        });

        // Sort by date (descending) - mock dates are strings so simple sort works for these dummies
        relevant.sort((a, b) => new Date(b.date) - new Date(a.date));

        setAnnouncements(relevant);
        setLoading(false);
    }, [campus, getSubjectsByCurrentCampus]);

    const campusNames = {
        main: "Main Campus",
        law: "Law Campus",
        hala: "Hala Campus",
    };

    return (
        <div className="space-y-6 pb-10">
            {/* Header */}
            <PortalPageHeader
                badge={
                    <Badge variant={isDarkMode ? "gold" : "navy"}>
                        {campusNames[campus]}
                    </Badge>
                }
                title="Class Announcements"
                subtitle="Updates from your teachers and department."
            />

            {/* List */}
            <div className="space-y-4">
                {loading ? (
                    <p className="text-center text-gray-500 py-10">Loading updates...</p>
                ) : announcements.length > 0 ? (
                    announcements.map((announcement, index) => (
                        <AnnouncementCard
                            key={index}
                            announcement={announcement}
                            role="student"
                        />
                    ))
                ) : (
                    <div className="bg-white/60 dark:bg-college-navy/40 backdrop-blur-sm border border-dashed border-gray-300 dark:border-college-gold/30 rounded-sm p-12 text-center">
                        <div className="w-16 h-16 bg-college-navy/5 dark:bg-college-gold/10 text-college-navy dark:text-college-gold rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bell size={32} />
                        </div>
                        <h3 className="text-lg font-semibold text-college-navy dark:text-white">No New Announcements</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            You're all caught up! No recent updates from your classes.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentAnnouncements;
