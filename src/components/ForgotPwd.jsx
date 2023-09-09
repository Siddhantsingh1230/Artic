import { useState } from "react";
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    return (
        <div className="resetDiv">
            <div className="resetMainDiv">
                <img src="/icon/Logo.png" alt="logo" className="logo" />
                <h2>Forgot Password</h2>
                <div className="resetPwdDiv">
                    <p>Enter your user account's verified email addresss and we will send you a password resent link.</p>
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

                    <button className="resetPwdBtn">Send password reset email</button>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword