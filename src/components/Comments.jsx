import React, { useEffect, useState } from "react";
import { serverURI } from "../App";
import axios from "axios";

const Comments = ({comment}) => {
  const [profilePhoto,setProfilePhoto] = useState("");
  const fetchProfilePhoto = async ()=>{
    try {
      const { data } = await axios.get(
        `${serverURI}/read/${comment.userProfileURL}`,
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
    fetchProfilePhoto();
  },[]);
  return (
    <>
      <div className="comment">
        <div className="commentUser">
          <img src={profilePhoto} alt="" />
          <p>{comment.userName}</p>
          <p>•</p>
        </div>
        {comment.comment}
      </div>
    </>
  );
};

export default Comments;
