import { useState, useEffect } from "react";
import { useStudentContext } from "../../context/StudentContext";
import AnnouncementCard from "../../components/shared/AnnouncementCard";
import { Bell, Search } from "lucide-react";

const StudentAnnouncements = () => {
    const { getCurrentCampus, getCoursesByCurrentCampus } = useStudentContext();
    const campus = getCurrentCampus();
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Get enrolled course codes
        const courses = getCoursesByCurrentCampus() || [];
        const courseCodes = courses.map((c) => c.code); // e.g., ["CS-312", "MTH-205"]

        // 2. Fetch announcements from localStorage
        const saved = localStorage.getItem("college_announcements");
        let campusAnnouncements = [];

        if (saved) {
            const parsed = JSON.parse(saved);
            campusAnnouncements = parsed[campus] || [];
        } else {
            // Fallback to empty if nothing in LS (or basic mock if you want)
        }

        // 3. Filter announcements relevant to the student
        const relevant = campusAnnouncements.filter((announcement) => {
            // Check if the announcement's target classes include any of the student's enrolled courses
            // announcement.classSection is a string like "CS-312, BBA-101"
            if (!announcement.classSection) return false;
            return courseCodes.some(code => announcement.classSection.includes(code));
        });

        setAnnouncements(relevant);
        setLoading(false);
    }, [campus, getCoursesByCurrentCampus]);

    const campusNames = {
        main: "Main Campus",
        law: "Law Campus",
        hala: "Hala Campus",
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white border rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary-100 rounded-full text-primary-600">
                        <Bell size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Class Announcements</h1>
                        <p className="text-gray-500 text-sm">Updates from your teachers and department</p>
                        <p className="text-xs text-primary-600 font-medium mt-1"> {campusNames[campus]}</p>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="space-y-4">
                {loading ? (
                    <p className="text-center text-gray-500 py-10">Loading updates...</p>
                ) : announcements.length > 0 ? (
                    announcements.map((announcement, index) => (
                        <AnnouncementCard
                            key={index}
                            announcement={announcement}
                        />
                    ))
                ) : (
                    <div className="bg-white border rounded-2xl shadow-sm p-12 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bell size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">No New Announcements</h3>
                        <p className="text-gray-500 mt-2">
                            You're all caught up! No recent updates from your classes.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentAnnouncements;
