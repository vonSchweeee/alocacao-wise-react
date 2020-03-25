export const showSidebar = () => {
    return dispatch => {
        dispatch({type: 'SIDEBAR_SHOW'})
    }
}

export const hideSidebar = () => {
    return dispatch => {
        dispatch({type: 'SIDEBAR_HIDE'})
    }
}