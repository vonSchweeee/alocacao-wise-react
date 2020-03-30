export default (state = [], action) => {
    switch(action.type){
        case 'SET_SALAS':
            return {...state, lista: action.payload};
        case 'SET_SALA':
            return {...state, selecionada: action.payload};
        case 'CLEAR_TEMP':
            return {};
        default:
            return state;
    }
}