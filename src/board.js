import React from 'react';
import Square from './square';

function Board(props){
  function renderSquare(i) {
    return (
      <Square
        key={i}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
  }

  function makeBoard(row, col){
    const board = [];
    let cell = 0;
    for(let i = 0; i < row; i++){
      const column = [];
      for(let k = 0; k < col; k++){
        column.push(renderSquare(cell++))
      }
      board.push(<div key={i} className="board-row">{column}</div>)
    }

    return board;
  }
  
  return (
  <div>
    {makeBoard(3, 3)}
      
  </div>
  );
}

export default Board;