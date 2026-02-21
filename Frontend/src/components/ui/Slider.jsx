import { useRef, useState } from 'react';

const Slider = ({ children }) => {
  const containerRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDown(false);
  };

  const onMouseUp = () => {
    setIsDown(false);
  };

  const onMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll faster by a factor of 2
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative group w-full">
      <div
        ref={containerRef}
        className={`flex overflow-x-auto gap-6 pb-4 no-scrollbar ${isDown ? 'cursor-grabbing select-none scroll-auto' : 'cursor-grab scroll-smooth'
          }`}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        style={{
          WebkitOverflowScrolling: 'touch', // for smooth scrolling on iOS
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Slider;