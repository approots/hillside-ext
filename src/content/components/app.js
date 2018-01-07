import React from "react";
import Loadable from "react-loading-overlay";
import Form, { validateCell, validateEmail } from "./form";
import { getUser, postUser } from '../api';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      cell: { value: "", isEnabled: true },
      email: { value: "", isEnabled: true }
    };
  }

  componentDidMount() {
    this.id = document.body.dataset.patientid;
    this.form = document.getElementById("apptFormId");

    if (!this.id || !this.form) {
      // TODO send an error report. Get a snapshot of the page?
      return this.setState({ error: "Error. Please contact the developer of the \"Patient Reminder\" Chrome extension." });
    }

    this.form.addEventListener("submit", this.onSubmit.bind(this), true);

    getUser(this.id)
      .then((json) => {
        console.log('returned json:', json);
        this.setState({ isLoading: false, cell: json.cell, email: json.email });
      })
      .catch((err) => {
        this.setState({ isLoading: false, error: 'Failed to load patient contact info.' });
      });
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

    // TODO attempt to get the user's name.
    postUser(this.id, { cell, email })
      .then((res) => {
        alert("submitted with no errors. ID: " + this.id);
      })
      .catch((err) => {
        // TODO
        alert('Error!');
      });
  }

  render() {
    const { cell, email, isLoading } = this.state;
    return (
      <Loadable
        active={isLoading}
        spinner
      >
        <div className="app">
          <Form
            cell={cell}
            email={email}
            onChange={e => this.onChange(e)}
            onToggleEnable={name => this.onToggleEnable(name)}
          />
        </div>
      </Loadable>
    );
  }
}
