export function setAlocacoes(alocacoes){
    return dispatch => {
        dispatch({type: 'SET_ALOCACOES', payload: alocacoes})
    }
}

export function setData(data){
    return dispatch => {
        dispatch({type: 'SET_DATA', payload: data});
    }
}