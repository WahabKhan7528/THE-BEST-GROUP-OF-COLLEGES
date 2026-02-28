import Section from "./Section";
import Card from "./Card";
import { faqs } from "../../data/faqData";

const Faq = ({ limit }) => {
  const displayedFaqs = limit ? faqs.slice(0, limit) : faqs;

  return (
    <Section background="white" spacing="large">
      <div className="w-full">
        <Section.Header
          title="Frequently Asked Questions"
          description="Find answers to common questions about our colleges and programs"
          badge="FAQ"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {displayedFaqs.map((faq, idx) => (
          <div key={idx}>
            <Card hover className="h-full">
              <div className="flex items-start gap-2 md:gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                    <span className="text-base md:text-2xl font-bold text-primary-600 group-hover:text-white transition-colors">
                      {idx + 1}
                    </span>
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
