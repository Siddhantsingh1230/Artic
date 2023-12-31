import React, { useState, useContext } from "react";
import { Context } from "../index.js";
import { serverURI } from "../App.jsx";
import { toast } from "react-hot-toast";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ConfirmBox } from "../utils/ConfirmBox.js";


const Setting = () => {
  const { setUser, user, setIsAuthenticated,profileURL } = useContext(Context);
  const navigate = useNavigate();
  const [name, setName] = useState(user.firstname);
  const [lastName, setLastName] = useState(user.lastname);
  const [loading, setLoading] = useState(false);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const updateProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${serverURI}/setting/update`,
        {
          firstname: name,
          lastname: lastName,
          email: user.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setLoading(false);
      setUser(data.user);
      navigate("/");
    } catch (error) {
      if (error) toast.error(error.response.data.message);
      setLoading(false);
      setUser({});
    }
  };
  const deleteProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${serverURI}/setting/deleteprofile`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setLoading(false);
      setUser({});
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      if (error) toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  const changeImage = () => {
    navigate("/dpreview");
  };

  return (
    <>
      <div className="setting">
        <h2>Public Profile</h2>
        <hr />
        <div className="info">
          <div className="userDetails">
            <p>First Name</p>
            <div className="userSettingName">
              <i className="ri-user-line"></i>
              <input
                onChange={(e) => {
                  handleNameChange(e);
                }}
                value={name}
                type="text"
              />
            </div>
            <small>
              Your name may appear around Artic wherever you contribute or are
              mentioned.
            </small>
            <p>Last Name</p>
            <div className="userSettingName">
              <i className="ri-user-3-line"></i>
              <input
                onChange={(e) => {
                  handleLastNameChange(e);
                }}
                value={lastName}
                type="text"
              />
            </div>
            <small>
              Your first name and last name make up your identity across
              Articverse.
            </small>
            <p>Public Email</p>
            <div className="userSettingEmail">
              <i className="ri-verified-badge-line"></i>
              <div className="settingEmail">{user.email}</div>
            </div>
            <small>Your verified email.</small>
          </div>
          <div onClick={() => navigate("/dpreview")} className="userImage">
            <img src={profileURL} alt="" />
            <div className="tooltip2">{name + " " + lastName}</div>
          </div>
        </div>
        <button onClick={updateProfile} className="save">
          Update
        </button>
        <button onClick={() => {
                ConfirmBox(
                  "Delete Profile",
                  "This action cannot be undone !",
                  deleteProfile
                );
              }} className="delete">
          Delete
        </button>
        <button onClick={changeImage} className="imageBtn">
          Change image
        </button>
      </div>
      {loading ? <Spinner /> : null}
    </>
  );
};

export default Setting;
