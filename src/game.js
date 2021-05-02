import React, {useState} from 'react';
import Board from './board';

function Game(){
  const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isAscending, setIsAscending] = useState(true);

  function calculateWinner(squares){
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function getLocation(move){
    const locationMap = {
      0:'row: 1, col: 1',
      1:'row: 1, col: 2',
      2:'row: 1, col: 3',
      3:'row: 2, col: 1',
      4:'row: 2, col: 2',
      5:'row: 2, col: 3',
      6:'row: 3, col: 1',
      7:'row: 3, col: 2',
      8:'row: 3, col: 3'
    }
  
    return locationMap[move];
  };

  function handleClick(i) {
    const histories = history.slice(0, stepNumber + 1);
    const current = histories[histories.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    
    squares[i] = xIsNext ? "X" : "O";
    setHistory(
      histories.concat([
        {
          squares: squares,
          currentLocation: getLocation(i)
        }
      ]),
    );

    setStepNumber(histories.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step){
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  function handleToggle(){
    setIsAscending(!isAscending);
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const moves = history.map((step, move) => {
    const currentLocation = step.currentLocation ? `(${step.currentLocation})`: '';
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    const boldMove = move === stepNumber && desc !== "Go to game start" ? 'bold-move': '';
    return (
      <li key={move}>
        <button className={`${boldMove}`} onClick={() =>jumpTo(move)}>{desc}</button>
        {currentLocation}
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  if(!isAscending){
    moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={i => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={handleToggle}>
          {isAscending ? 'descending': 'ascending'}
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
export default Game;