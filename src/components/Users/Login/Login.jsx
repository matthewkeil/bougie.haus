import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";

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

function renderTextField({ input, ...custom }) {
  return (
    <TextField
      fullWidth
      className={styles.input}
      label={input.name}
      {...input}
      {...custom}
    />
  );
}

const Login = props => (
  <Fragment>
    <img className={styles.logo} src="/images/logo-600-600.svg" alt="logo" />
    <Paper className={styles.paper} elevation={6}>
      <form onSubmit={e => props.attemptLogin(e, props.email, props.password)}>
        <Field name="email" autoFocus component={renderTextField} />
        <Field name="password" type="password" component={renderTextField} />
        <Link
          className={`${styles.forgot} ${styles.link}`}
          to="/users/register"
        >
          forgot password?
        </Link>
        <Button type="submit" className={styles.button} variant="contained">
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

const mapState = state => {
  const selector = formValueSelector("login");
  return {
    email: selector(state, "email"),
    password: selector(state, "password")
  };
};

const mapDispatch = dispatch => ({
  attemptLogin: (e, email, password) => {
    e.preventDefault();
    dispatch(ACT.user.attemptLogin(email, password));
  }
});

export default connect(
  mapState,
  mapDispatch
)(
  reduxForm({
    form: "login"
  })(Login)
);