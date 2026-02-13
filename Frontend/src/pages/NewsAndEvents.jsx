import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Newspaper,
  CalendarDays,
  Sparkles,
  Award,
  Building,
  Users,
  Microscope
} from "lucide-react";
import Hero from "../components/ui/Hero";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

const NewsAndEvents = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", name: "All", icon: Sparkles },
    { id: "news", name: "News", icon: Newspaper },
    { id: "events", name: "Events", icon: CalendarDays },
  ];

  const newsItems = [
    {
      id: "n1",
      title: "Best Group Achieves Higher Accreditation Status",
      category: "Academic",
      categoryColor: "from-blue-500 to-cyan-500",
      date: "Dec 20, 2025",
      image: "https://placehold.co/600x400?text=Accreditation",
      excerpt:
        "Our institution has been granted advanced accreditation status by the Higher Education Commission, reflecting our commitment to academic excellence.",
      icon: Award,
    },
    {
      id: "n2",
      title: "New Research Center Inaugurated",
      category: "Research",
      categoryColor: "from-purple-500 to-pink-500",
      date: "Dec 15, 2025",
      image: "https://placehold.co/600x400?text=Research+Center",
      excerpt:
        "A state-of-the-art research center has been inaugurated to foster innovation and research among faculty and students.",
      icon: Microscope,
    },
    {
      id: "n3",
      title: "Student Wins International Scholarship Award",
      category: "Achievement",
      categoryColor: "from-amber-500 to-orange-500",
      date: "Dec 10, 2025",
      image: "https://placehold.co/600x400?text=Scholarship",
      excerpt:
        "Congratulations to Ayesha Khan for winning the prestigious international scholarship for her research in AI and machine learning.",
      icon: Award,
    },
    {
      id: "n4",
      title: "Campus Expansion Project Begins",
      category: "Infrastructure",
      categoryColor: "from-emerald-500 to-green-500",
      date: "Dec 5, 2025",
      image: "https://placehold.co/600x400?text=Campus+Expansion",
      excerpt:
        "Phase 2 of our campus expansion project has commenced with construction of new academic buildings and sports facilities.",
      icon: Building,
    },
  ];

  const events = [
    {
      id: "e1",
      title: "Annual Sports Gala 2025",
      category: "Sports",
      categoryColor: "from-red-500 to-rose-500",
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
      categoryColor: "from-indigo-500 to-purple-500",
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
      categoryColor: "from-cyan-500 to-blue-500",
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
      categoryColor: "from-amber-500 to-yellow-500",
      date: "Jan 30, 2026",
      time: "11:00 AM",
      location: "Main Campus Grounds",
      image: "https://placehold.co/600x400?text=Convocation",
      description:
        "Celebrate the graduation of our talented students and witness the awarding of degrees and honors.",
      status: "Upcoming",
    },
  ];

  const showNews = activeTab === "all" || activeTab === "news";
  const showEvents = activeTab === "all" || activeTab === "events";

  return (
    <div className="min-h-screen bg-white">

      {/* Filter Tabs */}
      <Section background="white" spacing="default">
        <div className="text-center mb-12 ">
          <h2 className="text-4xl md:text-8xl font-bold text-gray-900 mb-6 leading-tight">
            News <span className="text-gradient">&</span> Events
          </h2>
          <p className="text-gray-600">Explore our campus life, events, and facilities through our photo gallery</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${isActive
                  ? "bg-primary-600 text-white shadow-lg"
                  : "bg-primary-100 text-gray-600 hover:bg-primary-200"
                  }`}
              >
                {tab.name}
              </motion.button>
            );
          })}
        </div>
      </Section>

      {/* Content */}
      <Section background="gray" spacing="large">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-16"
          >
            {/* News Section */}
            {showNews && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center">
                    <Newspaper className="w-8 h-8 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Latest News</h2>
                    <p className="text-gray-500 text-sm">Stay informed with our latest updates</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {newsItems.map((news, idx) => (
                    <motion.div
                      key={news.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card hover className="h-full overflow-hidden group">
                        <div className="flex flex-col md:flex-row h-full">
                          {/* Image */}
                          <div className="md:w-2/5 relative overflow-hidden">
                            <img
                              src={news.image}
                              alt={news.title}
                              className="w-full h-48 md:h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-black bg-primary-200 backdrop-blur-sm">
                              {news.category}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="md:w-3/5 p-6 flex flex-col">
                            <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                              <Calendar className="w-4 h-4" />
                              <span>{news.date}</span>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-3">
                              {news.title}
                            </h3>

                            <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                              {news.excerpt}
                            </p>

                            <Button
                              variant="ghost"
                              className="!px-0 hover:!bg-transparent text-primary-600 hover:text-primary-700 font-semibold group/btn"
                              onClick={() => { }} // Placeholder for future navigation
                            >
                              Read More
                              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Events Section */}
            {showEvents && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center">
                    <CalendarDays className="w-8 h-8 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
                    <p className="text-gray-500 text-sm">Don't miss out on our exciting events</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {events.map((event, idx) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card hover className="h-full overflow-hidden group">
                        {/* Image */}
                        <div className="relative overflow-hidden">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-black bg-primary-200 backdrop-blur-sm">
                            {event.category}
                          </div>
                          <Badge
                            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 border-0 font-medium"
                          >
                            {event.status}
                          </Badge>
                        </div>

                        {/* Content */}
                        <Card.Body className="flex flex-col">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">
                            {event.title}
                          </h3>

                          {/* Event Details */}
                          <div className="space-y-2 mb-4 text-sm">
                            <div className="flex items-center gap-3 text-gray-600">
                              <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                                <Calendar className="w-4 h-4 text-primary-600" />
                              </div>
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                              <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                                <Clock className="w-4 h-4 text-primary-600" />
                              </div>
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                              <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                                <MapPin className="w-4 h-4 text-primary-600" />
                              </div>
                              <span>{event.location}</span>
                            </div>
                          </div>

                          <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">
                            {event.description}
                          </p>

                          <Button variant="primary" className="w-full" onClick={() => { }}>
                            Learn More
                          </Button>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Section>
    </div>
  );
};

export default NewsAndEvents;
