import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import axios from "axios";
import { serverURI } from "../App";
import Spinner from "./Spinner";

const Card = ({ post }) => {
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [profilePhotoURL, setProfilePhotoURL] = useState("");
  const renderPopup = () => {
    setRender(true);
  };
  const getPhoto = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${serverURI}/read/${post.postURL}`,
        {
          withCredentials: true,
        }
      );
      setPhotoURL(data.fileUrl);
      setLoading(false);
    } catch (error) {
      console.log("error",error);
      setLoading(false);
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
          {post.isNew?<div className="newBadge"></div>:null}
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
          {loading?<Spinner/>:null}
        </div>
      )}
    </>
  );
};

export default Card;
