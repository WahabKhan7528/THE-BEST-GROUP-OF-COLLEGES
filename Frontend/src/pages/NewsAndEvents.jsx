import { useState } from "react";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import Hero from "../components/ui/Hero";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";

const NewsAndEvents = () => {
  const [activeTab, setActiveTab] = useState("all");

  const newsItems = [
    {
      id: "n1",
      title: "Best Group Achieves Higher Accreditation Status",
      category: "Academic",
      date: "Dec 20, 2025",
      image: "https://placehold.co/600x400?text=Accreditation",
      excerpt:
        "Our institution has been granted advanced accreditation status by the Higher Education Commission, reflecting our commitment to academic excellence.",
      content: "Full article content about accreditation...",
    },
    {
      id: "n2",
      title: "New Research Center Inaugurated",
      category: "Research",
      date: "Dec 15, 2025",
      image: "https://placehold.co/600x400?text=Research+Center",
      excerpt:
        "A state-of-the-art research center has been inaugurated to foster innovation and research among faculty and students.",
      content: "Full article content about research center...",
    },
    {
      id: "n3",
      title: "Student Wins International Scholarship Award",
      category: "Achievement",
      date: "Dec 10, 2025",
      image: "https://placehold.co/600x400?text=Scholarship",
      excerpt:
        "Congratulations to Ayesha Khan for winning the prestigious international scholarship for her research in AI and machine learning.",
      content: "Full article content about scholarship...",
    },
    {
      id: "n4",
      title: "Campus Expansion Project Begins",
      category: "Infrastructure",
      date: "Dec 5, 2025",
      image: "https://placehold.co/600x400?text=Campus+Expansion",
      excerpt:
        "Phase 2 of our campus expansion project has commenced with construction of new academic buildings and sports facilities.",
      content: "Full article content about campus expansion...",
    },
  ];

  const events = [
    {
      id: "e1",
      title: "Annual Sports Gala 2025",
      category: "Sports",
      date: "Jan 15, 2026",
      time: "10:00 AM",
      location: "Main Campus Sports Complex",
      image: "https://placehold.co/600x400?text=Sports+Gala",
      description:
        "Join us for the annual sports gala featuring inter-class competitions, trophy presentations, and cultural performances.",
      status: "Upcoming",
    },
    {
      id: "e2",
      title: "Alumni Reunion Conference",
      category: "Alumni",
      date: "Jan 20, 2026",
      time: "2:00 PM",
      location: "Main Auditorium",
      image: "https://placehold.co/600x400?text=Alumni+Reunion",
      description:
        "Reconnect with fellow alumni, network with current faculty, and share your professional journey and success stories.",
      status: "Upcoming",
    },
    {
      id: "e3",
      title: "International Seminar on AI & Ethics",
      category: "Seminar",
      date: "Jan 25, 2026",
      time: "9:00 AM",
      location: "Virtual & Main Campus",
      image: "https://placehold.co/600x400?text=AI+Seminar",
      description:
        "A two-day international seminar featuring renowned speakers discussing the intersection of artificial intelligence and ethical practices.",
      status: "Upcoming",
    },
    {
      id: "e4",
      title: "Convocation Ceremony 2025",
      category: "Academic",
      date: "Jan 30, 2026",
      time: "11:00 AM",
      location: "Main Campus Grounds",
      image: "https://placehold.co/600x400?text=Convocation",
      description:
        "Celebrate the graduation of our talented students and witness the awarding of degrees and honors.",
      status: "Upcoming",
    },
  ];

  const filteredNews =
    activeTab === "all" || activeTab === "news" ? newsItems : [];

  const filteredEvents =
    activeTab === "all" || activeTab === "events" ? events : [];

  return (
    <div className="min-h-screen">
      <Hero
        title="News & Events"
        description="Stay updated with the latest news, announcements, and upcoming events at Best Group of Colleges"
        image="https://placehold.co/1920x600?text=News+and+Events"
      />

      <Section>
        <div className="space-y-12">
          <Section background="white" spacing="small">
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => setActiveTab("all")}
                variant={activeTab === "all" ? "primary" : "secondary"}
                size="md"
                className="rounded-full"
              >
                All
              </Button>
              <Button
                onClick={() => setActiveTab("news")}
                variant={activeTab === "news" ? "primary" : "secondary"}
                size="md"
                className="rounded-full"
              >
                News
              </Button>
              <Button
                onClick={() => setActiveTab("events")}
                variant={activeTab === "events" ? "primary" : "secondary"}
                size="md"
                className="rounded-full"
              >
                Events
              </Button>
            </div>
          </Section>

          {/* News Section */}
          {(activeTab === "all" || activeTab === "news") && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Latest News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredNews.map((news, idx) => (
                  <motion.div
                    key={news.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="flex flex-col overflow-hidden hover:shadow-lg transition">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                            {news.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {news.date}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {news.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                          {news.excerpt}
                        </p>
                        <button className="flex items-center gap-2 text-purple-700 hover:text-purple-800 font-semibold text-sm">
                          Read More <ArrowRight size={16} />
                        </button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Events Section */}
          {(activeTab === "all" || activeTab === "events") && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Upcoming Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEvents.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="flex flex-col overflow-hidden hover:shadow-lg transition">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
                            {event.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {event.status}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          {event.title}
                        </h3>

                        <div className="space-y-2 mb-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-purple-700" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-purple-700" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-purple-700" />
                            <span>{event.location}</span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                          {event.description}
                        </p>
                        <button className="px-4 py-2 bg-purple-700 text-white rounded-lg text-sm font-semibold hover:bg-purple-800 w-full">
                          Learn More
                        </button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};

export default NewsAndEvents;
