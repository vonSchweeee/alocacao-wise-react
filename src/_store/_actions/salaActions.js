export default function setSalas(salas){
    return dispatch => {
        dispatch({type: 'SET_SALAS', payload: salas})
    }
}