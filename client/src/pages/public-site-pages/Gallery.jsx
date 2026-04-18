import { useEffect, useMemo, useState } from "react";
import PublicButton from "../../components/shared/PublicButton";
import PageHero from "../../components/public-site/PageHero";
import FilterBar from "../../components/public-site/FilterBar";
import Badge from "../../components/shared/Badge";
import CTASection from "../../components/public-site/CTASection";
import SkeletonLoading from "../../components/shared/SkeletonLoading";

import { Calendar, Tag, X } from "lucide-react";

import { publicApi } from "../../services/api";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(9);
  const [popoverImage, setPopoverImage] = useState(null);
  const [images, setImages] = useState([]);
  const [isLoadingGallery, setIsLoadingGallery] = useState(true);

  useEffect(() => {
    const loadGallery = async () => {
      setIsLoadingGallery(true);
      try {
        const { data } = await publicApi.gallery();
        const mapped = (data.data || []).map((item) => ({
          id: item._id,
          src: item.image?.url,
          title: item.title,
          category: item.category,
          tags: (item.tags || []).join(", "),
          description: item.description,
          createdAt: new Date(item.createdAt).getTime(),
          date: new Date(item.createdAt).toLocaleDateString(),
        }));
        setImages(mapped);
      } catch {
        setImages([]);
      } finally {
        setIsLoadingGallery(false);
      }
    };

    loadGallery();
  }, []);

  const filters = useMemo(() => {
    const categories = Array.from(new Set(images.map((image) => image.category).filter(Boolean)));
    return [
      { id: "all", label: "All" },
      ...categories.map((category) => ({ id: category, label: category })),
    ];
  }, [images]);

  const filteredImages =
    activeFilter === "all"
      ? images
      : images.filter((img) => img.category === activeFilter);

  const sortedImages = [...filteredImages].sort((a, b) => {
    if (sortBy === "newest") {
      return b.createdAt - a.createdAt;
    }

    return a.createdAt - b.createdAt;
  });

  const displayedImages = sortedImages.slice(0, visibleCount);
  const hasMore = visibleCount < sortedImages.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <PageHero
        badge="Gallery"
        title="Campus Photo"
        highlightedWord="Gallery"
        description="Experience the vibrant life, stunning architecture, and memorable moments that define our community."
      />

      <FilterBar
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={(id) => {
          setActiveFilter(id);
          setVisibleCount(9);
        }}
        sortBy={sortBy}
        onSortChange={setSortBy}
        sortOptions={[
          { value: "newest", label: "Newest First" },
          { value: "oldest", label: "Oldest First" },
        ]}
        isSticky={false}
      />

      {/* Gallery Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 mb-12">
          {isLoadingGallery
            ? <SkeletonLoading count={9} variant="card" className="h-80" containerClassName="contents" />
            : displayedImages.map((image) => (
            <div
              key={image.id}
              className="group flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
              onClick={() => setPopoverImage(image)}
            >
              {/* Image */}
              <div className="relative h-52 sm:h-56 md:h-60 overflow-hidden flex-shrink-0">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Category Badge */}
                <Badge variant="navy" className="absolute top-3 left-3 backdrop-blur-sm bg-college-navy/90 text-white border-none text-[10px]">
                  {image.category}
                </Badge>
              </div>

              {/* Details - always visible */}
              <div className="p-4 sm:p-5 border-t-2 border-college-gold flex flex-col flex-1">
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-gray-900 text-base sm:text-lg leading-snug mb-1 group-hover:text-college-gold transition-colors duration-200">
                    {image.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3">
                    {image.description}
                  </p>

                  {/* Tags */}
                  {image.tags && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {image.tags.split(',').map((tag) => (
                        <span key={tag} className="flex items-center gap-1 text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                          <Tag className="w-2.5 h-2.5" />
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100 mt-auto text-gray-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-medium uppercase tracking-wider">{image.date}</span>
                </div>
              </div>
            </div>
          ))}
              {/* Fullscreen Popover / Modal */}
              {popoverImage && (
                <div 
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 md:p-10 animate-in fade-in duration-300"
                  onClick={() => setPopoverImage(null)}
                >
                  <div 
                    className="relative w-full max-w-6xl bg-college-navy border border-white/10 rounded-sm shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh] lg:max-h-[80vh] animate-in zoom-in-95 duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Close Button */}
                    <button 
                      className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-college-gold text-white rounded-full transition-colors"
                      onClick={() => setPopoverImage(null)}
                      aria-label="Close modal"
                    >
                      <X size={20} />
                    </button>

                    {/* Left/Top: Image Section */}
                    <div className="w-full lg:w-2/3 h-[40vh] sm:h-[50vh] lg:h-auto bg-black/50 flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5">
                      <img
                        src={popoverImage.src}
                        alt={popoverImage.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Right/Bottom: Details Section */}
                    <div className="w-full lg:w-1/3 p-6 sm:p-8 md:p-10 overflow-y-auto flex flex-col bg-college-navy">
                      <div className="mb-6">
                        <Badge variant="gold" className="mb-4">
                          {popoverImage.category}
                        </Badge>
                        <h2 className="text-2xl sm:text-3xl font-serif font-black text-white leading-tight uppercase tracking-tight">
                          {popoverImage.title}
                        </h2>
                      </div>

                      <div className="space-y-6 flex-1">
                        <div>
                          <h4 className="text-[10px] font-black text-college-gold/60 uppercase tracking-[0.2em] mb-2">Description</h4>
                          <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">
                            {popoverImage.description}
                          </p>
                        </div>

                        {popoverImage.tags && (
                          <div>
                            <h4 className="text-[10px] font-black text-college-gold/60 uppercase tracking-[0.2em] mb-2">Tags / Keywords</h4>
                            <div className="flex flex-wrap gap-2">
                              {popoverImage.tags.split(',').map((tag) => (
                                <span key={tag} className="flex items-center gap-1.5 text-[11px] bg-white/5 text-college-gold/90 px-3 py-1 rounded-sm border border-college-gold/20 uppercase tracking-widest font-bold">
                                  <Tag className="w-3 h-3" />
                                  {tag.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Footer Info */}
                      <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white/30">
                          <Calendar className="w-4 h-4 text-college-gold/50" />
                          <span className="text-xs font-bold uppercase tracking-widest">{popoverImage.date}</span>
                        </div>
                        <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em]">Institutional Gallery</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
        </div>


        {!isLoadingGallery && hasMore && (
          <div className="text-center">
            <PublicButton onClick={loadMore} variant="outline" size="md" className="px-8">
              Load More Photos
            </PublicButton>
          </div>
        )}

        {!isLoadingGallery && filteredImages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-gray-50 dark:bg-college-gold/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 dark:text-college-gold/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-college-navy dark:text-white">No photos found</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 max-w-sm">No photos found in this category.</p>
          </div>
        )}
      </main>

      {/* CTA Section */}
      <CTASection
        title="Want to see it in person?"
        description="Schedule a campus tour today and experience the energy of our community firsthand. Our student ambassadors are ready to show you around."
        className="bg-college-gold text-college-navy"
      >
        <PublicButton to="/contact" variant="secondary" size="lg" shape="slanted">
          Book a Campus Tour
        </PublicButton>
      </CTASection>
    </div>
  );
};

export default Gallery;

