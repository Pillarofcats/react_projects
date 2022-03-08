import React from "react";

function Break({updateBreak, breakTime}) {

  return (
    <div id = "break-label">
      <h2>Break Length</h2>
      <button id = "break-increment" className = "button bb_up" onClick = {()=> updateBreak(breakTime+1)}><i class="far fa-caret-square-up"></i></button>
      <h2 id = "break-length">{breakTime}</h2>
      <button id = "break-decrement" className = "button bb_down" onClick = {()=> updateBreak(breakTime-1)}><i class="far fa-caret-square-down"></i></button>
    </div>
  )
}

export default Break;