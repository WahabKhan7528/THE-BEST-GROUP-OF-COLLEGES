import { useEffect, useMemo, useState } from "react";
import { useStudentContext } from "../../store/hooks/useStudentReduxContext";
import MaterialCard from "../../components/portal-shared/MaterialCard";
import PortalPageHeader from "../../components/portal-shared/PortalPageHeader";
import Badge from "../../components/shared/Badge";
import { FolderOpen } from "lucide-react";
import { portalApi } from "../../services/api";
import SkeletonLoading from "../../components/shared/SkeletonLoading";

const campusNames = {
  main: "Main Campus",
  law: "Law Campus",
  hala: "Hala Campus",
};

const Materials = () => {
  const { getCurrentCampus, isDarkMode } = useStudentContext();
  const campus = getCurrentCampus();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadMaterials = async () => {
      try {
        const { data } = await portalApi.materials();
        const mappedMaterials = (data.data || []).map((material) => ({
          id: material._id,
          classSection: material.classRoom?.name || material.classRoom?.section || material.classRoom || "-",
          subject: material.subject?.name || material.subject?.code || material.subject || "-",
          title: material.title,
          type: material.type,
          uploadDate: material.createdAt ? new Date(material.createdAt).toLocaleDateString() : "-",
          link: material.file?.url || material.link || "#",
          description: material.title,
        }));

        if (isMounted) {
          setMaterials(mappedMaterials);
        }
      } catch {
        if (isMounted) {
          setMaterials([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMaterials();

    return () => {
      isMounted = false;
    };
  }, []);

  const groupedMaterials = useMemo(() => {
    const grouped = new Map();

    materials.forEach((material) => {
      const key = `${material.classSection}-${material.subject}`;
      if (!grouped.has(key)) {
        grouped.set(key, {
          classSection: material.classSection,
          subject: material.subject,
          items: [],
        });
      }
      grouped.get(key).items.push(material);
    });

    return Array.from(grouped.values());
  }, [materials]);

  return (
    <div className="space-y-8 pb-10">
      <PortalPageHeader
        badge={
          <Badge variant={isDarkMode ? "gold" : "navy"}>
            {campusNames[campus]}
          </Badge>
        }
        title="Course Material"
        subtitle="Access lecture slides, videos, notes, and other learning resources for your enrolled subjects."
      />

      {loading ? (
        <div className="space-y-8 animate-pulse">
          {[1, 2].map((g) => (
            <div key={g} className="space-y-4">
              <div className="flex justify-between items-center px-2">
                <div className="space-y-2">
                  <SkeletonLoading variant="textLine" className="w-40 h-6" />
                  <SkeletonLoading variant="textLine" className="w-28 h-4" />
                </div>
                <SkeletonLoading variant="textLine" className="w-16 h-6" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3].map((i) => (
                  <SkeletonLoading key={i} variant="panel" className="h-36" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : groupedMaterials.length > 0 ? (
        <div className="space-y-8">
          {groupedMaterials.map((group) => (
            <section key={`${group.classSection}-${group.subject}`} className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
                <div>
                  <h2 className="text-xl font-bold text-college-navy dark:text-white break-words">
                    {group.subject}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                    <span className="font-medium px-2 py-0.5 bg-gray-100 dark:bg-dark-elevated rounded text-gray-600 dark:text-gray-300 shrink-0">{group.classSection}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="break-words">Files shared by your instructors</span>
                  </div>
                </div>
                <span className="self-start sm:self-center text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-border shrink-0">
                  {group.items.length} items
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.items.map((item) => (
                  <MaterialCard key={item.id} material={item} role="student" />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="bg-white/60 dark:bg-college-navy/40 backdrop-blur-sm border border-dashed border-gray-300 dark:border-college-gold/30 rounded-sm p-12 text-center">
          <div className="w-16 h-16 bg-college-navy/5 dark:bg-college-gold/10 text-college-navy dark:text-college-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderOpen size={30} />
          </div>
          <h3 className="text-lg font-semibold text-college-navy dark:text-white">No materials found</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-sm mx-auto">
            No course materials are currently available for {campusNames[campus]}. Please check back later or contact your instructor.
          </p>
        </div>
      )}
    </div>
  );
};

export default Materials;
