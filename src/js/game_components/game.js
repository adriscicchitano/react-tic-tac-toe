import {  useState , useMemo} from 'react';
import 'css/index.css';
import { calculateWinner } from './utils';
import { Board } from './board';

export function Game(){
  
  const [history, setHistory] = useState([{squares: Array(9).fill(null)}])
  const [stepNumber, setStepNumber] = useState(0)
  const [isXNext, setIsXNext] = useState(true)
  const [revertList, setRevertList] = useState(false)
  const [positions, setPositions] = useState(Array(9).fill(null))
  const [winner, winningLines] = useMemo(() => calculateWinner(history[stepNumber].squares), [history, stepNumber])
  
  function handleClick(i){
    const savedHistory = history.slice(0, stepNumber + 1)
    const current = savedHistory[savedHistory.length - 1]
    const squares = current.squares.slice()
    const currentPositions = positions
    
    if(calculateWinner(squares)[0] || squares[i]) return

    squares[i] = isXNext ? "X" : "O"
    currentPositions[savedHistory.length - 1] = matrixPosition(current.squares, squares)
    setHistory(savedHistory.concat([{squares: squares}]))
    setIsXNext(!isXNext)
    setStepNumber(savedHistory.length)
    setPositions(currentPositions)
  }

  function revertListActivation(){
    setRevertList(!revertList)
  }

  function processListView(movements){
    return revertList ? movements.reverse() : movements
  }

  function jumpTo(step){
    setStepNumber(step)
    setIsXNext(step % 2 === 0)
  }

  function matrixPosition(currentHistory, mostRecentHistory){
    return currentHistory.map((element, i) => element !== mostRecentHistory[i]).indexOf(true)
  }

  const current = history[stepNumber]
  const moves = history.map((_, move) => {
    const desc = move ?
      `Go to move #${move} (${Math.floor(positions[move - 1] / 3) + 1},${(positions[move - 1] % 3) + 1})` :
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
        <div className='moves-list'>
          <ol style={{listStyleType: 'none'}}>{moves[0]}</ol>
          <ol style={{listStyleType: 'none'}}><button onClick={revertListActivation}>Revert List</button></ol>
          <ol style={{listStyleType: 'none'}}>{processListView(moves.slice(1, moves.length - 1))}</ol>
        </div>  
      </div>
      </div>
    );
}