import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocomotiveScroll } from "../hooks/useLocomotiveScroll";

const RootLayout = () => {
  const location = useLocation();
  const { scrollRef, locomotiveScrollRef } = useLocomotiveScroll([location.pathname]);

  useEffect(() => {
    // Scroll to top on route change using Locomotive Scroll
    const timer = setTimeout(() => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.scrollTo(0, {
          duration: 0,
          disableLerp: true,
        });
      } else {
        // Fallback to window scroll
        window.scrollTo(0, 0);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, locomotiveScrollRef]);

  return (
    <div>
      <Navbar />
      <div
        ref={scrollRef}
        data-scroll-container
        className="flex flex-col min-h-screen"
      >
        <main className="flex-grow" data-scroll>
          <Outlet />
        </main>
        <Footer data-scroll />
      </div>
    </div>
  );
};

export default RootLayout;
