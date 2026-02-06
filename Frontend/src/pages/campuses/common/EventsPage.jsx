import Section from "../../../components/ui/Section";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import { Calendar, MapPin, Users } from "lucide-react";
import Slider from "../../../components/ui/Slider";
import { motion } from "framer-motion";

const EventsPage = () => {
  const events = [
    {
      title: "Annual Convocation 2025",
      date: "December 15, 2025",
      location: "Main Auditorium",
      description:
        "Annual graduation ceremony celebrating the achievements of our graduates.",
      attendees: "500+",
    },
    {
      title: "Research Symposium",
      date: "November 10, 2025",
      location: "Conference Hall",
      description:
        "Presenting latest research findings and academic achievements.",
      attendees: "200+",
    },
    {
      title: "Career Fair 2025",
      date: "October 30, 2025",
      location: "Campus Ground",
      description:
        "Connect with leading employers and explore career opportunities.",
      attendees: "1000+",
    },
    {
      title: "Sports Week",
      date: "September 20-27, 2025",
      location: "Sports Complex",
      description:
        "Annual sports competition featuring various indoor and outdoor games.",
      attendees: "300+",
    },
  ];

  return (
    <div>
      <Section>
        <Section.Header
          title="Upcoming Events"
          description="Stay updated with our latest events and activities"
        />
        <Slider>
          {events.map((event, idx) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="min-w-[300px] md:min-w-[400px]"
            >
              <Card className="overflow-hidden h-full">
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-bold">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <Badge className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </Badge>
                    <Badge className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </Badge>
                    <Badge className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {event.attendees} Expected
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </Slider>
      </Section>
    </div>
  );
};

export default EventsPage;
