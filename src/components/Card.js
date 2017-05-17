import React from 'react';

const Card = ({ updateCard, flipped, matched, icon, index }) => {

  let clickCard =() => {
    if(flipped === false && matched === false){
      updateCard(index, true);
    }
  }

  return(
    <div
      className='col-xs-3 text-center'
      style={{ height: '300px', border: '1px solid black'}}
      onClick={() => setTimeout(clickCard,800)}
    >
      {flipped? <h1>{icon}</h1> : <div></div>}

     {/*{flipped? <i className={`fa ${icon} fa-5x`} /> : <div></div>}*/}
     {/*{flipped? <img src={k1} /> : <div></div>} */}
     {/*show icon if flipped or matched*/}
     {/*do not show icon if not flipped or matched*/}


    </div>
  )
};

export default Card;
