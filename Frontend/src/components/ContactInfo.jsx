import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Card from "./ui/Card";

const ContactInfo = () => {
    const contactInfo = [
        {
            icon: MapPin,
            title: "Visit Us",
            details: ["123 Education Road", "City, Province", "Pakistan"],
            action: "Get Directions",
        },
        {
            icon: Phone,
            title: "Call Us",
            details: ["+92 123 456 7890", "+92 098 765 4321"],
            action: "Call Now",
        },
        {
            icon: Mail,
            title: "Email Us",
            details: ["info@bestcolleges.edu", "admissions@bestcolleges.edu"],
            action: "Send Email",
        },
        {
            icon: Clock,
            title: "Office Hours",
            details: ["Mon - Fri: 8:00 AM - 4:00 PM", "Saturday: 9:00 AM - 1:00 PM"],
            action: "Schedule Visit",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, idx) => (
                <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                >
                    <Card hover className="h-full group border border-border">
                        <Card.Body className="p-6">
                            <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mb-5 group-hover:bg-primary-600 transition-colors">
                                <info.icon className="h-6 w-6 text-primary-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-primary-900 mb-3">{info.title}</h3>
                            <div className="space-y-1.5">
                                {info.details.map((detail) => (
                                    <p key={detail} className="text-text-secondary text-sm">
                                        {detail}
                                    </p>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};

export default ContactInfo;
