import React, { useState, useContext } from "react";
import { serverURI } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../index";

const ProfilePhoto = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(Context);
  const [selectedFile, setSelectedFile] = useState(null);
  const [labelStyle, setLabelStyle] = useState({
    outline: "1px solid #006aff",
    borderRadius: "50%",
    height: "17rem",
    width: "17rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    opacity: "1",
  });
  const setBg = (e) => {
    const [file] = e.target.files;
    setSelectedFile(e.target.files[0]);
    if (file) {
      setLabelStyle({
        outline: "1px solid #006aff",
        borderRadius: "50%",
        height: "17rem",
        width: "17rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        opacity: "1",
        transition: "all ease 0.2s",
        backgroundImage: `url(${URL.createObjectURL(file)})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        color: "transparent",
      });
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (!selectedFile) {
      toast.error("No image selected");
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedFile);
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
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <div className="profilePhoto">
        <form onSubmit={submitHandler}>
          <label style={labelStyle} className="custom-file-upload">
            <input
              onChange={setBg}
              type="file"
              name="image"
              accept="image/*"
              required
            />
            Upload
          </label>

          <button type="submit">Change</button>
        </form>
      </div>
    </>
  );
};

export default ProfilePhoto;
