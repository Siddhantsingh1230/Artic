import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { serverURI } from "../App";

const Content = () => {
  const [content, setContent] = useState([]);
  const getContent = async () => {
    try {
      const { data } = await axios.get(`${serverURI}/content/getAllContent`, {
        withCredentials: true,
      });
      setContent(data.content);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getContent();
  }, []);
  return (
    <>
      <div className="content">
        <div className="trend">
          <div className="trendTitle">
            Play ,Discover,
            <br />
            Follow Popular Tales
            <p>
              Embark on a journey where Imagination meets Craftsmanship,Join Us!
            </p>
          </div>
          <div className="trendMedia">
            <img className="trendContent" src="icon/poster.jpg" alt="" />
          </div>
        </div>
        <div className="tales">
          <p className="topics">Tale Fortune</p>
          <div className="cardContainer">
            {content.length > 0 ? (
              content.map((post, i) => {
                return <Card post={post} key={i} />;
              })
            ) : (
              <p className="emptyContent">Art</p>
            )}
          </div>
        </div>
      </div> 
    </>
  );
};

export default Content;
