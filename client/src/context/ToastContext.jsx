import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

const ToastContext = createContext();

const TOAST_CONFIG = {
  success: {
    Icon: CheckCircle,
    light: {
      base: "bg-white/95 backdrop-blur-md border-[1px] border-slate-200/60 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)]",
      iconWrapper: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20",
      text: "text-slate-800",
      closeBtn: "text-slate-400 hover:text-slate-600 hover:bg-slate-100",
    },
    dark: {
      base: "bg-slate-900/95 backdrop-blur-md border-[1px] border-slate-700/50 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]",
      iconWrapper: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-400/20",
      text: "text-slate-200",
      closeBtn: "text-slate-500 hover:text-slate-300 hover:bg-slate-800",
    },
  },
  error: {
    Icon: XCircle,
    light: {
      base: "bg-white/95 backdrop-blur-md border-[1px] border-rose-100 shadow-[0_8px_40px_-12px_rgba(225,29,72,0.1)]",
      iconWrapper: "bg-rose-50 text-rose-600 ring-1 ring-rose-500/20",
      text: "text-slate-800",
      closeBtn: "text-slate-400 hover:text-slate-600 hover:bg-slate-100",
    },
    dark: {
      base: "bg-slate-900/95 backdrop-blur-md border-[1px] border-rose-900/30 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]",
      iconWrapper: "bg-rose-500/10 text-rose-400 ring-1 ring-rose-400/20",
      text: "text-slate-200",
      closeBtn: "text-slate-500 hover:text-slate-300 hover:bg-slate-800",
    },
  },
  warning: {
    Icon: AlertTriangle,
    light: {
      base: "bg-white/95 backdrop-blur-md border-[1px] border-amber-100 shadow-[0_8px_40px_-12px_rgba(217,119,6,0.1)]",
      iconWrapper: "bg-amber-50 text-amber-600 ring-1 ring-amber-500/20",
      text: "text-slate-800",
      closeBtn: "text-slate-400 hover:text-slate-600 hover:bg-slate-100",
    },
    dark: {
      base: "bg-slate-900/95 backdrop-blur-md border-[1px] border-amber-900/30 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]",
      iconWrapper: "bg-amber-500/10 text-amber-400 ring-1 ring-amber-400/20",
      text: "text-slate-200",
      closeBtn: "text-slate-500 hover:text-slate-300 hover:bg-slate-800",
    },
  },
  info: {
    Icon: Info,
    light: {
      base: "bg-white/95 backdrop-blur-md border-[1px] border-blue-100 shadow-[0_8px_40px_-12px_rgba(37,99,235,0.1)]",
      iconWrapper: "bg-blue-50 text-blue-600 ring-1 ring-blue-500/20",
      text: "text-slate-800",
      closeBtn: "text-slate-400 hover:text-slate-600 hover:bg-slate-100",
    },
    dark: {
      base: "bg-slate-900/95 backdrop-blur-md border-[1px] border-blue-900/30 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]",
      iconWrapper: "bg-blue-500/10 text-blue-400 ring-1 ring-blue-400/20",
      text: "text-slate-200",
      closeBtn: "text-slate-500 hover:text-slate-300 hover:bg-slate-800",
    },
  },
};

let toastId = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = "info", duration = 3000) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
    return id;
  }, [removeToast]);

  const toast = useMemo(() => ({
    success: (msg, duration) => addToast(msg, "success", duration),
    error: (msg, duration) => addToast(msg, "error", duration),
    warning: (msg, duration) => addToast(msg, "warning", duration),
    info: (msg, duration) => addToast(msg, "info", duration),
  }), [addToast]);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast Container */}
      <div className="fixed z-[100] flex flex-col gap-3 pointer-events-none left-4 right-4 top-4 sm:left-auto sm:right-6 sm:top-6 sm:w-auto sm:min-w-[320px] sm:max-w-md">
        {toasts.map((t) => {
          const config = TOAST_CONFIG[t.type] || TOAST_CONFIG.info;
          const themeConfig = isDarkMode ? config.dark : config.light;
          const { Icon } = config;
          const { base, iconWrapper, text, closeBtn } = themeConfig;
          
          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex w-full items-center gap-3 overflow-hidden rounded-[4px] p-3 pr-4 animate-toastIn transition-all duration-300 ${base}`}
            >
              {/* Icon */}
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[3px] ${iconWrapper}`}>
                <Icon size={20} strokeWidth={2.5} />
              </div>
              
              {/* Message */}
              <div className="flex-1 min-w-0">
                <p className={`text-[0.925rem] font-medium leading-tight ${text}`}>
                  {t.message}
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => removeToast(t.id)}
                aria-label="Dismiss notification"
                className={`inline-flex shrink-0 h-8 w-8 items-center justify-center rounded-[3px] transition-colors ${closeBtn}`}
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

