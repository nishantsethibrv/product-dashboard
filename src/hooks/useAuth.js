import { useState } from 'react';
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
      }
      if(data.accessToken){
        localStorage.setItem("refreshtoken", data.refreshToken);
      }
      if(data.firstName || data.lastName){
        localStorage.setItem("name", data.firstName + " " + data.lastName);
      }
      if(data.image){
        localStorage.setItem("pic", data.image);
      }
      if (data.isAuthenticated) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return { isAuthenticated, login };
};

export default useAuth;
