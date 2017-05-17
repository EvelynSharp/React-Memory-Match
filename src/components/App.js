import React, { Component } from 'react';
import PlayerForm from './PlayerForm';
import Game from './Game';

class App extends Component {

  state = { username: '', gameOver: false, gameStarted: false };

  setUsername = (e) => {
    this.setState({ username: e.target.value });
  }

  startGame = () => {
    this.setState({ gameStarted: true });
  }

  setEndGame = (ifEnd) => {
    if (ifEnd){
      this.setState({gameOver: true});
    } else {
      this.setState({gameOver: false});
    }
  }

  returnToMain = () => {
    this.setState({gameStarted: false});

  }

  render() {
    let { gameStarted, username } = this.state;
    if(gameStarted)
      return( <Game {...this.state} setUsername={this.setUsername} setEndGame={this.setEndGame} returnToMain={this.returnToMain}/>);
    else
      return(<PlayerForm username={username} setUsername={this.setUsername} startGame={this.startGame} />);
  }
}

export default App;
