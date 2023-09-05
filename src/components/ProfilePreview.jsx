import React, { useContext, useState } from "react";
import { Context } from "../index.js";
import { useNavigate } from "react-router-dom";
import MiniCropper from "mini-react-cropper";
import Spinner from "./Spinner";
import { serverURI } from "../App";
import axios from "axios";
import toast from "react-hot-toast";
import { DataURIToBlob } from "../utils/BlobConverter.js";

const ProfilePreview = () => {
  const { profileURL, setUser } = useContext(Context);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const renderCropper = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const saveEditedImg = (editedImg) => {
    console.log("Cropped Image:", editedImg);
    if (!selectedFile) {
      toast.error("No image selected");
      return;
    }
    const formData = new FormData();
    formData.append("image", DataURIToBlob(editedImg));
    axios
      .post(`${serverURI}/setting/userphoto`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message);
        setUser(response.data.user);
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Request failed");
        }
      });
  };
  const UploadDP = () => {
    setLoading(true);
    document.querySelector(".cropper-action").click();
  };

  return (
    <>
      {!selectedFile ? (
        <div className="profilePreview">
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
            <img onLoad={() => setLoading(false)} src={profileURL} alt="" />
          </div>
        </div>
      ) : (
        <>
          <MiniCropper
            image={URL.createObjectURL(selectedFile)}
            onSubmit={saveEditedImg}
          />
          <p onClick={UploadDP} className="check">
            Upload
          </p>{" "}
        </>
      )}
      {loading ? <Spinner /> : null}
    </>
  );
};

export default ProfilePreview;
