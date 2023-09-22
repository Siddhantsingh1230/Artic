import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import axios from "axios";
import { serverURI } from "../App";
import Spinner from "./Spinner";

const Card = ({ post, content, setContent }) => {
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
      const { data } = await axios.get(`${serverURI}/read/${post.postURL}`, {
        withCredentials: true,
      });
      setPhotoURL(data.fileUrl);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
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
      console.log("error", error);
      console.log(post);
    }
  };
  const [isNew, setIsNew] = useState(false);
  useEffect(() => {
    getPhoto();
    getProfilePhoto();
    const currentDate = new Date();
    const postCreatedAt = new Date("" + post.createdAt);
    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - postCreatedAt;
    // Calculate the time difference in minutes
    const minutesDifference = timeDifference / (1000 * 60);
    // Check if the time difference is less than or equal to 15 minutes
    if (minutesDifference <= 1440) {
      setIsNew(true);
    }
  }, []);
  return (
    <>
      {render ? (
        <Popup
          content={content}
          setContent={setContent}
          post={post}
          imgURL={photoURL}
          setRender={setRender}
        />
      ) : (
        <div
          className="card"
          onClick={() => {
            renderPopup();
          }}
        >
          {isNew ? <div className="newBadge"></div> : null}
          <img src={photoURL} className="animated-background" alt="" />
          <p className="taleTitle">{post.postCaption}</p>
          <div className="taleUser">
            <img className="taleUserSprite" src={profilePhotoURL} alt="" />
            <p>{post.userName}</p>
          </div>
          {loading ? <Spinner /> : null}
        </div>
      )}
    </>
  );
};

export default Card;
