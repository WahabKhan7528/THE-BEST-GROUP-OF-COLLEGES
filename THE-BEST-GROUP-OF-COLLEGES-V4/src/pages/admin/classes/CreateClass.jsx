import { useState } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import PortalForms from "../../../components/shared/PortalForms";
import {
  Building2,
  CheckCircle2,
  Plus
} from "lucide-react";

const CreateClass = () => {
  const { campuses, currentAdmin, isSuperAdmin } = useAdminContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    sections: "",
    subjects: "",
    faculty: "",
    campus: isSuperAdmin ? "" : currentAdmin?.allocatedCampuses?.[0] || "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.campus) {
      alert("Please select a campus");
      return;
    }
    const campusName = campuses.find((c) => c.id === form.campus)?.name;
    // alert(`Class created for ${ campusName }(mock)`);
    navigate("/admin/classes");
  };

  const getCampusLabel = () => {
    if (!isSuperAdmin) {
      return `${currentAdmin?.allocatedCampuses?.map((cId) => campuses.find((c) => c.id === cId)?.name).join(", ")} `;
    }
    return null;
  };

  return (
    <PortalForms
      title="Create New Class"
      subtitle="Add a new class and assign subjects and faculty"
      backPath="/admin/classes"
      onSubmit={handleSubmit}
      onCancel={() => navigate("/admin/classes")}
      submitLabel="Create Class"
      submitIcon={Plus}
    >
      {/* Campus Selection Section */}
      <PortalForms.Section title="Campus Allocation" className="!space-y-4">
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Campus <span className="text-red-500">*</span>
          </label>

          {isSuperAdmin ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {campuses.map((campus) => (
                <label
                  key={campus.id}
                  className={`
                    relative flex flex-col items-center justify-center p-6 rounded-xl border-2 cursor-pointer transition-all duration-200
                    ${form.campus === campus.id
                      ? "bg-college-navy/5 border-college-navy dark:bg-college-gold/10 dark:border-college-gold shadow-sm"
                      : "bg-white border-gray-100 hover:border-college-navy/50 hover:bg-gray-50 dark:bg-college-navy/50 dark:border-college-gold/20 dark:hover:bg-college-navy/80"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="campus"
                    value={campus.id}
                    checked={form.campus === campus.id}
                    onChange={(e) => handleChange("campus", e.target.value)}
                    className="sr-only"
                  />
                  <Building2 className={`w-6 h-6 mb-2 ${form.campus === campus.id ? 'text-college-navy dark:text-college-gold' : 'text-gray-400'} `} />
                  <span className={`text-sm font-bold text-center ${form.campus === campus.id ? 'text-college-navy dark:text-college-gold' : 'text-gray-600 dark:text-gray-300'} `}>
                    {campus.name}
                  </span>
                  {form.campus === campus.id && (
                    <div className="absolute top-2 right-2 text-college-gold">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                </label>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 dark:bg-college-navy/50 dark:border-college-gold/20 rounded-xl text-gray-700 dark:text-gray-300">
              <Building2 className="w-5 h-5 text-gray-400" />
              <span className="font-medium">{getCampusLabel()}</span>
              <span className="ml-auto text-xs bg-college-gold/10 text-college-navy dark:text-college-gold px-2 py-1 rounded-full">Automated Selection</span>
            </div>
          )}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 ml-1">
            The class will be created specifically for this campus environment.
          </p>
        </div>
      </PortalForms.Section>

      {/* Class Details Section */}
      <PortalForms.Section title="Academic Details">
        <div className="col-span-1 md:col-span-2">
          <PortalForms.Input
            label="Class Name"
            value={form.name}
            onChange={(val) => handleChange("name", val)}
            placeholder="e.g. BSCS - 3rd Semester"
            required
          />
        </div>

        <div>
          <PortalForms.Input
            label="Sections"
            value={form.sections}
            onChange={(val) => handleChange("sections", val)}
            placeholder="e.g. A, B, C (Comma separated)"
            helper="Separate multiple sections with commas"
          />
        </div>

        <div>
          <PortalForms.Input
            label="Assign Faculty Lead"
            value={form.faculty}
            onChange={(val) => handleChange("faculty", val)}
            placeholder="e.g. Prof. Ahmed Raza"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Subjects
          </label>
          <div className="relative">
            <textarea
              value={form.subjects}
              onChange={(e) => handleChange("subjects", e.target.value)}
              placeholder="e.g. Operating Systems, Data Structures, Linear Algebra..."
              rows="3"
              className="w-full pr-4 py-3.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all resize-none dark:text-white dark:placeholder-gray-500"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 ml-1">List the subjects offered to this class</p>
        </div>
      </PortalForms.Section>
    </PortalForms>
  );
};

export default CreateClass;
