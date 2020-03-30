import React, { Fragment, Component } from 'react'
import { Grid, Container, Fab, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField} from '@material-ui/core';
import AlocacaoCard from './AlocacaoCard';
import AlocacaoSalaController from '../../../controllers/AlocacaoSalaController';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setAlocacoes, setData} from '../../../_store/_actions/alocacaoActions';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker} from '@material-ui/pickers';
import { ptBR } from 'date-fns/locale'
import '../../../style/css/Alocacoes.css'
import AddIcon from '@material-ui/icons/Add';
import '../../../style/css/Fab.css';
import { showSuccessToast, showErrorToast } from '../../../_store/_actions/toastActions';

class Alocacoes extends Component{
    constructor(props){
        super(props);
        this.state = {dialogOpen: false};
        this.dateChange = this.dateChange.bind(this);
        this.findSalas = this.findAlocacoes.bind(this);
        this.setHoraInicio = this.setHoraInicio.bind(this);
        this.setHoraFim = this.setHoraFim.bind(this);
        this.setDescricao = this.setDescricao.bind(this);
        this.findAlocacoes = this.findAlocacoes.bind(this);
    }

    componentDidMount(){
        this.findAlocacoes();
    }
    findAlocacoes(){
        AlocacaoSalaController.defaultFind(this.props.sala.id, this.props.data, this.props.token).then((res) => {
            res.json().then(alocacoes => {
                this.props.setAlocacoes(alocacoes);
            });
        },
        (erro) => console.log(erro));
    }
    setHoraInicio(time){
        this.setState({...this.state, horaInicio: time});
    }
    setHoraFim(time){
        this.setState({...this.state, horaFim: time});
    }
    setDescricao(desc){
        this.setState({...this.state, descricao: desc});
    }
    renderSalas(){
        if(this.props.alocacoes){
            const users = this.props.users || [];
            const alocacoes = this.props.alocacoes || [];
            if(alocacoes.length){
                return alocacoes.map(alocacao => {
                    /* eslint-disable */
                    const usuario = users.map(usuario => {
                        if(usuario.id === alocacao.id_usuario){
                            console.log(usuario);
                            return usuario.nome;
                        }
                    })
                    /* eslint-disable */
                    return(
                        <Grid item xl={3} xs={12} lg={4} sm={5} className='grid-item'>
                            <AlocacaoCard alocacao={alocacao} usuario={usuario} adm={false} 
                            horaInicio={this.state.horaInicio} horaFim={this.state.horaFim}
                            setHoraInicio={this.setHoraInicio} setHoraFim={this.setHoraFim}
                            token={this.props.token} descricao={this.state.descricao} setDescricao={this.setDescricao}
                            findAlocacoes={this.findAlocacoes} showSuccessToast={this.props.showSuccessToast}
                            showErrorToast={this.props.showErrorToast}
                            />
                        </Grid>
                    );
                });
            }
        }
    }


    dateChange(data){
        if (Object.prototype.toString.call(data) === "[object Date]") {
            if (isNaN(data.getTime())) {
                
            } else {
                const dataForm = moment(data).format('YYYY-MM-DD');
                this.props.setData(dataForm);
                if(new Date(moment(data).format('YYYY-MM-DD')) < new Date(moment().format('YYYY-MM-DD'))){
                    this.setState({error: true})
                }
                else{
                    this.setState({error: false});
                    setTimeout(() => { 
                        this.findAlocacoes();
                    }, 1);
                }
            }
          }
    }

    dialogCreate = props => {
        return(
            <Dialog open={this.state.dialogOpen} onClose={() => this.setState({...this.state, dialogOpen: false})}>
            <DialogTitle id="form-dialog-title">Criar Alocação</DialogTitle>
            <DialogContent>
                    <TextField
                        autoFocus margin="dense" id="descricao" label="Descrição" name="descricao" fullWidth
                        value={this.state.descricao} onChange={e => this.setDescricao(e.target.value)} 
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <div id='pickers'>
                        <Grid container  >
                        <Grid item xl={5}>
                            <KeyboardTimePicker
                                format='HH:mm'
                                variant="inline"
                                ampm={false}
                                margin="normal"
                                id="horario-inicio"
                                name="data_hora_inicio"
                                label="Horário de Início"
                                value={this.state.horaInicio || new Date().setHours(0,0,0,0)}
                                onChange={horario => this.setHoraInicio(horario)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </Grid>
                        <Grid item xl={1}/>
                        <Grid item xl={5}>
                            <KeyboardTimePicker
                                format='HH:mm'
                                variant="inline"
                                ampm={false}
                                margin="normal"
                                id="horario-fim"
                                name="data_hora_fim"
                                label="Horário de Fim"
                                value={this.state.horaFim || new Date().setHours(0,0,0,0)}
                                onChange={horario => this.setHoraFim(horario)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </Grid>
                        </Grid>
                        </div>
                    </MuiPickersUtilsProvider>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => this.setState({...this.state, dialogOpen: false})} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={() => this.submit()} color="primary">
                        Salvar Alterações
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
    
    setDescricao = (descricao) => {
        this.setState({...this.state, descricao});
    }
    setHoraInicio = (horaInicio) => {
        this.setState({...this.state, horaInicio});
    }
    setHoraFim = (horaFim) => {
        this.setState({...this.state, horaFim});
    }

    submit = () => {
        if(! this.props.sala.id || ! this.props.user.id || ! this.state.descricao || ! this.state.horaInicio || ! this.state.horaFim){
            return this.props.showErrorToast('Preencha todos os campos.', 3000);
        }
        AlocacaoSalaController.criar(this.props.token, this.props.sala.id, this.props.user.id, this.state.descricao, this.state.horaInicio, this.state.horaFim)
            .then(res => {
                console.log(res);
                if(res.status === 201){
                    res.json().then(response => {
                        this.props.showSuccessToast('Criado com sucesso.', 1800);
                        this.findAlocacoes();
                        this.setState({descricao: '', horaInicio: null, horaFim: null, dialogOpen: false});
                    });
                }
                else {
                    res.json().then(response => {
                        console.log(response);
                        this.props.showErrorToast('Erro ao criar alocação.', 1800);
                    });
                }
            },
            erro => console.log(erro));
    }

    render(){
        return(
            <Fragment style={{position: 'relative'}}>
                <Container id="container">
                    <div className='fab'>
                        <Fab color="primary" aria-label="add" href="javascript:void(0);" 
                            onClick={() => this.setState({...this.state, dialogOpen: true})}
                            >
                            <AddIcon/>
                        </Fab>
                    </div>
                    <Grid container xl={12} xs={12} spacing={2} style={{float: 'right'}}>
                        <Grid item xl={12} xs={12} id="date-picker-grid">
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
                                <KeyboardDatePicker variant='inline' disableToolbar disablePast format="dd/MM/yyyy" label="Data" onChange={this.dateChange}
                                    value={moment(this.props.data)} invalidDateMessage="Data inválida" minDateMessage="Data não pode ser anterior ao dia de hoje"
                                    inputVariant={'outlined'} error={this.state.error}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        {this.renderSalas()}
                    </Grid>
                    <this.dialogCreate/>
                </Container>
            </Fragment>
        );
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({setAlocacoes, setData, showSuccessToast, showErrorToast}, dispatch);
const mapStateToProps = state => ({user: state.user.user, alocacoes: state.temp.alocacoes.alocacoes, data: state.temp.alocacoes.data, token: state.user.token, sala: state.temp.salas.selecionada, users: state.organizacao.users});
export default connect(mapStateToProps, mapDispatchToProps)(Alocacoes);
