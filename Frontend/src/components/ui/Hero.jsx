import { clsx } from "clsx";
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
  className,
  ...props
}) => {
  return (
    <section
      className={clsx(
        "relative",
        {
          "min-h-[550px]": !fullHeight,
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
      >
        {overlay && (
          <div className="absolute inset-0 bg-black opacity-50"></div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full">
        <div
          className={clsx(
            "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32",
            {
              "text-center": centered,
            }
          )}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {title}
          </h1>
          {(description || subtitle) && (
            <p className="text-xl text-gray-100 max-w-3xl mx-auto mb-8">
              {description || subtitle}
            </p>
          )}
          {actions && (
            <div
              className={clsx("flex gap-4", {
                "justify-center": centered,
              })}
            >
              {actions.map((action, index) => (
                <Button key={index} {...action} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
