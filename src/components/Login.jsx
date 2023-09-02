import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverURI } from "../App";
import { toast } from "react-hot-toast";
import Spinner from "./Spinner";
import { Context } from "../index.js";

const Login = () => {
  const [eyeClass, setEyeClass] = useState("fa-solid fa-eye-slash fa-xs");
  const [passType, setPassType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated, setUser } = useContext(Context);
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
  
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${serverURI}/users/login`,
        { email, password, remember },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setLoading(false);
      setIsAuthenticated(true);
      setUser(data.user);
      navigate("/");
    } catch (error) {
      if (error.response.data) {toast.error(error.response.data.message)};
      setLoading(false);
      setIsAuthenticated(false);
      setUser({});
    }
  };
  return (
    <>
      <div className="wrapper">
        {/* <img alt="bgImage" src="/imageset/Dotted-Line-PNG-Picture.png" /> */}
        <div className="signIncontent">
          <div className="signInnav">
            <span className="appname">
              <i
                className="fa-solid fa-circle fa-lg"
                style={{ color: "#009eff" }}
              ></i>
              <p className="signInpara"> Artic</p>
            </span>
          </div>
          <form className="LoginMain" onSubmit={loginHandler}>
            <h1 className="h1tag">Login to Your Account</h1>
            <h6 className="h6tag">Your own world of imagination</h6>
            <Link
              className="atag googleLoginBtn"
              id="googleLoginBtn"
              to="/signup"
            >
              <i
                style={{ color: "#009eff", marginRight: "0.5rem" }}
                className="fa-solid fa-user-plus icon "
              ></i>
              Create Account
            </Link>
            <h5 className="h5tag"> OR </h5>

            <div className="inputs">
              <div className="inputDiv email">
                <input
                  autoComplete="email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
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
                  autoComplete="current-password"
                  placeholder="Password"
                  name="password"
                  required
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

            <div id="pwdcase">
              <div className="form-group">
                <input
                  type="checkbox"
                  id="remember"
                  onChange={() => {
                    if(remember){
                      setRemember(false);
                    }else{
                      setRemember(true)
                    }
                    
                  }}
                  checked={remember}
                  name="remember"
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link to="no-referer" className="borderLessbtn atag">
                Forgot Password ?
              </Link>
            </div>
            <button type="submit" className="loginBtn">
              Login
            </button>
          </form>
        </div>
      </div>
      {loading ? <Spinner /> : null}
    </>
  );
};

export default Login;
