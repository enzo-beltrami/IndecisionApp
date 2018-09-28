class VisibilityToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
    this.visibilityHandler = this.visibilityHandler.bind(this);
  }

  visibilityHandler() {
    this.setState(prevState => ({ visible: !prevState.visible }));
  }

  render() {
    return (
      <div>
        {this.state.visible && <p>test</p>}
        <button onClick={this.visibilityHandler}>
          {this.state.visible ? "Hide it" : "Show it"}
        </button>
      </div>
    );
  }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById("app"));
