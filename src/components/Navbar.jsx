import React, { useContext } from "react";
import { Context } from "../index.js";
import { serverURI } from "../App.jsx";

const Navbar = () => {
  const { user } = useContext(Context);
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
            <input placeholder="Search" type="search" />
          </div>
          <div className="notifications">
            <i data-title="Chat" className="ri-message-2-line"></i>
            <i data-title="Notification" className="ri-notification-2-fill"></i>
          </div>
          <div className="user">
            <div className="userName">
              {user.firstname}
              <div className="tooltip">User</div>
            </div>
            <img
              src={`${serverURI}/profile_images/${user.profileImageURL}`}
              alt="userSprite"
              className="userSprite"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
