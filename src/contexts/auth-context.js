import sessionStorageManagment from "@/services/sessionstorageManagment";
import { useRouter } from "next/router";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  isAuth: false,
  login: () => {},
  logout: () => {},
  path: "",
  setIsAuth: () => {},
});

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [path, setPath] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setIsAuth(!!sessionStorageManagment.read("isAuth", false));
    setPath(sessionStorageManagment.read("path"));
  }, []);

  const handleLogin = (isLogin) => {
    setIsAuth(isLogin);
    sessionStorageManagment.write("isAuth", isLogin);
    const prevPath = sessionStorageManagment.read("path", "");
    router.push(isLogin ? "/admin" : "/login");
    sessionStorageManagment.write("path", "");
  };

  const handleLogout = () => {
    handleLogin(false);
    setPath("/");
    sessionStorageManagment.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        login: handleLogin,
        isAuth,
        logout: handleLogout,
        path,
        setIsAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
