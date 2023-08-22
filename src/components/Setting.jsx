import React, { useState } from "react";

const Setting = () => {
  const [name, setName] = useState("Dimitri");
  const [lastName, setLastName] = useState("Machovich");
  const [email, setEmail] = useState("Dimitri1230@gmail.com");
  const handleNameChange=(e)=>{
    setName(e.target.value);
  }
  const handleLastNameChange=(e)=>{
    setLastName(e.target.value);
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
            <p>First name</p>
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
            <p>Last name</p>
            <div className="userSettingName">
              <i className="ri-user-line"></i>
              <input onChange={(e)=>{
                handleLastNameChange(e);
              }} value={lastName} type="text"/>
            </div>
            <small>
              Your first name and last name make up your identity across Articverse.
            </small>
            <p>Public Email</p>
            <div className="userSettingEmail">
              <i className="ri-verified-badge-line"></i>
              <input onChange={(e)=>{
                handleEmailChange(e);
              }} value={email} type="text"/>
            </div>
            <small>Your verified email.</small>
          </div>
          <div className="userImage" ><img src="icon/userSprite.jpg" alt="" />
          <div className="tooltip2">{name +" "+ lastName}</div>
          </div>
        </div>
        <button className="save">Update</button>
        <button className="delete">Delete</button>
      </div>
    </>
  );
};

export default Setting;
