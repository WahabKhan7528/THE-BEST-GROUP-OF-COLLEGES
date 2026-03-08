import { clsx } from "clsx";
import { Link } from "react-router-dom";

const variants = {
    primary:
        "bg-college-navy text-white border-2 border-college-navy shadow-sm hover:brightness-150 hover:shadow-md active:brightness-95",
    secondary:
        "bg-college-gold text-white border-2 border-college-gold shadow-sm hover:brightness-90 hover:shadow-md active:brightness-75",
    ghost:
        "text-college-navy dark:text-college-gold hover:opacity-80 transition-opacity",
    danger:
        "bg-red-600 text-white border-2 border-red-600 shadow-sm hover:bg-red-700 hover:border-red-700 active:bg-red-800 active:border-red-800 font-bold",
    unstyled:
        "",
};

const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-lg gap-1.5",
    md: "px-5 py-2.5 text-sm font-medium rounded-md gap-2",
    lg: "px-6 py-3 text-base font-medium rounded-lg gap-2.5",
    icon: "p-2 rounded-full",
    none: "",
};

const shapes = {
    normal: "",
    slanted: {
        sm: "[clip-path:polygon(0_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%)]",
        md: "[clip-path:polygon(0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)]",
        lg: "[clip-path:polygon(0_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%)]",
        icon: "[clip-path:polygon(0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)]",
        none: "[clip-path:polygon(0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)]",
    },
};

export default function PublicButton({
    children,
    variant = "primary",
    size = "md",
    shape = "normal",
    className,
    icon: Icon,
    disabled = false,
    to,
    ...props
}) {
    const shapeClass = shape === "slanted" ? (shapes.slanted[size] ?? shapes.slanted.md) : "";

    const baseClasses = clsx(
        "inline-flex items-center justify-center transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-college-navy/50 dark:focus:ring-college-gold/50 focus:ring-offset-1",
        variants[variant] ?? variants.primary,
        sizes[size] ?? sizes.md,
        shapeClass,
        {
            "opacity-50 cursor-not-allowed pointer-events-none": disabled,
        },
        className
    );

    const content = (
        <>
            {children}
            {Icon && (
                <Icon className={clsx("flex-shrink-0", size === "sm" ? "h-4 w-4" : "h-5 w-5")} />
            )}
        </>
    );

    if (to) {
        return (
            <Link to={to} className={baseClasses} {...props}>
                {content}
            </Link>
        );
    }

    return (
        <button
            className={baseClasses}
            disabled={disabled}
            {...props}
        >
            {content}
        </button>
    );
}
