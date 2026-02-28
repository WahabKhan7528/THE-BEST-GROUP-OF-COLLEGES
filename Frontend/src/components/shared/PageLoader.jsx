import { School } from "lucide-react";

const PageLoader = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-surface w-full h-full min-h-screen">
            <div className="relative flex items-center justify-center">
                {/* Outer pulsing ring */}
                <div className="absolute w-24 h-24 rounded-full border-2 border-primary-500/30 animate-ping-slow" />

                {/* Inner spinning ring */}
                <div className="absolute w-16 h-16 rounded-full border-t-2 border-l-2 border-primary-600 bg-primary-50/50 backdrop-blur-sm animate-spin-slow" />

                {/* Center Icon */}
                <div className="relative z-10 text-primary-700 bg-white p-2.5 rounded-full shadow-sm shadow-primary-500/20 animate-pulse">
                    <School size={24} strokeWidth={2.5} />
                </div>
            </div>

            {/* Loading Text */}
            <div className="mt-8 flex flex-col items-center">
                <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500 tracking-wide animate-pulse">
                    THE BEST GROUP OF COLLEGES
                </h3>

                <div className="flex items-center gap-1 mt-1 text-sm font-medium text-secondary">
                    <span>Loading</span>
                    <span className="flex gap-0.5">
                        <span className="w-1 h-1 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                        <span className="w-1 h-1 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                        <span className="w-1 h-1 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                    </span>
                </div>
            </div>

            <style>{`
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.5); opacity: 0.1; }
          100% { transform: scale(1); opacity: 0.3; }
        }
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
        .animate-ping-slow {
          animation: ping-slow 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default PageLoader;