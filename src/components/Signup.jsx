import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [eyeClass, setEyeClass] = useState("fa-solid fa-eye-slash fa-xs");
  const [passType, setPassType] = useState("password");
  const togglePass = () => {
    if (eyeClass === "fa-solid fa-eye fa-xs") {
      setEyeClass("fa-solid fa-eye-slash fa-xs");
      //   console.log(passType);
      setPassType("password");
    } else {
      setEyeClass("fa-solid fa-eye fa-xs");
      //   console.log(passType);
      setPassType("text");
    }
  };
  const signupHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="wrapper">
        <img
          alt="bgImage"
          className="svgImage"
          src="/imageset/Dotted-Line-PNG-Picture.png"
        />
        <div className="signIncontent">
          <div className="signInnav">
            <span className="appname">
              <i
                className="fa-solid fa-circle fa-lg"
                style={{ color: "#009eff" }}
              ></i>
              <p className="signInpara"> Artic</p>
            </span>
            <Link className="atag join" href="no-referer">
              Join
            </Link>
          </div>
          <form className="signInmain" onSubmit={signupHandler}>
            <p className="signInpara">START FOR FREE</p>
            <h1 className="h1tag">
              Create new account
              <Link className="atag" to="no-referer">
                .
              </Link>
            </h1>
            <p className="signInpara">
              Already A Member?{" "}
              <Link className="atag" to="/">
                Log In
              </Link>
            </p>
            <div className="inputs">
              <div className="name">
                <div className="inputDiv">
                  <input
                    name="firstname"
                    type="text"
                    placeholder="First name"
                  ></input>
                  <i
                    className="fa-solid fa-address-card fa-xs"
                    style={{ color: "#f4f5f6" }}
                  ></i>
                </div>
                <div className="inputDiv">
                  <input
                    name="lastname"
                    type="text"
                    placeholder="Last name"
                  ></input>
                  <i
                    className="fa-solid fa-address-card fa-xs"
                    style={{ color: "#f4f5f6" }}
                  ></i>
                </div>
              </div>
              <div className="inputDiv email">
                <input type="email" placeholder="Email"></input>
                <i
                  className="fa-solid fa-envelope fa-xs"
                  style={{ color: "#f4f5f6" }}
                ></i>
              </div>
              <div className="inputDiv password">
                <input type={passType} placeholder="Password"></input>
                <i
                  className={eyeClass}
                  style={{ color: "#f4f5f6" }}
                  onClick={() => {
                    togglePass();
                  }}
                ></i>
              </div>
            </div>
            <button type="submit" className="createbtn">
              Create account
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
