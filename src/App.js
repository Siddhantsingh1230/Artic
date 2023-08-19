import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Loader from "./components/Loader";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    window.onload = function() {
      setIsLoading(false);
    };
  }, []);
  return <>{isLoading ? <Loader /> :<Home />}</>;
};

export default App;
