import { useEffect, useState } from "react";
import { useFacultyContext } from "../../store/hooks/useFacultyReduxContext";
import MaterialCard from "../../components/portal-shared/MaterialCard";
import PortalPageHeader from "../../components/portal-shared/PortalPageHeader";
import Badge from "../../components/shared/Badge";
import { Plus, UploadCloud } from "lucide-react";
import PublicButton from "../../components/shared/PublicButton";
import { portalApi } from "../../services/api";

const campusNames = {
  main: "Main Campus",
  law: "Law Campus",
  hala: "Hala Campus",
};

const Materials = () => {
  const { getCurrentCampus, isDarkMode } = useFacultyContext();
  const campus = getCurrentCampus();
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const loadMaterials = async () => {
      try {
        const { data } = await portalApi.materials();
        setMaterials((data.data || []).map((material) => ({
          id: material._id,
          classSection: material.classRoom?.name || material.classRoom?.section || material.classRoom || "-",
          subject: material.subject?.name || material.subject?.code || material.subject || "-",
          title: material.title,
          type: material.type,
          uploadDate: material.createdAt ? new Date(material.createdAt).toLocaleDateString() : "-",
          link: material.file?.url || material.link,
        })));
      } catch {
        setMaterials([]);
      }
    };

    loadMaterials();
  }, []);

  const handleMaterialDeleted = (deletedId) => {
    setMaterials((prev) => prev.filter((item) => String(item.id) !== String(deletedId)));
  };

  return (
    <div className="space-y-6 pb-10">
      <PortalPageHeader
        badge={
          <Badge variant={isDarkMode ? "gold" : "navy"}>
            {campusNames[campus]}
          </Badge>
        }
        title="Course Materials"
        subtitle="Upload and manage resources, lecture notes, and media for your students."
        action={
          <PublicButton
            to="/faculty/materials/upload"
            variant={isDarkMode ? "secondary" : "primary"}
            shape="slanted"
            size="md"
            icon={Plus}
            className="shadow-md transition-all duration-200"
          >
            Upload Material
          </PublicButton>
        }
      />

      {materials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map((material) => (
            <MaterialCard
              key={material.id}
              material={material}
              onDeleted={handleMaterialDeleted}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white/60 dark:bg-college-navy/40 backdrop-blur-sm border border-dashed border-gray-300 dark:border-college-gold/30 rounded-sm p-12 text-center">
          <div className="w-16 h-16 bg-college-navy/5 dark:bg-college-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-college-navy dark:text-college-gold">
            <UploadCloud size={30} />
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
            No materials uploaded for {campusNames[campus]} yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default Materials;

