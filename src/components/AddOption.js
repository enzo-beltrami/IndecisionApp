import React from "react";

export default class AddOption extends React.Component {
  state = { error: undefined };

  handleAddOption = e => {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();

    const error = this.props.addOption(option);
    this.setState(() => ({ error }));

    if (!error) e.target.elements.option.value = "";
  };

  render() {
    return (
      <form onSubmit={this.handleAddOption}>
        {this.state.error && (
          <p className="alert alert-danger">{this.state.error}</p>
        )}
        <div className="input-group">
          <input className="form-control" type="text" name="option" />
          <button className="btn btn-primary" type="submit">
            Add Option
          </button>
        </div>
      </form>
    );
  }
}
