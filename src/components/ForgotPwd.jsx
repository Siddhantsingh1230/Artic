import { useState } from "react";
import axios from "axios";
import { serverURI } from "../App";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const sendMail = async () => {
    if (email.trim().length === 0) {
      return toast.error("Email is empty");
    }
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://articmailserver.onrender.com/forgotpassword`,
        { email: email.trim() },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      if (error.response.data) {
        toast.error(error.response.data.message);
      }
      setLoading(false);
    }
  };
  return (
    <div className="resetDiv">
      <div className="resetMainDiv">
        <img src="/icon/Logo.png" alt="logo" className="logo" />
        <h2>Forgot Password</h2>
        <div className="resetPwdDiv">
          <p>
            Enter your user account's verified email addresss and we will send
            you a password resent link.
          </p>
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

          <button onClick={sendMail} className="resetPwdBtn">
            Send password reset email
            {loading && <Spinner />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
