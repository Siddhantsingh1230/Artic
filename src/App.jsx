import React, { useState,useEffect,useContext } from "react";
import Home from "./components/Home";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";
import { Context } from "./index.js";
import axios from "axios";



export const serverURI = "https://articverseapi.onrender.com";
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   if (document.readyState === "complete") {
  //     setIsLoading(false);
  //   } else {
  //     window.addEventListener("load", () => {
  //       setIsLoading(false);
  //     });
  //   }
  // }, []);
  const { setIsAuthenticated, setUser } = useContext(Context);
  const userAuthentication = () => {
    setIsLoading(true);
    axios
      .get(`${serverURI}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        const { data } = res;
        // console.log(data);
        setUser(data.user);
        setIsAuthenticated(true);
        setIsLoading(false);
      })
      .catch((e) => {
        // Not logged in
        // console.log(e.response.data.message);
        setUser({});
        setIsAuthenticated(false);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    userAuthentication();
  }, []);
  
  return (
    <>
      {isLoading ? <Loader /> : <Home/>}
      <Toaster />
    </>
  );
};

export default App;
