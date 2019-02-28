const ENQUEUE_SNACKBAR = "ENQUEUE_SNACKBAR";
const REMOVE_SNACKBAR = "REMOVE_SNACKBAR";
const SNACKBAR_ACTIONS = {
  ENQUEUE_SNACKBAR,
  REMOVE_SNACKBAR
};

const enqueueSnackbar = error => {
  let note = {};

  if (typeof error === "string") {
    note.message = error;
  } else if (error instanceof Error) {

    if (error.response && error.response.data) {
      note.message = error.response.data.message
    } else {
      note.message = error.message;
    }
  }

  return {
    type: SNACKBAR_ACTIONS.ENQUEUE_SNACKBAR,
    notification: {
      key: new Date().getTime() + Math.random(),
      ...note
    }
  };
};

const removeSnackbar = key => ({
  type: SNACKBAR_ACTIONS.REMOVE_SNACKBAR,
  key
});

const snackbarActions = {
  enqueueSnackbar,
  removeSnackbar
};

const defaultState = {
  notifications: []
};

const snackbarReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SNACKBAR_ACTIONS.ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.notification
          }
        ]
      };

    case SNACKBAR_ACTIONS.REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.key !== action.key
        )
      };

    default:
      return state;
  }
};

export { snackbarActions, SNACKBAR_ACTIONS, snackbarReducer };
