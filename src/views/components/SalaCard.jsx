import React from 'react'
import styles from '../../style/js/card';
import { Button, Card, CardActionArea, CardMedia, CardContent, CardActions, Typography } from '@material-ui/core';

export default props => {
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
        <Card className={cardStyles.root}>
            <CardActionArea>
            <CardMedia
                className={cardStyles.media}
                image={props.urlImagem}
                title={props.nomeSala}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                {props.nomeSala}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {props.descricao}
                </Typography>
            </CardContent>
            </CardActionArea>
            <CardActions>
            <Button size="small" color="primary">
                Informações
            </Button>
            {isAdm()}
            </CardActions>
        </Card>
    )
}

