import React, { useContext, useState } from "react";
import { Context } from "../index.js";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat.jsx";

const Navbar = ({ onInputChange }) => {
  const { user, profileURL } = useContext(Context);
  const [renderChat, setrenderChat] = useState(false);
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
          <div className="search">
            <i
              className="fa-solid fa-magnifying-glass fa-2xs"
              style={{ color: "#ffffff" }}
            ></i>
            <input
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Search"
              type="search"
            />
          </div>
          <div className="notifications">
            <i
              onClick={() => setrenderChat(true)}
              data-title="Chat"
              className="ri-message-2-line"
            ></i>
            <i data-title="Notification" className="ri-notification-2-fill"></i>
          </div>
          <div className="user">
            <div className="userName">
              {user.firstname}
              <div className="tooltip">User</div>
            </div>
            <img
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
