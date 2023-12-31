import React, { useEffect, useState, useContext } from "react";
import ChatText from "./ChatText";
import axios from "axios";
import { serverURI } from "../App";
import Spinner from "./Spinner";
import { Context } from "../index.js";

const Chat = ({ setRender }) => {
  const { user } = useContext(Context);
  const [inputChat, setInputChat] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [Chats, setChats] = useState([]);
  const getChat = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${serverURI}/chats/getchat`, {
        withCredentials: true,
      });
      setChats(data.chats);
      setLoading(false);
      // console.log(data.chats);
    } catch (error) {
      console.log("warning", error);
      setLoading(false);
    }
  };
  const addChat = async () => {
    if (inputChat.trim().length > 0) {
      try {
        setDisabled("disabled");
        const { data } = await axios.post(
          `${serverURI}/chats/addchat`,
          {
            userID: user._id,
            userName: user.firstname,
            userProfileURL: user.profileImageURL,
            chatMessage: inputChat.trim(),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setChats(data.chats);
        setInputChat("");
        setDisabled(false);
      } catch (error) {
        if (error) console.log(error.response.data.message);
        setDisabled(false);
      }
    }
  };
  useEffect(() => {
    getChat();
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setRender(false);
      }
    });
  }, []);

  return (
    <>
      <div className="chatContainer">
        <div className="chatFrame">
          <div className="chatNav">
            <i
              onClick={() => setRender(false)}
              className="ri-arrow-left-line"
            ></i>
            <p>
              Artic Chat <img src="/icon/Logo.png" alt="" />
            </p>
          </div>
          <div className="chatBody">
          {loading ? <Spinner /> : null}
            {Chats.length !== 0 ? (
              Chats.map((chat, i) => {
                return <ChatText chat={chat} key={i} />;
              })
            ) : (
              <p className="emptyChats">No chats... </p>
            )}
          </div>
          <div className="chatActions">
            <input
              value={inputChat}
              onChange={(e) => setInputChat(e.target.value)}
              type="text"
              placeholder="Type something..."
            />
            <button disabled={disabled} onClick={addChat}>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
