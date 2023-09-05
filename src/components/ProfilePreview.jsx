import React, { useContext, useState } from "react";
import { Context } from "../index.js";
import { useNavigate } from "react-router-dom";
import MiniCropper from "mini-react-cropper";

const ProfilePreview = () => {
  const { profileURL } = useContext(Context);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const renderCropper = (e) => {
    setSelectedFile(URL.createObjectURL(e.target.files[0]));

  };
  const saveEditedImg = (editedImg) =>{
    console.log('Cropped Image:', editedImg);
  }
  const UploadDP = () =>{
    document.querySelector(".cropper-action").click();
  }
  return (
    <>
      {!selectedFile ? (<div className="profilePreview">
        <div className="profileActions">
          <i
            onClick={() => {
              navigate(-1);
            }}
            className="dpreviewback ri-arrow-left-line"
          ></i>
          <label htmlFor="uploadDP">
            <input
              onChange={renderCropper}
              type="file"
              name="image"
              id="uploadDP"
              accept="image/*"
            />
            <i className="dpreviewUpload ri-upload-line"></i>
          </label>
        </div>
        <div className="profileImagePreview">
          <img src={profileURL} alt="" />
        </div>
      </div>)
     :(<><MiniCropper image={selectedFile} onSubmit={saveEditedImg}  /><p onClick={UploadDP} className="check">Upload</p> </>)
    }
    </>
  );
};

export default ProfilePreview;
