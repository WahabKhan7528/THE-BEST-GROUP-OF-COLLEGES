import { Outlet, useLocation } from "react-router-dom";
import { useEffect, Suspense } from "react";
import Navbar from "../components/public-site/Navbar";
import Footer from "../components/public-site/Footer";
import PageLoader from "../components/shared/PageLoader";

const RootLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;

