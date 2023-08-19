import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="navBar">
        <div className="logoContainer">
          <img src="/icon/Logo.png" alt="logo" className="logo" />
          <div data-title="Artic" className="title">ARTIC</div>
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
            <i
              className="fa-solid fa-bell fa-xs"
              data-title="Noti"
              style={{ color: "#ffffff"}}
            ></i>
          </div>
          <div className="user">
            <p data-title="User" className="userName">Dimitri</p>
            <img src="icon/userSprite.jpg" alt="userSprite" className="userSprite" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
