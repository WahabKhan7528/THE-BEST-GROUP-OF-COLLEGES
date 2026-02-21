import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Newspaper,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
      categoryColor: "from-sky-100 to-sky-200 text-sky-800",
      date: "Dec 20, 2025",
      image: "https://placehold.co/600x400?text=Accreditation",
      description: "We are thrilled to announce that Best Group of Colleges has received advanced accreditation from the Higher Education Commission. This prestigious recognition is a testament to our faculty's dedication, our rigorous academic standards, and our continuous investment in state-of-the-art facilities. Students will now benefit from enhanced degree recognition globally, opening new doors for international master's programs and career opportunities.",
    },
    {
      id: "n2",
      title: "New Research Center Inaugurated",
      category: "Research",
      categoryColor: "from-sky-100 to-sky-200 text-sky-800",
      date: "Dec 15, 2025",
      image: "https://placehold.co/600x400?text=Research+Center",
      description: "The new Advanced Research Center (ARC) officially opened its doors yesterday in a well-attended ceremony. Equipped with the latest computational and laboratory technologies, the ARC aims to be a hub for interdisciplinary research. Initial projects will focus on sustainable energy, artificial intelligence in healthcare, and advanced materials engineering. All postgraduate students and faculty members are encouraged to utilize these new resources.",
    },
    {
      id: "n3",
      title: "Student Wins International Scholarship Award",
      category: "Achievement",
      categoryColor: "from-sky-50 to-sky-100 text-sky-800",
      date: "Dec 10, 2025",
      image: "https://placehold.co/600x400?text=Scholarship",
      description: "Ayesha Khan, a final-year Computer Science student, has been awarded the coveted Global Innovators Scholarship in London. Her exceptional undergraduate research focusing on machine learning optimization models caught the attention of the international committee out of thousands of applicants. She will be receiving full funding to complete a summer research internship at Oxford University. The entire college celebrates this monumental achievement.",
    },
    {
      id: "n4",
      title: "Campus Expansion Project Begins",
      category: "Infrastructure",
      categoryColor: "from-sky-50 to-sky-100 text-sky-800",
      date: "Dec 5, 2025",
      image: "https://placehold.co/600x400?text=Campus+Expansion",
      description: "The long-awaited Phase 2 Campus Expansion has officially broken ground. Over the next 18 months, we will be adding a new 5-story academic block, an indoor sports complex, and expanding the main library's seating capacity by 500. While some pathways may be temporarily redirected during construction, classes will proceed as normal. We appreciate everyone's patience as we work to build a better campus for all.",
    },
    {
      id: "n5",
      title: "New Student Tech Ethics Club Formed",
      category: "Student Life",
      categoryColor: "from-sky-100 to-sky-200 text-sky-800",
      date: "Nov 28, 2025",
      image: "https://placehold.co/600x400?text=Tech+Club",
      description: "A group of passionate students from the CS, Philosophy, and Law departments have joined forces to launch the Tech Ethics Club. The primary aim is to foster discussions around data privacy, AI bias, and the social implications of autonomous systems. Meetings will be held bi-weekly on Thursdays. All students regardless of their major are highly encouraged to participate in upcoming debates.",
    },
    {
      id: "n6",
      title: "Partnership with Regional Tech Hub",
      category: "Career",
      categoryColor: "from-sky-50 to-sky-100 text-sky-800",
      date: "Nov 20, 2025",
      image: "https://placehold.co/600x400?text=Partnership",
      description: "In a move to significantly boost early-career placements, the college has signed a Memorandum of Understanding with the City Tech Hub, a leading regional incubator. Under this partnership, 50 top-performing students across IT and management disciplines will be fast-tracked into summer internship programs. Expect to see regular recruitment drives and guest lectures from Tech Hub startups very soon.",
    },
  ];

  const events = [
    {
      id: "e1",
      title: "Annual Sports Gala 2025",
      category: "Sports",
      categoryColor: "from-blue-400 to-blue-500",
      date: "Jan 15, 2026",
      time: "10:00 AM",
      location: "Main Campus Sports Complex",
      image: "https://placehold.co/600x400?text=Sports+Gala",
      description: "The Annual Sports Gala is our biggest extracurricular event of the year. Over three days, students from all departments will compete in cricket, football, basketball, badminton, and athletics. The event will also feature food stalls, cultural performances in the evening, and a grand closing ceremony where the Champion's Trophy will be awarded. Team registrations are open now at the Student Affairs office.",
      status: "Upcoming",
    },
    {
      id: "e2",
      title: "Alumni Reunion Conference",
      category: "Alumni",
      categoryColor: "from-blue-400 to-blue-500",
      date: "Jan 20, 2026",
      time: "2:00 PM",
      location: "Main Auditorium",
      image: "https://placehold.co/600x400?text=Alumni+Reunion",
      description: "We proudly invite all graduates back to campus for our Annual Alumni Reunion. The afternoon will begin with a networking lunch, followed by a series of panel discussions featuring distinguished alumni sharing insights from the corporate world. It is an excellent opportunity for current students to connect with industry professionals, and for old friends to catch up. A formal dinner will conclude the evening.",
      status: "Upcoming",
    },
    {
      id: "e3",
      title: "International Seminar on AI & Ethics",
      category: "Seminar",
      categoryColor: "from-blue-400 to-blue-500",
      date: "Jan 25, 2026",
      time: "9:00 AM",
      location: "Virtual & Main Campus",
      image: "https://placehold.co/600x400?text=AI+Seminar",
      description: "As Artificial Intelligence becomes ubiquitous, the ethical implications of its deployment have never been more critical. This two-day seminar brings together tech leaders, legal experts, and academics to discuss data privacy, algorithmic bias, and the future of work. Day 1 features keynote speakers from top tech firms, while Day 2 offers interactive workshops. Certification of participation will be provided to all attendees.",
      status: "Upcoming",
    },
    {
      id: "e4",
      title: "Convocation Ceremony 2025",
      category: "Academic",
      categoryColor: "from-blue-400 to-blue-500",
      date: "Jan 30, 2026",
      time: "11:00 AM",
      location: "Main Campus Grounds",
      image: "https://placehold.co/600x400?text=Convocation",
      description: "The culmination of years of hard work, the Convocation Ceremony will honor the graduating class of 2025. Graduates will be awarded their degrees by the Chancellor, and special gold medals will be presented to academic toppers. Graduating students must collect their gowns from the administration block by Jan 28. Families are welcome to attend and celebrate this massive milestone with their loved ones.",
      status: "Upcoming",
    },
    {
      id: "e5",
      title: "Spring Career Fair",
      category: "Career",
      categoryColor: "from-blue-500 to-blue-600",
      date: "Feb 10, 2026",
      time: "10:00 AM",
      location: "Central Library Plaza",
      image: "https://placehold.co/600x400?text=Career+Fair",
      description: "Gear up for your future at the Spring Career Fair! Over 40 companies spanning finance, technology, engineering, and arts will be setting up booths to scout for immediate full-time hires and summer interns. The Career Strategy center will be offering free mock interviews and resume reviews throughout the day. Business casual attire is strictly required for entry.",
      status: "Upcoming",
    },
    {
      id: "e6",
      title: "Annual Hackathon 2026",
      category: "Technology",
      categoryColor: "from-blue-400 to-blue-500",
      date: "Feb 18, 2026",
      time: "8:00 AM",
      location: "Computer Science Block",
      image: "https://placehold.co/600x400?text=Hackathon",
      description: "Bring your sleeping bags and energy drinks! The Annual 48-Hour Hackathon returns this February. This year's theme is 'Tech for Social Good'. Teams of up to 4 members will brainstorm, design, and deploy working prototypes to solve local community challenges. Major tech companies are sponsoring prizes including high-end laptops, tablets, and direct interview opportunities for the winning teams.",
      status: "Upcoming",
    },
  ];

  const [selectedItem, setSelectedItem] = useState(null);
  const [visibleNewsItems, setVisibleNewsItems] = useState(4);
  const [visibleEventItems, setVisibleEventItems] = useState(4);

  const handleLoadMoreNews = () => {
    setVisibleNewsItems(prev => prev + 4);
  };

  const handleLoadMoreEvents = () => {
    setVisibleEventItems(prev => prev + 4);
  };

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
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all outline-none focus:outline-none focus:ring-0 ${isActive
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
                  {newsItems.slice(0, visibleNewsItems).map((news, idx) => (
                    <motion.div
                      key={news.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="h-full outline-none focus:outline-none"
                    >
                      <Card hover className="h-full group border-l-4 border-l-primary-500 overflow-hidden outline-none focus:outline-none">
                        <div className="p-6 md:p-8 flex flex-col h-full bg-white relative">
                          <div className="flex justify-between items-start mb-6 z-10 flex-wrap gap-4">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-bold text-primary-600 tracking-wider uppercase px-4 py-1.5 rounded-full bg-primary-50">
                                {news.category}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-primary-600 bg-primary-50 px-3 py-1 rounded-full text-sm font-medium">
                              <Calendar className="w-4 h-4" />
                              <span>{news.date}</span>
                            </div>
                          </div>

                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 z-10 group-hover:text-primary-600 transition-colors leading-snug">
                            {news.title}
                          </h3>

                          <p className="text-gray-600 text-base mb-8 flex-grow line-clamp-3 z-10 leading-relaxed gap-2">
                            {news.description}
                          </p>

                          <div className="mt-auto z-10 border-t border-gray-100 pt-5">
                            <Button
                              variant="ghost"
                              className="!px-0 hover:!bg-transparent text-primary-600 hover:text-primary-800 font-bold group/btn text-base focus:outline-none focus:ring-0 focus:border-transparent focus-visible:outline-none focus-visible:ring-0 border-0 ring-0 hover:border-transparent"
                              onClick={() => setSelectedItem({ ...news, type: 'news' })}
                            >
                              Read Full Story
                              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-2" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {visibleNewsItems < newsItems.length && (
                  <div className="mt-12 flex justify-center">
                    <Button variant="outline" className="border-2 font-bold px-8 py-3 outline-none focus:outline-none active:outline-none" onClick={handleLoadMoreNews}>
                      Load More News
                    </Button>
                  </div>
                )}
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {events.slice(0, visibleEventItems).map((event, idx) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="h-full outline-none focus:outline-none"
                    >
                      <Card hover className="overflow-hidden group flex flex-col sm:flex-row h-full outline-none focus:outline-none">
                        {/* High-Impact Date Block */}
                        <div className={`sm:w-40 bg-gradient-to-br ${event.categoryColor} p-6 flex flex-row sm:flex-col items-center justify-center text-white gap-3 sm:gap-1 flex-shrink-0`}>
                          <span className="text-sm sm:text-base font-semibold uppercase tracking-widest opacity-90">
                            {event.date.split(" ")[0]}
                          </span>
                          <span className="text-4xl sm:text-5xl font-black tracking-tight">
                            {event.date.split(" ")[1].replace(",", "")}
                          </span>
                          <span className="text-sm opacity-90 hidden sm:block mt-2 font-medium">
                            {event.date.split(" ")[2]}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8 flex flex-col flex-grow bg-white">
                          <div className="flex justify-between items-start mb-3">
                            <div className="text-sm font-extrabold text-gray-400 uppercase tracking-widest">
                              {event.category}
                            </div>
                            <Badge className="bg-gray-100 text-gray-600 border-0 shadow-sm font-semibold">
                              {event.status}
                            </Badge>
                          </div>

                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 group-hover:text-primary-600 transition-colors leading-snug">
                            {event.title}
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm text-gray-600 font-medium bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-2.5">
                              <div className="bg-white p-1.5 rounded-md shadow-sm">
                                <Clock className="w-4 h-4 text-primary-500" />
                              </div>
                              <span className="whitespace-nowrap">{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="bg-white p-1.5 rounded-md shadow-sm flex-shrink-0">
                                <MapPin className="w-4 h-4 text-primary-500" />
                              </div>
                              <span className="truncate" title={event.location}>{event.location}</span>
                            </div>
                          </div>

                          <p className="text-gray-600 text-base mb-8 line-clamp-2 leading-relaxed flex-grow">
                            {event.description}
                          </p>

                          <div className="mt-auto">
                            <Button variant="outline" className="w-full sm:w-auto font-bold border-2 focus:outline-none focus:ring-0 focus:border-primary-600" onClick={() => setSelectedItem({ ...event, type: 'event' })}>
                              Event Details
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {visibleEventItems < events.length && (
                  <div className="mt-12 flex justify-center">
                    <Button variant="outline" className="border-2 font-bold px-8 py-3 outline-none focus:outline-none active:outline-none" onClick={handleLoadMoreEvents}>
                      Load More Events
                    </Button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Section>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-y-auto z-10"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 p-2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 rounded-full transition-colors z-20 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {selectedItem.image && (
                <div className="w-full h-64 md:h-80 overflow-hidden relative">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
                </div>
              )}

              <div className="p-8 md:p-12 relative">
                <div className="flex items-center gap-3 mb-6">
                  {selectedItem.type === 'news' ? (
                    <div className="flex items-center gap-2 text-primary-600 bg-primary-50 px-4 py-1.5 rounded-full text-sm font-semibold">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedItem.date}</span>
                    </div>
                  ) : (
                    <Badge className="bg-primary-50 text-primary-700 border-0 font-bold tracking-wider uppercase">
                      {selectedItem.category} Event
                    </Badge>
                  )}
                  {selectedItem.status && (
                    <Badge className="bg-gray-100 text-gray-700 border-0">
                      {selectedItem.status}
                    </Badge>
                  )}
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {selectedItem.title}
                </h2>

                {selectedItem.type === 'event' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-sm text-gray-700 font-medium bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <Calendar className="w-5 h-5 text-primary-500" />
                      </div>
                      <span>{selectedItem.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <Clock className="w-5 h-5 text-primary-500" />
                      </div>
                      <span>{selectedItem.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <MapPin className="w-5 h-5 text-primary-500" />
                      </div>
                      <span className="truncate" title={selectedItem.location}>{selectedItem.location}</span>
                    </div>
                  </div>
                )}

                <div className="prose prose-lg prose-primary max-w-none text-gray-600 leading-relaxed">
                  <p>
                    {selectedItem.description}
                  </p>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 flex justify-end">
                  <Button variant="primary" onClick={() => setSelectedItem(null)}>
                    Close Details
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsAndEvents;
