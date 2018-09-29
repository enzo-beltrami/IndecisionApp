import React from "react";
import Option from "./Option";

const Options = props => (
  <div>
    {props.options.length === 0 && <p>Add an option to get started!</p>}
    {props.options.map((option, index) => (
      <Option
        key={index}
        handleDeleteOption={props.handleDeleteOption}
        text={option}
      />
    ))}
    <button className="btn btn-primary" onClick={props.removeAll}>
      Remove all
    </button>
  </div>
);

export default Options;
