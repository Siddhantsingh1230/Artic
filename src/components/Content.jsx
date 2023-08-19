import React from "react";
import Card from "./Card";

const Content = () => {
  return (
    <>
      <div className="content">
        <div className="trend">
          <div className="trendTitle">
            Play,Discover,
            <br />
            Follow Popular Tales
            <p>
              Embark on a journey where Imagination meets Craftsmanship,Join Us!
            </p>
          </div>
          <div className="trendMedia">
            <img
              className="trendContent"
              src="icon/poster.jpg"
              alt="trendContent"
            />
          </div>
        </div>
        <div className="tales">
          <p className="topics">Tale Fortune</p>
          <div className="cardContainer">
            {Array.apply(0, Array(10)).map((x, i)=><Card key={i} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
