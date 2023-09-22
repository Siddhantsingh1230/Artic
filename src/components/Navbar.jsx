import React, { useContext, useState, useRef, useEffect } from "react";
import { Context } from "../index.js";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat.jsx";
import axios from "axios";
import Spinner from "./Spinner";

const Navbar = ({ onInputChange }) => {
  const { user, profileURL } = useContext(Context);
  const [renderChat, setrenderChat] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const searchBarRef = useRef(null);
  const searchRef = useRef(null);
  const chatRef = useRef(null);
  const notiRef = useRef(null);
  const notiboxRef = useRef(null);
  const userRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const startSearchBar = () => {
    searchBarRef.current.style.display = "flex";
    chatRef.current.style.display = "none";
    notiRef.current.style.display = "none";
    searchRef.current.style.display = "none";
    userRef.current.style.margin = "-1rem";
  };
  const showHideTab = () => {
    if (notiboxRef.current.style.display == "block") {
      notiboxRef.current.style.display = "none";
    } else {
      notiboxRef.current.style.display = "block";
    }
  };
  const closeSearch = () => {
    searchBarRef.current.style.display = "none";
    chatRef.current.style.display = "flex";
    notiRef.current.style.display = "flex";
    searchRef.current.style.display = "flex";
    userRef.current.style.margin = "0rem";
    onInputChange("");
    setSearchValue("");
  };
  const navigate = useNavigate();
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://articmailserver.onrender.com/notifications/getnotifications`,
        { _id: user._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setNotifications(data.notifications);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);
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
              onChange={(e) => {
                onInputChange((e.target.value).toLowerCase());
                setSearchValue(e.target.value);
              }}
              value={searchValue}
              placeholder="Search"
            />
            <i
              className="ri-close-line"
              style={{ color: "&#xEB99" }}
              onClick={closeSearch}
            ></i>
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
              onClick={showHideTab}
            ></i>
            <i
              data-title="search"
              className="fa-solid fa-magnifying-glass fa-xs searchIcon"
              style={{ fontSize: "1rem" }}
              ref={searchRef}
              onClick={startSearchBar}
            ></i>
          </div>
          <div className="user">
            <div className="userName">
              {user.firstname}
              <div className="tooltip">User</div>
            </div>
            <img
              ref={userRef}
              onClick={() => navigate("/setting")}
              src={profileURL}
              className="userSprite"
            />
          </div>
        </div>
      </div>
      <div className="notificationDiv" ref={notiboxRef}>
        <div className="notiTitle">
          <p>Notification</p>
          <i onClick={showHideTab} className="ri-close-fill notiCancel"></i>
        </div>
        <div className="notiContent">
          {notifications.length > 0 ? (
            notifications.map((item, i) => {
              let date = new Date(item.createdAt).toLocaleString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              });
              return (
                <div key={i} className="notiItem">
                  {item.notification}
                  <div className="notiDate"> {date}</div>
                </div>
              );
            })
          ) : (
            <div className="notiItem">No notifications</div>
          )}
          {loading && <Spinner />}
        </div>
      </div>
      {renderChat ? <Chat setRender={setrenderChat} /> : null}
    </>
  );
};

export default Navbar;
