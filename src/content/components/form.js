import React from "react";
import InputMask from "react-input-mask";

const matchRegex = (value, regex) => {
  return regex.test(value);
};

const isEmail = value => {
  return matchRegex(
    value,
    /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
  );
};

const isEmptyCell = value => {
  return value.length === 0 || value === "(___) ___ ____";
};

const isEmptyEmail = value => {
  return value.trim().length === 0;
};

export const validateCell = value => {
  return isEmptyCell(value) || /\([0-9]{3}\) [0-9]{3} [0-9]{4}/.test(value);
};

export const validateEmail = value => {
  return isEmptyEmail(value) || isEmail(value);
};

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCellBlurred: false,
      isEmailBlurred: false
    };
  }

  onBlur(e) {
    const { isCellBlurred, isEmailBlurred } = this.state;
    const { name, value } = e.target;

    switch (name) {
      case "cell":
        return this.onBlurCell(value);
      case "email":
        return this.onBlurEmail(value);
    }
  }

  onBlurCell(value) {
    const { isCellBlurred } = this.state;

    if (isCellBlurred || isEmptyCell(value)) {
      return;
    }

    this.setState({ isCellBlurred: true });
  }

  onBlurEmail(value) {
    const { isEmailBlurred } = this.state;

    if (isEmailBlurred || isEmptyEmail(value)) {
      return;
    }

    this.setState({ isEmailBlurred: true });
  }

  render() {
    const { cell, email } = this.props;
    const { isCellBlurred, isEmailBlurred } = this.state;
    const isCellEnabled = cell.isEnabled;
    const isEmailEnabled = email.isEnabled;
    const isCellValid = isCellBlurred ? validateCell(cell.value) : true;
    const isEmailValid = isEmailBlurred ? validateEmail(email.value) : true;
    let cellClassName = "";
    let emailClassName = "";

    if (!isCellValid) {
      cellClassName = "invalid";
    }
    if (!isEmailValid) {
      emailClassName = "invalid";
    }
    if (!isCellEnabled) {
      cellClassName += " disabled";
    }
    if (!isEmailEnabled) {
      emailClassName += " disabled";
    }

    return (
      <div className="form">
        <div className="input-button-combo">
          <InputMask
            className={cellClassName}
            name="cell"
            value={cell.value}
            placeholder="cell"
            onChange={this.props.onChange}
            onBlur={e => this.onBlur(e)}
            mask="(999) 999 9999"
            maskChar="_"
          />
          <button
            name="isCellEnabled"
            type="button"
            onClick={() => this.props.onToggleEnable("cell")}
          >
            {isCellEnabled ? "Disable" : "Enable"}
          </button>
        </div>
        <div className="input-button-combo">
          <input
            className={emailClassName}
            name="email"
            type="email"
            value={email.value}
            placeholder="email"
            onChange={this.props.onChange}
            onBlur={e => this.onBlur(e)}
          />
          <button
            name="isEmailEnabled"
            type="button"
            onClick={() => this.props.onToggleEnable("email")}
          >
            {isEmailEnabled ? "Disable" : "Enable"}
          </button>
        </div>
      </div>
    );
  }
}
