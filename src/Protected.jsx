import React, { useState, useEffect, use } from "react";
import { ACCESS, REFRESH } from "./constants";
import api from "./api";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Loading from "./components/Loading";

function Protected({ children }) {
  const [IsAuth, SetIsAuth] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const refreshToken = async () => {
    const refresh = localStorage.getItem(REFRESH);

    if (!refresh) {
      SetIsAuth(false);
      return;
    }
    try {
      const response = await api.post("/token/refresh/", { refresh });
      localStorage.setItem(ACCESS, response.data.access);
      SetIsAuth(true);
    } catch (error) {
      console.log(error);
      SetIsAuth(false);
    }
  };

  const checkAuth = async () => {
    const token = localStorage.getItem(ACCESS);

    if (!token) {
      SetIsAuth(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        await refreshToken();
      }

      SetIsAuth(true);
    } catch (error) {
      console.log(error);
      SetIsAuth(false);
    }
  };

  if (IsAuth === null) {
    return <Loading />;
  }

  return IsAuth ? children  : <Navigate to="/auth" />;
}

export default Protected;
