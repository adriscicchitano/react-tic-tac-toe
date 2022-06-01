import React, { useState } from 'react';
import 'css/index.css';
import { calculateWinner } from './utils';
import { Board } from './board';

export function Game(props){

    const [history, setHistory] = useState([{squares: Array(9).fill(null)}])
    const [stepNumber, setStepNumber] = useState(0)
    const [isXNext, setIsXNext] = useState(true)

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

    function gameRender() {
      const current = history[stepNumber]
      const [winner, winningLines] = calculateWinner(current.squares)
      const moves = history.map((step, move) => {
          const desc = move ? 
            "Go to move #" + move:
            "Go to game start"
          return(
              <li key={move}>
                  <button onClick={() => jumpTo(move)}>{desc}</button>
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
                onClick={(i) => handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }

    return gameRender()
}