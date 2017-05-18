import React from 'react';

const Card = ({ updateCard, flipped, matched, icon, index, allowClick }) => {

  let clickCard =() => {
    if(flipped === false && matched === false && allowClick === true){
      updateCard(index, true);
    }
  }

  return(
    <div
      className='col-xs-3 text-center'
      style={{ height: '300px', border: '1px solid black'}}
      onClick={clickCard}
      >
      {flipped && <img src={icon} style={{height:'150px', marginTop:'50px'}} /> }

     {/*{flipped? <i className={`fa ${icon} fa-5x`} /> : <div></div>}*/}
     {/*{flipped? <img src={k1} /> : <div></div>} */}
     {/*show icon if flipped or matched*/}
     {/*do not show icon if not flipped or matched*/}


    </div>
  )
};

export default Card;
