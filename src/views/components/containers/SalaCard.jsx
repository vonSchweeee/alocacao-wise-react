import React, { Fragment } from 'react'
import styles from '../../../style/js/card';
import { Button, Card, CardActionArea, CardMedia, CardContent, CardActions, Typography, Popover, Dialog} from '@material-ui/core';
import Moment from 'moment';
import { useDispatch } from 'react-redux';
import {setData} from '../../../_store/_actions/alocacaoActions';
import {useHistory} from 'react-router-dom';
import { setSala } from '../../../_store/_actions/salaActions';

function CardSalas(props){
    return (
        <Card className={props.cardStyles.root}>
                <CardActionArea onClick={() => props.findAlocacoes()}>
                <CardMedia
                    className={props.cardStyles.media}
                    image={props.sala.url_imagem}
                    title={props.sala.nome}
                />
                <CardContent onClick={() => props.findAlocacoes()}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {props.sala.nome}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {/* {Possível descrição} */}
                    </Typography>
                </CardContent>
                </CardActionArea>
                <CardActions>
                
                <Button size="small" color="primary" onClick={() => props.setDialogOpen(true)} >
                <Typography
                aria-owns={props.puOpen ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={props.openPopUp}
                onMouseLeave={props.closePopUp}
                >
                Informações
                </Typography>
                <Popover
                        id="mouse-over-popover"
                        className={props.cardStyles.popover}
                        classes={{
                        paper: props.cardStyles.paper,
                        }}
                        open={props.puOpen}
                        anchorEl={props.anchorEl}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                        onClose={props.closePopUp}
                        disableRestoreFocus
                    >
                    <Typography>
                    {'Quantidade de lugares disponíveis: ' + props.sala_lugares_disponíveis} 
                    </Typography>
                </Popover>
                </Button>
                {props.isAdm()}
                </CardActions>
            </Card>
    )
}

export default props => {
    const [puOpen, setPuOpen] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const openPopUp = event => {
        setAnchorEl(event.target);
        setPuOpen(true);
    }
    const closePopUp = () => {
        setAnchorEl(null);
        setPuOpen(false);
    }


    function findAlocacoes(){
        const data = Moment().format('YYYY-MM-DD');
        dispatch(setSala(props.sala));
        dispatch(setData(data));
        history.push('/alocacoes');
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
            <CardSalas puOpen={puOpen} openPopUp={openPopUp} closePopUp={closePopUp} cardStyles={cardStyles} anchorEl={anchorEl} isAdm={isAdm} sala={props.sala}
                findAlocacoes={findAlocacoes} setDialogOpen={setDialogOpen}
            />
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>

            </Dialog>
        </Fragment>
    )
}

