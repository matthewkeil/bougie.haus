import React, { Fragment } from "react";
import { Link } from "react-router-dom";

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

export default () => (
  <Fragment>
    <img className={styles.logo} src="/images/logo-600-600.svg" alt="logo" />
    <Paper className={styles.paper} elevation={6}>
      <form>
        <TextField
          fullWidth
          className={styles.input}
          id="email"
          label="email"
          required
        />
        <TextField
          fullWidth
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
        <Button className={styles.button} variant="contained">
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
          <Link className={styles.iconContainer} to={"/users/login/" + social}>
            <li id={key}>
              <img className={styles.icon} src={sprite} alt={social} />
            </li>
          </Link>
        ))}
      </ul>
    </Paper>
  </Fragment>
);
