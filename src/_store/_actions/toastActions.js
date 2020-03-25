export const showSuccessToast = message => {
    return dispatch => {
      dispatch({ type: "TOAST_SUCCESS", payload: {message} });
    };
};

export const showErrorToast = message => {
    return dispatch => {
      dispatch({ type: "TOAST_ERROR", payload: {message} });
    };
};

export const clearToast = () => {
    return dispatch => {
        dispatch({ type: "TOAST_CLEAR" });
    };
};