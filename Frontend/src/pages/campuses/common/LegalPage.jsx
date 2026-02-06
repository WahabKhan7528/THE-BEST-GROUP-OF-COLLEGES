import Section from "../../../components/ui/Section";
import Card from "../../../components/ui/Card";
import { Scale, FileText, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const LegalPage = () => {
  const legalDocs = [
    {
      title: "Terms and Conditions",
      icon: FileText,
      description:
        "General terms and conditions for admission, enrollment, and campus life.",
      lastUpdated: "September 15, 2025",
    },
    {
      title: "Privacy Policy",
      icon: Scale,
      description:
        "How we collect, use, and protect student and staff information.",
      lastUpdated: "August 30, 2025",
    },
    {
      title: "Student Handbook",
      icon: AlertCircle,
      description:
        "Comprehensive guide to student rights, responsibilities, and campus policies.",
      lastUpdated: "July 1, 2025",
    },
  ];

  return (
    <div>
      <Section>
        <Section.Header
          title="Legal Information"
          description="Important legal documents and policies"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {legalDocs.map((doc, idx) => (
            <motion.div
              key={doc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <doc.icon className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{doc.title}</h3>
                <p className="text-gray-600 mb-4">{doc.description}</p>
                <p className="text-sm text-gray-500">
                  Last updated: {doc.lastUpdated}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <Section.Header
          title="Accreditation"
          description="Our institutional accreditations and certifications"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card>
            <div className="prose max-w-none">
              <p>
                Our institution is fully accredited by the Higher Education
                Commission (HEC) and maintains all necessary certifications and
                licenses required for operation.
              </p>
              <h3>Accreditation Details</h3>
              <ul>
                <li>Higher Education Commission (HEC) Accreditation</li>
                <li>Provincial Education Department Recognition</li>
                <li>Professional Body Memberships</li>
                <li>Quality Assurance Certifications</li>
              </ul>
            </div>
          </Card>
        </motion.div>
      </Section>
    </div>
  );
};

export default LegalPage;
