import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import PageLoader from "./PageLoader";
import { fetchUser } from "../../store/slices/authSlice";

const isPortalPath = (pathname = "") =>
  pathname.startsWith("/admin") ||
  pathname.startsWith("/faculty") ||
  pathname.startsWith("/student");

const AuthGate = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const pathname = location.pathname || "/";
  const portalRoute = isPortalPath(pathname);
  const [authReady, setAuthReady] = useState(!portalRoute);

  useLayoutEffect(() => {
    if (!portalRoute) {
      setAuthReady(true);
      return undefined;
    }

    let cancelled = false;
    setAuthReady(false);

    dispatch(fetchUser())
      .unwrap()
      .catch(() => null)
      .finally(() => {
        if (!cancelled) {
          setAuthReady(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [dispatch, portalRoute, pathname]);

  if (!authReady) {
    return <PageLoader />;
  }

  return children;
};

export default AuthGate;