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
                    icon: <ShieldCheck size={32} className="text-blue-600" />,
                    gradient: 'from-blue-600 to-indigo-600',
                    bgGradient: 'from-blue-50 to-indigo-50',
                    shadow: 'shadow-blue-500/30',
                    path: '/admin/dashboard'
                };
            case 'faculty':
                return {
                    title: 'Faculty Portal',
                    description: 'Access teaching resources and manage classes',
                    icon: <GraduationCap size={32} className="text-emerald-600" />,
                    gradient: 'from-emerald-600 to-teal-600',
                    bgGradient: 'from-emerald-50 to-teal-50',
                    shadow: 'shadow-emerald-500/30',
                    path: '/faculty/dashboard'
                };
            case 'student':
                return {
                    title: 'Student Portal',
                    description: 'View courses, grades, and campus resources',
                    icon: <Users size={32} className="text-purple-600" />,
                    gradient: 'from-purple-600 to-fuchsia-600',
                    bgGradient: 'from-purple-50 to-fuchsia-50',
                    shadow: 'shadow-purple-500/30',
                    path: '/student/dashboard'
                };
            default:
                // Default fallback for unknown or missing routes
                return {
                    title: 'Portal Login',
                    description: 'Please select a valid portal',
                    icon: <ShieldCheck size={32} className="text-gray-600" />,
                    gradient: 'from-gray-600 to-gray-800',
                    bgGradient: 'from-gray-50 to-gray-100',
                    shadow: 'shadow-gray-500/30',
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
        <div className={`min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br ${portalinfo.bgGradient} p-4 pt-24 relative overflow-hidden`}>
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className={`absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-gradient-to-br ${portalinfo.gradient} rounded-full blur-[100px] opacity-20`} />
                <div className={`absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-gradient-to-br ${portalinfo.gradient} rounded-full blur-[100px] opacity-20`} />
            </div>

            <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-6 md:p-8 relative z-10 transition-all duration-300">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-lg mb-4 transform transition-transform hover:scale-105 duration-300">
                        {portalinfo.icon}
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">{portalinfo.title}</h1>
                    <p className="text-gray-500 mt-2 text-sm">{portalinfo.description}</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-opacity-50 focus:border-transparent outline-none transition-all"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-opacity-50 focus:border-transparent outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                            <span className="text-gray-600 group-hover:text-gray-800 transition-colors">Remember me</span>
                        </label>
                        <button type="button" className="text-gray-500 hover:text-gray-700 font-medium transition-colors">
                            Forgot password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-3 px-4 bg-gradient-to-r ${portalinfo.gradient} text-white font-bold rounded-xl ${portalinfo.shadow} hover:shadow-lg transform hash-hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2`}
                    >
                        <span>Sign In</span>
                        <ArrowRight size={18} />
                    </button>
                </form>

                <div className="mt-6 pt-5 border-t border-gray-200/60 text-center">
                    <p className="text-sm text-gray-500">
                        Are you a new student? <a href="/admissions" className="text-gray-900 font-semibold hover:underline transition-all">Apply for admission</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
