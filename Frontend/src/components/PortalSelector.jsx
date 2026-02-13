import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  GraduationCap,
  Users,
  ArrowRight
} from 'lucide-react';

const PortalSelector = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const portals = [
    {
      title: 'Admin Portal',
      description: 'Manage college system and operations',
      icon: <ShieldCheck className="w-6 h-6" />,
      path: '/login/admin',
      bgClass: 'bg-white border-border hover:border-primary-300',
    },
    {
      title: 'Faculty Portal',
      description: 'Access teaching resources and manage classes',
      icon: <GraduationCap className="w-6 h-6" />,
      path: '/login/faculty',
      bgClass: 'bg-white border-border hover:border-primary-300',
    },
    {
      title: 'Student Portal',
      description: 'View courses, grades, and campus resources',
      icon: <Users className="w-6 h-6" />,
      path: '/login/student',
      bgClass: 'bg-white border-border hover:border-primary-300',
    },
  ];

  const handlePortalSelect = (path) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-primary-900/60 transition-opacity"
          onClick={onClose}
        />

        {/* Portal Modal */}
        <div className="relative w-full max-w-4xl bg-surface rounded-2xl p-6 sm:p-10 text-left overflow-hidden shadow-xl transform transition-all border border-border">
          <div className="w-full space-y-8">
            {/* Header */}
            <div className="text-center space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-text-secondary">Portal Access</p>
              <h3 className="text-3xl font-bold text-primary-900">Choose Your Portal</h3>
              <p className="text-sm text-text-secondary max-w-md mx-auto">
                Access the right tools for your role in our educational ecosystem
              </p>
            </div>

            {/* Portal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {portals.map((portal) => (
                <button
                  key={portal.title}
                  onClick={() => handlePortalSelect(portal.path)}
                  className={`group relative p-6 rounded-xl border transition-all duration-300 text-left w-full hover:shadow-md hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${portal.bgClass}`}
                >
                  {/* Content */}
                  <div className="relative space-y-4">
                    {/* Icon - Neutral/Transparent background */}
                    <div className="inline-flex p-3 rounded-lg bg-primary-50 text-primary-700 border border-primary-100 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm">
                      {portal.icon}
                    </div>

                    {/* Text */}
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-primary-900 group-hover:text-primary-700 transition-colors">
                        {portal.title}
                      </h4>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {portal.description}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 group-hover:text-primary-800 transition-all">
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalSelector;
