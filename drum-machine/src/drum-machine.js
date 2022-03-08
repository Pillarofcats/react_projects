import React from "react";
import DrumPads from "./drum-pad";

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateDrumMachineState = this.updateDrumMachineState.bind(this);

    this.state = {
      activeEle: "Sound0",
      padData: [
        {
          letter: "Q",
          sound: "Sound1",
          keynumber: 81,
          url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
        },
        {
          letter: "W",
          sound: "Sound2",
          keynumber: 87,
          url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
        },
        {
          letter: "E",
          sound: "Sound3",
          keynumber: 69,
          url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
        },
        {
          letter: "A",
          sound: "Sound4",
          keynumber: 65,
          url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
        },
        {
          letter: "S",
          sound: "Sound5",
          keynumber: 83,
          url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
        },
        {
          letter: "D",
          sound: "Sound6",
          keynumber: 68,
          url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
        },
        {
          letter: "Z",
          sound: "Sound7",
          keynumber: 90,
          url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
        },
        {
          letter: "X",
          sound: "Sound8",
          keynumber: 88,
          url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
        },
        {
          letter: "C",
          sound: "Sound9",
          keynumber: 67,
          url:
            "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
        },
      ],
    };
    // this.props.displayP1(this.state.activeEle);
    // const disp = document.getElementById("display");
    // disp.innerHTML = this.state.activeEle;
  }

  updateDrumMachineState(value) {
    this.setState({
      activeEle: value,
    });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(e) {
    const keyChk = this.state.padData.find(
      (elem) => elem.letter === e.key.toUpperCase()
    );

    if (keyChk) {
      document.getElementById(keyChk.sound).click();
      this.setState({
        activeEle: document.activeElement.id,
      });

      document.getElementById(keyChk.sound).focus();
    }

    document.getElementById("display").innerHTML = this.state.activeEle;
  }

  render() {
    const { padData } = this.state;

    return (
      <div className="DrumPadsDisplay">
        {padData.map((elem, index) => (
          <DrumPads
            letter={elem.letter}
            sound={elem.sound}
            keynumber={elem.keynumber}
            url={elem.url}
            updatedrummachinestate={this.updateDrumMachineState}
            displayC1={this.props.displayP1}
            activeEle={this.state.activeEle}
            key={index}
          />
        ))}
      </div>
    );
  }
}

export default DrumMachine;
