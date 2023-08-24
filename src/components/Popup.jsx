import React, { useState } from "react";
import Spinner from "./Spinner";
import Marquee from "react-fast-marquee";
const Popup = ({ setRender }) => {
  // const [mediaType, setMediaType] = useState("image");
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  window.addEventListener("keyup", () => {
    setRender(false);
  });
  const mediaType = "image";
  return (
    <>
      <div className="popupCard">
        <div
          className="frame"
          onDoubleClick={() => {
            liked ? setLiked(false) : setLiked(true);
          }}
        >
          <div className="cancel">
            <i
              onClick={() => {
                setRender(false);
              }}
              className="ri-close-fill"
            ></i>
          </div>
          {loading ? <Spinner /> : null}
          {mediaType === "image" ? (
            <img
              src="/icon/poster.jpg"
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
            <img src="./icon/Logo.png" alt="" />
            <Marquee
              className="marquee"
              style={{ width: "80%", borderRadius: "5rem 0 0 5rem " }}
              speed={34}
              pauseOnHover={true}
            >
              <p>Zeus Made him cry.</p>
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
                <i style={{color:"red"}} className="ri-heart-fill"></i>
              ) : (
                <i className="ri-heart-line"></i>
              )}
              <p className="likeCount">20</p>
            </div>
            <div onClick={(e)=>{
              e.stopPropagation();
            }} className="comments">
              <i className="ri-chat-3-line"></i>
              <p className="commentCount">20</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
