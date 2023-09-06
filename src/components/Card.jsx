import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import axios from "axios";
import { serverURI } from "../App";

const Card = ({ post }) => {
  const [render, setRender] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [profilePhotoURL, setProfilePhotoURL] = useState("");
  const renderPopup = () => {
    setRender(true);
  };
  const getPhoto = async () => {
    try {
      const { data } = await axios.get(
        `${serverURI}/read/${post.postURL}`,
        {
          withCredentials: true,
        }
      );
      setPhotoURL(data.fileUrl);
    } catch (error) {
      console.log("error",error);
    }
  };
  const getProfilePhoto = async () => {
    try {
      const { data } = await axios.get(
        `${serverURI}/read/${post.userProfileLink}`,
        {
          withCredentials: true,
        }
      );
      setProfilePhotoURL(data.fileUrl);
    } catch (error) {
      console.log("error",error);
      console.log(post);
    }
  };
  
  useEffect(() => {
    getPhoto();
    getProfilePhoto();
  }, []);
  return (
    <>
      {render ? (
        <Popup post={post} imgURL={photoURL} setRender={setRender} />
      ) : (
        <div
          className="card"
          onClick={() => {
            renderPopup();
          }}
        >
          <div className="newBadge"></div>
          <img src={photoURL} className="animated-background" alt="" />
          <p className="taleTitle">{post.postCaption}</p>
          <div className="taleUser">
            <img
              className="taleUserSprite"
              src={profilePhotoURL}
              alt=""
            />
            <p>{post.userName}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
