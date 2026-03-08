import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PublicButton from "./PublicButton";
import FormInput from "./FormInput";

/**
 * PortalForms - A unified wrapper for forms across Admin and Faculty portals.
 * Ensures consistent back buttons, headers, container styling, and submit/cancel buttons.
 */
const PortalForms = ({
    title,
    subtitle,
    backPath,
    onSubmit,
    onCancel,
    submitLabel = "Save Changes",
    submitIcon: SubmitIcon,
    cancelLabel = "Cancel",
    headerActions,
    children
}) => {
    return (
        <div className="w-full mx-auto space-y-6">
            {/* Universal Header with Back Button */}
            {backPath && title && (
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            to={backPath}
                            className="p-2 rounded-xl hover:bg-white hover:shadow-sm text-gray-500 hover:text-gray-700 transition-all dark:hover:bg-college-navy/50 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <ArrowLeft size={20} className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-college-navy dark:text-white tracking-tight">{title}</h1>
                            {subtitle && (
                                <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
                            )}
                        </div>
                    </div>
                    {headerActions && <div>{headerActions}</div>}
                </div>
            )}

            {/* Main Form Wrapper */}
            <form
                onSubmit={onSubmit}
                className="space-y-6"
            >
                {/* Child sections go here */}
                {children}

                {/* Universal Action Buttons */}
                <div className="flex items-center justify-end gap-3 md:gap-4 pt-6 mt-4">
                    {onCancel && (
                        <PublicButton
                            variant="primary"
                            onClick={onCancel}
                            className="border-2 border-white/10"
                            type="button"
                        >
                            {cancelLabel}
                        </PublicButton>
                    )}
                    <PublicButton
                        type="submit"
                        variant="secondary"
                        shape="slanted"
                        size="md"
                        className="px-6 md:px-8 font-bold shadow-md transform hover:-translate-y-0.5"
                        icon={SubmitIcon}
                    >
                        {submitLabel}
                    </PublicButton>
                </div>
            </form>
        </div>
    );
};

/**
 * Section block for grouping fields inside PortalForms
 */
PortalForms.Section = ({ title, children, className = "" }) => (
    <section className={`bg-white/80 dark:bg-college-navy backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-6 md:p-8 rounded-2xl shadow-sm space-y-6 ${className}`}>
        {title && (
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100 dark:border-college-gold/20">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h2>
            </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children}
        </div>
    </section>
);

// Alias to FormInput to allow neat imports like <PortalForms.Input />
PortalForms.Input = FormInput;

export default PortalForms;
