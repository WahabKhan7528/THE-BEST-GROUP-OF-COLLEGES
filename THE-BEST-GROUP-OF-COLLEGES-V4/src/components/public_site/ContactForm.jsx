import { useRef, useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import PublicButton from "../shared/PublicButton";

export default function ContactForm({ className }) {
    const formRef = useRef();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE,
                formRef.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            alert("Message sent successfully");
            e.target.reset();
        } catch (error) {
            console.error(error);
            alert("Failed to send message");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={className}>
            <div className="bg-white border border-gray-200 overflow-hidden transition-all duration-300 ease-out rounded-2xl shadow-xl p-6 md:p-10 border-t-4 border-t-college-gold">
                <div className="flex items-center gap-3 md:gap-4 mb-8">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-college-navy/5 border border-college-navy/10 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 md:w-7 md:h-7 text-college-navy" />
                    </div>
                    <div>
                        <h2 className="text-xl md:text-3xl font-serif font-bold text-college-navy">
                            Send us a Message
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base mt-1">
                            We'll get back to you within 24 hours
                        </p>
                    </div>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <input type="hidden" name="_subject" value="New Contact Form Submission" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-bold text-college-navy mb-2 tracking-wide">
                                Full Name *
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                required
                                className="w-full px-4 py-3.5 rounded border border-gray-200 bg-gray-50 focus:bg-white focus:border-college-navy focus:ring-2 focus:ring-college-navy/30 dark:focus:ring-college-gold/30 outline-none transition-all"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-college-navy mb-2 tracking-wide">
                                Email Address *
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                required
                                className="w-full px-4 py-3.5 rounded border border-gray-200 bg-gray-50 focus:bg-white focus:border-college-navy focus:ring-2 focus:ring-college-navy/30 dark:focus:ring-college-gold/30 outline-none transition-all"
                                placeholder="your@email.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-bold text-college-navy mb-2 tracking-wide">
                            Phone Number
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            name="phone"
                            className="w-full px-4 py-3.5 rounded border border-gray-200 bg-gray-50 focus:bg-white focus:border-college-navy focus:ring-2 focus:ring-college-navy/30 dark:focus:ring-college-gold/30 outline-none transition-all"
                            placeholder="+92 XXX XXXXXXX"
                        />
                    </div>

                    <div>
                        <label htmlFor="subject" className="block text-sm font-bold text-college-navy mb-2 tracking-wide">
                            Subject *
                        </label>
                        <select
                            id="subject"
                            name="subject"
                            required
                            className="w-full px-4 py-3.5 rounded border border-gray-200 bg-gray-50 focus:bg-white focus:border-college-navy focus:ring-2 focus:ring-college-navy/30 dark:focus:ring-college-gold/30 outline-none transition-all text-gray-700"
                        >
                            <option value="">Select a subject</option>
                            <option value="admissions">Admissions Inquiry</option>
                            <option value="programs">Program Information</option>
                            <option value="fees">Fee Structure</option>
                            <option value="scholarships">Scholarships</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-bold text-college-navy mb-2 tracking-wide">
                            Message *
                        </label>
                        <textarea
                            id="message"
                            rows="5"
                            name="message"
                            required
                            className="w-full px-4 py-3.5 rounded border border-gray-200 bg-gray-50 focus:bg-white focus:border-college-navy focus:ring-2 focus:ring-college-navy/30 dark:focus:ring-college-gold/30 outline-none transition-all resize-none"
                            placeholder="How can we help you?"
                        />
                    </div>

                    <PublicButton
                        type="submit"
                        disabled={loading}
                        variant="primary"
                        size="lg"
                        className="w-full transition-all shadow-md uppercase tracking-wider text-sm font-bold py-4 rounded"
                        icon={Send}
                        shape="slanted"
                    >
                        {loading ? "Sending..." : "Contact Us"}
                    </PublicButton>
                </form>
            </div>
        </div>
    );
}
