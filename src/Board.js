import React from 'react';
import './App.css';

function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
      style={
        props.hithLight
          ? { backgroundColor: 'yellow' }
          : {}
      }
    >
      {props.value}
    </button >
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        hithLight={this.props.winLine && this.props.winLine.includes(i) ? true : false}
      />
    );
  }

  render() {
    return (
      <div>
        {[0, 3, 6].map((cur1, index1) => {
          return (
            <div key={index1} className="board-row">
              {[0, 1, 2].map((cur2, index2) => {
                return this.renderSquare(cur2 + cur1)
              })}
            </div>
          )
        })}
      </div>
    );
  }
}

export default Board;
