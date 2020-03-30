export function clear(){
    return dispatch => {
        dispatch({type: 'CLEAR_TEMP'})
    }
}