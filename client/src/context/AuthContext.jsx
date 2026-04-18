import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { authApi } from "../services/api";
import { clearAuthState } from "../store/slices/authSlice";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const { data } = await authApi.me();
      setUser(data.user || null);
      return data.user || null;
    } catch {
      setUser(null);
      return null;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    const boot = async () => {
      await refreshUser();
      setLoading(false);
    };

    boot();

    const onUnauthorized = () => {
      setUser(null);
      dispatch(clearAuthState());
    };
    window.addEventListener("auth:unauthorized", onUnauthorized);

    return () => {
      window.removeEventListener("auth:unauthorized", onUnauthorized);
    };
  }, []);

  const value = useMemo(
    () => ({ user, loading, refreshUser, logout, setUser }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
