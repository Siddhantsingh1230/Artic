import React, { useState, useContext, useEffect } from "react";
import Spinner from "./Spinner";
import Marquee from "react-fast-marquee";
import { Context } from "../index";
import axios from "axios";
import { serverURI } from "../App";

const Popup = ({ setRender, data, imgURL }) => {
  const { profileURL,user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [frameStyle, setFrameStyle] = useState({
    height: "80%",
    width: "50%",
    borderRadius: "1rem",
    background: "rgb(26, 30, 40)",
    overflow: "hidden",
    position: "relative",
    boxShadow: "0 0 20px 10px rgba(0, 0, 0, 0.7)",
  });
  const [renderComments, setRenderComments] = useState(false);
  window.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
      setRender(false);
    }
  });
  const isLiked = async () => {
    try {
      const { datain } = await axios.post(
        `${serverURI}/likes/isliked`,
        { userID:user._id, postID:data._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (datain.message) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    } catch (error) {
      console.log("like:fetch error",error);
      setLiked(false);
    }
  };
  useEffect(() => {
    isLiked();
  }, []);
  return (
    <>
      <div className="popupCard">
        <div
          className="frame"
          style={frameStyle}
          onDoubleClick={() => {
            liked ? setLiked(false) : setLiked(true);
          }}
        >
          <div
            onClick={() => {
              setRender(false);
            }}
            className="cancel"
          >
            <i
              className="cancelIcon fa-solid fa-arrow-left"
              style={{ color: "#ffffff", fontSize: "1rem" }}
            ></i>
          </div>
          {loading ? <Spinner /> : null}
          {data.postType === "image" ? (
            <img
              src={imgURL}
              alt=""
              className="imgMedia"
              onLoad={() => {
                setLoading(false);
              }}
            />
          ) : (
            <video
              onCanPlay={() => {
                setLoading(false);
              }}
              src="http://techslides.com/demos/sample-videos/small.mp4"
              autoPlay
              loop
              className="vidMedia"
            ></video>
          )}
          <div className="mediaDetails">
            <img src={profileURL} alt="" />
            <Marquee
              className="marquee"
              style={{ width: "80%", borderRadius: "5rem 0 0 5rem " }}
              speed={34}
              pauseOnHover={true}
            >
              <p>{data.postCaption}</p>
            </Marquee>
          </div>
          <div className="sidePanel">
            <div
              onClick={() => {
                liked ? setLiked(false) : setLiked(true);
              }}
              className="heart"
            >
              {liked ? (
                <i style={{ color: "red" }} className="ri-heart-fill"></i>
              ) : (
                <i className="ri-heart-line"></i>
              )}
              <p className="likeCount">{data.postLikes}</p>
            </div>
            <div
              className="comments"
              onClick={() => {
                setRenderComments(true);
                setFrameStyle({
                  height: "80%",
                  width: "50%",
                  borderRadius: "1rem 0 0 1rem",
                  background: "rgb(26, 30, 40)",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 0 20px 10px rgba(0, 0, 0, 0.7)",
                });
              }}
            >
              <i className="ri-chat-3-line"></i>
              <p className="commentCount">20</p>
            </div>
          </div>
        </div>
        {renderComments ? (
          <div className="commentSection">
            <i
              className="cancelComment fa-solid fa-xmark"
              style={{ color: "#fff" }}
              onClick={() => {
                setRenderComments(false);
                setFrameStyle({
                  height: "80%",
                  width: "50%",
                  borderRadius: "1rem",
                  background: "rgb(26, 30, 40)",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 0 20px 10px rgba(0, 0, 0, 0.7)",
                });
              }}
            />
            <p>Comments</p>
            <hr />
            <div className="commentBox">
              <div className="comment">
                <div className="commentUser">
                  <img src="icon/Logo.png" alt="" />
                  <p>Dimitri</p>
                  <p>•</p>
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur ex expedita cupiditate tempore. Consequatur deserunt
                odio eaque, iure reprehenderit aliquid!
              </div>
              <div className="comment">
                <div className="commentUser">
                  <img src="icon/tale.jpg" alt="" />
                  <p>Wisdom</p>
                  <p>•</p>
                </div>
                Consectetur ex expedita cupiditate tempore. Consequatur deserunt
                odio eaque, iure reprehenderit aliquid! Lorem ipsum dolor sit
                amet consectetur adipisicing elit.
              </div>
              <div className="comment">
                <div className="commentUser">
                  <img src="icon/Logo.png" alt="" />
                  <p>Dimitri</p>
                  <p>•</p>
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur ex expedita cupiditate tempore. Consequatur deserunt
                odio eaque, iure reprehenderit aliquid!
              </div>
              <div className="comment">
                <div className="commentUser">
                  <img src="icon/tale.jpg" alt="" />
                  <p>Wisdom</p>
                  <p>•</p>
                </div>
                Consectetur ex expedita cupiditate tempore. Consequatur deserunt
                odio eaque, iure reprehenderit aliquid! Lorem ipsum dolor sit
                amet consectetur adipisicing elit.
              </div>
              <div className="comment">
                <div className="commentUser">
                  <img src="icon/Logo.png" alt="" />
                  <p>Dimitri</p>
                  <p>•</p>
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur ex expedita cupiditate tempore. Consequatur deserunt
                odio eaque, iure reprehenderit aliquid!
              </div>
              <div className="comment">
                <div className="commentUser">
                  <img src="icon/tale.jpg" alt="" />
                  <p>Wisdom</p>
                  <p>•</p>
                </div>
                Consectetur ex expedita cupiditate tempore. Consequatur deserunt
                odio eaque, iure reprehenderit aliquid! Lorem ipsum dolor sit
                amet consectetur adipisicing elit.
              </div>
            </div>
            <hr />
            <div className="commentInput">
              <input placeholder="Type something.." type="text" />
              <button>Post</button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Popup;
