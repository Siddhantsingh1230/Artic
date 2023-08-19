import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Posts from "./Posts";
import Setting from "./Setting";
import Upload from "./Upload";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="homeWrapper">
        <Navbar />
        <div className="homeBody">
          <Router>
            <Sidebar />
            <Routes>
              <Route exact path="/" element={<Content />} />
              <Route exact path="/posts" element={<Posts />} />
              <Route exact path="/setting" element={<Setting />} />
              <Route exact path="/upload" element={<Upload />} />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
};

export default Home;
