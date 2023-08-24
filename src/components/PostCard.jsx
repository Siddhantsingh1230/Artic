import React, { useState } from "react";
import Popup from "./Popup";
import EditPost from "./EditPost";

const PostCard = () => {
  const [renderPopup, setRenderPopup] = useState(false);
  const [renderEditPage, setRenderEditPage] = useState(false);
  return (
    <>
      {renderEditPage ? (
        <EditPost setRender={setRenderEditPage} />
      ) : (
        <div className="postContainer ">
          <div
            onClick={() => {
              setRenderEditPage(true);
            }}
            className="editBtn"
          >
            <i
              style={{
                color: "white",
                fontSize: "1.5rem",
                textShadow: "0px 0px 3px black,0px 0px 5px black,0px 0px 3px black",
              }}
              className="fa-solid fa-ellipsis-vertical"
            />
          </div>
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
      )}
    </>
  );
};

export default PostCard;
