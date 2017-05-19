import React, { Component } from 'react';
import Board from './Board';
import K1 from '../images/k1.png';
import K4 from '../images/k4.png';
import K7 from '../images/k7.png';
import K6 from '../images/k6.png';


class Game extends Component {
  // Match Icons: fa-bug, fa-bolt, fa-cloud-upload, fa-cloud-download

  cards = [
    { flipped: false, matched: false, icon: K1},
    { flipped: false, matched: false, icon: K4},
    { flipped: false, matched: false, icon: K1},
    { flipped: false, matched: false, icon: K4},
    { flipped: false, matched: false, icon: K7},
    { flipped: false, matched: false, icon: K6},
    { flipped: false, matched: false, icon: K7},
    { flipped: false, matched: false, icon: K6}
  ]

  gameStartTime = Date.now();

  //use flippedCardIndexes to check how many cards are flipped
  //use matchedCardIndexes to check if count === 8 || this.state.cards.length, then game over
  state = { cards: this.cards,
            flippedCardIndexes: [],
            matchedCardIndexes: [],
            timeSpend:null,
            fastestTime:9999,
            allowClick: true
          };


  //
  // countTime = () => {
  //   let counter = 0;
  //   let {gameOver, gameStarted} = this.props;
  //   while(gameOver === false && gameStarted === true) {
  //     setTimeout(()=>{counter++} , 1000);
  //     console.log(counter);
  //   }
  // }

  checkMatch = () => {
    let flippedCardIndexes = this.state.flippedCardIndexes;

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
        flippedCardIndexes = flippedCardIndexes.slice(2);
        this.setState({flippedCardIndexes});
      }
      this.setState({cards},()=>{
        this.setState({allowClick: true})
        setTimeout(this.checkGameOver(),100);
      });


  }


  checkGameOver = () => {
    let matchCount = this.state.matchedCardIndexes.length;
    let {fastestTime} = this.state;
    if (matchCount === 8){
      this.props.setEndGame(true);
      let timeSpent = ((Date.now() - this.gameStartTime)/1000).toFixed(2);
      this.setState({timeSpent});
      if(fastestTime >= timeSpent) {
        this.setState({fastestTime:timeSpent});
      }
    }

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
    //make people unable to click until this is completely done running
    //pass state in app.js share between game and card that prevents card click accessing updatecard function
    let cards = this.state.cards.map( (card, loopIndex) => {
      if(cardIndex === loopIndex)
        return { ...card, flipped, matched };
      else
        return card;
    })
    let newFlippedIndex = [...this.state.flippedCardIndexes,cardIndex];
    if (newFlippedIndex.length%2 === 0 && newFlippedIndex.length !== 0){
      this.setState({allowClick: false});
    }
    this.setState({ cards:cards });
    this.setState({flippedCardIndexes:newFlippedIndex}, () => {
      if (newFlippedIndex.length%2 === 0 && newFlippedIndex.length !== 0) {
        setTimeout(this.checkMatch,800);
      }
    });

  }

  newGame = () => {
    this.setState({cards: this.cards, flippedCardIndexes: [], matchedCardIndexes: [], timeSpent:null });
    this.props.setEndGame(false);
    this.shuffleCards();
    this.gameStartTime = Date.now();

  }

  endAll = () => {
    this.newGame();
    this.setState({fastestTime:9999});
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
    let {fastestTime, timeSpent, allowClick} = this.state;
    return(
      <div className='container'>
        <h1 className='text-center'>React Memory Match</h1>
        <h4>Current Player: </h4>
        <input value={username} id="username" onChange={setUsername}/>

        <h4>Current Game Time: {timeSpent}</h4>
        {fastestTime !== 9999 && <h4>Fastest Time: {this.state.fastestTime}</h4> }

        <button className="btn-primary" style={{margin:'30px'}} onClick={this.endAll}>Home Page</button>
        {gameOver && <button className="btn-primary"  onClick={this.newGame}>New Game</button>}

        <Board cards={ this.state.cards } updateCard={ this.updateCard } allowClick={allowClick} />
      </div>
    );
  }
}

export default Game;
