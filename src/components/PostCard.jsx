import React, { useState,useEffect } from "react";
import Popup from "./Popup";
import EditPost from "./EditPost";
import axios from "axios";
import { serverURI } from "../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Spinner from "./Spinner";

const PostCard = ({post}) => {
  const [renderPopup, setRenderPopup] = useState(false);
  const navigate = useNavigate();
  const [renderEditPage, setRenderEditPage] = useState(false);
  const [imgURL, setImgURL] = useState("");
  const [loading, setLoading] = useState(false);

  const getPostPhoto = async () => {
    try {
      const { data } = await axios.get(
        `${serverURI}/read/${post.postURL}`,
        {
          withCredentials: true,
        }
      );
      setImgURL(data.fileUrl);
    } catch (error) {
      console.log("error");
    }

    
    
  };

  const deletePost = async () =>{
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${serverURI}/posts/delete`,
        { post },
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
        toast.error(error.data.message);
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    getPostPhoto();
  }, []);
  return (
    <>
      {renderEditPage ? (
        <EditPost _id={post._id} postCaption={post.postCaption} setRender={setRenderEditPage} />
      ) : (
        <div className="postContainer ">
          <div
            onClick={() => {
              setRenderEditPage(true);
            }}
            className="editBtn"
          >
            <i
              style={{
                color: "white",
                fontSize: "1.5rem",
                textShadow: "0 0 2px black, 0 0 4px black, 0 0 6px black",
              }}
              className="fa-solid fa-ellipsis-vertical"
            />
          </div>
          {renderPopup ? <Popup imgURL={imgURL} data={post} setRender={setRenderPopup} /> : null}
          <div onClick={() => {
          setRenderPopup(true);
        }} className="postMedia">
            <img src={imgURL} alt="" />
          </div>
          <div className="postAction">
            <button
              onClick={() => {
                setRenderPopup(true);
              }}
              className="view-button"
            >
              <i className="fa-regular fa-eye" />
            </button>
            <button onClick={()=>{
          if(window.confirm("Delete! You can't undo this action")){
            deletePost();
          }
        }} className="delete-button">
              <i className="fa-solid fa-trash" style={{ color: "#ffffff" }} />
            </button>
          </div>
        </div>
      )}
      {loading ? <Spinner /> : null}
    </>
  );
};

export default PostCard;
