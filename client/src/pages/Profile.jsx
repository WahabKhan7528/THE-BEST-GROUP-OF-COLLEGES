import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/slices/authSlice";
import PageLoader from "../components/shared/PageLoader";
import Card from "../components/shared/Card";
import Button from "../components/shared/Button";
import {
  User,
  Mail,
  Shield,
  Hash,
  Key,
  School,
  BookOpen,
  Award,
  AlertCircle,
  LogOut,
} from "lucide-react";

const PortalProfile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/");
    } catch (error) {
      navigate("/");
    }
  };

  if (loading) return <PageLoader />;

  const campusLabel = user.campus?.name || user.campus?.code || user.campus?.slug;
  const courseLabel = user.currentCourse?.title || user.currentCourse?.code;
  const classLabel = user.currentClassRoom?.name || user.currentClassRoom?.section;

  const formatRole = (role) => {
    if (!role) return "";
    return role
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const personalFields = [
    { label: "Full Name", value: user.name, icon: User },
    { label: "Email Address", value: user.email, icon: Mail },
    { label: "Role Designation", value: formatRole(user.role), icon: Shield },
    { label: "Portal ID", value: user.portalId, icon: Hash },
  ].filter((item) => item.value);

  const renderField = (field) => {
    const IconComponent = field.icon;
    return (
      <div
        key={field.label}
        className="group flex items-start gap-4 p-4 rounded-sm border border-college-navy/5 dark:border-college-gold/5 hover:border-college-gold/20 dark:hover:border-college-gold/30 hover:bg-college-navy/5 dark:hover:bg-college-gold/5 transition-all duration-300 shadow-sm"
      >
        <div className="flex-shrink-0 p-3 bg-college-navy/5 dark:bg-college-gold/10 text-college-navy dark:text-college-gold rounded-sm group-hover:bg-college-gold group-hover:text-college-navy dark:group-hover:bg-college-gold dark:group-hover:text-college-navy transition-all duration-300">
          <IconComponent className="w-5 h-5" />
        </div>
        <div className="space-y-1 overflow-hidden">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-college-gold/70 block">
            {field.label}
          </span>
          <span className="text-sm font-semibold text-college-navy dark:text-white break-words block">
            {String(field.value)}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-toastIn">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-college-navy/10 dark:border-college-gold/10 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-college-navy dark:text-white tracking-tight">
            Profile
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
            Current logged-in user details and credentials.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="danger"
            size="sm"
            onClick={handleLogout}
            className="bg-red-900 text-white"
          >
            <LogOut className="w-3.5 h-3.5 mr-1.5" />
            Logout
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Section 1: Personal Details */}
        <Card variant="default" hover={false} className="p-6 md:p-8">
          <div className="border-b border-college-navy/10 dark:border-college-gold/10 pb-4 mb-6">
            <h2 className="text-lg font-bold text-college-navy dark:text-white flex items-center gap-2">
              <User className="w-5 h-5 text-college-gold" />
              Personal Details
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Your primary identity and system access identifiers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalFields.map(renderField)}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PortalProfile;
