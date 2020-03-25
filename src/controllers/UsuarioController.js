import ApiRoutes from '../routes/ApiRoutes'

const UsuarioController = {
    verifyToken(token){
        console.log(token);
        return fetch(ApiRoutes.verifyToken, {method: 'GET', headers: {'Authorization': token}});
    },
    login(usuario){
        return fetch(ApiRoutes.urlLogin, {method: 'POST', headers: {'content-type': 'application/json'}, body: usuario});
    },
    registro(usuario){
        return fetch(ApiRoutes.urlRegistro, {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify(usuario)});
    }
}
export default UsuarioController;