import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { Send } from "lucide-react";
import Card from "../shared/Card";
import PublicButton from "../shared/PublicButton";
import { useToast } from "../../context/ToastContext";
import { admissionSchema } from "../../schemas/admissionSchema";

const inputBase = "w-full px-4 py-3.5 rounded border bg-gray-50 focus:bg-white focus:border-college-navy focus:ring-2 focus:ring-college-navy/30 dark:focus:ring-college-gold/30 outline-none transition-all";
const inputOk = `${inputBase} border-gray-200`;
const inputErr = `${inputBase} border-red-400`;

export default function AdmissionForm({ programs }) {
    const formRef = useRef(null);
    const toast = useToast();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(admissionSchema),
    });

    const onSubmit = async () => {
        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_APPLICATION_TEMPLATE,
                formRef.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            toast.success("Application submitted successfully");
            reset();
        } catch {
            toast.error("Application submission failed");
        }
    };

    return (
        <Card variant="default" hover={false} className="relative z-10 p-6 md:p-10 w-full max-w-7xl mx-auto border-t-4 border-t-college-gold shadow-xl">
            <div className="flex items-center gap-3 md:gap-4 mb-8">
                <div>
                    <h2 className="text-xl md:text-3xl font-serif font-bold text-college-navy">Apply for Admission</h2>
                    <p className="text-gray-500 text-sm md:text-base mt-1">Start your journey with us today</p>
                </div>
            </div>

            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-college-navy mb-2 tracking-wide">Full Name *</label>
                        <input {...register("fullname")} type="text" className={errors.fullname ? inputErr : inputOk} placeholder="Enter your full name" />
                        {errors.fullname && <p className="text-red-500 text-xs mt-1">{errors.fullname.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-college-navy mb-2 tracking-wide">Email Address *</label>
                        <input {...register("email")} type="email" className={errors.email ? inputErr : inputOk} placeholder="Enter your email" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-college-navy mb-2 tracking-wide">Phone Number *</label>
                        <input {...register("phone")} type="tel" className={errors.phone ? inputErr : inputOk} placeholder="+92 300 1234567" />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-college-navy mb-2 tracking-wide">CNIC Number</label>
                        <input {...register("cnic")} type="text" className={inputOk} placeholder="12345-1234567-1" />
                    </div>
                    <div className="xl:col-span-2">
                        <label className="block text-sm font-bold text-college-navy mb-2 tracking-wide">Select Program *</label>
                        <select {...register("program")} className={errors.program ? inputErr + " text-gray-700" : inputOk + " text-gray-700"}>
                            <option value="">Choose a program</option>
                            {programs && programs.map((program) => (
                                <option key={program.value} value={program.value}>{program.label} - {program.campus}</option>
                            ))}
                        </select>
                        {errors.program && <p className="text-red-500 text-xs mt-1">{errors.program.message}</p>}
                    </div>
                    <div className="xl:col-span-2">
                        <label className="block text-sm font-bold text-college-navy mb-2 tracking-wide">Previous Education</label>
                        <input {...register("previous_education")} type="text" className={inputOk} placeholder="e.g., Matric with 85% marks" />
                    </div>
                    <div className="md:col-span-2 lg:col-span-3 xl:col-span-4">
                        <label className="block text-sm font-bold text-college-navy mb-2 tracking-wide">Additional Message</label>
                        <textarea {...register("message")} rows="3" className={inputOk + " resize-none"} placeholder="Any additional information you'd like to share..." />
                    </div>
                </div>

                <PublicButton type="submit" disabled={isSubmitting} variant="primary" size="md" shape="slanted" className="w-full font-bold py-4 rounded transition-all shadow-md uppercase tracking-wider text-sm mt-4" icon={Send}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                </PublicButton>
            </form>
        </Card>
    );
}
