// base
import React, {Component, Fragment} from 'react';
import './index.css';
const uniqid = require('uniqid');

class Matrix extends Component {
  
  state = {
    rows: Array(this.props.initialHeight).fill(null),
    columns: Array(this.props.initialWidth).fill(null),
    offsetLeft: 0,
    offsetTop: 0,
    currentRow: 0,
    currentColumn: 0,
    matrixFocus: false
  };
  
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.offsetLeft !== nextState.offsetLeft ||
      this.state.offsetTop !== nextState.offsetTop ||
      this.state.rows !== nextState.rows ||
      this.state.columns !== nextState.columns ||
      this.state.currentRow !== nextState.currentRow ||
      this.state.currentColumn !== nextState.currentColumn ||
      this.state.matrixFocus !== nextState.matrixFocus
  }
  
  addRow = () => {
    this.setState(state => ({
      rows: [ ...state.rows, null ]
    }))
  };
  
  addColumn = () => {
    this.setState(state => ({
      columns: [ ...state.columns, null ]
    }))
  };
  
  changePositionDellBtn = (e) => {
    if ( e.target.className === 'cell') {
      this.setState({
        offsetLeft: e.target.offsetLeft,
        offsetTop: e.target.offsetTop,
        currentColumn: e.target.getAttribute('columnindex'),
        currentRow: e.target.parentNode.getAttribute('rowindex'),
        matrixFocus: true
      });
    }
  };
  
  hideDelButtons = () => {
    this.setState(() => ({
      matrixFocus: false
    }));
  };
  
  removeRow = () => {
    this.setState(state => ({
      rows: Object.keys(state.rows).filter(elem => elem !== `${state.currentColumn}`).fill(null),
      matrixFocus: false
    }));
  };
  
  removeColumn = () => {
    this.setState(state => ({
      columns: Object.keys(state.columns).filter(elem => elem !== `${state.currentRow}`).fill(null),
      matrixFocus: false
    }));
  };
  
  render() {
    const { offsetLeft, offsetTop, rows, columns, matrixFocus } = this.state;
    const { cellSize } = this.props;
    return (
      <div className="container cube" onMouseOver={this.changePositionDellBtn} onMouseLeave={this.hideDelButtons}>
        {rows.map((elem, indexRow) => (
          <div key={uniqid()} rowindex={indexRow} className="row">
            {columns.map((elem, indexCol) => (
              <div
                columnindex={indexCol}
                key={uniqid()}
                className="cell"
                style={{width: cellSize, height: cellSize}}/>
            ))}
          </div>
        ))}
        <button
          onClick={this.addColumn}
          className="btn add add__cell"
          style={{width: cellSize, height: cellSize }}
        />
        <button
          onClick={this.addRow}
          className="btn add add__row"
          style={{width: cellSize, height: cellSize }}
        />
        {matrixFocus &&
          <Fragment>
            {columns.length > 1 &&
            <button
              className="btn del del__cell"
              onClick={this.removeColumn}
              style={{width: cellSize, height: cellSize, left: offsetLeft }}
            />}
            {rows.length > 1 &&
            <button
              className="btn del del__row"
              onClick={this.removeRow}
              style={{width: cellSize, height: cellSize, top: offsetTop }}
            />}
          </Fragment>
        }
      </div>
    );
  }
}

export default Matrix;
