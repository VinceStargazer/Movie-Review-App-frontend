import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getIsAuth, signInUser } from "../../api/auth";
import { useNotification } from "../../hooks";

export const AuthContext = createContext();

const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: ""
};

export default function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });
  const { updateNotification } = useNotification();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setAuthInfo({ ...authInfo, isPending: true });
    const { error, user } = await signInUser({ email, password });
    if (error) {
      updateNotification("error", error);
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }

    navigate("/", { replace: true });
    setAuthInfo({
      ...authInfo,
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: ""
    });

    // create token for the current user
    localStorage.setItem("auth-token", user.token);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setAuthInfo({ ...defaultAuthInfo });
  };

  const isAuth = async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) return;
    setAuthInfo({ ...authInfo, isPending: true });
    const { error, user } = await getIsAuth(token);
    if (error) {
      updateNotification("error", error);
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }

    setAuthInfo({
      ...authInfo,
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: ""
    });
  };

  useEffect(() => {
    isAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ authInfo, handleLogin, handleLogout, isAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}
