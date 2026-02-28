
import Section from "./Section";
import Card from "./Card";

const Faq = ({ limit }) => {
    const faqs = [
        {
            question: "What programs are offered?",
            answer: "We offer 50+ programs ranging from FSc and FA to BA, BS, MA, LLB, and LLM across our three campuses (Main Campus, Law Campus, and Hala Campus).",
        },
        {
            question: "What are the admission requirements?",
            answer: "Admission requirements vary by program. Generally, you need a minimum of 50% marks in your previous qualification, along with the required documents. Visit our Admissions page for detailed program-specific requirements.",
        },
        {
            question: "How can I apply for admission?",
            answer: "You can apply online through our admissions portal or visit our campus for in-person application submission. The online application process is simple and takes about 15-20 minutes to complete.",
        },
        {
            question: "What scholarships are available?",
            answer: "We offer merit-based scholarships, need-based financial aid, and sports scholarships. Top performers in board exams may qualify for up to 100% tuition fee waiver.",
        },
        {
            question: "Is hostel accommodation available?",
            answer: "Yes, we have separate hostel facilities for male and female students at all our campuses. The hostels are fully furnished with all modern amenities.",
        },
        {
            question: "What is the fee structure?",
            answer: "Fee structure varies by program and campus. Please contact our admissions office or visit our Fee Structure page for detailed information about tuition and other charges.",
        },
        {
            question: "What are the campus facilities?",
            answer: "All campuses feature modern laboratories, libraries, computer labs, sports facilities, and recreational areas for student development.",
        },
    ];

    const displayedFaqs = limit ? faqs.slice(0, limit) : faqs;

    return (
        <Section background="white" spacing="large">
            <Section.Header
                title="Frequently Asked Questions"
                description="Find answers to common questions about our colleges and programs"
                badge="FAQ"
            />

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {displayedFaqs.map((faq, idx) => (
                    <div
                        key={idx}
                    >
                        <Card hover className="h-full">
                            <div className="flex items-start gap-2 md:gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                                        <span className="text-base md:text-2xl font-bold text-primary-600 group-hover:text-white transition-colors">{idx + 1}</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                                        {faq.question}
                                    </h3>
                                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default Faq;
