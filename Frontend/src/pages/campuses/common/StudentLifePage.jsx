import Section from "../../../components/ui/Section";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import { Users, Calendar, MapPin, Activity } from "lucide-react";
import Slider from "../../../components/ui/Slider";
import { motion } from "framer-motion";

const StudentLifePage = () => {
  const activities = [
    {
      title: "Student Societies",
      items: [
        {
          name: "Literary Society",
          description: "Platform for creative writing and literary discussions",
          members: 150,
          meetings: "Weekly",
        },
        {
          name: "Sports Club",
          description:
            "Organizing sports events and promoting physical fitness",
          members: 200,
          meetings: "Daily",
        },
        {
          name: "Debate Club",
          description: "Enhancing public speaking and argumentation skills",
          members: 100,
          meetings: "Bi-weekly",
        },
        {
          name: "Arts & Culture Society",
          description: "Promoting cultural activities and artistic expression",
          members: 120,
          meetings: "Weekly",
        },
      ],
    },
    {
      title: "Campus Life",
      facilities: [
        {
          name: "Student Center",
          description: "Modern facility for student activities and recreation",
          features: ["Study Areas", "Recreation Zones", "Cafeteria"],
        },
        {
          name: "Sports Complex",
          description: "State-of-the-art sports facilities",
          features: ["Gymnasium", "Swimming Pool", "Indoor Courts"],
        },
        {
          name: "Hostel Life",
          description: "Comfortable and secure accommodation",
          features: ["Separate Hostels", "Mess Facility", "24/7 Security"],
        },
      ],
    },
  ];

  return (
    <div>
      <Section>
        <Section.Header
          title="Student Life"
          description="Experience vibrant campus life and engaging activities"
        />

        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Student Societies</h2>
            <Slider>
              {activities[0].items.map((society, idx) => (
                <motion.div
                  key={society.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="min-w-[300px] md:min-w-[400px]"
                >
                  <Card className="h-full">
                    <Activity className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-bold mb-2">{society.name}</h3>
                    <p className="text-gray-600 mb-4">{society.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {society.members} Members
                      </Badge>
                      <Badge className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {society.meetings}
                      </Badge>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </Slider>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Campus Facilities</h2>
            <Slider>
              {activities[1].facilities.map((facility, idx) => (
                <motion.div
                  key={facility.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="min-w-[300px] md:min-w-[350px]"
                >
                  <Card className="h-full">
                    <MapPin className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-bold mb-2">{facility.name}</h3>
                    <p className="text-gray-600 mb-4">{facility.description}</p>
                    <ul className="space-y-2">
                      {facility.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Badge>{feature}</Badge>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </Slider>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default StudentLifePage;
