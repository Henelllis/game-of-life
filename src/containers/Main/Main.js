import React, { Component } from 'react';
import '../../styles.css';
import Grid from '../Grid/Grid';
import Buttons from '../Buttons/Buttons';

class Main extends Component {
    constructor() {
        super();
        this.speed = 100;
        this.rows = 30;
        this.cols = 50;

        this.state = {
            generations: 0,
            gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
        }
    
    }

    selectBox = (row, col) => {

        let gridCopy = arrayClone(this.state.gridFull);
        gridCopy[row][col] = !gridCopy[row][col];
        this.setState({gridFull: gridCopy});
    }

    seed = () => {
        this.clear();
        let gridCopy = arrayClone(this.state.gridFull);
        for(let i = 0; i < this.rows ; i++) {
            for(let j = 0; j < this.cols; j++) {
                if(Math.floor(Math.random()* 4) === 1){
                    gridCopy[i][j] = true;
                }
            }
        }

        this.setState({gridFull: gridCopy});

    }

    playButton = () => {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.play, this.speed);
    }

    pauseButton = () => {
        clearInterval(this.intervalId);
    }

    fast = () => {
        this.speed = 100;
        this.playButton();
    }

    slow = () => {
        this.speed = 1000;
        this.playButton();
    }

    clear = () => {

		var gridCopy = Array(this.rows).fill().map(() => Array(this.cols).fill(false));

        this.setState(
            {gridFull: gridCopy,
             generations:0});
    }

    gridSize = (size) => {
        switch(size){
            case "1": 
                this.cols = 20;
                this.rows = 10;
                break;
            case "2": 
                this.cols = 50;
                this.rows = 30;
                break;
            case "3": 
                this.cols = 70;
                this.rows = 50;
                break;
            default:
                this.cols = 70;
                this.rows = 50;
                break;
        }
        this.clear();
    }

    play = ()=> {
        let gridOne = this.state.gridFull;
        let gridTwo = arrayClone(this.state.gridFull);

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
              let count = 0;
              if (i > 0) if (gridOne[i - 1][j]) count++;
              if (i > 0 && j > 0) if (gridOne[i - 1][j - 1]) count++;
              if (i > 0 && j < this.cols - 1) if (gridOne[i - 1][j + 1]) count++;
              if (j < this.cols - 1) if (gridOne[i][j + 1]) count++;
              if (j > 0) if (gridOne[i][j - 1]) count++;
              if (i < this.rows - 1) if (gridOne[i + 1][j]) count++;
              if (i < this.rows - 1 && j > 0) if (gridOne[i + 1][j - 1]) count++;
              if (i < this.rows - 1 && j < this.cols - 1) if (gridOne[i + 1][j + 1]) count++;
              if (gridOne[i][j] && (count < 2 || count > 3)) gridTwo[i][j] = false;
              if (!gridOne[i][j] && count === 3) gridTwo[i][j] = true;
            }
          }
          this.setState({
            gridFull: gridTwo,
            generations: this.state.generations + 1
          });
    }

    componentDidMount() {
        this.seed();
    }

    render() {
        return (
            <div>
                <h1>The Game of Life</h1>
                <Buttons
                    playButton={this.playButton}
                    pauseButton={this.pauseButton}
                    slow={this.slow}
                    fast={this.fast}
                    clear={this.clear}
                    seed={this.seed}
                    gridSize={this.gridSize}
                />
                <Grid
                    gridFull={this.state.gridFull}
                    rows={this.rows}
                    cols={this.cols}
                    selectBox={this.selectBox}
                />
                <h2> Generations : { this.state.generations} </h2>
            </div>
        );
    }
}

function arrayClone(arr){
    //Must be an easier way with spread, neat hack though
    return JSON.parse(JSON.stringify(arr));
}


export default Main;