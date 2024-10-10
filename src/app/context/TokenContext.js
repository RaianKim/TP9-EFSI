'use client'

import { useEffect, createContext, useState } from "react";

export const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const saveToken = (newToken) => {
    localStorgae.setItem("token", newToken);
    setToken(newToken);
  };

  return (
    <TokenContext.Provider value={{ token, saveToken, isLogged: !!token }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
