import ApiRoutes from "../routes/ApiRoutes";
import AlocacaoSalaDTO from '../models/dto/AlocacaoSalaDTO';
const AlocacaoSalaController = {
    defaultFind(id_sala, diaEscolhido, token){
        const url = `${ApiRoutes.alocacoes}?idSala=${id_sala}&diaEscolhido=${diaEscolhido}`;
        return fetch(url, {method: 'GET', headers: {'Authorization': token}});
    },
    alterar(token, ...alocacao){
        const dadosAlocacao = new AlocacaoSalaDTO(alocacao[1], alocacao[2], alocacao[3]);
        const alocacaoComId = {...dadosAlocacao, id: alocacao[0]}
        return fetch(ApiRoutes.alocacoes, {method: 'PUT', body: JSON.stringify(alocacaoComId), 
        headers: 
        {'Authorization': token,
        "Content-Type": "application/json"}});
    },
    criar(token, ...alocacao){
        const dadosAlocacao = new AlocacaoSalaDTO(alocacao[2], alocacao[3], alocacao[4]);
        const alocacaoComIds = {...dadosAlocacao, id_sala: alocacao[0], id_usuario: alocacao[1]}
        return fetch(ApiRoutes.alocacoes, {method: 'POST', body: JSON.stringify(alocacaoComIds), 
        headers: 
        {'Authorization': token,
        "Content-Type": "application/json"}});
    },
    desativar(token, id){
        return fetch(ApiRoutes.alocacoes, {method: 'DELETE', body: JSON.stringify({id}), 
        headers: 
        {'Authorization': token,
        "Content-Type": "application/json"}});
    }
}
export default AlocacaoSalaController;