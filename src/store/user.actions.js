const ATTEMPT_LOGIN = 'ATTEMPT_LOGIN';

const ACTIONS = {
    ATTEMPT_LOGIN
}

const userActionCreators = {
    attemptLogin: (email, password) => ({
        type: ACTIONS.ATTEMPT_LOGIN,
        email,
        password
    })
};

export {ACTIONS as USER_ACTIONS};
export default userActionCreators;