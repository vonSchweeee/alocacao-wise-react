import ApiRoutes from '../routes/ApiRoutes';

const OrganizacaoController = {
    findOrgByDominio(dominio){
        return fetch(ApiRoutes.getOrgDominio + '?dominio=' + dominio, {method: 'GET'});
    }
}

export default OrganizacaoController;