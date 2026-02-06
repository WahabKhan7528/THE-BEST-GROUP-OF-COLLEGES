import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Slider = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      setShowControls(container.scrollWidth > container.clientWidth);
    }
  }, [children]);

  const scroll = (direction) => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
      container.scrollTo({
        left: container.scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollPosition(containerRef.current.scrollLeft);
    }
  };

  return (
    <div className="relative group">
      <div
        ref={containerRef}
        className="flex overflow-x-auto scroll-smooth gap-6 pb-4 no-scrollbar"
        onScroll={handleScroll}
      >
        {children}
      </div>
      
      {showControls && (
        <>
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition-opacity duration-200 ${
              scrollPosition <= 0 ? 'opacity-0' : 'opacity-100'
            }`}
            disabled={scrollPosition <= 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition-opacity duration-200 ${
              containerRef.current &&
              scrollPosition >= containerRef.current.scrollWidth - containerRef.current.clientWidth
                ? 'opacity-0'
                : 'opacity-100'
            }`}
            disabled={
              containerRef.current &&
              scrollPosition >= containerRef.current.scrollWidth - containerRef.current.clientWidth
            }
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  );
};

export default Slider;