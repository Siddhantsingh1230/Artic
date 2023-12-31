import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverURI } from "../App";
import { toast } from "react-hot-toast";
import Spinner from "./Spinner";
import { Context } from "../index.js";

const Signup = () => {
  const { setIsAuthenticated, setUser } = useContext(Context);
  const [eyeClass, setEyeClass] = useState("fa-solid fa-eye-slash fa-xs");
  const [passType, setPassType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const signupHandler = async (e) => {
    e.preventDefault();
    if (email.trim().length === 0) {
      return toast.error("Email is empty");
    } else if (firstname.trim().length === 0) {
      return toast.error("Input valid FirstName");
    } else if (lastname.trim().length === 0) {
      return toast.error("Input valid LastName");
    } else if (password.trim().length === 0) {
      return toast.error("Password is empty");
    }
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${serverURI}/users/signup`,
        { firstname:firstname.trim(), lastname:lastname.trim(), email:email.trim(), password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
      navigate("/");
      setUser(data.user);
    } catch (error) {
      if (error.response.data) toast.error(error.response.data.message);
      // console.log(error);
      setLoading(false);
      setIsAuthenticated(false);
      setUser({});
    }
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
                    required
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
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
                    required
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  ></input>
                  <i
                    className="fa-solid fa-address-card fa-xs"
                    style={{ color: "#f4f5f6" }}
                  ></i>
                </div>
              </div>
              <div className="inputDiv email">
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <i
                  className="fa-solid fa-envelope fa-xs"
                  style={{ color: "#f4f5f6" }}
                ></i>
              </div>
              <div className="inputDiv password">
                <input
                  type={passType}
                  required
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
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
      {loading ? <Spinner /> : null}
    </>
  );
};

export default Signup;
