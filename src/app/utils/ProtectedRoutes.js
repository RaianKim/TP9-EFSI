"use client";

import { TokenContext } from "../context/TokenContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export const ProtectedRoutes = ({ children }) => {
  const router = useRouter();
  const { isLoggedIn } = useContext(TokenContext);

  const isLoginPage = router.pathname === "/login";

  if (!isLoggedIn && /*!*/isLoginPage) {
    return <h2>Acceso Restringido</h2>;
  }
  return children;
};
