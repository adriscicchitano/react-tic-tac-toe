import {  useState , useMemo} from 'react';
import 'css/index.css';
import { calculateWinner } from './utils';
import { Board } from './board';

export function Game(){
  
  const [history, setHistory] = useState([{squares: Array(9).fill(null)}])
  const [stepNumber, setStepNumber] = useState(0)
  const [isXNext, setIsXNext] = useState(true)
  const [winner, winningLines] = useMemo(() => calculateWinner(history[stepNumber].squares), [history, stepNumber])
  
  function handleClick(i){
    const savedHistory = history.slice(0, stepNumber + 1)
    const current = savedHistory[savedHistory.length - 1]
    const squares = current.squares.slice()
    
    if(calculateWinner(squares)[0] || squares[i]) return

    squares[i] = isXNext ? "X" : "O"
    setHistory(savedHistory.concat([{squares: squares}]))
    setIsXNext(!isXNext)
    setStepNumber(savedHistory.length)
  }
  
  function jumpTo(step){
    setStepNumber(step)
    setIsXNext(step % 2 === 0)
  }
  
  const current = history[stepNumber]
  const moves = history.map((_, move) => {
    const desc = move ? 
    "Go to move #" + move:
    "Go to game start"
    return(
      <li key={move}>
        <button style={{fontWeight: (stepNumber === move) ? "bold" : "normal"}} onClick={() => jumpTo(move)}>{desc}</button>
      </li>
      )
    })
    
    let status
    
    if(winner){
      status = "Winner: " + winner
    }else if(!current.squares.includes(null)){
      status = "Draw!" 
    }else{
      status = 'Next player: ' + (isXNext ? "X" : "O") 
    }
    
    return (
      <div className="game">
      <div className="game-board">
        <Board
          winningLines={winningLines}
          squares={current.squares}
          onClick={handleClick}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
      </div>
    );
}