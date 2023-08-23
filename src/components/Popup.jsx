import React, { useState } from "react";
import Spinner from "./Spinner";
const Popup = ({ setRender }) => {
  // const [mediaType, setMediaType] = useState("image");
  const [loading, setLoading] = useState(true);
  const mediaType = "image";
  return (
    <>
      <div
        className="popupCard"
        
      >
        <div className="frame">
          <div className="cancel">
          <i onClick={() => {
          setRender(false);
        }} className="ri-close-fill"></i>
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
              onLoad={() => {
                setLoading(false);
              }}
              src=""
              className="vidMedia"
            ></video>
          )}
          <div className="mediaDetails">
            <img src="./icon/Logo.png" alt="" />
            <p>Zeus Made him cry</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
