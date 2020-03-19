import ApiRoutes from '../routes/ApiRoutes'

const UsuarioController = {
    verifyToken(token){
        return fetch(ApiRoutes.verifyToken, {method: 'GET', headers: {'authorization': token}});
    },
    login(usuario){
        return fetch(ApiRoutes.urlLogin, {method: 'POST', headers: {'content-type': 'application/json'}, body: usuario});
    },
    registro(usuario){
        return fetch(ApiRoutes.urlRegistro, {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify(usuario)});
    }
}
export default UsuarioController;