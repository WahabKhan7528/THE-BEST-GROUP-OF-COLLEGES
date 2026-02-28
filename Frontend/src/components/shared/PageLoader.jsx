import { motion } from "framer-motion";
import { School } from "lucide-react";

const PageLoader = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-surface w-full h-full min-h-screen">
            <div className="relative flex items-center justify-center">
                {/* Outer pulsing ring */}
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute w-24 h-24 rounded-full border-2 border-primary-500/30"
                />

                {/* Inner spinning/pulsing ring */}
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1],
                        borderRadius: ["50%", "40%", "50%"],
                    }}
                    transition={{
                        rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                        borderRadius: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    }}
                    className="absolute w-16 h-16 rounded-full border-t-2 border-l-2 border-primary-600 bg-primary-50/50 backdrop-blur-sm"
                />

                {/* Center Icon */}
                <motion.div
                    animate={{
                        scale: [0.9, 1.1, 0.9],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="relative z-10 text-primary-700 bg-white p-2.5 rounded-full shadow-sm shadow-primary-500/20"
                >
                    <School size={24} strokeWidth={2.5} />
                </motion.div>
            </div>

            {/* Loading Text */}
            <div className="mt-8 flex flex-col items-center">
                <motion.h3
                    className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500 tracking-wide"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    THE BEST GROUP OF COLLEGES
                </motion.h3>

                <div className="flex items-center gap-1 mt-1 text-sm font-medium text-secondary">
                    <span>Loading</span>
                    <motion.div className="flex gap-0.5">
                        {[0, 1, 2].map((i) => (
                            <motion.span
                                key={i}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeInOut",
                                }}
                                className="w-1 h-1 bg-primary-500 rounded-full"
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default PageLoader;