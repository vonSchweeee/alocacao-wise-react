export default (state = {}, action) => {
    switch(action.type){
        case 'USER_SET':
            const user = JSON.parse(action.payload.user);
            const id_organizacao = user.id_organizacao;
            return {...state, user: action.payload.user, id_organizacao: id_organizacao};
        case 'TOKEN_SET':
            return {...state, token: action.payload.token};
        case 'TOKEN_REMOVE':
            return {...state, token: undefined};
        case 'USER_REMOVE':
            return {...state, user: undefined};
            
        default:
            return state;
    }
}