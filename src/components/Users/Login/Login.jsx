import React, { Fragment, Component, createRef } from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';

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
  constructor({login}) {
    super(...arguments);
    this.emailRef = createRef();
    this.focusEmail = this.focusEmail.bind(this);
    this.login = login;
  }

  componentDidMount() {
    this.focusEmail();
  }

  focusEmail() {
    this.emailRef.current.focus();
  }

  login(e) {
    e.preventDefault();
    this.login();
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
              inputRef={this.emailRef}
              fullWidth
              className={styles.input}
              id="email"
              label="email"
              required
            />
            <TextField
              fullWidth
              type="password"
              className={styles.input}
              id="password"
              label="password"
              required
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
              onClick={this.login}
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

function mapDispatchToProps(dispatch) {
  return {
    login: (email, password) => dispatch({type: 'booger'})
  }
}

export default connect(() => ({}), mapDispatchToProps)(Login)