import { clsx } from "clsx";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = ({ title, image, announcements = [], className, ...props }) => {
  return (
    <section
      className={clsx(
        "relative min-h-[600px] flex items-center bg-primary-950 overflow-hidden",
        className,
      )}
      {...props}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {image && (
          <img
            src={image}
            alt={title || "Hero Background"}
            className="hero-bg w-full h-full object-cover"
            loading="eager"
            fetchpriority="high"
            sizes="100vw"
          />
        )}
        {/* Overlay - simplified */}
        <div className="absolute inset-0 bg-primary-950/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Title */}
          {title && (
            <div className="space-y-6 text-center md:text-left">
              <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                {title}
              </h1>
              <div className="hero-buttons flex flex-col sm:flex-row gap-4 pt-4 items-center md:items-start">
                <Link
                  to="/admissions"
                  className="w-full sm:w-auto h-12 px-8 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Apply Now
                </Link>

                <Link
                  to="/about"
                  className="w-full sm:w-auto h-12 px-8 bg-transparent border-2 border-white/80 text-white hover:bg-white hover:text-primary-900 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  More Info
                </Link>
              </div>
            </div>
          )}

          {/* Right Column - Announcements */}
          {announcements?.length > 0 && (
            <div className="space-y-4">
              <div className="hero-announcements-header flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary-800 flex items-center justify-center border border-primary-700">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Recent Announcements
                </h2>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto no-scrollbar">
                {announcements.map((announcement, index) => (
                  <div
                    key={announcement.id || index}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:border-primary-300 transition-all duration-200"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-primary-900 mb-1 transition-colors">
                        {announcement.title}
                      </h3>
                      <p className="text-sm text-secondary-500 mb-2">
                        {announcement.date}
                      </p>
                      <p className="text-secondary-700 text-sm leading-relaxed">
                        {announcement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
