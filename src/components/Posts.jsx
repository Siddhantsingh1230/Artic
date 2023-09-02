import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import axios from "axios";
import { serverURI } from "../App";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts,setPosts]=useState([]);
  const [loading,setLoading]=useState(false);
  const getPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${serverURI}/posts/getAllPosts`,
        {
          withCredentials: true,
        }
      );
      setPosts(data.posts);
      setLoading(false);
    } catch (error) {
      console.log("error");
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      <div className="posts">
        {posts.length>0?(posts.map((item) => <PostCard post={item} key={item._id} />)):(<div className="noPosts"><p>No Posts 💔<Link>+</Link></p></div>)}
      </div>
      {loading ? <Spinner /> : null}
    </>
  );
};

export default Posts;
