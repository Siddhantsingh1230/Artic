import React, { useState, useContext } from "react";
import { serverURI } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../index";
import Spinner from "./Spinner";

const ProfilePhoto = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(Context);
  const [selectedFile, setSelectedFile] = useState(null);
  const [labelStyle, setLabelStyle] = useState({
    outline: "1px solid #006aff",
    borderRadius: "50%",
    marginTop: "2rem",
    height: "18rem",
    width: "18rem",
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
        marginTop: "2rem",
        height: "18rem",
        width: "18rem",
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
    setLoading(true);
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
            <i className="ri-image-add-fill"></i>
          </label>

          <button type="submit">Change</button>
        </form>
      </div>
      {loading ? <Spinner /> : null}
    </>
  );
};

export default ProfilePhoto;
