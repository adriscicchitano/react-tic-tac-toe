import React from 'react';
import 'css/index.css';
import {Square} from './square'
  
export class Board extends React.Component {
    renderSquare(i, isWinner) {
        return (
            <Square 
                isWinner={isWinner}
                value={this.props.squares[i]}
                onClick={() => {this.props.onClick(i)}}
            />
        );
    }

    render() {

        let rows = []
        const dimension = 3
        
        for (let row = 0; row < dimension; row++){
            let squares = []
            for (let column = 0; column < dimension; column++){
                const position = (row * dimension) + column
                squares.push(this.renderSquare(position, this.props.winningLines?.includes(position)))
            }
            rows.push(
                <div className='board-row'>
                    {squares}
                </div>
            )
        }

        return (<div>{rows}</div>);
    }
}