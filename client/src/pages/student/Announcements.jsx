import { useMemo } from "react";
import { useStudentContext } from "../../store/hooks/useStudentReduxContext";
import AnnouncementCard from "../../components/portal-shared/AnnouncementCard";
import PortalPageHeader from "../../components/portal-shared/PortalPageHeader";
import Badge from "../../components/shared/Badge";
import SkeletonLoading from "../../components/shared/SkeletonLoading";
import { Bell } from "lucide-react";

const StudentAnnouncements = () => {
    const { getCurrentCampus, getAnnouncementsByCurrentCampus, isDarkMode, loading } = useStudentContext();
    const campus = getCurrentCampus();
    const announcementsData = useMemo(() => getAnnouncementsByCurrentCampus(), [getAnnouncementsByCurrentCampus]);
    const announcements = announcementsData.recent || [];

    const campusNames = {
        main: "Main Campus",
        law: "Law Campus",
        hala: "Hala Campus",
    };

    if (loading) {
        return (
            <div className="space-y-6 pb-10 animate-pulse">
                <div className="space-y-2">
                    <SkeletonLoading variant="textLine" className="w-24 h-5" />
                    <SkeletonLoading variant="textLine" className="w-1/3 h-8" />
                    <SkeletonLoading variant="textLine" className="w-1/2 h-4" />
                </div>
                <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                        <SkeletonLoading key={i} variant="panel" className="h-28" />
                    ))}
                </div>
            </div>
        );
    }

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
                {announcements.length > 0 ? (
                    announcements.map((announcement, index) => (
                        <AnnouncementCard key={announcement.id || index} announcement={announcement} role="student" />
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

