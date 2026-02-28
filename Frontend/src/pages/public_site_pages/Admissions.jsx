import {
  CheckCircle,
  AlertCircle,
  FileText,
  ClipboardCheck,
  GraduationCap,
  Phone,
  Mail,
  Calendar,
  Award,
  Users,
  BookOpen,
  ArrowRight,
} from "lucide-react";

import Section from "../../components/public_site/Section";
import Card from "../../components/public_site/Card";
import Button from "../../components/shared/Button";
import AdmissionForm from "../../components/public_site/AdmissionForm";
import {
  admissionSteps,
  requirements,
  importantDates,
} from "../../data/admissionsData";

const Admissions = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Admission Process */}
      <Section background="white" spacing="large">
        <div className="w-full">
          <Section.Header
            title="Admission Process"
            description="Follow these simple steps to begin your educational journey with us"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {admissionSteps.map((step, index) => (
            <div key={step.title}>
              <Card hover className="h-full relative overflow-hidden p-6">
                {/* Step Number */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                      <span className="text-2xl font-bold text-primary-600 group-hover:text-white transition-colors">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Section>

      {/* Important Dates */}
      <Section background="gray" spacing="large">
        <div className="w-full">
          <Section.Header
            title="Important Dates"
            description="Mark your calendar with these key admission dates"
            badge="Timeline"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 mt-8 md:mt-12">
          <div className="relative">
            {/* The continuous vertical line */}
            <div className="absolute left-[31px] md:left-[39px] top-8 md:top-10 bottom-8 md:bottom-10 w-0.5 bg-gradient-to-b from-transparent via-primary-300 to-transparent opacity-60 rounded-full" />

            <div className="space-y-6 md:space-y-8 cursor-pointer">
              {importantDates.map((item, index) => (
                <div
                  key={item.event}
                  className="relative flex gap-4 md:gap-8 group"
                >
                  {/* Timeline Core: Icon Node */}
                  <div className="relative z-10 flex flex-col items-start">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-50 flex items-center justify-center p-2 shadow-sm border border-white group-hover:border-primary-100 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                      <div className="w-full h-full rounded-full bg-white border border-gray-100 flex items-center justify-center group-hover:bg-primary-600 group-hover:border-primary-600 group-hover:text-white text-primary-600 transition-colors duration-300 shadow-sm">
                        <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 bg-white p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 group-hover:shadow-xl group-hover:shadow-primary-500/5 group-hover:border-primary-100 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1 md:gap-2">
                      <h4 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                        {item.event}
                      </h4>
                      <span className="text-sm text-gray-500 flex items-center gap-1.5 md:hidden">
                        <Calendar className="w-3.5 h-3.5" /> Key Date
                      </span>
                    </div>
                    <div className="inline-flex items-center">
                      <div className="bg-primary-50 border border-primary-100 text-primary-700 font-semibold px-4 py-2 rounded-xl text-sm md:text-base shadow-inner group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 group-hover:shadow-md transition-all duration-300 whitespace-nowrap flex items-center gap-2">
                        {item.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Requirements Section */}
      <Section background="white" spacing="large">
        <div className="w-full">
          <Section.Header
            title="Admission Requirements"
            description="Ensure you have all the necessary documents and meet the eligibility criteria"
            badge="Requirements"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Required Documents */}
          <div>
            <Card hover className="h-full p-6 md:p-8">
              <div className="mb-8 border-b border-border pb-4">
                <h3 className="text-2xl font-bold text-primary-900 mb-2">
                  Required Documents
                </h3>
                <p className="text-sm text-text-secondary">
                  What you need to submit
                </p>
              </div>
              <ul className="space-y-4">
                {requirements.documents.map((doc, idx) => (
                  <li
                    key={doc}
                    className="flex items-start gap-4 text-text-secondary group"
                  >
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-50 border border-primary-200 text-primary-600 flex items-center justify-center text-sm font-semibold group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-colors mt-0.5">
                      {idx + 1}
                    </div>
                    <span className="leading-relaxed">{doc}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Eligibility Criteria */}
          <div>
            <Card hover className="h-full p-6 md:p-8">
              <div className="mb-8 border-b border-border pb-4">
                <h3 className="text-2xl font-bold text-primary-900 mb-2">
                  Eligibility Criteria
                </h3>
                <p className="text-sm text-text-secondary">
                  Requirements you must meet
                </p>
              </div>
              <ul className="space-y-4">
                {requirements.eligibility.map((criterion, idx) => (
                  <li
                    key={criterion}
                    className="flex items-start gap-4 text-text-secondary group"
                  >
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-50 border border-primary-200 text-primary-600 flex items-center justify-center text-sm font-semibold group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-colors mt-0.5">
                      {idx + 1}
                    </div>
                    <span className="leading-relaxed">{criterion}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </Section>

      {/* Application Form */}
      <Section background="gradient" spacing="large">
        <div className="w-full">
          <Section.Header
            title="Apply Now"
            description="Fill out the form below to start your application"
            badge="Application Form"
          />
        </div>
        <div>
          <AdmissionForm />
        </div>
      </Section>

      {/* Contact CTA */}
      <Section background="white" spacing="large">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            Need Help with Your Application?
          </h2>
          <p className="text-gray-600 mb-8">
            Our admissions team is here to assist you. Feel free to reach out
            with any questions.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a
              href="tel:+92511234567"
              className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary-600" />
              </div>
              <span>+92 51 1234 567</span>
            </a>
            <a
              href="mailto:admissions@bestcolleges.edu.pk"
              className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary-600" />
              </div>
              <span>admissions@bestcolleges.edu.pk</span>
            </a>
          </div>
          <Button variant="outline" icon={ArrowRight} to="/contact">
            Visit Contact Page
          </Button>
        </div>
      </Section>
    </div>
  );
};

export default Admissions;
