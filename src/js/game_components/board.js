import React from 'react';
import 'css/index.css';
import {Square} from './square'
  
export class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square 
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
                squares.push(this.renderSquare((row * dimension) + column))
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