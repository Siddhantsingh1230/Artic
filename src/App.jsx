import React, { useState, useEffect, useContext } from "react";
import Home from "./components/Home";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";
import { Context } from "./index.js";
import axios from "axios";

export const serverURI = "https://articverse.cyclic.app";
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
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
      {isLoading ? <Loader /> : <Home />}
      <Toaster />
    </>
  );
};

export default App;
