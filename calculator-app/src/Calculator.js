import React, { useState } from "react";
import Display from "./Display";
import Operations from "./Operations";
import Numpad from "./Numpad";

function Calculator() {
  const NUMPAD_NUMBERS = [
    { num: 9, id: "nine" },
    { num: 8, id: "eight" },
    { num: 7, id: "seven" },
    { num: 6, id: "six" },
    { num: 5, id: "five" },
    { num: 4, id: "four" },
    { num: 3, id: "three" },
    { num: 2, id: "two" },
    { num: 1, id: "one" },
    { num: 0, id: "zero" },
  ];

  const NUMPAD_OPERATORS = [
    { op: "ac", id: "clear" },
    { op: "c", id: "back" },
    { op: "/", id: "divide" },
    { op: "*", id: "multiply" },
    { op: "-", id: "subtract" },
    { op: "+", id: "add" },
    { op: ".", id: "decimal" },
    { op: "=", id: "equals" },
  ];

  const [input, setInput] = useState("");
  const [decChk, setDecChk] = useState("");

  const updateInput = (curVal) => {

    console.log("val in def", curVal)
    console.log("input", input)
    let opList = ["/","*","+","."]


    if(decChk === 1 & curVal === '.') {
      curVal = ''
      setDecChk(0)
    }

    if (curVal === '.') {
      setDecChk(1)
    }

    if (curVal === '/' | curVal === '*' | curVal === '-' | curVal === '+' | curVal === "=" | curVal === "ac" | curVal === 'c') {
      setDecChk(0)
    }

    if (input[0] === '0' & input[1] === '0') {
      setInput("")
    }

    if ((curVal === "-" | curVal === "/" | curVal === "+" | curVal === "*" | curVal === "." | curVal === "=") & input === "") {
      curVal = "";
    }

    //If the previous character was . and the next is . set curVal equal to an empty string
    if (input[input.length-1] === "." & (curVal === '+' | curVal === '-' | curVal === '/' | curVal === '*'| curVal === '.' | curVal === '=')) {
      curVal = ''
      setInput(input.substr(0, input.length - 1))
    }

    if (input[input.length-1] === "-" & (curVal === '+' | curVal === '-' | curVal === '/' | curVal === '*' | curVal === '=')) {
      setInput(input.substr(0, input.length - 1))
    }

    if ((curVal === '/' | curVal === '*' | curVal === '+' | curVal === '-') & input[input.length - 1] === '-' & (input[input.length - 2] === '/' | input[input.length - 2] === '*' | input[input.length - 2] === '+')) {
      setInput(input.substr(0, input.length - 2));
    }

    //Prevent double operators
    if (input[input.length - 1] === '/' | input[input.length - 1] === '*' | input[input.length - 1] === '+' | input[input.length - 1] === '.') {
      for (let x of opList) {
        if(curVal === x) {
          setInput(input.substr(0, input.length - 1)) 
        }
      }
    }

    // if ((input[input.length - 1] === '/' | input[input.length - 1] === '*' | input[input.length - 1] === '-' | input[input.length - 1] === '+') & curVal === 0 ) {
    //   curVal = ""
    // }

    // //Add zero after decimal if no number is input and an operator is clicked
    // if ((curVal === '/' | curVal === '*' | curVal === '-' | curVal === '+' | curVal === '=') & input[input.length - 1] === ".") {
    //   let temp = 0 + curVal
    //   curVal = temp
    // }

    switch (curVal) {
      case "ac":
        setInput("");
        break;
      case "c":
        setInput(input.substr(0, input.length - 1));
        break;
      case "=":
        try {
          setInput(String(eval(input)));
        } catch (e) {
          setInput("");
        }
        break;
      default:
        setInput((input) => input + curVal);
        break;
    }
  };

  return (
    <div>
      <div className="flex-all">
        <div className="displayed">
          <Display display={input} />
        </div>
        <div className="flex-numpad-operations">
          <div className="numpad">
            {NUMPAD_NUMBERS.map((elem, index) => (
              <Numpad
                key={index}
                value={elem.num}
                id={elem.id}
                updateInput={updateInput}
              />
            ))}
          </div>
          <div className="operations">
            {NUMPAD_OPERATORS.map((elem, index) => (
              <Operations
                className="operations"
                key={index}
                value={elem.op}
                id={elem.id}
                updateInput={updateInput}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
