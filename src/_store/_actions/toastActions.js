export const showSuccessToast = (message, timeout) => {
    return dispatch => {
      dispatch({ type: "TOAST_SUCCESS", payload: {message, timeout} });
    };
};

export const showErrorToast = (message, timeout) => {
    return dispatch => {
      dispatch({ type: "TOAST_ERROR", payload: {message, timeout} });
    };
};

export const clearToast = () => {
    return dispatch => {
        dispatch({ type: "TOAST_CLEAR" });
    };
};