import { useState, useEffect } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import PublicButton from "../../../components/shared/PublicButton";
import PortalForms from "../../../components/shared/PortalForms";
import { Save, Trash2 } from "lucide-react";

const EditCampus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { campuses, isDarkMode } = useAdminContext();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    code: "",
    location: "",
    contact: {
      phone: "",
      email: "",
      website: ""
    },
    dean: "",
    established: ""
  });

  useEffect(() => {
    if (location.state?.campus) {
      const { campus } = location.state;
      setForm({
        name: campus.name || "",
        code: campus.code || "",
        location: campus.location || "",
        contact: {
          phone: campus.contact?.phone || "",
          email: campus.contact?.email || "",
          website: campus.contact?.website || ""
        },
        dean: campus.dean || "",
        established: campus.established || ""
      });
    } else {
      const foundCampus = campuses.find(c => c.id === id);
      if (foundCampus) {
        setForm({
          name: foundCampus.name || "",
          code: foundCampus.code || "",
          location: foundCampus.location || "",
          contact: {
            phone: foundCampus.contact?.phone || "",
            email: foundCampus.contact?.email || "",
            website: foundCampus.contact?.website || ""
          },
          dean: foundCampus.dean || "",
          established: foundCampus.established || ""
        });
      }
    }
  }, [id, location.state, campuses]);

  const handleChange = (key, value) => {
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      setForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setForm(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Campus ${form.name} updated successfully!`);
      navigate("/admin/campus");
    }, 1000);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${form.name}? This cannot be undone.`)) {
      alert("Campus deleted successfully");
      navigate("/admin/campus");
    }
  };

  return (
    <PortalForms
      title="Edit Campus"
      subtitle="Update campus details and configuration"
      backPath="/admin/campus"
      onSubmit={handleSubmit}
      onCancel={() => navigate("/admin/campus")}
      submitLabel="Save Changes"
      submitIcon={Save}
      headerActions={
        <PublicButton
          onClick={handleDelete}
          variant="danger"
          size="sm"
          icon={Trash2}
          type="button"
        >
          Delete
        </PublicButton>
      }
    >
      {/* Basic Information */}
      <PortalForms.Section title="Basic Information">
        <div className="col-span-1 md:col-span-2">
          <PortalForms.Input
            label="Campus Name"
            value={form.name}
            onChange={(val) => handleChange("name", val)}
            required
          />
        </div>

        <div>
          <PortalForms.Input
            label="Campus Code"
            value={form.code}
            onChange={(val) => handleChange("code", val)}
            required
          />
        </div>

        <div>
          <PortalForms.Input
            label="Established Year"
            value={form.established}
            onChange={(val) => handleChange("established", val)}
            placeholder="e.g. 1995"
          />
        </div>
      </PortalForms.Section>

      {/* Contact & Location */}
      <PortalForms.Section title="Contact & Location">
        <div className="col-span-1 md:col-span-2">
          <PortalForms.Input
            label="Address / Location"
            value={form.location}
            onChange={(val) => handleChange("location", val)}
          />
        </div>

        <div>
          <PortalForms.Input
            label="Phone Number"
            type="tel"
            value={form.contact.phone}
            onChange={(val) => handleChange("contact.phone", val)}
          />
        </div>

        <div>
          <PortalForms.Input
            label="Email Address"
            type="email"
            value={form.contact.email}
            onChange={(val) => handleChange("contact.email", val)}
          />
        </div>
      </PortalForms.Section>
    </PortalForms>
  );
};

export default EditCampus;
