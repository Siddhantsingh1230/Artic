import React, { useEffect,useState } from "react";
import ChatText from "./ChatText";

const Chat = ({ setRender }) => {
    const [inputChat, setInputChat] = useState("");
  useEffect(() => {
    window.addEventListener("keydown",(e)=>{
        if(e.key === "Escape"){
            setRender(false);
        }
    });
  }, []);

  return (
    <>
      <div className="chatContainer">
        <div className="chatFrame">
          <div className="chatNav">
            <i onClick={()=>setRender(false)} className="ri-arrow-left-line"></i>
            <p>Artic Chat <img src="/icon/Logo.png" alt="" /></p>
          </div>
          <div className="chatBody">
          <ChatText/>
          <ChatText/>
          
          </div>
          <div className="chatActions">
            <input value={inputChat} onChange={(e)=>setInputChat(e.target.value)} type="text" placeholder="Type something..." />
            <button>Send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
