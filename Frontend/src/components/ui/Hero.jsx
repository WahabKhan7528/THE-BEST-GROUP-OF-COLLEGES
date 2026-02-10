import { clsx } from "clsx";
import { motion } from "framer-motion";
import { Calendar, Bell } from "lucide-react";

const Hero = ({
  title,
  image,
  announcements = [],
  className,
  ...props
}) => {
  return (
    <section
      className={clsx(
        "relative min-h-screen flex items-center bg-gray-900 overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={title || "Hero Background"}
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Title */}
          {title && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-100 leading-none tracking-tighter drop-shadow-2xl">
                {title}
              </h1>
              <div className="flex gap-4 pt-4">
                <a
                  href="/admissions"
                  className="px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
                >
                  Apply Now
                </a>
                <a
                  href="/about"
                  className="px-8 py-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold rounded-xl border-2 border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
                >
                  More Info
                </a>
              </div>
            </motion.div>
          )}

          {/* Right Column - Announcements */}
          {announcements?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                  Recent Announcements
                </h2>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto scrollbar-hide">
                {announcements.map((announcement, index) => (
                  <motion.div
                    key={announcement.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white/60 backdrop-blur-md rounded-xl p-5 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-white/40 hover:border-white/60 group"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1 transition-colors">
                        {announcement.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {announcement.date}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {announcement.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
