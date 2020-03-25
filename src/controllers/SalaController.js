import ApiRoutes from '../routes/ApiRoutes'

const SalaController = {
    findByOrgId(id, token){
        return fetch(ApiRoutes.getSalasOrgId + id, {method: 'GET', headers: {'Authorization': token}});
    }
}
export default SalaController;