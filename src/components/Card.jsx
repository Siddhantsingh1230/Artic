import React from 'react';

const Card = () => {
  return (
    <>
      <div className="card">
        <div className="badge newBadge"></div>
        <img src="icon/tale.jpg" alt="tale" />
        <p className="taleTitle">Doom Eternal</p>
        <div className="taleUser">
            <img className='taleUserSprite' src="icon/userSprite.jpg" alt="taleuser" />
            <p>Mr.Something</p>
        </div>
      </div>
    </>
  );
}

export default Card;
