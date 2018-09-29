import React from "react";

const Option = props => (
  <div>
    {props.text}
    <button onClick={() => props.handleDeleteOption(props.text)}>remove</button>
  </div>
);

export default Option;
