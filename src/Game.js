import React from 'react';
import './App.css';
import Board from './Board';

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
      // return squares[a];
      return [squares[a], lines[i]];
    }
  }
  return [null, null];
}

class Game extends React.Component {
  static defaultProps = {
    arrI: ['(1,1)', '(2,1)', '(3,1)', '(1,2)', '(2,2)', '(3,2)', '(1,3)', '(2,3)', '(3,3)'],
  }
  state = {
    historyData: [
      {
        squares: [null, 'X', 'O', 'X', 'O', null, null, null, null,],
        i: 1,//这一步棋的位置所对应的数组中的索引号，（从0开始）
      },
      {
        squares: [null, 'X', 'O', 'X', 'O', null, null, null, null,],
        i: 2,
      },
    ],//history数据结构
    history: [{
      squares: Array(9).fill(null),
      i: null,
    }],
    xIsNext: true,
    stepNumber: 0,
    isJiang: false,//历史记录是否降序排列
  }
  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const squares = history[history.length - 1].squares.slice();
    if (calculateWinner(squares)[0] || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        i: i,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const squares = history[this.state.stepNumber].squares;
    const winner = calculateWinner(squares)[0];
    const winLine = calculateWinner(squares)[1];
    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move + ' ' + this.props.arrI[step.i] : 'Go to game start';
      return (
        <li key={move}>
          <button className={move === this.state.stepNumber ? 'bottonVisited' : 'xxx'} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    })

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (this.state.stepNumber >= 9) {
      status = '平局';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        <div className="game-board">
          <Board
            squares={squares}
            onClick={this.handleClick}
            winLine={winLine}
          />
        </div>
        <div style={{
          marginLeft: '20px'
        }}>
          <div style={{
            marginBottom: '10px'
          }}>{status}</div>
          <ol>{this.state.isJiang ? moves.reverse() : moves}</ol>
          <button
            onClick={() => {
              this.setState({
                isJiang: !this.state.isJiang
              })
            }}
          >{this.state.isJiang ? '点击升序排列' : '点击降序排列'}</button>
        </div>
      </div>
    );
  }
}

export default Game;
