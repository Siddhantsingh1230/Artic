import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { serverURI } from "../App";
import Spinner from "./Spinner";

const Content = () => {
  const [content, setContent] = useState([]);
  let fetchNum = 1;
  const [loading, setLoading] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [length, setLength] = useState(0);
  const getContent = async () => {
    try {
      const { data } = await axios.get(`${serverURI}/content/getAllContent/1`, {
        withCredentials: true,
      });
      setContent(data.content);
      setLength(data.length);
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchNextContent = async () => {
    if (content.length < length) {
      fetchNum++;
      // console.log(fetchNum);
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${serverURI}/content/getAllContent/${fetchNum}`,
          {
            withCredentials: true,
          }
        );
        setContent(data.content);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    } else {
      // console.log("End reached");
      setReachedEnd(true);
    }
  };
  useEffect(() => {
    getContent();
  }, []);
  return (
    <>
      <div
        className="content"
        onScroll={(e) => {
          const bottom =
            e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight <
            10;
          if (bottom) {
            fetchNextContent();
          }
        }}
      >
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
            {loading && (
              <div className="loadingContent">
                <Spinner />
              </div>
            )}
          </div>
            {reachedEnd && <p className="reachedEnd">Reached end</p>}
        </div>
      </div>
    </>
  );
};

export default Content;
