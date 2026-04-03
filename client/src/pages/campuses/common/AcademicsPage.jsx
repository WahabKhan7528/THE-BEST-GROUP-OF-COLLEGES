import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import PublicButton from "../../../components/shared/PublicButton";
import SectionHeader from "../../../components/public-site/SectionHeader";
import ProgramCard from "../../../components/public-site/ProgramCard";
import CampusCta from "../../../components/public-site/CampusCta";
import SkeletonLoading from "../../../components/shared/SkeletonLoading";
import { publicApi } from "../../../services/api";

const AcademicsPage = () => {
  const location = useLocation();
  const campus = location.pathname.split("/")[2] || "main";
  const [courses, setCourses] = useState([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      setIsLoadingCourses(true);
      try {
        const { data } = await publicApi.courses();
        const mappedCourses = (data.data || []).map((course) => ({
          id: course._id,
          title: course.title,
          duration:
            course.duration ||
            (course.examSystem === "semester" && course.totalSemesters
              ? `${course.totalSemesters} Semesters`
              : course.examSystem === "annual" && course.totalYears
                ? `${course.totalYears} Years`
                : "Program"),
          description: course.description || `Explore the ${course.title} program.`,
          campuses: (course.campuses || []).map((campusRef) => ({
            code: String(campusRef?.code || "").toLowerCase(),
            slug: String(campusRef?.slug || "").toLowerCase(),
          })),
        }));
        setCourses(mappedCourses);
      } catch {
        setCourses([]);
      } finally {
        setIsLoadingCourses(false);
      }
    };

    loadCourses();
  }, []);

  const campusPrograms = useMemo(() => {
    return courses.filter((course) =>
      (course.campuses || []).some(
        (campusRef) => campusRef.slug === campus || campusRef.code === campus,
      ),
    );
  }, [courses, campus]);

  // Simple helper to capitalize campus name for the badge
  const campusLabel = campus.charAt(0).toUpperCase() + campus.slice(1) + " Campus";

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Page Header*/}
      <section className="relative overflow-hidden bg-college-navy text-white pt-16 sm:pt-24 pb-12 sm:pb-20 rounded-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge="Academics"
            title={<>Academic <span className="text-college-gold">Programs</span></>}
            description={`Discover our comprehensive range of programs at ${campusLabel}, designed to empower the next generation of leaders and professionals.`}
            variant="dark"
            centered
            className="max-w-4xl mx-auto !mb-0"
          />
        </div>
      </section>

      <section className="relative overflow-hidden bg-white text-college-navy py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-10 text-center">
            <SectionHeader
              badge={campusLabel}
              title="Programs Offered"
              description={`Academic programs currently offered at ${campusLabel}.`}
              variant="light"
              centered
            />
          </div>

          {isLoadingCourses ? (
            <SkeletonLoading count={6} variant="card" containerClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {campusPrograms.map((program) => (
                <ProgramCard key={program.id || program.title} program={program} />
              ))}
            </div>
          )}

          {!isLoadingCourses && campusPrograms.length === 0 ? (
            <div className="mt-6 rounded-sm border border-dashed border-gray-300 p-8 text-center text-gray-500">
              No programs are currently available for this campus.
            </div>
          ) : null}
        </div>
      </section>

      <CampusCta
        title="Start Your"
        highlightedWord="Journey"
        description="Take the first step towards a bright future. Explore our admission requirements and apply today for the upcoming academic session."
        primaryButton={{ text: "Apply Online", to: "/admissions" }}
        secondaryButton={{ text: "Request Information", to: "/contact" }}
      />
    </div>
  );
};

export default AcademicsPage;
