import Hero from "../../../components/ui/Hero";
import Section from "../../../components/ui/Section";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import { Scale, FileText, AlertCircle, ShieldCheck, CheckSquare, Download } from "lucide-react";
import { motion } from "framer-motion";

const LegalPage = () => {
  const legalDocs = [
    {
      title: "Terms and Conditions",
      icon: FileText,
      description:
        "The general terms govern the use of our website, enrollment processes, and code of conduct for students and staff.",
      lastUpdated: "September 15, 2025",
      type: "Policy"
    },
    {
      title: "Privacy Policy",
      icon: ShieldCheck,
      description:
        "We are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information.",
      lastUpdated: "August 30, 2025",
      type: "Privacy"
    },
    {
      title: "Student Handbook",
      icon: AlertCircle,
      description:
        "A comprehensive guide outlining student rights, academic integrity, disciplinary procedures, and campus regulations.",
      lastUpdated: "July 1, 2025",
      type: "Guidelines"
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Section spacing="large">
        <div className="max-w-4xl mx-auto">
          <Section.Header
            title="Key Policies & Documents"
            description="Please review these documents to understand your rights and responsibilities."
            centered
          />

          <div className="grid gap-6">
            {legalDocs.map((doc, idx) => (
              <motion.div
                key={doc.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-3xl">
                  <div className="p-4 rounded-2xl bg-blue-50 text-blue-600 flex-shrink-0">
                    <doc.icon className="w-8 h-8" />
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{doc.title}</h3>
                      <Badge variant="secondary" className="text-xs">{doc.type}</Badge>
                    </div>
                    <p className="text-gray-600 mb-2">{doc.description}</p>
                    <p className="text-xs text-gray-400">
                      Last updated: {doc.lastUpdated}
                    </p>
                  </div>

                  <div className="flex-shrink-0 mt-4 md:mt-0">
                    <Button variant="outline" size="sm" icon={Download} onClick={() => window.print()}>
                      Print / PDF
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-gray-50" spacing="large">
        <Section.Header
          title="Accreditation & Recognition"
          description="Our institution operates under strict regulatory compliance."
          centered
        />

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-l-4 border-l-green-500 rounded-3xl">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Scale className="w-8 h-8 text-green-600" />
                </div>
                <div className="prose max-w-none flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Regulatory Compliance</h3>
                  <p className="text-gray-600 mb-6">
                    Best Group of Colleges is a recognized educational institution, fully chartered and accredited by the relevant authorities. We maintain high standards of academic quality and institutional integrity.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center p-3 rounded-xl bg-green-50 border border-green-100">
                      <CheckSquare className="w-5 h-5 text-green-600 mr-3" />
                      <span className="font-semibold text-gray-800">HEC Recognized</span>
                    </div>
                    <div className="flex items-center p-3 rounded-xl bg-green-50 border border-green-100">
                      <CheckSquare className="w-5 h-5 text-green-600 mr-3" />
                      <span className="font-semibold text-gray-800">PEC Accredited Programs</span>
                    </div>
                    <div className="flex items-center p-3 rounded-xl bg-green-50 border border-green-100">
                      <CheckSquare className="w-5 h-5 text-green-600 mr-3" />
                      <span className="font-semibold text-gray-800">ISO 9001:2015 Certified</span>
                    </div>
                    <div className="flex items-center p-3 rounded-xl bg-green-50 border border-green-100">
                      <CheckSquare className="w-5 h-5 text-green-600 mr-3" />
                      <span className="font-semibold text-gray-800">Chartered by Govt.</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default LegalPage;
