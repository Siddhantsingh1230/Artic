import React, { useEffect, useState } from "react";
import { serverURI } from "../App";

const Comments = ({comment}) => {
  const [profilePhoto,setProfilePhoto] = useState("");
  const fetchProfilePhoto = async ()=>{
    try {
      const { data } = await axios.get(
        `${serverURI}/read/${comment.profileImageURL}`,
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
