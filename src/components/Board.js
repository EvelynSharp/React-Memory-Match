import React from 'react';
import Card from './Card';

const Board = ({ cards, updateCard, allowClick }) => {
  let cardOutput = cards.map( (card, index) => {
    return(
      <Card {...card} index={index} updateCard={updateCard} allowClick={allowClick} />
    );
  });

  return(
    <div className='row'>
      { cardOutput }
    </div>
  );
}

export default Board;
