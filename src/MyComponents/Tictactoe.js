import { useState, useEffect} from 'react';
import './styles.css'; 

function Square({ value, onSquareClick ,isWinningSquare}) 
{
  
  // State to hold the color class
  const [myColor, setMyColor] = useState("");

  // Effect to update color based on value change
  useEffect(() => {
    if (value === 'X') {
      setMyColor('text-primary');
    } else {
      setMyColor('text-success');
    }
  }, [value]); // Dependency array ensures this effect runs when `value` changes
  
  let backgroundColor = isWinningSquare ? 'bg-danger' : '';
  return (
    <button className={`square ${myColor} ${backgroundColor}`} onClick={onSquareClick} >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const winningSquares = winner ? new Set([winner[0], winner[1], winner[2]]) : new Set();
  
  let status;
  //alert(squares.length);
  //alert(squares);
  //console.log(typeof(squares));
  //const values = squares.split(',');

  // Filter out non-empty values
  //const emptyValues = values.filter(value => value.trim() === '');

  // Return the count of empty values
  //alert(emptyValues.length);
  if (winner) {
    //let new_winner=squares[winner['a']];
    console.log(winner);
    status = 'Winner: ' + winner[3];
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} isWinningSquare={winningSquares.has(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} isWinningSquare={winningSquares.has(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} isWinningSquare={winningSquares.has(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} isWinningSquare={winningSquares.has(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} isWinningSquare={winningSquares.has(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} isWinningSquare={winningSquares.has(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} isWinningSquare={winningSquares.has(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} isWinningSquare={winningSquares.has(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} isWinningSquare={winningSquares.has(8)}/>
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    //alert(squares);
    if (move > 0) {
      description = 'Go to move #' + move;// +'('+','+')';
    } else {
      description = 'Go to game start';
    }
    /*if(move===9)
      description="Game is Draw!";*/
    
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        let d=squares[a];
        let winning_numbers=[a,b,c,d];
      //return squares[a];
      return winning_numbers;
    }
  }
  return null;
}
