import React, { createContext, useContext, useEffect, useState } from "react";
import decode from "jwt-decode";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

const getTokenFromLocalStorage = () => {
    return localStorage.getItem("id_token");
}

const saveTokenToLocalStorage = (token) => {
    localStorage.setItem("id_token", token);
}

const removeTokenFromLocalStorage = () => {
    localStorage.removeItem("id_token");
}

const isTokenExpired = (decodedToken) => decodedToken.exp < Date.now() / 1000;

const isTokenValid = (token) => {
    if (!token) return false;
    try {
        const decodedToken = decode(token);

        if (isTokenExpired(decodedToken)) return false;

        return true;

    } catch (error) {
        //Token is not valid
        return false;
    }
}

const decodeToken = (token) => {
    try {
        const decodedToken = decode(token);
        return decodedToken;
    } catch (error) {
        return {}
    }
}

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(getTokenFromLocalStorage() || null);
  const [loggedIn, setLoggedIn] = useState(!!getTokenFromLocalStorage())
  const [userData, setUserData] = useState(decodeToken(getTokenFromLocalStorage()) || {});

  useEffect(() => {
      if (token && isTokenValid(token)) {
          setLoggedIn(true);
          setUserData(decodeToken(token));
          saveTokenToLocalStorage(token);
      } else {
          setToken(null);
          setUserData({});
          setLoggedIn(false);
          removeTokenFromLocalStorage();
      }
  }, [token, setLoggedIn, setUserData, setToken]);

  const login = (token) => {
      setToken(token);
  };

  const logout = () => {
    setLoggedIn(false);
    setUserData({});
    setToken(null);
    removeTokenFromLocalStorage();
  };

  const getToken = () => {
    if (token && isTokenValid(token)) {
        return token;
    } else {
        logout();
        return null;
    }
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout, userData, getToken}}>
      {children}
    </AuthContext.Provider>
  );
};
