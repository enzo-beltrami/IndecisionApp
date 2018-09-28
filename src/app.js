class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Indecision App",
      subtitle: "Put your life in the hands of a computer",
      options: ["thing one", "thing two", "thing four"]
    };
    this.addOption = this.addOption.bind(this);
    this.removeAll = this.removeAll.bind(this);
    this.handlePick = this.handlePick.bind(this);
  }

  addOption(option) {
    this.setState(prevState => ({
      options: [...prevState.options, option]
    }));
  }

  removeAll() {
    this.setState(() => ({
      options: []
    }));
  }

  handlePick() {
    alert(
      this.state.options[Math.floor(Math.random() * this.state.options.length)]
    );
  }

  render() {
    return (
      <div>
        <Header title={this.state.title} subtitle={this.state.subtitle} />
        <AddOption options={this.state.options} addOption={this.addOption} />
        <Action
          handlePick={this.handlePick}
          hasOptions={this.state.options.length > 0}
        />
        <Options options={this.state.options} removeAll={this.removeAll} />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2 />
      </div>
    );
  }
}

class Action extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.handlePick}>What should I do?</button>
      </div>
    );
  }
}

class Options extends React.Component {
  render() {
    return (
      <div>
        {this.props.options.map((option, index) => (
          <Option key={index} text={option} />
        ))}
        <button onClick={this.props.removeAll}>Remove all</button>
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return <div>{this.props.text}</div>;
  }
}

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
  }

  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();

    if (option) this.props.addOption(option);
  }

  render() {
    return (
      <form onSubmit={this.handleAddOption}>
        <input type="text" name="option" />
        <button type="submit"> Add Option </button>
      </form>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById("app"));
