import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";

export const useLocomotiveScroll = (dependency = []) => {
  const scrollRef = useRef(null);
  const locomotiveScrollRef = useRef(null);

  useEffect(() => {
    let scrollInstance = null;

    // Destroy existing instance if it exists (for route changes)
    if (locomotiveScrollRef.current) {
      locomotiveScrollRef.current.destroy();
      locomotiveScrollRef.current = null;
    }

    // Initialize Locomotive Scroll
    if (scrollRef.current) {
      scrollInstance = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        multiplier: 1,
        class: "is-revealed",
        scrollbarClass: "c-scrollbar",
        scrollingClass: "has-scroll-scrolling",
        draggingClass: "has-scroll-dragging",
        smoothClass: "has-scroll-smooth",
        initClass: "has-scroll-init",
        getSpeed: true,
        getDirection: true,
        smartphone: {
          smooth: false, // Disable on mobile for better performance
        },
        tablet: {
          smooth: false, // Disable on tablet for better performance
        },
      });

      locomotiveScrollRef.current = scrollInstance;

      // Update scroll after images load
      const updateAfterImages = () => {
        if (scrollInstance && scrollRef.current) {
          const images = scrollRef.current.querySelectorAll("img");
          let loadedCount = 0;
          const totalImages = images.length;

          if (totalImages === 0) {
            scrollInstance.update();
            return;
          }

          images.forEach((img) => {
            if (img.complete) {
              loadedCount++;
            } else {
              img.addEventListener("load", () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                  scrollInstance.update();
                }
              });
              img.addEventListener("error", () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                  scrollInstance.update();
                }
              });
            }
          });

          if (loadedCount === totalImages) {
            scrollInstance.update();
          }
        }
      };

      // Update on window load
      window.addEventListener("load", () => {
        if (scrollInstance) {
          scrollInstance.update();
        }
      });

      // Initial update
      setTimeout(() => {
        if (scrollInstance) {
          scrollInstance.update();
        }
      }, 100);

      updateAfterImages();
    }

    // Update scroll when dependencies change (like route changes)
    if (locomotiveScrollRef.current) {
      const timer = setTimeout(() => {
        if (locomotiveScrollRef.current) {
          locomotiveScrollRef.current.update();
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, dependency);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
        locomotiveScrollRef.current = null;
      }
    };
  }, []);

  return { scrollRef, locomotiveScrollRef };
};

