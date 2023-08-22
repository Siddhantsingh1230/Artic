import React from "react";

const PostCard = () => {
  return (
    <>
      <div className="postContainer ">
        <div className="postMedia"><img src="icon/tale.jpg" alt="postMedia" /></div>
        <div className="postAction">
          <button className="edit-button">
          <i className="fa-solid fa-pen" style={{color: "#ffffff",}} />
          </button>
          <button className="delete-button">
          <i className="fa-solid fa-trash" style={{color: "#ffffff",}} />
          </button>
        </div>
      </div>
    </>
  );
};

export default PostCard;
