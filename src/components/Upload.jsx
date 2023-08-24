import React from "react";

const Upload = () => {
  return (
    <>
      <div className="uploadContainer">
        <div className="uploadTitle">
          Publish Tale <span>.</span>
        </div>
        <div className="uploadBox">
        <i className="ri-upload-2-line"></i>
        <p>Drag & Drop or <span>Choose file</span> to upload</p>
        <p>img or vid</p>
        </div>
        <div className="captionInput">
          <input type="search" placeholder="Add caption"/>
        </div>
        <div className="uploadAction">
          <button>Post</button>
        </div>
      </div>
    </>
  );
};

export default Upload;
