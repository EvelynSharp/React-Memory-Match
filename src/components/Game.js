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
  //use flippedCardIndexes to check how many cards are flipped
  //use matchedCardIndexes to check if count === 8 || this.state.cards.length, then game over
  state = { cards: this.cards, flippedCardIndexes: [], matchedCardIndexes: []};


  checkMatch = () => {
    let flippedCardIndexes = this.state.flippedCardIndexes;
    if (flippedCardIndexes.length%2 === 0 && flippedCardIndexes.length !== 0) {
      let currFlipIndex = flippedCardIndexes[flippedCardIndexes.length-1];
      let prevFlipIndex = flippedCardIndexes[flippedCardIndexes.length-2];
      let {cards} = this.state;
      let {matchedCardIndexes} = this.state;
      if(cards[currFlipIndex].icon === cards[prevFlipIndex].icon) {
        cards[currFlipIndex].matched = true;
        cards[prevFlipIndex].matched = true;
        matchedCardIndexes = [ ...matchedCardIndexes, prevFlipIndex, currFlipIndex];
        this.setState({matchedCardIndexes});
      } else {
        cards[currFlipIndex].flipped = false;
        cards[prevFlipIndex].flipped = false;
        console.log(cards,flippedCardIndexes);
        flippedCardIndexes = flippedCardIndexes.slice(2);
        this.setState({flippedCardIndexes});
      }
      this.setState({cards});
      setTimeout(this.checkGameOver,500);
    }
  }


  checkGameOver = () => {
    let matchCount = this.state.matchedCardIndexes.length;
    if (matchCount === 8)
      this.props.setEndGame(true);
  }

  // What lifecycle method could we use each time the components state is updated to check for gameOver
  // Answer didUpdate
  // figure out how to end the game once all cards are matched this probably requires more state or a lifecycle method that loops card state
  // figure out how to start a new game - button to reset gameover state
  // figure out how to change the players username while in the game

  // Bonus:
  // use images from images folder instead of fontawesome icons
  // implement a game timer and save fastest times
  // integrate this project into an express app and store this info to a database
  //randomize cards on new game (hint - lookup javascript shuffle array)


  updateCard = (cardIndex, flipped = false, matched = false) => {
    let cards = this.state.cards.map( (card, loopIndex) => {
      if(cardIndex === loopIndex)
        return { ...card, flipped, matched };
      else
        return card;
    })
    let newFlippedIndex = [...this.state.flippedCardIndexes,cardIndex];
    this.setState({ cards:cards });
    this.setState({flippedCardIndexes:newFlippedIndex});
    setTimeout(this.checkMatch,800);
  }

  newGame = () => {
    this.setState({cards: this.cards, flippedCardIndexes: [], matchedCardIndexes: []});
    this.props.setEndGame(false);
    this.shuffleCards();
  }

  endAll = () => {
    this.newGame();
    this.props.returnToMain();
  }

  shuffleCards = () => {
    let cardLength = this.cards.length;
    let cards = this.cards;
    let randomIndex;
    let tempValue;
    while(0 !== cardLength){
      randomIndex = Math.floor(Math.random()*cardLength);
      cardLength--;
      tempValue= cards[cardLength];
      cards[cardLength] = cards[randomIndex];
      cards[randomIndex] = tempValue;
    }
    this.cards = [...cards];
  }

  render(){
    let { username, gameStarted, gameOver, setUsername} = this.props;

    return(
      <div className='container'>
        <h1 className='text-center'>React Memory Match</h1>
        <h4>Current Player: </h4>
        <input value={username} id="username" onChange={setUsername}/>
        <button onClick={this.endAll}>Home Page</button>
        {gameOver ? <button onClick={this.newGame}>New Game</button> : <div></div>}
        <Board cards={ this.state.cards } updateCard={ this.updateCard }  />
      </div>
    );
  }
}

export default Game;
