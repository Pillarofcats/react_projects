import React from "react";

function Session({updateSession, sessionTime}) {

  return (
    <div id = "session-label">
      <h2>Session Length</h2>
      <button id = "session-increment" className = "button sb_up" onClick = {()=> updateSession(sessionTime+1)}><i class="far fa-caret-square-up"></i></button>
      <h2 id = "session-length">{sessionTime}</h2>
      <button id = "session-decrement" className = "button sb_down" onClick = {()=> updateSession(sessionTime-1)}><i class="far fa-caret-square-down"></i></button>
    </div>
  )
}

export default Session;