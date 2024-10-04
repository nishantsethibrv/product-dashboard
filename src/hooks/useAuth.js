import { useState, useEffect } from 'react';
import config from "../config"

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loginAPI = "auth/login";
  const login = async (email, password) => {
    // console.log(email, "--", password)
    try {
      const response = await fetch(`${config.apiBaseUrl}${loginAPI}`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password: password }),
      });

      const data = await response.json();
      console.log(data, "data");
      if(data.accessToken){
        localStorage.setItem("accesstoken", data.accessToken);
        setIsAuthenticated(true);
      }
      if(data.refreshToken){
        localStorage.setItem("refreshtoken", data.refreshToken);
      }
      if(data.firstName || data.lastName){
        localStorage.setItem("name", data.firstName + " " + data.lastName);
      }
      if(data.image){
        localStorage.setItem("pic", data.image);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      console.log("User is authenticated:", isAuthenticated);
    }
  }, [isAuthenticated]);
  return { isAuthenticated, login };
};

export default useAuth;
