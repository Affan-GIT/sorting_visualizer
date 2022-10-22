import React, { Component } from "react";
import bubbleSort from "./algorithms/bubbleSort";

const BASE_COLOR = "yellow";
const COMPARE_COLOR = "green";
const CORRECT_COLOR = "purple";

export class SortingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      array: [],
      idArray: [],
      arraySize: 10,
      maxVal: 1000,
      showNums: true,
      windowWidth: 0,
    };
  }
  generateRandomArray() {
    const newArr1 = [];
    const newArr2 = [];

    for (let i = 0; i < this.state.arraySize; i++) {
      newArr1.push(Math.floor(Math.random() * (this.state.maxVal - 5)));
      newArr2.push(i);
    }
    this.setState({ array: newArr1, idArray: newArr2 });
  }
  componentDidMount() {
    this.generateRandomArray();
    this.setState({
      windowWidth: window.innerWidth,
      showNums: this.state.arraySize <= 10,
    });
  }

  getId(id) {
    return this.state.idArray.findIndex((currVal) => currVal === id);
  }

  swap(id1, id2) {
    const temp = this.state.idArray[this.getId(id2)];
    const tempArray = this.state.idArray;
    tempArray[this.getId(id2)] = tempArray[this.getId(id1)];
    tempArray[this.getId(id1)] = temp;
    this.setState({ idArray: tempArray });
  }

  compare(id1, id2) {
    document.getElementById(this.getId(id1)).style.backgroundColor =
      COMPARE_COLOR;
    document.getElementById(this.getId(id2)).style.backgroundColor =
      COMPARE_COLOR;
  }

  uncompare(id1, id2) {
    document.getElementById(this.getId(id1)).style.backgroundColor = BASE_COLOR;
    document.getElementById(this.getId(id2)).style.backgroundColor = BASE_COLOR;
  }

  onspot(id) {
    document.getElementById(id).style.backgroundColor = CORRECT_COLOR;
  }

  animateSort() {
    const { checks, swaps, tempArray } = bubbleSort(this.state.array);
    for (let i = 0; i < swaps.length; i++) {
      let timer = setTimeout(
        () => {
          this.compare(swaps[i][0], swaps[i][1]);
          setTimeout(
            () => {
              this.swap(swaps[i][0], swaps[i][1]);
              setTimeout(
                () => {
                  this.uncompare(swaps[i][0], swaps[i][1]);
                },
                this.state.arraySize > 500 ? 0 : 100
              );
            },
            this.state.arraySize > 500 ? 0 : 100
          );
        },
        this.state.arraySize > 500 ? 1 * i : 500 * i
      );
    }
  }

  render() {
    return (
      <div className="visualizer">
        <div className="commandsContainer">
          <div className="commands">
            <div className="buttons">
              <button className="sortButton" onClick={() => this.animateSort()}>
                Sort
              </button>
              <button
                className="generateButton"
                onClick={() => this.generateRandomArray()}
              >
                Generate New Array
              </button>
            </div>
            <div className="arraySlider">
              <h3>Array Size:</h3>
              <input
                type="range"
                id="points"
                name="points"
                min="0"
                max="1000"
                onChange={(e) => {
                  this.setState({
                    arraySize: e.target.value,
                    showNums: this.state.arraySize <= 10,
                  });
                  this.generateRandomArray();
                }}
              />
            </div>
            <div className="sortingAlgs">
              <p>Bubble Sort</p>
              <p>Merge Sort</p>
              <p>Quick Sort</p>
              <p>Insertion Sort</p>
            </div>
          </div>
        </div>
        <div className="display">
          <div className="bars">
            {this.state.array.map((value, idx) => (
              <div
                style={{
                  position: "absolute",
                  left: `${
                    this.state.windowWidth * 0.2 +
                    ((this.state.windowWidth * 0.6) / this.state.arraySize) *
                      this.state.idArray[idx]
                  }px`,
                  transition: `all ${this.state.arraySize > 500 ? 10 : 200}ms`,
                }}
              >
                <div
                  style={{
                    height: `${(value / this.state.maxVal) * 500}px`,
                    width: `${
                      (this.state.windowWidth * 0.5) / this.state.arraySize
                    }px`,
                    backgroundColor: BASE_COLOR,
                    border: `${
                      this.state.arraySize <= 50
                        ? "2px solid"
                        : this.state.arraySize <= 100
                        ? "1px solid"
                        : "0px solid"
                    }`,
                  }}
                  id={idx}
                ></div>
                {this.state.showNums && <p className="value">{value}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default SortingVisualizer;
