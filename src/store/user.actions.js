import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:4000";

const LOGIN = "LOGIN";

const ACTIONS = {
  LOGIN
};

const userActionCreators = {
  attemptLogin: (email, password) => dispatch =>
    axios
      .post(`${API_URL}/auth/login`, {
        email,
        password
      })
      .then(
        ({ data }) => {
          dispatch({
            type: ACTIONS.LOGIN,
            user: data
          });
        },
        err => console.error(err)
      )
};

export { ACTIONS as USER_ACTIONS };
export default userActionCreators;
