import axios from "axios";
import { routerActions } from "connected-react-router";

const API_URL = process.env.API_URL || "http://localhost:4000";

const LOGIN = "LOGIN";

export const AUTH_ACTIONS = {
  LOGIN
};

const login = user => ({
  type: AUTH_ACTIONS.LOGIN,
  user
});

const attemptLogin = (email, password) => dispatch =>
  axios.post(`${API_URL}/auth/login`, {
      email,
      password
    })
    .then(({ data }) => {
        dispatch(login(data));
        dispatch(routerActions.push("/users/" + data._id));
      }
    ).catch(err => console.error(err));

export const authActions = {
  attemptLogin,
  login
};
