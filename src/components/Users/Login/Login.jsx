import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";

import { renderTextField } from "../../helpers";
import {ACT} from "../../../store";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import styles from "./Login.module.scss";

import SocialLogin from "../SocialLogin";
import google from "../../../assets/google.svg";
import facebook from "../../../assets/facebook.svg";
import instagram from "../../../assets/instagram.jpg";

const baseUrl = process.env.API || "http://localhost:4000";

const socials = {
  google,
  facebook,
  instagram
};



const Login = props => (
  <Fragment>
    <img className={styles.logo} src="/images/logo-600-600.svg" alt="logo" />
    <Paper className={styles.paper} elevation={6}>
      <form onSubmit={props.attemptLogin(props.email, props.password)}>
        <Field fullWidth={true} className={styles.input} name="email" autoFocus component={renderTextField} />
        <Field fullWidth={true} className={styles.input} name="password" type="password" component={renderTextField} />
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
          <li key={key} className={styles.iconContainer}>
            <SocialLogin
              social={social}
              sprite={sprite}
              baseUrl={baseUrl}
              imgClassName={styles.icon}
            />
          </li>
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
  attemptLogin: (email, password) => e => {
    e.preventDefault();
    dispatch(ACT.auth.attemptLogin(email, password));
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
