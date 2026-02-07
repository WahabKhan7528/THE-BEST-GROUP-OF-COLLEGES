import { clsx } from "clsx";
import { motion } from "framer-motion";
import Button from "./Button";

const Hero = ({
  title,
  description,
  subtitle,
  image,
  actions,
  overlay = true,
  centered = true,
  fullHeight = false,
  badge,
  className,
  ...props
}) => {
  return (
    <section
      className={clsx(
        "relative overflow-hidden",
        {
          "min-h-[600px] md:min-h-[800px]": !fullHeight,
          "min-h-screen": fullHeight,
        },
        className
      )}
      {...props}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${image}')`,
        }}
      />

      {/* Gradient Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/85 to-gray-900/70" />
      )}

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Content */}
      {/* Content Removed as per request */}
      {/* 
      <div className="relative z-10 flex items-center h-full">
         ... (Content hidden)
      </div> 
      */}
    </section>
  );
};

export default Hero;
