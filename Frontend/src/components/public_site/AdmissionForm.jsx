import { useRef, useState } from "react";
import { Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import Card from "./Card";
import Button from "../shared/Button";


const programs = [
    { value: "llb", label: "Bachelor of Laws (LLB)", campus: "Law Campus" },
    { value: "llm", label: "Master of Laws (LLM)", campus: "Law Campus" },
    { value: "bs", label: "Bachelor of Science (BS)", campus: "Main Campus" },
    { value: "ba", label: "Bachelor of Arts (BA)", campus: "Main Campus" },
    { value: "ma", label: "Master of Arts (MA)", campus: "Main Campus" },
    { value: "fsc-pre-med", label: "FSc (Pre-Medical)", campus: "Hala Campus" },
    { value: "fsc-pre-eng", label: "FSc (Pre-Engineering)", campus: "Hala Campus" },
    { value: "ics", label: "ICS (Computer Science)", campus: "Hala Campus" },
    { value: "fa", label: "FA (Arts)", campus: "Hala Campus" },
];

const AdmissionForm = () => {
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

            alert("Application submitted successfully 🎓");
            e.target.reset();
        } catch (error) {
            console.error(error);
            alert("Application submission failed ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
        >
            <Card className="max-w-3xl mx-auto p-8" shadow="xl">
                <form ref={formRef} onSubmit={handleApplicationSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name *
                            </label>
                            <input
                                name="fullname"
                                type="text"
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address *
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Phone Number *
                            </label>
                            <input
                                name="phone"
                                type="tel"
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                                placeholder="+92 300 1234567"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                CNIC Number
                            </label>
                            <input
                                name="cnic"
                                type="text"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                                placeholder="12345-1234567-1"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Select Program *
                        </label>
                        <select
                            name="program"
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                        >
                            <option value="">Choose a program</option>
                            {programs.map((program) => (
                                <option key={program.value} value={program.value}>
                                    {program.label} - {program.campus}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Previous Education
                        </label>
                        <input
                            name="previous_education"
                            type="text"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                            placeholder="e.g., Matric with 85% marks"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Additional Message
                        </label>
                        <textarea
                            name="message"
                            rows="4"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none bg-gray-50 hover:bg-white"
                            placeholder="Any additional information you'd like to share..."
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        icon={Send}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit Application"}
                    </Button>

                    <p className="text-center text-sm text-gray-500">
                        By submitting this form, you agree to our terms and conditions.
                    </p>
                </form>
            </Card>
        </div>
    );
};

export default AdmissionForm;
