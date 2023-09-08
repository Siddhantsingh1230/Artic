import React, { useContext, useState, useRef } from "react";
import { Context } from "../index.js";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat.jsx";

const Navbar = ({ onInputChange }) => {
  const { user, profileURL } = useContext(Context);
  const [renderChat, setrenderChat] = useState(false);
  const searchBarRef = useRef(null);
  const searchRef = useRef(null);
  const chatRef = useRef(null);
  const notiRef = useRef(null);
  const userRef =useRef(null)
  const startSearchBar=()=>{
    searchBarRef.current.style.display="flex";
    chatRef.current.style.display="none";
    notiRef.current.style.display="none";
    searchRef.current.style.display="none";
    userRef.current.style.margin="-1rem"
  }
  const closeSearch=()=>{
    searchBarRef.current.style.display="none";
    chatRef.current.style.display="flex";
    notiRef.current.style.display="flex";
    searchRef.current.style.display="flex";
    userRef.current.style.margin="0rem"
  }
  const navigate = useNavigate();
  return (
    <>
      <div className="navBar">
        <div className="logoContainer">
          <img src="/icon/Logo.png" alt="logo" className="logo" />
          <div data-title="Artic" className="title">
            ARTIC
          </div>
        </div>
        <div className="navUtils">
          <div className="search" ref={searchBarRef}>
            <i
              className="fa-solid fa-magnifying-glass fa-2xs"
              style={{ color: "#ffffff" }}
            ></i>
            <input
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Search"
            />
            <i className="ri-close-line" style={{color :"&#xEB99"}} onClick={closeSearch}></i>
          </div>
          <div className="notifications">

            <i
              onClick={() => setrenderChat(true)}
              data-title="Chat"
              className="ri-message-2-line"
              ref={chatRef}
            ></i>
            <i 
              data-title="Notification" 
              className="ri-notification-2-fill"
              ref={notiRef}
            ></i>
            <i
              data-title="search"
              className="fa-solid fa-magnifying-glass fa-xs searchIcon"
              style={{fontSize:"1rem"}}
              ref={searchRef}
              onClick={startSearchBar}
            ></i>
          </div>
          <div className="user">
            <div className="userName">
              {user.firstname}
              <div className="tooltip">User</div>
            </div>
            <img ref={userRef}
              onClick={() => navigate("/setting")}
              src={profileURL}
              className="userSprite"
            />
          </div>
        </div>
      </div>
      {renderChat ? <Chat setRender={setrenderChat} /> : null}
    </>
  );
};

export default Navbar;
