import React from "react";

function Operations({ value, updateInput, id }) {

  return (
    <div>
      <button
        id={id}
        className="numpad-operators"
        value={value}
        onClick={() => updateInput(value)}
      >
        {value}
      </button>
    </div>
  );
}

export default Operations;
