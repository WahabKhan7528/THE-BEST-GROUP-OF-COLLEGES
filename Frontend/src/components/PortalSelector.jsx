import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  GraduationCap, 
  Users
} from 'lucide-react';

const PortalSelector = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  
  const portals = [
    {
      title: 'Admin Portal',
      description: 'Manage college system and operations',
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      path: '/admin',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverColor: 'hover:bg-blue-100',
    },
    {
      title: 'Faculty Portal',
      description: 'Access teaching resources and manage classes',
      icon: <GraduationCap className="w-8 h-8 text-green-600" />,
      path: '/faculty/dashboard',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      hoverColor: 'hover:bg-green-100',
    },
    {
      title: 'Student Portal',
      description: 'View courses, grades, and campus resources',
      icon: <Users className="w-8 h-8 text-purple-600" />,
      path: '/student/dashboard',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      hoverColor: 'hover:bg-purple-100',
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
        <div className="inline-block align-bottom bg-white/95 rounded-2xl px-5 pt-6 pb-5 text-left overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.12)] transform transition-all sm:my-12 sm:align-middle sm:max-w-3xl sm:w-full sm:p-8 border border-neutral-200">
          <div className="w-full space-y-6">
            <div className="text-center space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-primary-600">Portal Access</p>
              <h3 className="text-2xl font-bold text-neutral-900">Choose where you want to go</h3>
              <p className="text-sm text-neutral-500">Single entry for Admin, Faculty, and Students</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {portals.map((portal) => (
                <button
                  key={portal.title}
                  onClick={() => handlePortalSelect(portal.path)}
                  className={`group p-6 rounded-xl border ${portal.bgColor} ${portal.borderColor} transition-all duration-200 text-left w-full hover:-translate-y-1 hover:shadow-md`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-white shadow-sm border border-neutral-100">
                      {portal.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-semibold text-neutral-900">
                        {portal.title}
                      </h4>
                      <p className="text-sm text-neutral-600">
                        {portal.description}
                      </p>
                      <span className="text-xs font-semibold text-primary-700 group-hover:text-primary-800">
                        Continue →
                      </span>
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