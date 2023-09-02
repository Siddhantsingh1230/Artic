import React, { useState } from "react";
import axios from "axios";
import { serverURI } from "../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Spinner from "./Spinner";


const EditPost = ({ setRender, postCaption, _id }) => {
  const [caption, setCaption] = useState(postCaption);
  const [loading, setLoading] = useState(false);
  const navigate  = useNavigate();
  window.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
      setRender(false);
    }
  });

  const sendUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${serverURI}/posts/upload`,
        { _id, postCaption:caption },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setLoading(false);
      navigate("/");
    } catch (error) {
      if(error.data.message){
        toast.error(data.message);
      }
      setLoading(false);
    }

  };

  return (
    <>
      <div className="editPost">
        <div className="editBoxContainer">
          <div className="editCancel">
            <i
              onClick={() => {
                setRender(false);
              }}
              className="ri-close-fill"
            ></i>
          </div>
          <h2>
            Edit caption{" "}
            <i className="fa-solid fa-pen" style={{ color: "#ffffff" }} />
          </h2>
          <textarea onChange={(e) => setCaption(e.target.value)}>
            {postCaption}
          </textarea>
          <button onClick={sendUpdate} >Update</button>
        </div>
      </div>
      {loading ? <Spinner /> : null}
    </>
  );
};

export default EditPost;
