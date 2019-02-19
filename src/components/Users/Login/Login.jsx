import React, { Fragment, Component, createRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import ACT from "../../../store/actions";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import styles from "./Login.module.scss";
import google from "../../../assets/google.svg";
import facebook from "../../../assets/facebook.svg";
import instagram from "../../../assets/instagram.jpg";

const socials = {
  google,
  facebook,
  instagram
};

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  constructor() {
    super(...arguments);
    this.emailRef = createRef();
    this.focusEmail = this.focusEmail.bind(this);
    this.renderInput = this.renderInput.bind(this);
  }

  componentDidMount() {
    this.focusEmail();
  }

  focusEmail() {
    this.emailRef.focus();
  }

  handleLogin(e) {
    e.preventDefault();
    this.props.dispatch(
      ACT.user.attemptLogin()
    );
  }

  renderInput({ input, label, meta: { touched, error }, ...custom }) {
    return (
      <TextField
        fullWidth
        className={styles.input}
        inputRef={connectedRef => (this.emailRef = connectedRef)}
        value={this.state.email}
        // hintText={label}
        // floatingLabelText={label}
        // errorText={touched && error}
        {...input}
        {...custom}
      />
    );
  }

  render() {
    return (
      <Fragment>
        <img
          className={styles.logo}
          src="/images/logo-600-600.svg"
          alt="logo"
        />
        <Paper className={styles.paper} elevation={6}>
          <form>
            <Field
              // inputRef={this.emailRef}
              name="email"
              component={this.renderInput}
            />
            <TextField
              fullWidth
              type="password"
              className={styles.input}
              value={this.state.password}
              label="password"
            />
            <Link
              className={`${styles.forgot} ${styles.link}`}
              to="/users/register"
            >
              forgot password?
            </Link>
            <Button
              type="submit"
              className={styles.button}
              variant="contained"
              onClick={this.handleLogin.bind(this)}
            >
              LOG IN
            </Button>
          </form>
          <div className={styles.noAccount}>
            no account?
            <Link className={styles.register} to="/users/register">
              sign up
            </Link>
          </div>
          <div className={styles.spacerText}>log in with </div>
          <ul className={styles.icons}>
            {Object.entries(socials).map(([social, sprite], key) => (
              <Link
                className={styles.iconContainer}
                to={"/users/login/" + social}
                key={key}
              >
                <li>
                  <img className={styles.icon} src={sprite} alt={social} />
                </li>
              </Link>
            ))}
          </ul>
        </Paper>
      </Fragment>
    );
  }
}

export default connect()(
  reduxForm({
    form: "login"
  })(Login)
);
