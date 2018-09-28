class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Indecision App",
      subtitle: "Put your life in the hands of a computer",
      options: JSON.parse(localStorage.getItem("options")) || []
    };
    this.addOption = this.addOption.bind(this);
    this.removeAll = this.removeAll.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
  }

  componentDidUpdate() {
    localStorage.setItem("options", JSON.stringify(this.state.options));
  }

  addOption(option) {
    if (!option) return "Enter a valid option!";
    else if (this.state.options.indexOf(option) > -1)
      return "This item already exists!";
    else
      this.setState(prevState => ({
        options: [...prevState.options, option]
      }));
  }

  removeAll() {
    this.setState(() => ({
      options: []
    }));
  }

  handleDeleteOption(option) {
    this.setState(prevState => ({
      options: prevState.options.filter(
        optionToRemove => optionToRemove !== option
      )
    }));
  }

  handlePick() {
    alert(
      this.state.options[Math.floor(Math.random() * this.state.options.length)]
    );
  }

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

const Header = props => (
  <div>
    <h1>{props.title}</h1>
    <h2>{props.subtitle}</h2>
  </div>
);

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

const Option = props => (
  <div>
    {props.text}
    <button onClick={() => props.handleDeleteOption(props.text)}>remove</button>
  </div>
);

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = { error: undefined };
  }

  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();

    const error = this.props.addOption(option);
    this.setState(() => ({ error }));

    if (!error) e.target.elements.option.value = "";
  }

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

ReactDOM.render(<IndecisionApp />, document.getElementById("app"));
