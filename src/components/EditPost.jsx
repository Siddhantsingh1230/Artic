import React, { useState } from "react";

const EditPost = ({ setRender,postCaption }) => {
  const[caption,setCaption]=useState(postCaption);
  window.addEventListener("keydown", (e) => {
    if(e.keyCode===27){
        setRender(false);
    }
  });
  return (
    <>
      <div className="editPost">
        <div className="editBoxContainer">
          <div className="editCancel">
            <i
              onClick={() => {
                setRender(false);
              }}
              className="ri-close-fill"
            ></i>
          </div>
          <h2>Edit caption <i className="fa-solid fa-pen" style={{color: "#ffffff",}} /></h2>
          <textarea onChange={(e)=>setCaption(e.target.value)} >{postCaption}</textarea>
          <button>Update</button>
        </div>
      </div>
    </>
  );
};

export default EditPost;
