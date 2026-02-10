import Hero from "../../../components/ui/Hero";
import Section from "../../../components/ui/Section";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import { Calendar, MapPin, Users, ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";

const EventsPage = () => {
  const events = [
    {
      title: "Annual Convocation 2025",
      date: "December 15, 2025",
      time: "10:00 AM",
      location: "Main Auditorium",
      description:
        "Celebrating the academic achievements of our graduating class. Chief Guest: Minister of Education.",
      image: "https://placehold.co/600x400?text=Convocation",
      category: "Academic",
      attendees: "500+",
    },
    {
      title: "National Research Symposium",
      date: "November 10, 2025",
      time: "09:30 AM",
      location: "Conference Hall",
      description:
        "A gathering of bright minds to present and discuss the latest research findings in Science and Technology.",
      image: "https://placehold.co/600x400?text=Research",
      category: "Research",
      attendees: "200+",
    },
    {
      title: "Fall Career Fair",
      date: "October 30, 2025",
      time: "11:00 AM",
      location: "Campus Ground",
      description:
        "Connect with top recruiters from over 50 leading companies. Bring your resume and dress for success.",
      image: "https://placehold.co/600x400?text=Career+Fair",
      category: "Career",
      attendees: "1000+",
    },
    {
      title: "Inter-Varsity Sports Week",
      date: "September 20-27, 2025",
      time: "Various",
      location: "Sports Complex",
      description:
        "A week of competitive sports including Cricket, Football, and Athletics. Come cheer for your team!",
      image: "https://placehold.co/600x400?text=Sports+Week",
      category: "Sports",
      attendees: "300+",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Section spacing="large">
        <Section.Header
          title="Upcoming Events"
          description="Mark your calendars for these exciting opportunities."
          centered
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {events.map((event, idx) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full overflow-hidden flex flex-col md:flex-row p-0 gap-0 rounded-3xl">
                <div className="w-full md:w-2/5 h-48 md:h-auto relative">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-blue-800 backdrop-blur shadow-sm rounded-full">
                      {event.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow w-full md:w-3/5">
                  <div className="flex items-center text-sm text-blue-600 font-semibold mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date}
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-gray-900 leading-tight">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

                  <div className="space-y-2 mt-auto">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="w-3.5 h-3.5 mr-2" />
                      {event.location}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex items-center text-xs font-medium text-gray-500">
                      <Users className="w-3.5 h-3.5 mr-1" />
                      {event.attendees} Registered
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-blue-600 p-0 h-auto hover:bg-transparent hover:text-blue-800"
                      onClick={() => { }}
                      aria-label={`View details for ${event.title}`}
                    >
                      Details <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default EventsPage;
