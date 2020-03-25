export const setUser = user => {
  return dispatch => {
    dispatch({ type: "USER_SET", payload: {user} });
  };
};

export const setToken = token => {
  return dispatch => {
    dispatch({ type: "TOKEN_SET", payload: {token} });
  };
}

export const removeToken = () => {
  return dispatch => {
    dispatch({type: "TOKEN_REMOVE"});
  }
}

export const removeUser = () => {
  return dispatch => {
    dispatch({type: "USER_REMOVE"});
  }
}

export const login = (user, token) => {
  return [setUser(user), setToken(token)];
}

export const logout = () => {
  return [removeToken(), removeUser()];
}