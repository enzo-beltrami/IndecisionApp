import React from "react";
import AddOption from "./AddOption";
import Options from "./Options";
import Header from "./Header";
import Action from "./Action";

export default class IndecisionApp extends React.Component {
  state = {
    title: "Indecision App",
    subtitle: "Put your life in the hands of a computer",
    options: JSON.parse(localStorage.getItem("options")) || []
  };

  componentDidUpdate() {
    localStorage.setItem("options", JSON.stringify(this.state.options));
  }

  addOption = option => {
    if (!option) return "Enter a valid option!";
    else if (this.state.options.indexOf(option) > -1)
      return "This item already exists!";
    else
      this.setState(prevState => ({
        options: [...prevState.options, option]
      }));
  };

  removeAll = () => {
    this.setState(() => ({
      options: []
    }));
  };

  handleDeleteOption = option => {
    this.setState(prevState => ({
      options: prevState.options.filter(
        optionToRemove => optionToRemove !== option
      )
    }));
  };

  handlePick = () => {
    alert(
      this.state.options[Math.floor(Math.random() * this.state.options.length)]
    );
  };

  render() {
    return (
      <div className="jumbotron">
        <Header title={this.state.title} subtitle={this.state.subtitle} />
        <AddOption options={this.state.options} addOption={this.addOption} />
        <Action
          handlePick={this.handlePick}
          hasOptions={this.state.options.length > 0}
        />
        <Options
          options={this.state.options}
          handleDeleteOption={this.handleDeleteOption}
          removeAll={this.removeAll}
        />
      </div>
    );
  }
}
