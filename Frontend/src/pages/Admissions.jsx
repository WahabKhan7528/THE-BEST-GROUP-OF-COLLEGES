import { CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const Admissions = () => {
  const admissionSteps = [
    {
      title: "Choose Your Program",
      description:
        "Browse through our offered programs and select the one that aligns with your career goals.",
    },
    {
      title: "Check Eligibility",
      description:
        "Review the admission requirements and ensure you meet the criteria for your chosen program.",
    },
    {
      title: "Submit Application",
      description:
        "Fill out the online application form and submit all required documents.",
    },
    {
      title: "Entrance Test",
      description:
        "Take the entrance test for your selected program (if applicable).",
    },
    {
      title: "Interview",
      description:
        "Attend an interview with the admission committee (for selected programs).",
    },
    {
      title: "Admission Decision",
      description:
        "Receive your admission decision and further instructions if accepted.",
    },
  ];

  const requirements = {
    documents: [
      "Completed application form",
      "Academic transcripts",
      "CNIC/B-Form copy",
      "Passport size photographs",
      "Character certificate",
      "Migration certificate (if applicable)",
    ],
    eligibility: [
      "Minimum 60% marks in previous degree/certificate",
      "Pass in entrance test (where applicable)",
      "No third division in academic career",
      "Good moral character",
      "Medical fitness certificate",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Admissions Open 2025</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Take the first step towards your future. Join Pakistan's leading
              educational institution.
            </p>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Admission Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {admissionSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg p-6 relative"
              >
                <div className="absolute -top-4 left-6 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-3 mt-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Admission Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Required Documents */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-8 shadow-sm"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                Required Documents
              </h3>
              <ul className="space-y-3">
                {requirements.documents.map((doc) => (
                  <li key={doc} className="flex items-center text-gray-600">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-3"></span>
                    {doc}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Eligibility Criteria */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-8 shadow-sm"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <AlertCircle className="h-6 w-6 text-blue-500 mr-2" />
                Eligibility Criteria
              </h3>
              <ul className="space-y-3">
                {requirements.eligibility.map((criterion) => (
                  <li
                    key={criterion}
                    className="flex items-center text-gray-600"
                  >
                    <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                    {criterion}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Apply Now</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Program
              </label>
              <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="">Select a program</option>
                <option value="llb">Bachelor of Laws (LLB)</option>
                <option value="llm">Master of Laws (LLM)</option>
                <option value="bs">Bachelor of Science (BS)</option>
                <option value="ba">Bachelor of Arts (BA)</option>
                <option value="fsc">FSc (Pre-Medical/Engineering)</option>
                <option value="ics">ICS (Computer Science)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows="4"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Any additional information..."
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
