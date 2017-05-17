import React, { Component } from 'react';
import Board from './Board';

class Game extends Component {
  // Match Icons: fa-bug, fa-bolt, fa-cloud-upload, fa-cloud-download

  cards = [
    { flipped: false, matched: false, icon: 'fa-bug'}, 
    { flipped: false, matched: false, icon: 'fa-bolt'}, 
    { flipped: false, matched: false, icon: 'fa-bug'}, 
    { flipped: false, matched: false, icon: 'fa-bolt'},
    { flipped: false, matched: false, icon: 'fa-cloud-upload'}, 
    { flipped: false, matched: false, icon: 'fa-cloud-download'}, 
    { flipped: false, matched: false, icon: 'fa-cloud-upload'},
    { flipped: false, matched: false, icon: 'fa-cloud-download'} 
  ]
  ''
  state = { cards: this.cards, flippedCardIndexes: [], matchedCardIndexs: [] };

  // What lifecycle method could we use each time the components state is updated to check for gameOver

  // figure out how to end the game once all cards are matched this probably requires more state or a lifecycle method that loops card state
  // figure out how to start a new game
  // figure out how to change the players username while in the game
  // implement a game timer and save fastest times
  // integrate this project into an express app and store this info to a database

  updateCard = (cardIndex, flipped = false, matched = false) => {
    let cards = this.state.cards.map( (card, loopIndex) => {
      if(cardIndex === loopIndex)
        return { ...card, flipped, matched };
      else
        return card;
    })
    this.setState({ cards });
  }

  render(){
    let { username, gameStarted, gameOver } = this.props;

    return(
      <div className='container'>
        <h1 className='text-center'>React Memory Match</h1>
        <h4>Current Player: { username }</h4>
        <Board cards={ this.state.cards } updateCard={ this.updateCard }  />
      </div>
    );
  }
}

export default Game;