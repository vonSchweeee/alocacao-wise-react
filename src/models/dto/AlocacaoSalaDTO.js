import moment from 'moment';
class AlocacaoSalaDTO{
    constructor(descricao, data_hora_inicio, data_hora_fim){
        this.descricao = descricao;
        this.data_hora_inicio = moment(data_hora_inicio).format('YYYY-MM-DD HH:mm:ss');
        this.data_hora_fim = moment(data_hora_fim).format('YYYY-MM-DD HH:mm:ss');
    }
}

export default AlocacaoSalaDTO;