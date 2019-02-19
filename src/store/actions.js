
export const ACTIONS = {
    ATTEMPT_LOGIN: 'ATTEMPT_LOGIN'
}

export default {
    attemptLogin: (payload) => ({
        type: ACTIONS.ATTEMPT_LOGIN,
        payload
    })
};