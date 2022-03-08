import React from "react";

function Numpad({ value, updateInput, id}) {

  return (
    <div className={id}>
      <button
        id={id}
        className="numpad-numbers"
        value={value}
        onClick={() => updateInput(value)}
      >
        {value}
      </button>
    </div>
  );
}

export default Numpad;