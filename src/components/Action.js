import React from "react";

const Action = props => (
  <div>
    <button
      className="btn btn-primary"
      disabled={!props.hasOptions}
      onClick={props.handlePick}
    >
      What should I do?
    </button>
  </div>
);

export default Action;
