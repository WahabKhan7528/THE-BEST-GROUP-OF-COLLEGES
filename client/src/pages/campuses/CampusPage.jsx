import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import PublicButton from "../../components/shared/PublicButton";
import CampusHero from "../../components/public-site/CampusHero";
import StatsGrid from "../../components/public-site/StatsGrid";
import Section from "../../components/public-site/Section";
import SectionHeader from "../../components/public-site/SectionHeader";
import Badge from "../../components/shared/Badge";
import ProgramCard from "../../components/public-site/ProgramCard";
import FacilityCard from "../../components/public-site/FacilityCard";
import CampusCta from "../../components/public-site/CampusCta";
import SkeletonLoading from "../../components/shared/SkeletonLoading";

import { campusPageConfig } from "../../data/campusData";
import { publicApi } from "../../services/api";

const CampusPage = () => {
  const { campus } = useParams();
  const config = campusPageConfig[campus];
  const [courses, setCourses] = useState([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);

  if (!config) return <Navigate to="/" replace />;

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
            id: campusRef?._id,
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

  const programs = useMemo(() => {
    return courses.filter((course) =>
      (course.campuses || []).some(
        (campusRef) => campusRef.slug === campus || campusRef.code === campus,
      ),
    );
  }, [courses, campus]);

  const { hero, stats, facilities, vision, programs: progSection, facilitiesSection, cta } = config;

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <CampusHero title={hero.title} image={hero.image} />

      {/* Stats Overlay */}
      <StatsGrid stats={stats} className="!py-6 md:!py-8" />


      {/* Vision & Mission */}
      <Section variant="white" className="py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-4">
              <Badge variant="outline" className="bg-college-navy/5 px-4 py-2">{vision.badge}</Badge>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-4 md:mb-6 text-college-navy leading-tight uppercase tracking-wide">
              {vision.heading} <span className="text-college-gold underline decoration-college-gold/30 underline-offset-8">{vision.headingHighlight}</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6 font-sans border-l-4 border-college-gold pl-6 py-2">
              {vision.paragraph}
            </p>
            <div className="space-y-5">
              {vision.items.map((item) => (
                <div key={item.title} className="group">
                  <h4 className="font-serif font-bold text-xl text-college-navy mb-1">{item.title}</h4>
                  <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative border border-gray-100 shadow-xl bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-8 md:p-10 overflow-hidden group">
              <div className="relative z-10">
                <div className="mb-6">
                  <Badge variant="outline" className="bg-college-navy text-college-gold px-4 py-1.5">{vision.card.badge}</Badge>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-4 md:mb-6 text-college-navy leading-tight">
                  {vision.card.headingLine1} <br />{vision.card.headingLine2} <span className="text-college-gold">{vision.card.headingHighlight}</span>
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-base font-sans">
                  {vision.card.description}
                </p>
                <div className="flex justify-start">
                  <PublicButton
                    to={`/campuses/${campus}/academics`}
                    variant="primary"
                    size="lg"
                    icon={ArrowRight}
                    className="rounded shadow-xl"
                    {...(vision.card.buttonShape ? { shape: vision.card.buttonShape } : {})}
                  >
                    {vision.card.buttonText}
                  </PublicButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Programs Section */}
      <Section variant="gray" className="py-12 md:py-16">
        <SectionHeader
          badge={progSection.badge}
          title={progSection.title}
          description={progSection.description}
          variant="light"
          centered
        />
        {isLoadingCourses ? (
          <SkeletonLoading count={4} variant="card" containerClassName="grid grid-cols-1 md:grid-cols-2 gap-8" className="bg-white" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program) => (
              <ProgramCard key={program.id || program.title} program={program} />
            ))}
          </div>
        )}

        {!isLoadingCourses && programs.length === 0 ? (
          <div className="mt-6 rounded-sm border border-dashed border-gray-300 p-8 text-center text-gray-500">
            No programs are currently available for this campus.
          </div>
        ) : null}
      </Section>

      {/* Facilities */}
      <Section variant="white" className="py-12 md:py-16">
        <SectionHeader
          badge={facilitiesSection.badge}
          title={facilitiesSection.title}
          description={facilitiesSection.description}
          variant="light"
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility) => (
            <FacilityCard key={facility.title} facility={facility} />
          ))}
        </div>
      </Section>

      <CampusCta
        badge={cta.badge}
        title={<>{cta.title} <br /></>}
        highlightedWord={cta.highlightedWord}
        description={cta.description}
        image={cta.image}
        secondaryButton={cta.secondaryButton}
        primaryButton={cta.primaryButton}
        
      />
    </div>
  );
};

export default CampusPage;

