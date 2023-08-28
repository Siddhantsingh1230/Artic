import React, { useContext } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Posts from "./Posts";
import Setting from "./Setting";
import Upload from "./Upload";
import Login from "./Login";
import Signup from "./Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Context } from "../index.js";

const Home = () => {
  const { isAutheticated } = useContext(Context);
  return (
    <>
      <Router>
        {!isAutheticated ? (
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        ) : (
          <div className="homeWrapper">
            <Navbar />
            <div className="homeBody">
              <Sidebar />
              <Routes>
                <Route exact path="/" element={<Content />} />
                <Route exact path="/posts" element={<Posts />} />
                <Route exact path="/setting" element={<Setting />} />
                <Route exact path="/upload" element={<Upload />} />
              </Routes>
            </div>
          </div>
        )}
      </Router>
    </>
  );
};

export default Home;
