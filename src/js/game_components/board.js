import React from 'react';
import 'css/index.css';
import {Square} from './square'
import times from 'lodash/times'

export function Board({squares, onClick, winningLines}){

  const dimension = 3
  
  return (
    times(dimension).map((_, row) => (
      <div className='board-row' key={row}>{
        times(dimension).map((_, column) => {
          const position = (row * dimension) + column
          return(
            <Square 
              key={position}
              isWinner={winningLines?.includes(position)}
              value={squares[position]}
              onClick={() => {onClick(position)}}
            />
          )
        })}
      </div>
  )))
}