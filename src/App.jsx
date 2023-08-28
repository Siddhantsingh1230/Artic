import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";

export const serverURI = "https://articverseapi.onrender.com";
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (document.readyState === "complete") {
      setIsLoading(false);
    } else {
      window.addEventListener("load", () => {
        setIsLoading(false);
      });
    }
  }, []);
  return <>{isLoading ? <Loader /> :<Home />}<Toaster /></>;
};

export default App;
