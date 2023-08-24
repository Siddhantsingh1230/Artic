import React, { useState } from "react";
import Popup from "./Popup";

const PostCard = () => {
  const [renderPopup, setRenderPopup] = useState(false);
  return (
    <>
      <div className="postContainer ">
        {renderPopup ? <Popup setRender={setRenderPopup} /> : null}
        <div className="postMedia">
          <img src="icon/tale.jpg" alt="postMedia" />
        </div>
        <div className="postAction">
          <button
            onClick={() => {
              setRenderPopup(true);
            }}
            className="view-button"
          >
            <i className="fa-regular fa-eye" />
          </button>
          <button className="delete-button">
            <i className="fa-solid fa-trash" style={{ color: "#ffffff" }} />
          </button>
        </div>
      </div>
    </>
  );
};

export default PostCard;
