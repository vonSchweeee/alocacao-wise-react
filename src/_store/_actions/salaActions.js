export function setSalas(salas){
    return dispatch => {
        dispatch({type: 'SET_SALAS', payload: salas})
    }
}
export function setSala(sala){
    return dispatch => {
        dispatch({type: 'SET_SALA', payload: sala})
    }
}