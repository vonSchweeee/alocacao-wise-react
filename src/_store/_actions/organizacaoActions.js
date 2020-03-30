export default function setUsers(usuarios){
    return dispatch => {
        dispatch({type: 'SET_ORG_USERS', payload: usuarios})
    }
}