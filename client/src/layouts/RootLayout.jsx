import { Outlet, useLocation } from "react-router-dom";
import { useEffect, Suspense } from "react";
import Navbar from "../components/public_site/Navbar";
import Footer from "../components/public_site/Footer";
import PageLoader from "../components/shared/PageLoader";

const RootLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.remove("dark");
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
