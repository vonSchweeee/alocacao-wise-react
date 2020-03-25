export default (state = {}, action) => {
    switch(action.type){
        case 'SET_SALAS':
            return {...state, salas: action.payload}
            
        default:
            return state;
    }
}