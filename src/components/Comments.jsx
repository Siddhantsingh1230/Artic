import React from "react";

const Comments = ({photoURL,comment}) => {
  return (
    <>
      <div className="comment">
        <div className="commentUser">
          <img src={photoURL} alt="" />
          <p>{comment.userName}</p>
          <p>•</p>
        </div>
        {comment.comment}
      </div>
    </>
  );
};

export default Comments;
