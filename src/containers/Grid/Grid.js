import React, { Component } from 'react';
import '../../styles.css';

class Box extends Component {

    selectBox = () => {
        this.props.selectBox(this.props.row, this.props.col);
    }

    render() {
        return (
            <div 
                className={this.props.boxClass}
                id={this.props.id}
                onClick={this.selectBox}>
            </div>
        );
    }
}


class Grid extends Component {
    render() {

        const width = (this.props.cols * 14);
        let rowsArr = []

        let boxClass = "";
        //Map loop later
        for(let i = 0; i < this.props.rows ; i++) {
            for(let j = 0; j < this.props.cols; j++) {
                let boxId = i + "_" + j;

                boxClass = this.props.gridFull[i][j] ? " box on" : "box off" ;

                rowsArr.push(
                    <Box
                        boxClass={boxClass}
                        key={boxId}
                        boxId={boxId}
                        row={i}
                        col={j}
                        selectBox={this.props.selectBox}
                    />
                )
            }
        }
        return (
            <div className="grid" style={{width: width}}>
                {rowsArr}
            </div>
        );
    }
}

export default Grid;