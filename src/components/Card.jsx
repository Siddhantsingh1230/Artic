import React, { useState } from "react";
import Popup from "./Popup";

const Card = () => {
  const [render, setRender] = useState(false);
  const renderPopup = () => {
    setRender(true);
  };
  return (
    <>
      {render ? (
        <Popup setRender={setRender} />
      ) : (
        <div
          className="card"
          onClick={() => {
            renderPopup();
          }}
        >
          <div className="newBadge"></div>
          <img src="icon/tale.jpg" className="animated-background" alt="tale" />
          <p className="taleTitle">Doom Eternal</p>
          <div className="taleUser">
            <img
              className="taleUserSprite"
              src="icon/userSprite.jpg"
              alt="taleuser"
            />
            <p>Mr.Something</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
