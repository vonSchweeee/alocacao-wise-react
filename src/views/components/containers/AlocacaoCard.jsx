import React, { Fragment} from 'react'
import styles from '../../../style/js/card';
import { Button, Card, CardActionArea, CardContent, CardActions, Typography, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Grid} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker} from '@material-ui/pickers';
import '../../../style/css/AlocacaoCard.css'
import {AccessTime, AccountCircle} from '@material-ui/icons';
import AlocacaoSalaController from '../../../controllers/AlocacaoSalaController';
import moment from 'moment';

function CardAlocacao(props){
    return (
        <Card className={props.cardStyles.root}>
                <CardActionArea onClick={() => {}}>
                    <CardContent onClick={() => {}}>
                        <Typography gutterBottom variant="h5" component="h2">
                        {props.alocacao.descricao}
                        </Typography>
                        <Grid container xl={12} sm={12} xs={12}>
                            <Grid item xs={1} sm={1} xl={1}>
                                <AccountCircle/>
                            </Grid>
                            <Grid item xs={3} sm={2} xl={3  }>
                                <Typography variant="body3" color="textSecondary" component="p">
                                    &nbsp; {props.usuario}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} xl={12} lg={12}/>
                            <Grid item xs={1} sm={1} xl={1}>
                                <AccessTime/>
                            </Grid>
                            <Grid item xs={6} sm={6} xl={6} lg={6}>
                                <Typography variant="body3" color="textSecondary" component="p">
                                    &nbsp; {`${moment(props.alocacao.data_hora_inicio).format('HH:mm')} - ${moment(props.alocacao.data_hora_fim).format('HH:mm')}`}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                
                <Button size="small" color="primary" onClick={() => props.setDialogOpen('edit')} >
                    editar
                </Button>
                {/* <Divider flexItem orientation='vertical'></Divider> */}
                <Button size="small" color="primary" onClick={() => props.setDialogOpen('remove')} >
                    remover
                </Button>
                {/* <Divider flexItem orientation='vertical'></Divider> */}
                {props.isAdm()}
                </CardActions>
            </Card>
    )
}
function DialogRemove(props){
    return(
        <Dialog open={props.dialogOpen === 'remove' ? true : false} onClose={() => props.setDialogOpen(false)} maxWidth='md'>
            <DialogTitle id="alert-dialog-title">{`Você tem certeza que deseja desagendar a alocação para ${props.alocacao.descricao}?`}</DialogTitle>
            <DialogActions>
                <Button onClick={() => props.desativarAlocacao(props.alocacao.id)} color="primary">
                    Sim
                </Button>
                <Button onClick={() => props.setDialogOpen(false)} color="primary" autoFocus>
                    Não
                </Button>
            </DialogActions>
        </Dialog>
    )
}

function DialogEdit(props){
    return(
        <Dialog open={props.dialogOpen === 'edit' ? true : false} onClose={() => props.setDialogOpen(false)}>
            <DialogTitle id="form-dialog-title">Editar</DialogTitle>
            <DialogContent>
                    <TextField
                        autoFocus margin="dense" id="descricao" label="Descrição" name="descricao"
                        value={typeof props.descricao === 'string' ? props.descricao : props.alocacao.descricao} onChange={e => props.setDescricao(e.target.value)} fullWidth
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
                                defaultValue={props.alocacao.data_hora_inicio}
                                value={props.horaInicio ? props.horaInicio : props.alocacao.data_hora_inicio}
                                onChange={horario => props.setHoraInicio(horario)}
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
                                defaultValue={props.alocacao.data_hora_fim}
                                value={props.horaFim ? props.horaFim : props.alocacao.data_hora_fim}
                                onChange={horario => props.setHoraFim(horario)}
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
                    <Button onClick={() => props.setDialogOpen(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={() => props.submitEdit(props.alocacao.id,
                    props.descricao ? props.descricao : props.alocacao.descricao,
                    props.horaInicio ? props.horaInicio : props.alocacao.data_hora_inicio, 
                    props.horaFim ? props.horaFim : props.alocacao.data_hora_fim)} color="primary">
                        Salvar Alterações
                    </Button>
                </DialogActions>
            </Dialog>
    )
}

export default props => {
    const [dialogOpen, setDialogOpen] = React.useState(false);


    function submitEdit(id, descricao, horaInicio, horaFim){
        if(descricao === props.alocacao.descricao && horaInicio === props.alocacao.data_hora_inicio && horaFim === props.alocacao.data_hora_fim){
            return props.showErrorToast('Nenhuma informação foi alterada.', 2000);
        }
        
        AlocacaoSalaController.alterar(props.token, id, descricao, horaInicio, horaFim)
            .then(res => {
                res.text().then(texto => console.log(texto));
                if(res.status === 200){
                    props.findAlocacoes();
                    props.showSuccessToast('Alocação alterada com sucesso!', 2500);
                    setDialogOpen(false);
                }
                else {
                    props.showErrorToast('Erro ao alterar a alocação!', 2500);
                }
            },
            erro => {
                setDialogOpen(false);
                props.showErrorToast('Erro.', 2500);
            });
    }

    function desativarAlocacao(id){
        AlocacaoSalaController.desativar(props.token, id)
            .then(res => {
                console.log(res);
                if(res.status === 200){
                    props.findAlocacoes();
                    props.showSuccessToast('Alocação desfeita com sucesso!', 2500);
                    setDialogOpen(false);
                }
                else{
                    props.showErrorToast('Erro ao desfazer a alocação!', 2500);
                }
            },
            erro => {
                setDialogOpen(false);
                props.showErrorToast('Erro.', 2500);
            });
    }

    function isAdm(){
        if(props.adm){
            return (
                <Button size="small" color="primary" >
                    Editar
                </Button>
            )
        }
        else{
            return;
        }
    }
    const cardStyles = styles();
    return(
        <Fragment>
            <CardAlocacao 
                cardStyles={cardStyles} isAdm={isAdm} isLogged={true} alocacao={props.alocacao} usuario={props.usuario}
                setDialogOpen={setDialogOpen}
            />
            <DialogEdit dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} alocacao={props.alocacao}
                setHoraFim={props.setHoraFim} setHoraInicio={props.setHoraInicio} horaInicio={props.horaInicio}
                horaFim={props.horaFim} token={props.token} descricao={props.descricao} setDescricao={props.setDescricao}
                submitEdit={submitEdit}
             />
            <DialogRemove 
                dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} alocacao={props.alocacao} token={props.token} desativarAlocacao={desativarAlocacao}
            />
        </Fragment>
    )
}

