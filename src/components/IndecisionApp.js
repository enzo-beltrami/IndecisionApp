import React from "react";
import AddOption from "./AddOption";
import Options from "./Options";
import Header from "./Header";
import Action from "./Action";
import OptionModal from "./OptionModal";

export default class IndecisionApp extends React.Component {
  state = {
    title: "Indecision App",
    subtitle: "Put your life in the hands of a computer",
    options: JSON.parse(localStorage.getItem("options")) || [],
    selectedOption: undefined
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
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const selectedOption = this.state.options[randomNum];
    console.log(selectedOption);
    this.setState(() => ({
      selectedOption
    }));
  };

  closeModal = () => {
    this.setState(() => ({
      selectedOption: undefined
    }));
  };

  render() {
    return (
      <div>
        <Header title={this.state.title} subtitle={this.state.subtitle} />
        <div className="container">
          <Action
            handlePick={this.handlePick}
            hasOptions={this.state.options.length > 0}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOption={this.handleDeleteOption}
              removeAll={this.removeAll}
            />
            <AddOption
              options={this.state.options}
              addOption={this.addOption}
            />
          </div>
        </div>
        <OptionModal
          closeModal={this.closeModal}
          selectedOption={this.state.selectedOption}
        />
      </div>
    );
  }
}
