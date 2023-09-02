import React, { useState,useEffect } from "react";
import Popup from "./Popup";
import EditPost from "./EditPost";
import axios from "axios";
import { serverURI } from "../App";

const PostCard = ({post}) => {
  const [renderPopup, setRenderPopup] = useState(false);
  const [renderEditPage, setRenderEditPage] = useState(false);
  const [imgURL, setImgURL] = useState("");

  const getPostPhoto = async () => {
    try {
      const { data } = await axios.get(
        `${serverURI}/read/${post.postURL}`,
        {
          withCredentials: true,
        }
      );
      setImgURL(data.fileUrl);
    } catch (error) {
      console.log("error");
    }

    
    
  };

  useEffect(() => {
    getPostPhoto();
  }, []);
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
                textShadow: "0 0 10px black, 0 0 10px black, 0 0 10px black",
              }}
              className="fa-solid fa-ellipsis-vertical"
            />
          </div>
          {renderPopup ? <Popup imgURL={imgURL} data={post} setRender={setRenderPopup} /> : null}
          <div onClick={() => {
          setRenderPopup(true);
        }} className="postMedia">
            <img src={imgURL} alt="postMedia" />
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
