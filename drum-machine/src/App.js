import React from "react";
import "./App.scss";
import DrumMachine from "./drum-machine";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setDisplay = this.setDisplay.bind(this);
  }

  setDisplay(dispState) {
    return document.getElementById("display").innerHTML = dispState;
  }

  render() {
    return (
      <div className="App" id="drum-machine">
        <h2>Drum Machine</h2>
        <DrumMachine displayP1={this.setDisplay} />
        <div id="display">Sound0</div>
      </div>
    );
  }
}

export default App;
