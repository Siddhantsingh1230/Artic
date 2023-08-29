import React, { useContext } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Posts from "./Posts";
import Setting from "./Setting";
import Upload from "./Upload";
import Login from "./Login";
import Signup from "./Signup";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Context } from "../index";

const Home = () => {
  const { isAuthenticated } = useContext(Context);
  return (
    <>
      <Router>
        {!isAuthenticated ? (
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="*" element={<Navigate to="/" />} />
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
                <Route exact path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        )}
      </Router>
    </>
  );
};

export default Home;
