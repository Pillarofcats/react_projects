import React from "react";

class DrumPads extends React.Component {
  constructor(props) {
    super(props);
    this.playAudio = this.playAudio.bind(this);
    this.audioRef = React.createRef();
  }

  playAudio() {

    this.audioRef.current.play();
    this.audioRef.current.focus();

    const sound = document.activeElement.id;
    this.props.updatedrummachinestate(sound);

    this.props.displayC1(this.props.activeEle);
  }

  render() {
    const { letter, url, sound } = this.props;

    return (
      <button className="drum-pad" id={sound} onClick={this.playAudio}>
        <h2>{letter}</h2>
        <audio
          ref={this.audioRef}
          className="clip"
          src={url}
          id={letter}
        ></audio>
      </button>
    );
  }
}

export default DrumPads;
