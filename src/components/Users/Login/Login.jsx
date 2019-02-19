import React, { Fragment, Component, createRef } from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';

import ACT from '../../../store';

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
    email: '',
    password: ''
  }

  constructor() {
    super(...arguments);
    this.emailRef = createRef();
    this.focusEmail = this.focusEmail.bind(this);
  }

  componentDidMount() {
    this.focusEmail();
  }

  focusEmail() {
    this.emailRef.current.focus();
  }

  handleLogin(e) {
    e.preventDefault();
    this.props.dispatch(ACT.attemptLogin({
      email: this.state.email,
      password: this.state.password
    }));
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
            <TextField
              fullWidth
              inputRef={this.emailRef}
              className={styles.input}
              value={this.state.email}
              label="email"
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

export default connect()(Login)