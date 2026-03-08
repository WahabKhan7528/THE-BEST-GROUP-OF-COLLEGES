import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Send } from "lucide-react";
import Card from "./Card";
import PublicButton from "../shared/PublicButton";

export default function AdmissionForm({ programs }) {
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleApplicationSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_APPLICATION_TEMPLATE,
                formRef.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            alert("Application submitted successfully");
            e.target.reset();
        } catch (error) {
            console.error(error);
            alert("Application submission failed");
        } finally {
            setLoading(false);
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

            <form ref={formRef} onSubmit={handleApplicationSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-college-navy mb-2 tracking-wide">Full Name *</label>
                        <input name="fullname" type="text" required className="w-full px-4 py-3.5 rounded border border-gray-200 bg-gray-50 focus:bg-white focus:border-college-navy focus:ring-2 focus:ring-college-navy/30 dark:focus:ring-college-gold/30 outline-none transition-all" placeholder="Enter your full name" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-college-navy mb-2 tracking-wide">Email Address *</label>
                        <input name="email" type="email" required className="w-full px-4 py-3.5 rounded border border-gray-200 bg-gray-50 focus:bg-white focus:border-college-navy focus:ring-2 focus:ring-college-navy/30 dark:focus:ring-college-gold/30 outline-none transition-all" placeholder="Enter your email" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-college-navy mb-2 tracking-wide">Phone Number *</label>
                        <input name="phone" type="tel" required className="w-full px-4 py-3.5 rounded border border-gray-200 bg-gray-50 focus:bg-white focus:border-college-navy focus:ring-2 focus:ring-college-navy/30 dark:focus:ring-college-gold/30 outline-none transition-all" placeholder="+92 300 1234567" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-college-navy mb-2 tracking-wide">CNIC Number</label>
                        <input name="cnic" type="text" className="w-full px-4 py-3.5 rounded border border-gray-200 bg-gray-50 focus:bg-white focus:border-college-navy focus:ring-2 focus:ring-college-navy/30 dark:focus:ring-college-gold/30 outline-none transition-all" placeholder="12345-1234567-1" />
                    </div>
                    <div className="xl:col-span-2">
                        <label className="block text-sm font-bold text-college-navy mb-2 tracking-wide">Select Program *</label>
                        <select name="program" required className="w-full px-4 py-3.5 rounded border border-gray-200 bg-gray-50 focus:bg-white focus:border-college-navy focus:ring-2 focus:ring-college-navy/30 dark:focus:ring-college-gold/30 outline-none transition-all text-gray-700">
                            <option value="">Choose a program</option>
                            {programs && programs.map((program) => (
                                <option key={program.value} value={program.value}>{program.label} - {program.campus}</option>
                            ))}
                        </select>
                    </div>
                    <div className="xl:col-span-2">
                        <label className="block text-sm font-bold text-college-navy mb-2 tracking-wide">Previous Education</label>
                        <input name="previous_education" type="text" className="w-full px-4 py-3.5 rounded border border-gray-200 bg-gray-50 focus:bg-white focus:border-college-navy focus:ring-2 focus:ring-college-navy/30 dark:focus:ring-college-gold/30 outline-none transition-all" placeholder="e.g., Matric with 85% marks" />
                    </div>
                    <div className="md:col-span-2 lg:col-span-3 xl:col-span-4">
                        <label className="block text-sm font-bold text-college-navy mb-2 tracking-wide">Additional Message</label>
                        <textarea name="message" rows="3" className="w-full px-4 py-3.5 rounded border border-gray-200 bg-gray-50 focus:bg-white focus:border-college-navy focus:ring-2 focus:ring-college-navy/30 dark:focus:ring-college-gold/30 outline-none transition-all resize-none" placeholder="Any additional information you'd like to share..." />
                    </div>
                </div>

                <PublicButton type="submit" disabled={loading} variant="primary" size="md" shape="slanted" className="w-full font-bold py-4 rounded transition-all shadow-md uppercase tracking-wider text-sm mt-4" icon={Send}>
                    {loading ? "Submitting..." : "Submit Application"}
                </PublicButton>
            </form>
        </Card>
    );
}
