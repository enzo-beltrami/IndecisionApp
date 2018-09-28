"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
  _inherits(IndecisionApp, _React$Component);

  function IndecisionApp(props) {
    _classCallCheck(this, IndecisionApp);

    var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

    _this.state = {
      title: "Indecision App",
      subtitle: "Put your life in the hands of a computer",
      options: JSON.parse(localStorage.getItem("options")) || []
    };
    _this.addOption = _this.addOption.bind(_this);
    _this.removeAll = _this.removeAll.bind(_this);
    _this.handlePick = _this.handlePick.bind(_this);
    _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
    return _this;
  }

  _createClass(IndecisionApp, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      localStorage.setItem("options", JSON.stringify(this.state.options));
    }
  }, {
    key: "addOption",
    value: function addOption(option) {
      if (!option) return "Enter a valid option!";else if (this.state.options.indexOf(option) > -1) return "This item already exists!";else this.setState(function (prevState) {
        return {
          options: [].concat(_toConsumableArray(prevState.options), [option])
        };
      });
    }
  }, {
    key: "removeAll",
    value: function removeAll() {
      this.setState(function () {
        return {
          options: []
        };
      });
    }
  }, {
    key: "handleDeleteOption",
    value: function handleDeleteOption(option) {
      this.setState(function (prevState) {
        return {
          options: prevState.options.filter(function (optionToRemove) {
            return optionToRemove !== option;
          })
        };
      });
    }
  }, {
    key: "handlePick",
    value: function handlePick() {
      alert(this.state.options[Math.floor(Math.random() * this.state.options.length)]);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "jumbotron" },
        React.createElement(Header, { title: this.state.title, subtitle: this.state.subtitle }),
        React.createElement(AddOption, { options: this.state.options, addOption: this.addOption }),
        React.createElement(Action, {
          handlePick: this.handlePick,
          hasOptions: this.state.options.length > 0
        }),
        React.createElement(Options, {
          options: this.state.options,
          handleDeleteOption: this.handleDeleteOption,
          removeAll: this.removeAll
        })
      );
    }
  }]);

  return IndecisionApp;
}(React.Component);

var Header = function Header(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      null,
      props.title
    ),
    React.createElement(
      "h2",
      null,
      props.subtitle
    )
  );
};

var Action = function Action(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "button",
      {
        className: "btn btn-primary",
        disabled: !props.hasOptions,
        onClick: props.handlePick
      },
      "What should I do?"
    )
  );
};

var Options = function Options(props) {
  return React.createElement(
    "div",
    null,
    props.options.length === 0 && React.createElement(
      "p",
      null,
      "Add an option to get started!"
    ),
    props.options.map(function (option, index) {
      return React.createElement(Option, {
        key: index,
        handleDeleteOption: props.handleDeleteOption,
        text: option
      });
    }),
    React.createElement(
      "button",
      { className: "btn btn-primary", onClick: props.removeAll },
      "Remove all"
    )
  );
};

var Option = function Option(props) {
  return React.createElement(
    "div",
    null,
    props.text,
    React.createElement(
      "button",
      { onClick: function onClick() {
          return props.handleDeleteOption(props.text);
        } },
      "remove"
    )
  );
};

var AddOption = function (_React$Component2) {
  _inherits(AddOption, _React$Component2);

  function AddOption(props) {
    _classCallCheck(this, AddOption);

    var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

    _this2.handleAddOption = _this2.handleAddOption.bind(_this2);
    _this2.state = { error: undefined };
    return _this2;
  }

  _createClass(AddOption, [{
    key: "handleAddOption",
    value: function handleAddOption(e) {
      e.preventDefault();

      var option = e.target.elements.option.value.trim();

      var error = this.props.addOption(option);
      this.setState(function () {
        return { error: error };
      });

      if (!error) e.target.elements.option.value = "";
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "form",
        { onSubmit: this.handleAddOption },
        this.state.error && React.createElement(
          "p",
          { className: "alert alert-danger" },
          this.state.error
        ),
        React.createElement(
          "div",
          { className: "input-group" },
          React.createElement("input", { className: "form-control", type: "text", name: "option" }),
          React.createElement(
            "button",
            { className: "btn btn-primary", type: "submit" },
            "Add Option"
          )
        )
      );
    }
  }]);

  return AddOption;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById("app"));
