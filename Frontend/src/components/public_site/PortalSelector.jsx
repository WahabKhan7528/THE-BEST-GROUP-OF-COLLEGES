import { useNavigate } from 'react-router-dom';
import { LayoutGrid, GraduationCap, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { portals } from "../../data/navigationData";

const PortalSelector = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="fixed inset-0 bg-primary-900/60 transition-opacity" onClick={onClose} />

        <div className="relative w-full max-w-4xl bg-surface rounded-xl md:rounded-2xl p-5 sm:p-8 md:p-10 text-left overflow-hidden shadow-xl border border-border">
          <div className="text-center space-y-2 md:space-y-3 mb-6 md:mb-8">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-text-secondary">Portal Access</p>
            <h3 className="text-2xl md:text-3xl font-bold text-primary-900">Choose Your Portal</h3>
            <p className="text-xs md:text-sm text-text-secondary max-w-md mx-auto">
              Access the right tools for your role in our educational ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {portals.map(({ title, description, icon: Icon, path }) => (
              <button
                key={title}
                onClick={() => handleSelect(path)}
                className="group relative p-5 md:p-6 rounded-xl border bg-white border-border hover:border-primary-300 transition-all duration-300 text-left w-full hover:shadow-md hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              >
                <div className="space-y-3 md:space-y-4">
                  <div className="inline-flex p-2.5 md:p-3 rounded-lg bg-primary-50 text-primary-700 border border-primary-100 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm">
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>

                  <div className="space-y-1.5 md:space-y-2">
                    <h4 className="text-base md:text-lg font-bold text-primary-900 group-hover:text-primary-700 transition-colors">{title}</h4>
                    <p className="text-xs md:text-sm text-text-secondary leading-relaxed">{description}</p>
                  </div>

                  <div className="flex items-center gap-2 text-primary-600 font-semibold text-xs md:text-sm group-hover:gap-3 group-hover:text-primary-800 transition-all">
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalSelector;
