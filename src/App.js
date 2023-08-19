import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Loader from "./components/Loader";

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
  return <>{isLoading ? <Loader /> :<Home />}</>;
};

export default App;
