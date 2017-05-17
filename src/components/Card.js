import React from 'react';

const Card = ({ updateCard, flipped, matched, icon, index }) => (
  <div 
    className='col-xs-3 text-center' 
    style={{ height: '300px', border: '1px solid black'}}
  >
   {/*need a onClick handler on the card div to call updateCard*/}
   
   {/*show icon if flipped or matched*/}
   {/*<i className={`fa ${icon} fa-5x`} />*/}

   {/*do not show icon if not flipped or matched*/}

   {/*do not allow user to click on card again if flipped or matched*/}
  </div>
);

export default Card;