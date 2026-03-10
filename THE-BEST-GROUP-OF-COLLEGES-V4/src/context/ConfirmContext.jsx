import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { AlertTriangle, X } from "lucide-react";

const ConfirmContext = createContext();

export const ConfirmProvider = ({ children }) => {
  const [state, setState] = useState(null);

  const confirm = useCallback(({ title = "Are you sure?", message = "", confirmText = "Confirm", cancelText = "Cancel", variant = "danger" } = {}) => {
    return new Promise((resolve) => {
      setState({ title, message, confirmText, cancelText, variant, resolve });
    });
  }, []);

  const handleClose = (result) => {
    state?.resolve(result);
    setState(null);
  };

  const cancelRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (state) {
      previousFocusRef.current = document.activeElement;
      cancelRef.current?.focus();
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [state]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") handleClose(false);
  };

  const variantStyles = {
    danger: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
    info: "bg-college-navy dark:bg-college-gold hover:opacity-90 text-white dark:text-college-navy",
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {state && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title" onKeyDown={handleKeyDown}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => handleClose(false)} aria-hidden="true" />
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200 dark:border-college-gold/15">
            <button
              onClick={() => handleClose(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertTriangle size={20} className="text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 id="confirm-dialog-title" className="text-lg font-semibold text-gray-900 dark:text-white">{state.title}</h3>
                {state.message && (
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{state.message}</p>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                ref={cancelRef}
                onClick={() => handleClose(false)}
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-college-gold/20 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
              >
                {state.cancelText}
              </button>
              <button
                onClick={() => handleClose(true)}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${variantStyles[state.variant]}`}
              >
                {state.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm must be used within ConfirmProvider");
  }
  return context;
};
