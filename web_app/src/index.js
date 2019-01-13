import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Box(props) {
  return (
    <button className="box" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: Array(9).fill(null),
      xTurn: true,
      error: null,
      games: [],
    };
  }

  componentDidMount() {
    fetch("http://tictactoe.api/api/games")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            games: result.data,
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  handleClick(i) {
    const boxes = this.state.boxes.slice();
    if (getWinner(boxes) || boxes[i]) {
      return;
    }
    boxes[i] = this.state.xTurn ? 'X' : 'O';
    this.setState({
       boxes: boxes,
       xTurn  : !this.state.xTurn
    });
  }
  
  renderBox(i) {
    return (<Box value={this.state.boxes[i]}
            onClick={() => this.handleClick(i)}
           />
           );
  }

  render() {
    const winner = getWinner(this.state.boxes);
    let status;
    if (winner) {
      status = winner + ' is the winner!';
    } else {
      status = this.state.xTurn ? 'X' + ' turn': 'O' + ' turn';
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderBox(0)}
          {this.renderBox(1)}
          {this.renderBox(2)}
        </div>
        <div className="board-row">
          {this.renderBox(3)}
          {this.renderBox(4)}
          {this.renderBox(5)}
        </div>
        <div className="board-row">
          {this.renderBox(6)}
          {this.renderBox(7)}
          {this.renderBox(8)}
        </div>
        <div className="controlGame">
          <button onClick={() => { resetGame(this.state.boxes);this.forceUpdate()}}>
              Reset Game
            </button>
           <button onClick={() => { saveGame(this.state.boxes);this.forceUpdate()}}>
              Save Game
            </button>
        </div>
        <div className="status">Saved Games</div>
        <div>
          {this.state.games.map(game => (
            <button className="savedGame" key={game.id} onClick={() => { loadSavedGame(this.state.boxes,game);this.forceUpdate()}}>
              {game.id} saved on: {game.updated_at.date}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

//helper functions

function getWinner(boxes) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
      return boxes[a];
    }
  }
  return null;
}

function loadSavedGame(boxes,saveGame) {
    boxes[0] = (saveGame.r1c1=='U')?null:saveGame.r1c1;
    boxes[1] = (saveGame.r1c2=='U')?null:saveGame.r1c2;
    boxes[2] = (saveGame.r1c3=='U')?null:saveGame.r1c3;
    boxes[3] = (saveGame.r2c1=='U')?null:saveGame.r2c1;
    boxes[4] = (saveGame.r2c2=='U')?null:saveGame.r2c2;
    boxes[5] = (saveGame.r2c3=='U')?null:saveGame.r2c3;
    boxes[6] = (saveGame.r3c1=='U')?null:saveGame.r3c1;
    boxes[7] = (saveGame.r3c2=='U')?null:saveGame.r3c2;
    boxes[8] = (saveGame.r3c3=='U')?null:saveGame.r3c3;
}

function resetGame(boxes) {
   for(let i=0;i<boxes.length;i++){
    boxes[i] = '';
   }
}

function saveGame(boxes){
  fetch('http://tictactoe.api/api/games', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      r1c1: (boxes[0]==null)? 'U' : boxes[0],
      r1c2: (boxes[1]==null)? 'U' : boxes[1],
      r1c3: (boxes[2]==null)? 'U' : boxes[2],
      r2c1: (boxes[3]==null)? 'U' : boxes[3],
      r2c2: (boxes[4]==null)? 'U' : boxes[4],
      r2c3: (boxes[5]==null)? 'U' : boxes[5],
      r3c1: (boxes[6]==null)? 'U' : boxes[6],
      r3c2: (boxes[7]==null)? 'U' : boxes[7],
      r3c3: (boxes[8]==null)? 'U' : boxes[8],
    })
  })
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
