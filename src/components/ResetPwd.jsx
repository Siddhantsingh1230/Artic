import { useState } from "react";
const ResetPwd = () => {
    const [eyeClass, setEyeClass] = useState("fa-solid fa-eye-slash fa-xs");
    const [passType, setPassType] = useState("password");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
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
    return (
        <div className="resetDiv">
            <div className="resetMainDiv">
                <img src="/icon/Logo.png" alt="logo" className="logo" />
                <h2>Reset your Password</h2>
                <div className="resetPwdDiv">   
                    <div className="resetInputdiv">
                        <p>Enter New password</p>
                        <div className="inputDiv password">
                            <input
                                type={passType}
                                autoComplete="current-password"
                                placeholder="New Password"
                                name="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                            <i
                            className={eyeClass}
                            style={{ color: "#f4f5f6",cursor:"pointer" }}
                            onClick={() => {
                                togglePass();
                            }}
                            ></i>
                        </div>
                    </div>
                    <div className="resetInputdiv">
                        <p>Confirm New password</p>
                        <div className="inputDiv password">
                            <input
                                type={passType}
                                autoComplete="current-password"
                                placeholder="Confirm Password"
                                name="password"
                                required
                                value={confirmpassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            ></input>
                            <i
                            className={eyeClass}
                            style={{ color: "#f4f5f6",cursor:"pointer" }}
                            onClick={() => {
                                togglePass();
                            }}
                            ></i>
                        </div>
                    </div>
                    <button className="resetPwdBtn">Send password reset email</button>
                </div>
                
            </div>
        </div>
    )
}

export default ResetPwd;
