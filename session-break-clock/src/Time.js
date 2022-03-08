import React, {useEffect} from "react";

function Time({updateTime, times_min, times_sec, updateStart, updateReset, setTimeDiff, timeDiff, start}) {

useEffect(()=> {

  if (start === true) {

    const startTime = Date.now();
    
    const tick = setInterval(()=> {
      const currentTime = Date.now();
      let delayTime = currentTime - startTime;
      setTimeDiff(delayTime/1000);
      updateTime(times_min, times_sec, timeDiff);
    }, 1000-timeDiff);

    return ()=> clearInterval(tick);
  }
},[updateTime, start, times_min, times_sec, setTimeDiff, timeDiff]);

  let min = times_min;
  let sec = times_sec;

  if(times_min < 10) {
    min = String('0' + times_min);
  }
  if(times_sec < 10) {
    sec = String('0' + times_sec);
  }

  const output = min + ":" + sec;

  return (
    <div id = "time-label">
      <h2>Timer</h2>
      <button id = "start_stop" className = "button tb_start" onClick = {()=> updateStart()} ><i class="fas fa-step-forward"></i></button>
      <h2 id = "time-left">{output}</h2>
      <button id = "reset" className = "button tb_start" onClick = {()=> updateReset()}><i class="fas fa-sync-alt"></i></button>
    </div>
  )
}

export default Time;