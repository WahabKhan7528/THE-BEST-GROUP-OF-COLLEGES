import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowRight, Lock, Mail, Home, Key } from "lucide-react";
import PublicButton from "../../components/shared/PublicButton";
import GSAPReveal from "../../components/shared/GSAPReveal";
import Card from "../../components/public_site/Card";

const Login = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  const getPortalInfo = () => {
    const portalType = type ? type.toLowerCase() : "";

    switch (portalType) {
      case "admin":
        return {
          title: "Admin Portal",
          description: "Manage college system and operations",
          path: "/admin/dashboard",
        };
      case "faculty":
        return {
          title: "Faculty Portal",
          description: "Access teaching resources and manage classes",
          path: "/faculty/dashboard",
        };
      case "student":
        return {
          title: "Student Portal",
          description: "View courses, grades, and campus resources",
          path: "/student/dashboard",
        };
      default:
        return {
          title: "Portal Login",
          description: "Please select a valid portal",
          path: "/",
        };
    }
  };

  const portalinfo = getPortalInfo();

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Add actual login logic here
    // setLoading(true);
    // setTimeout(() => {
    //   navigate(portalinfo.path);
    // }, 600);
    navigate(portalinfo.path);
  };

  const titleWords = portalinfo.title.split(" ");

  return (
    <div className="min-h-screen flex items-center justify-center bg-college-navy relative overflow-hidden font-sans">
      {/* Background Ornaments */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-college-gold/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-college-gold/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-college-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-xl px-4 relative z-10">
        <GSAPReveal>
          <Card variant="navy" hover={false} className="p-5 sm:p-8 md:p-10 lg:p-12">
            {/* Home Icon */}
            <div className="flex justify-between items-center mb-10">
              <Link
                to="/"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-college-gold/20 hover:border-college-gold/30 transition-all group"
              >
                <Home className="w-5 h-5 text-white/50 group-hover:text-college-gold transition-colors" />
              </Link>
              <div className="w-10 h-10 rounded-full bg-college-gold/20 flex items-center justify-center">
                <Key className="w-5 h-5 text-college-gold" />
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-white uppercase tracking-wider">
                {titleWords[0]}{" "}
                <span className="text-college-gold">{titleWords[1]}</span>
              </h1>
              <div className="h-1 bg-college-gold mt-5 mb-5 w-16 mx-auto" />
              <p className="text-white/50 font-sans text-sm md:text-base max-w-xs mx-auto">
                {portalinfo.description}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-college-gold uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-college-gold transition-colors"
                    size={20}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-white/10 bg-white/5 focus:bg-white/10 focus:ring-2 focus:ring-college-navy/50 dark:focus:ring-college-gold/50 focus:border-college-navy dark:focus:border-college-gold outline-none transition-all font-sans text-white placeholder:text-white/20 [clip-path:polygon(0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)]"
                    placeholder="name@college.edu"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-college-gold uppercase tracking-widest ml-1">
                  Password
                </label>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-college-gold transition-colors"
                    size={20}
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-white/10 bg-white/5 focus:bg-white/10 focus:ring-2 focus:ring-college-navy/50 dark:focus:ring-college-gold/50 focus:border-college-navy dark:focus:border-college-gold outline-none transition-all font-sans text-white placeholder:text-white/20 [clip-path:polygon(0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)]"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="pt-2">
                <PublicButton
                  variant="secondary"
                  size="lg"
                  type="submit"
                  disabled={loading}
                  shape="slanted"
                  className="w-full font-bold uppercase tracking-widest"
                >
                  <span className="flex items-center justify-center gap-3">
                    {loading ? "Verifying..." : "Sign In"}
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-college-navy/30 border-t-college-navy rounded-full animate-spin" />
                    ) : (
                      <ArrowRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    )}
                  </span>
                </PublicButton>
              </div>

              {type?.toLowerCase() === "student" && (
                <div className="text-center pt-6 border-t border-white/10 mt-8">
                  <p className="text-xs text-white/30 font-sans">
                    Unauthorized access is strictly prohibited.
                  </p>
                  <Link
                    to="/admissions"
                    className="inline-block mt-3 text-sm text-college-gold font-bold hover:text-white transition-colors"
                  >
                    Request Portal Access
                  </Link>
                </div>
              )}
            </form>
          </Card>
        </GSAPReveal>
      </div>
    </div>
  );
};

export default Login;
