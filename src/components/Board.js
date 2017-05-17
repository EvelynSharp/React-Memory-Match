import React from 'react';
import Card from './Card';

const Board = ({ cards, updateCard }) => {
  let cardOutput = cards.map( (card, index) => {
    return(
      <Card {...card} index={index} updateCard={updateCard} />
    );
  });

  return(
    <div className='row'>
      { cardOutput }
    </div>
  );
}

export default Board;