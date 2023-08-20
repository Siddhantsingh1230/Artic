import React, { useState } from "react";

const Setting = () => {
  const [name, setName] = useState("Dimitri");
  const [email, setEmail] = useState("Dimitri1230@gmail.com");
  const handleNameChange=(e)=>{
    setName(e.target.value);
  }
  const handleEmailChange=(e)=>{
    setEmail(e.target.value);
  }
  return (
    <>
      <div className="setting">
        <h2>Public Profile</h2>
        <hr />
        <div className="info">
          <div className="userDetails">
            <p>Name</p>
            <div className="userSettingName">
              <i className="ri-user-line"></i>
              <input onChange={(e)=>{
                handleNameChange(e);
              }} value={name} type="text"/>
            </div>
            <small>
              Your name may appear around Artic wherever you contribute or are
              mentioned.
            </small>
            <p>Public Email</p>
            <div className="userSettingEmail">
              <i class="ri-verified-badge-line"></i>
              <input onChange={(e)=>{
                handleEmailChange(e);
              }} value={email} type="text"/>
            </div>
            <small>Your verified email.</small>
          </div>
          <div className="userImage" ><img src="icon/userSprite.jpg" alt="" /></div>
        </div>
        <button className="save">Update</button>
        <button className="delete">Delete</button>
      </div>
    </>
  );
};

export default Setting;
