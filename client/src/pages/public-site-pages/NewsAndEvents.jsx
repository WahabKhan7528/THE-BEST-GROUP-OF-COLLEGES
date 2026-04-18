import { useEffect, useMemo, useState } from "react";
import { ArrowRight, User } from "lucide-react";
import PublicButton from "../../components/shared/PublicButton";
import PageHero from "../../components/public-site/PageHero";
import NewsCard from "../../components/public-site/NewsCard";
import EventCard from "../../components/public-site/EventCard";
import CTASection from "../../components/public-site/CTASection";
import Card from "../../components/shared/Card";
import SkeletonLoading from "../../components/shared/SkeletonLoading";

import Pagination from "../../components/public-site/Pagination";
import { publicApi } from "../../services/api";

const NewsAndEvents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  const newsPerPage = 3;

  useEffect(() => {
    const loadNewsEvents = async () => {
      setIsLoadingItems(true);
      try {
        const { data } = await publicApi.newsEvents();
        setItems(data.data || []);
      } catch {
        setItems([]);
      } finally {
        setIsLoadingItems(false);
      }
    };

    loadNewsEvents();
  }, []);

  const newsItems = useMemo(
    () =>
      items
        .filter((item) => item.type === "news")
        .map((item) => ({
          id: item._id,
          title: item.title,
          category: item.category,
          categoryColor: "from-sky-100 to-sky-200 text-sky-800",
          date: item.date ? new Date(item.date).toLocaleDateString() : new Date(item.createdAt).toLocaleDateString(),
          image: item.image?.url,
          description: item.description,
        })),
    [items],
  );

  const events = useMemo(
    () =>
      items
        .filter((item) => item.type === "event")
        .map((item) => ({
          id: item._id,
          title: item.title,
          category: item.category,
          categoryColor: "from-blue-400 to-blue-500",
          date: item.date ? new Date(item.date).toLocaleDateString() : new Date(item.createdAt).toLocaleDateString(),
          time: item.time || "",
          location: item.location || "",
          image: item.image?.url,
          description: item.description,
          status: item.status || "Upcoming",
        })),
    [items],
  );

  // Pagination Logic
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNewsItems = newsItems.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(newsItems.length / newsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <PageHero
        badge="News & Events"
        title="Latest News"
        highlightedWord="& Events"
        description="Stay updated with the vibrant life at our campuses. From academic breakthroughs to cultural festivities, discover what's happening at The Best Group of Colleges."
      />

      {/* Main Content - Two Column Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Campus News */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-college-navy">Campus News</h2>
            </div>

            <div className="space-y-8">
              {isLoadingItems
                ? <SkeletonLoading count={3} variant="card" className="h-48" containerClassName="space-y-8" />
                : currentNewsItems.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={paginate}
              />
            </div>
          </div>

          {/* Right Column - Upcoming Events */}
          <div className="lg:col-span-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-college-navy mb-8">Upcoming Events</h2>

            <div className="relative group">
              {/* Slider Container */}
              <div className="max-h-[700px] overflow-y-auto space-y-6 no-scrollbar pr-1 py-1 scroll-smooth">
                {isLoadingItems
                  ? <SkeletonLoading count={3} variant="card" className="h-56" containerClassName="space-y-6" />
                  : events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
              </div>
            </div>

            {/* Contact CTA */}
            <Card variant="" hover={false} className="bg-college-navy text-white text-center mt-8 p-6 md:p-8 rounded-sm">
              <h3 className="text-xl font-serif font-bold text-white mb-3">Have Questions?</h3>
              <p className="text-white/70 text-sm mb-6 leading-relaxed">We're here to help! Reach out to us for inquiries, campus tours, or any information you need.</p>
              <PublicButton to="/contact#contact-form" variant="secondary" className='w-60 h-10 hover:font-bold' shape="slanted">
                <span className="hover:scale-110 transition-all duration-300">Contact Us</span>
              </PublicButton>
            </Card>
          </div>
        </div>
      </main>

      <CTASection
        badge="Join the Conversation"
        title="Become Part of Our"
        highlightedWord="Community"
        description="We are more than just a college; we are a family. Stay connected through our social platforms and share your journey with us."
      >
       
        <PublicButton
          to="/campuses/main/student-life"
          variant="outline"
          size="md"
          className="border-2 border-white/10"
        >
          Explore Student Life
        </PublicButton>
         <PublicButton
          to="/contact"
          variant="secondary"
          size="md"
          icon={ArrowRight}
          className=""
          shape="slanted"
        >
          Share Your Story
        </PublicButton>
      </CTASection>
    </div>
  );
};

export default NewsAndEvents;

