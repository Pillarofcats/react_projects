import React, {useState} from 'react';

import Session from "./Session.js"
import Break from "./Break.js"
import Time from "./Time.js"

function Clock() {

const [sessionTime, setSession] = useState(25);
const [breakTime, setBreak] = useState(5);
const [times, setTime] = useState({min: sessionTime, sec: 0});
const [timeDiff, setTimeDiff] = useState(0);
const [start, setStart] = useState(false);
const [onBreak, setOnBreak] = useState(false);

const updateSession = (newSessionTime) => {
  if (start === false) {
    if (newSessionTime < 1) {
      newSessionTime = 1;
    }
    if (newSessionTime > 60) {
      newSessionTime = 60;
    }
    setSession(newSessionTime);
    setTime({...times, min: newSessionTime, sec: 0});
  }
}

const updateBreak = (newBreakTime) => {
  if (start === false) {
    if (newBreakTime < 1) {
      newBreakTime = 1;
    }
    if (newBreakTime > 60) {
      newBreakTime = 60;
    }
    setBreak(newBreakTime);
  }
}

const updateTime = (min, sec) => {
  
  if (min === 0 & sec === 0){
    
    //Break time
    if (onBreak === false) {
      setOnBreak(true);
      setTime({...times, min: breakTime, sec: sec});
    }
    //Session time
    if (onBreak === true) {
      setOnBreak(false);
      setTime({...times, min: sessionTime, sec: sec});
    }
  }

  else if (sec === 0) {
    sec = 60;
    setTime({...times, min: min-1 , sec: sec-1});
  }

  else {
    setTime({...times, min: min , sec: sec-1});
  }
}

const updateStart = () => {
  start?setStart(false):setStart(true);
}

const updateReset = () => {
  document.getElementById("beep").pause();
  document.getElementById("beep").currentTime = 0;
  setTime({...times, min: sessionTime, sec: 0});
  setOnBreak(false);
  setStart(false);
  setSession(25);
  setBreak(5);
  setTime({...times, min: 25, sec: 0});
}

if(times.min === 0 & times.sec === 0) {
  document.getElementById("beep").play();
}

  return (
    <div className="container">
      <h1>Session/Break Timer</h1>
      <div className = "app">
        <div className = "session">
          <Session 
          updateSession = {updateSession}
          sessionTime = {sessionTime}
          />
        </div>
        <div className = "break">
          <Break 
            updateBreak = {updateBreak}
            breakTime = {breakTime}
          />
        </div>
        <div className ="time">
          <Time
            updateTime = {updateTime}
            times_min = {times.min}
            times_sec = {times.sec}
            updateStart = {updateStart}
            updateReset = {updateReset}
            setTimeDiff = {setTimeDiff}
            timeDiff = {timeDiff}
            start = {start}
          />
        </div>
      </div>
      <div className = "status">
        <h1 id ="timer-label">{onBreak? "On break!": "Session, do your best!"}</h1>
      </div>
      <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}

export default Clock;