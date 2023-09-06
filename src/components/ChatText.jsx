import React, { useEffect, useState } from 'react';
import axios from "axios";
import { serverURI } from "../App";

const ChatText = ({chat}) => {
  const [profilePhoto,setProfilePhoto] = useState("");
  const getProfilePhoto = async()=>{
    try {
      const { data } = await axios.get(
        `${serverURI}/read/${chat.userProfileURL}`,
        {
          withCredentials: true,
        }
      );
      setProfilePhoto(data.fileUrl);
    } catch (error) {
      console.log("error");
    }
  }
  useEffect(()=>{
    getProfilePhoto();
  },[]);
  return (
    <>
      <div className="chatTextContainer">
        <div className="chatDetails">
            <img src={profilePhoto} alt="" />
            <p>{chat.userName}</p>
            <span>&#8226;</span>
        </div>
        <div className="chatText">{chat.chatMessage}</div>
      </div>
    </>
  )
}

export default ChatText
