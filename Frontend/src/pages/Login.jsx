import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, GraduationCap, Users, ArrowRight, Lock, Mail } from 'lucide-react';

const Login = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Debug logging
    useEffect(() => {
        console.log('Login Page Mounted');
        console.log('Portal Type:', type);
    }, [type]);

    const getPortalInfo = () => {
        const portalType = type ? type.toLowerCase() : '';

        switch (portalType) {
            case 'admin':
                return {
                    title: 'Admin Portal',
                    description: 'Manage college system and operations',
                    icon: <ShieldCheck size={40} className="text-blue-600" />,
                    gradient: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700',
                    shadow: 'shadow-blue-500/20',
                    path: '/admin/dashboard'
                };
            case 'faculty':
                return {
                    title: 'Faculty Portal',
                    description: 'Access teaching resources and manage classes',
                    icon: <GraduationCap size={40} className="text-blue-600" />,
                    gradient: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700',
                    shadow: 'shadow-blue-500/20',
                    path: '/faculty/dashboard'
                };
            case 'student':
                return {
                    title: 'Student Portal',
                    description: 'View courses, grades, and campus resources',
                    icon: <Users size={40} className="text-blue-600" />,
                    gradient: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700',
                    shadow: 'shadow-blue-500/20',
                    path: '/student/dashboard'
                };
            default:
                // Default fallback for unknown or missing routes
                return {
                    title: 'Portal Login',
                    description: 'Please select a valid portal',
                    icon: <ShieldCheck size={40} className="text-gray-400" />,
                    gradient: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700',
                    shadow: 'shadow-blue-500/20',
                    path: '/'
                };
        }
    };

    const portalinfo = getPortalInfo();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Logging in to:', portalinfo.path);
        // Simulating login - redirect to respective dashboard
        navigate(portalinfo.path);
    };

    if (!portalinfo) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#FDFDFD] p-4 relative">
            {/* Minimalist Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{
                backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
                backgroundSize: '32px 32px'
            }}></div>

            <div className="w-full max-w-md bg-white border border-gray-100 shadow-2xl shadow-gray-200/50 rounded-2xl p-8 relative z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gray-50 text-gray-900 mb-6">
                        {portalinfo.icon}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{portalinfo.title}</h1>
                    <p className="text-gray-500 mt-3 text-base">{portalinfo.description}</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-900">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors" size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-gray-900/5 focus:border-gray-900 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold text-gray-900">Password</label>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors" size={20} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-gray-900/5 focus:border-gray-900 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-3.5 px-4 ${portalinfo.gradient} text-white font-bold rounded-xl ${portalinfo.shadow} hover:shadow-lg transform active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 mt-4`}
                    >
                        <span>Sign In</span>
                        <ArrowRight size={20} />
                    </button>

                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-500">
                            New here? <a href="/admissions" className="text-gray-900 font-bold hover:underline transition-all">Apply for admission</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
