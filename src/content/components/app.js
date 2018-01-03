import React from "react";
import Form, { validateCell, validateEmail } from "./form";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cell: { value: "", isEnabled: true },
      email: { value: "", isEnabled: true }
    };
  }

  componentDidMount() {
    this.form = document.getElementById("formy");
    this.form.addEventListener("submit", this.onSubmit.bind(this), true);
  }

  componentWillUnmount() {
    this.form.removeEventListener("submit", this.onSubmit.bind(this), true);
  }

  onChange(e) {
    const { name, value } = e.target;
    const isEnabled = this.state[name].isEnabled;
    this.setState({
      [name]: { value, isEnabled }
    });
  }

  onToggleEnable(name) {
    const state = this.state[name];
    const { value, isEnabled } = state;
    this.setState({
      [name]: { value, isEnabled: !isEnabled }
    });
  }

  onSubmit(e) {
    console.log("submitted");
    e.preventDefault();
    const { cell, email } = this.state;
    const errors = [];

    if (!validateCell(cell.value)) {
      errors.push("Invalid Cell Number.");
    }
    if (!validateEmail(email.value)) {
      errors.push("Invalid Email.");
    }

    if (errors.length) {
      return alert(errors.join("\n"));
    }

    return alert("submitted with no errors");
  }

  render() {
    const { cell, email } = this.state;
    return (
      <div className="app">
        <Form
          cell={cell}
          email={email}
          onChange={e => this.onChange(e)}
          onToggleEnable={name => this.onToggleEnable(name)}
        />
      </div>
    );
  }
}
