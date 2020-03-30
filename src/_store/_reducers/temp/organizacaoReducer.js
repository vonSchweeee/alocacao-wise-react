export default (state = {}, action) => {
    switch(action.type){
        case 'SET_ORG_USERS':
            return {...state, users: action.payload};
        case 'CLEAR_TEMP':
            return {};
        default:
            return state;
    }
}