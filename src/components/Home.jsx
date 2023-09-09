import React, { useContext, useEffect,useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Posts from "./Posts";
import Setting from "./Setting";
import Upload from "./Upload";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPwd from "./ForgotPwd";
import ResetPwd from "./ResetPwd";
import axios from "axios";
import { serverURI } from "../App";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Context } from "../index";
import ProfilePreview from "./ProfilePreview";

const Home = () => {
  const { isAuthenticated,setProfileURL,user } = useContext(Context);
  // For search Functionality
  const [searchValue, setSearchValue] = useState('');
  const handleInputChange = (value) => {
    setSearchValue(value);
  };
  useEffect(()=>{
    const getProfilePhoto = async () => {
      try {
        const { data } = await axios.get(
          `${serverURI}/read/${user.profileImageURL}`,
          {
            withCredentials: true,
          }
        );
        setProfileURL(data.fileUrl);
      } catch (error) {
        console.log("error");
      }
    };
    if(isAuthenticated){
      getProfilePhoto();
    }
  },[isAuthenticated,user]);
  return (
    <>
      <Router>
        {!isAuthenticated ? (
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/forgotpwd" element={<ForgotPwd />} />
            <Route exact path="/resetpwd/:id/:token" element={<ResetPwd />} />
            <Route exact path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <div className="homeWrapper">
            <Navbar onInputChange={handleInputChange} />
            <div className="homeBody">
              <Sidebar />
              <Routes>
                <Route exact path="/" element={<Content searchValue={searchValue} />} />
                <Route exact path="/posts" element={<Posts />} />
                <Route exact path="/setting" element={<Setting />} />
                <Route exact path="/upload" element={<Upload />} />
                <Route exact path="/dpreview" element={<ProfilePreview />} />
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
