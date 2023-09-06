import React, { useEffect, useState, useContext } from "react";
import ChatText from "./ChatText";
import axios from "axios";
import { serverURI } from "../App";
import Spinner from "./Spinner";
import { Context } from "../index.js";

const Chat = ({ setRender }) => {
  const { user, profileURL } = useContext(Context);
  const [inputChat, setInputChat] = useState("");
  const [loading, setLoading] = useState(false);
  const [Chats, setChats] = useState([]);
  const getChat = async () => {
    try {
      const { data } = await axios.get(`${serverURI}/chats/getchat`, {
        withCredentials: true,
      });
      setChats(data.chats);
    } catch (error) {
      console.log("error", error);
    }
  };
  const addChat = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${serverURI}/chats/addchat`,
        { userID:user._id, userName:user.firstname, userProfileURL:profileURL, chatMessage:inputChat },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      setChats(data.chats);
    } catch (error) {
      if (error) console.log(error.response.data.message);
      setLoading(false);
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
            {Chats.length > 0 ? (
              Chats.map((chat, i) => {
                <ChatText chat={chat} />;
              })
            ) : (
              <p className="emptyChats">No chats... </p>
            )}
          </div>
          <div className="chatActions">
            {loading ? <Spinner /> : null}
            <input
              value={inputChat}
              onChange={(e) => setInputChat(e.target.value)}
              type="text"
              placeholder="Type something..."
            />
            <button onClick={addChat}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
