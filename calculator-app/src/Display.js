import React from "react";

function Display({ display}) {


  return <div id='display'>
    {(display === "" ? 0 : display)
  }</div>;
}

export default Display;
