import React from "react";

const Comments = ({comment}) => {
  return (
    <>
      <div className="comment">
        <div className="commentUser">
          <img src={comment.userProfileURL} alt="" />
          <p>{comment.userName}</p>
          <p>•</p>
        </div>
        {comment.comment}
      </div>
    </>
  );
};

export default Comments;
