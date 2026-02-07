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
      bgGradient: 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 hover:border-blue-200',
    },
    {
      title: 'Faculty Portal',
      description: 'Access teaching resources and manage classes',
      icon: <GraduationCap className="w-6 h-6" />,
      path: '/login/faculty',
      bgGradient: 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100 hover:border-emerald-200',
    },
    {
      title: 'Student Portal',
      description: 'View courses, grades, and campus resources',
      icon: <Users className="w-6 h-6" />,
      path: '/login/student',
      bgGradient: 'bg-gradient-to-br from-purple-50 to-fuchsia-50 border-purple-100 hover:border-purple-200',
    },
  ];

  const handlePortalSelect = (path) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Portal Modal */}
        <div className="inline-block align-bottom bg-white/95 backdrop-blur-md rounded-2xl px-6 pt-8 pb-6 text-left overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.15)] transform transition-all sm:my-12 sm:align-middle sm:max-w-4xl sm:w-full sm:p-10 border border-gray-200/50">
          <div className="w-full space-y-8">
            {/* Header */}
            <div className="text-center space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-500">Portal Access</p>
              <h3 className="text-3xl font-bold text-neutral-900">Choose Your Portal</h3>
              <p className="text-sm text-neutral-500 max-w-md mx-auto">
                Access the right tools for your role in our educational ecosystem
              </p>
            </div>

            {/* Portal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {portals.map((portal) => (
                <button
                  key={portal.title}
                  onClick={() => handlePortalSelect(portal.path)}
                  className={`group relative p-6 rounded-xl border transition-all duration-300 text-left w-full hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-500/20 ${portal.bgGradient}`}
                >
                  {/* Subtle Gradient accent on hover */}
                  <div className="absolute inset-0 rounded-xl bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="relative space-y-4">
                    {/* Icon - Neutral/Transparent background */}
                    <div className="inline-flex p-3 rounded-lg bg-gray-50 text-gray-900 border border-gray-200 group-hover:bg-white group-hover:border-gray-300 transition-all shadow-sm">
                      {portal.icon}
                    </div>

                    {/* Text */}
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-neutral-900 group-hover:text-black transition-colors">
                        {portal.title}
                      </h4>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {portal.description}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm group-hover:gap-3 group-hover:text-gray-900 transition-all">
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
