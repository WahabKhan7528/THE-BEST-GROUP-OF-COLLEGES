import { useRef, useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import Card from "./Card";
import Button from "../shared/Button";

const ContactForm = () => {
    const formRef = useRef();
    const [loading, setLoading] = useState(false);

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE,
                formRef.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            alert("Message sent successfully ✅");
            e.target.reset();
        } catch (error) {
            console.error(error);
            alert("Failed to send message ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card shadow="xl" className="p-5 md:p-8">
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary-100 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 md:w-6 md:h-6 text-primary-600" />
                </div>
                <div>
                    <h2 className="text-lg md:text-2xl font-bold text-gray-900">Send us a Message</h2>
                    <p className="text-gray-500 text-xs md:text-sm">We'll get back to you within 24 hours</p>
                </div>
            </div>

            <form
                ref={formRef}
                onSubmit={handleContactSubmit}
                className="space-y-5"
            >
                <input type="hidden" name="_subject" value="New Contact Form Submission" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                            placeholder="Your name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                            placeholder="your@email.com"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        name="phone"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                        placeholder="+92 XXX XXXXXXX"
                    />
                </div>

                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                    </label>
                    <select
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
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
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                    </label>
                    <textarea
                        id="message"
                        rows="4"
                        name="message"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all resize-none"
                        placeholder="How can we help you?"
                    ></textarea>
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    variant="gradient"
                    size="lg"
                    className="w-full"
                    icon={Send}
                >
                    {loading ? "Sending..." : "Send Message"}
                </Button>

            </form>
        </Card>
    );
};

export default ContactForm;
