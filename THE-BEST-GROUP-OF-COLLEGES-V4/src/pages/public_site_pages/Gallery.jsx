import { useState } from "react";
import PublicButton from "../../components/shared/PublicButton";
import PageHero from "../../components/public_site/PageHero";
import FilterBar from "../../components/public_site/FilterBar";
import Badge from "../../components/public_site/Badge";
import CTASection from "../../components/public_site/CTASection";

import { Calendar, Tag } from "lucide-react";

import {
  galleryFilters as filters,
  galleryImages as images,
} from "../../data/galleryData";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(9);

  const filteredImages =
    activeFilter === "all"
      ? images
      : images.filter((img) => img.category === activeFilter);

  const sortedImages = [...filteredImages].sort((a, b) => {
    if (sortBy === "newest") {
      return b.id - a.id;
    } else {
      return a.id - b.id;
    }
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
          {displayedImages.map((image) => (
            <div key={image.id} className="group flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
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

              {/* Details — always visible */}
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
        </div>


        {hasMore && (
          <div className="text-center">
            <PublicButton onClick={loadMore} variant="outline" size="md" className="px-8">
              Load More Photos
            </PublicButton>
          </div>
        )}

        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No photos found in this category.</p>
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
        <PublicButton to="/admissions" variant="primary" size="lg" className="border-2 border-white/10" shape="slanted">
          Download Prospectus
        </PublicButton>
      </CTASection>
    </div>
  );
};

export default Gallery;
