import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/loginSchema";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowRight, Lock, User, Home, Key, Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import PublicButton from "../../components/shared/PublicButton";
import Card from "../../components/shared/Card";
import { useToast } from "../../context/ToastContext";
import { loginUser, logoutUser } from "../../store/slices/authSlice";

const Login = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const currentUser = useSelector((state) => state.auth.user);
  const [showPassword, setShowPassword] = useState(false);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);
  const lockoutTimerRef = useRef(null);
  const isLoginLocked = lockoutSeconds > 0;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const portalType = type ? type.toLowerCase() : "";

  useEffect(() => {
    if (!currentUser) return;

    if (portalType === "admin" && (currentUser.role === "super_admin" || currentUser.role === "admin")) {
      navigate("/admin/dashboard", { replace: true });
      return;
    }

    if (portalType === "faculty" && currentUser.role === "faculty") {
      navigate("/faculty/dashboard", { replace: true });
      return;
    }

    if (portalType === "student" && currentUser.role === "student") {
      navigate("/student/dashboard", { replace: true });
      return;
    }

    if (portalType === "admin" || portalType === "faculty" || portalType === "student") {
      dispatch(logoutUser()).unwrap().catch(() => null);
    }
  }, [currentUser, dispatch, navigate, portalType]);

  const portalinfo =
    portalType === "admin"
      ? {
          title: "Admin Portal",
          description: "Manage college system and operations",
          path: "/admin/dashboard",
        }
      : portalType === "faculty"
        ? {
            title: "Faculty Portal",
            description: "Access teaching resources and manage classes",
            path: "/faculty/dashboard",
          }
        : portalType === "student"
          ? {
              title: "Student Portal",
              description: "View courses, grades, and campus resources",
              path: "/student/dashboard",
            }
          : {
              title: "Portal Login",
              description: "Please select a valid portal",
              path: "/",
            };

      const allowedRolesByPortal = {
        admin: ["super_admin", "admin"],
        faculty: ["faculty"],
        student: ["student"],
      };

  const handleLogin = async (formData) => {
    if (isLoginLocked) {
      return;
    }

    try {
      const result = await dispatch(
        loginUser({
          loginId: formData.id?.trim(),
          password: formData.password,
          allowedRoles: allowedRolesByPortal[portalType] || [],
        })
      ).unwrap();

      const role = result.role;

      if (role === "super_admin" || role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "faculty") {
        navigate("/faculty/dashboard");
      } else if (role === "student") {
        navigate("/student/dashboard");
      } else {
        navigate(portalinfo.path);
      }

      toast.success("Login successful");
    } catch (error) {
      await dispatch(logoutUser()).unwrap().catch(() => null);
      const status = error?.status || null;
      const message = error?.message || "Login failed";

      if (status === 429) {
        setLockoutSeconds(15 * 60);
      }

      toast.error(message);
    }
  };

  useEffect(() => {
    if (!isLoginLocked) {
      if (lockoutTimerRef.current) {
        clearInterval(lockoutTimerRef.current);
        lockoutTimerRef.current = null;
      }
      return;
    }

    lockoutTimerRef.current = setInterval(() => {
      setLockoutSeconds((seconds) => {
        if (seconds <= 1) {
          clearInterval(lockoutTimerRef.current);
          lockoutTimerRef.current = null;
          return 0;
        }

        return seconds - 1;
      });
    }, 1000);

    return () => {
      if (lockoutTimerRef.current) {
        clearInterval(lockoutTimerRef.current);
        lockoutTimerRef.current = null;
      }
    };
  }, [isLoginLocked]);

  const lockoutMinutes = String(Math.floor(lockoutSeconds / 60)).padStart(2, "0");
  const lockoutRemainingSeconds = String(lockoutSeconds % 60).padStart(2, "0");

  const titleWords = portalinfo.title.split(" ");

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-college-navy relative overflow-hidden font-sans"
      style={{
        backgroundImage: "url('/login-bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-xl px-4 relative z-10 backdrop-blur-sm">
        <Card
          variant="navy"
          hover={false}
          className="p-5 sm:p-8 md:p-10 lg:p-12 bg-college-navy/70"
        >
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

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-college-gold uppercase tracking-widest ml-1">
                {portalType === "admin"
                  ? "Admin ID"
                  : portalType === "faculty"
                    ? "Faculty ID"
                    : portalType === "student"
                      ? "Student ID"
                      : "ID"}
              </label>
              <div className="relative group">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-college-gold transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  {...register("id")}
                  className="w-full pl-12 pr-4 py-4 rounded-sm border border-white/10 bg-white/5 focus:bg-white/10 focus:ring-2 focus:ring-college-navy/50 focus:border-college-navy outline-none text-white placeholder:text-white/20"
                  placeholder={
                    portalType === "admin"
                      ? "e.g. ADM-1234"
                      : portalType === "faculty"
                        ? "e.g. FAC-1234"
                        : portalType === "student"
                          ? "e.g. STD-1234"
                          : "ID"
                  }
                  disabled={isLoginLocked}
                />
              </div>
              {errors.id && (
                <p className="text-xs text-red-400 ml-1 mt-1">
                  {errors.id.message}
                </p>
              )}
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
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="w-full pl-12 pr-12 py-4 rounded-sm border border-white/10 bg-white/5 focus:bg-white/10 focus:ring-2 focus:ring-college-navy/50 focus:border-college-navy outline-none text-white placeholder:text-white/20"
                  placeholder="********"
                  disabled={isLoginLocked}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-college-gold transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={isLoginLocked}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400 ml-1 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <PublicButton
                variant="secondary"
                size="lg"
                type="submit"
                disabled={isSubmitting || isLoginLocked}
                shape="slanted"
                className="w-full font-bold uppercase tracking-widest"
              >
                <span className="flex items-center justify-center gap-3">
                  {isSubmitting
                    ? "Verifying..."
                    : isLoginLocked
                      ? `Try again in ${lockoutMinutes}:${lockoutRemainingSeconds}`
                      : "Sign In"}
                  {isSubmitting && !isLoginLocked ? (
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
      </div>
    </div>
  );
};

export default Login;
