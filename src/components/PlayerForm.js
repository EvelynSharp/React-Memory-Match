import React, { Component } from 'react';

class PlayerForm extends Component { 
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.startGame();
  }

  render() {
    let { username, setUsername } = this.props;

    return(
      <div>
        <h1 className='text-center'>Welcome To React Memory Match</h1>
        <form onSubmit={this.handleSubmit} className='container text-center'>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              value={username} 
              onChange={ (e) => setUsername(e) }
              className="form-control" 
              id="username" 
              autoFocus
              placeholder="Username"
            />
          </div>
          <button type="submit" className="btn btn-primary">Play!</button>
        </form>
      </div>
    )
  }
}

export default PlayerForm;