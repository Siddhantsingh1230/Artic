import React from "react";

const Upload = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <>
      <div className="uploadContainer">
        <div className="uploadTitle">
          Publish Tale <span>.</span>
        </div>
        <form onSubmit={submitHandler}>
          <label className="uploadBox">
            <i className="ri-upload-2-line"></i>
            <p>
              Drag & Drop or <span>Choose file</span> to upload
              <input
                type="file"
                name="posts"
                accept="image/*"
                required
              />
            </p>
            <p>img or vid</p>
          </label>
          <div className="captionInput">
            <input type="search" placeholder="Add caption" />
          </div>
          <div className="uploadAction">
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Upload;
