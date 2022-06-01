import React from 'react';
import 'css/index.css';
import {Square} from './square'
  
export function Board(props){
    
    function renderSquare(i, isWinner) {
        return (
            <Square 
                isWinner={isWinner}
                value={props.squares[i]}
                onClick={() => {props.onClick(i)}}
            />
        );
    }

    function createBoard() {

        let rows = []
        const dimension = 3
        
        for (let row = 0; row < dimension; row++){
            let squares = []
            for (let column = 0; column < dimension; column++){
                const position = (row * dimension) + column
                squares.push(renderSquare(position, props.winningLines?.includes(position)))
            }
            rows.push(
                <div className='board-row'>
                    {squares}
                </div>
            )
        }
        return rows;
    }

    return (<div>{createBoard()}</div>);
}