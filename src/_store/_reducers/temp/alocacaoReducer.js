export default (state = {}, action) => {
    switch(action.type){
        case 'SET_ALOCACOES':
            return {...state, alocacoes: action.payload};
        case 'SET_DATA':
            return {...state, data: action.payload};
        case 'CLEAR_TEMP':
            return {};
        default:
            return state;
    }
}