import React, { useState, useContext, useEffect } from "react";
import Spinner from "./Spinner";
import Marquee from "react-fast-marquee";
import { Context } from "../index";
import axios from "axios";
import { serverURI } from "../App";
import Comment from "./Comments";

const Popup = ({ setRender, post, imgURL }) => {
  const { profileURL, user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentsLength, setCommentsLength] = useState(0);
  const [bigHeartStyle, setBigHeartStyle] = useState({
    display: "none",
    textShadow: "0 0 10px black",
    fontSize: "6rem",
    color: "red",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    animation: "animateLike 3s  ease-in-out forwards",
  });
  const [postLikes, setPostLikes] = useState(post.postLikes);
  const [liked, setLiked] = useState(false);
  const [frameStyle, setFrameStyle] = useState({
    height: "80%",
    width: "50%",
    borderRadius: "1rem",
    background: "rgb(26, 30, 40)",
    overflow: "hidden",
    position: "relative",
    boxShadow: "0 0 20px 10px rgba(0, 0, 0, 0.7)",
  });
  const [renderComments, setRenderComments] = useState(false);
  window.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
      setRender(false);
    }
  });
  const isLiked = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${serverURI}/likes/isliked`,
        { userID: user._id, postID: post._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (data.message) {
        setLiked(true);
      } else {
        setLiked(false);
      }
      setLoading(false);
    } catch (error) {
      console.log("like:fetch error", error);
      setLiked(false);
      setLoading(false);
    }
  };
  const like = async () => {
    setLiked(true);
    setPostLikes(postLikes + 1);
    setBigHeartStyle({
      display: "block",
      textShadow: "0 0 10px black",
      fontSize: "6rem",
      color: "red",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      animation: "animateLike 3s  ease-in-out forwards",
    });
    try {
      const { data } = await axios.post(
        `${serverURI}/likes/liked`,
        { userID: user._id, postID: post._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (data.message === "Liked") {
        setLiked(true);
      } else {
        setLiked(false);
      }
    } catch (error) {
      console.log("Cant Like ", error);
      setLiked(false);
    }
  };
  const unlike = async () => {
    setLiked(false);
    setBigHeartStyle({
      display: "none",
      textShadow: "0 0 10px black",
      fontSize: "6rem",
      color: "red",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      animation: "animateLike 3s  ease-in-out forwards",
    });
    if (postLikes !== 0) {
      setPostLikes(postLikes - 1);
      try {
        const { data } = await axios.post(
          `${serverURI}/likes/unliked`,
          { userID: user._id, postID: post._id },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (data.message === "unliked") {
          setLiked(false);
        } else {
          setLiked(true);
        }
      } catch (error) {
        console.log("Cant Unlike-", error.data.message);
        setLiked(true);
      }
    }
  };
  const getComments = async () => {
    try {
      const { data } = await axios.post(
        `${serverURI}/comments/getAllComments`,
        { postID: post._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setComments(data.comments);
      setCommentsLength(data.comments.length);
    } catch (error) {
      console.log("Comment fetch failed-", error);
      setComments([]);
    }
  };
  const addComment = async () => {
    setCommentLoading(true);
    try {
      const { data } = await axios.post(
        `${serverURI}/comments/createComment`,
        {
          userID: user._id,
          postID: post._id,
          userName: user.firstname,
          comment: commentText,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setComments(data.comments);
      setCommentsLength(data.comments.length);
      setCommentText("");
      setCommentLoading(false);
    } catch (error) {
      console.log("Failed to write comment", error.response.data.message);
      setCommentLoading(false);
    }
  };

  useEffect(() => {
    isLiked();
    getComments();
  }, []);
  return (
    <>
      <div className="popupCard">
        <div
          className="frame"
          style={frameStyle}
          onDoubleClick={() => {
            liked ? unlike() : like();
          }}
        >
          <i className="ri-heart-3-fill bigheart" style={bigHeartStyle}></i>
          <div
            onClick={() => {
              setRender(false);
            }}
            className="cancel"
          >
            <i
              className="cancelIcon fa-solid fa-arrow-left"
              style={{ color: "#ffffff", fontSize: "1rem" }}
            ></i>
          </div>
          {loading ? <Spinner /> : null}
          {post.postType === "image" ? (
            <img src={imgURL} alt="" className="imgMedia" />
          ) : (
            <video
              onCanPlay={() => {
                setLoading(false);
              }}
              src="http://techslides.com/demos/sample-videos/small.mp4"
              autoPlay
              loop
              className="vidMedia"
            ></video>
          )}
          <div className="mediaDetails">
            <img src={profileURL} alt="" />
            <Marquee
              className="marquee"
              style={{ width: "80%", borderRadius: "5rem 0 0 5rem " }}
              speed={34}
              pauseOnHover={true}
            >
              <p>{post.postCaption}</p>
            </Marquee>
          </div>
          <div className="sidePanel">
            <div
              onClick={() => {
                liked ? unlike() : like();
              }}
              className="heart"
            >
              {liked ? (
                <i style={{ color: "red" }} className="ri-heart-fill"></i>
              ) : (
                <i className="ri-heart-line"></i>
              )}
              {postLikes ? <p className="likeCount">{postLikes}</p> : null}
            </div>
            <div
              className="comments"
              onClick={() => {
                setRenderComments(true);
                setFrameStyle({
                  height: "80%",
                  width: "50%",
                  borderRadius: "1rem 0 0 1rem",
                  background: "rgb(26, 30, 40)",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 0 20px 10px rgba(0, 0, 0, 0.7)",
                });
              }}
            >
              <i className="ri-chat-3-line"></i>
              <p className="commentCount">{commentsLength}</p>
            </div>
          </div>
        </div>
        {renderComments ? (
          <div className="commentSection">
            <i
              className="cancelComment fa-solid fa-xmark"
              style={{ color: "#fff" }}
              onClick={() => {
                setRenderComments(false);
                setFrameStyle({
                  height: "80%",
                  width: "50%",
                  borderRadius: "1rem",
                  background: "rgb(26, 30, 40)",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 0 20px 10px rgba(0, 0, 0, 0.7)",
                });
              }}
            />
            <p>Comments</p>
            <hr />
            <div className="commentBox">
              {commentLoading ? (
                <Spinner />
              ) : comments.length > 0 ? (
                comments.map((comment, i) => {
                  return <Comment key={i} comment={comment} />;
                })
              ) : (
                <p className="emptyComment">No comments</p>
              )}
            </div>
            <hr />
            <div className="commentInput">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Type something.."
                type="text"
              />
              <button onClick={addComment}>Post</button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Popup;
