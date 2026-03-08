import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import PublicButton from "../shared/PublicButton";
import Badge from "./Badge";
import { faqs } from "../../data/faqData";

export default function FAQ({ limit, className, centered = false, description }) {
    const [openIndex, setOpenIndex] = useState(null);
    const displayedFaqs = limit ? faqs.slice(0, limit) : faqs;

    return (
        <div className={clsx("flex flex-col h-full", className)}>
            <div className={clsx("mb-8", centered && "flex flex-col items-center text-center")}>
                <div className="mb-4">
                    <Badge variant="outline">Questions</Badge>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-college-navy mb-4">
                    FAQ
                </h2>
                {description && (
                    <p className="text-gray-600 max-w-2xl text-lg">
                        {description}
                    </p>
                )}
                <div className={clsx("h-1 bg-college-gold mt-6 mb-6 w-24", centered && "mx-auto")} />
            </div>

            <div className="flex-1 mt-8">
                <div className="flex flex-col gap-4 w-full">
                    {displayedFaqs.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={idx}
                                className={clsx(
                                    "border rounded-xl bg-white overflow-hidden transition-all duration-300",
                                    isOpen ? "border-college-gold shadow-md" : "border-gray-200"
                                )}
                            >
                                <PublicButton
                                    variant="unstyled"
                                    size="none"
                                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:bg-gray-50/50 transition-colors group cursor-pointer"
                                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                >
                                    <span className="font-bold text-college-navy group-hover:text-college-gold transition-colors pr-6">
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        className={clsx(
                                            "w-5 h-5 flex-shrink-0 text-college-gold transition-transform duration-300",
                                            isOpen && "rotate-180"
                                        )}
                                    />
                                </PublicButton>
                                <div
                                    className={clsx(
                                        "px-5 overflow-hidden transition-all duration-300",
                                        isOpen ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"
                                    )}
                                >
                                    <p className="text-gray-600 leading-relaxed text-sm">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
