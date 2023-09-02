import React, { useState } from "react";

const Upload = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  const [previewURL,setPreviewURL] =useState("");
const setPreview = (e) =>{
  const [file] = e.target.files;
  if(file){
    setPreviewURL(URL.createObjectURL(file));
  }else{
    setPreviewURL("");
  }
}
  return (
    <>
      <div className="uploadContainer">
        <div className="uploadSection1">
          <div className="uploadTitle">
            Publish Tale <span>.</span>
          </div>
          <form onSubmit={submitHandler}>
            <label className="uploadBox">
              <i className="ri-upload-2-line"></i>
              <p>
                Drag & Drop or <span>Choose file</span> to upload
                <input onChange={setPreview} type="file" name="posts" accept="image/*" required />
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
        <div className="uploadSection2">
        <div className="uploadTitle">
            Preview 
          </div>
          <div className="uploadPreview">
          {previewURL?<img src={previewURL} alt="" className="imgPreview" />:<p>Preview</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;
