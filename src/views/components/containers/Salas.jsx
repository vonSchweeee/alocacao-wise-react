import React, { Fragment, Component} from 'react'
import SalaCard from './SalaCard';

import { connect} from 'react-redux';
import SalaController from '../../../controllers/SalaController';
import { bindActionCreators } from 'redux';
import {setSalas} from '../../../_store/_actions/salaActions';
import { Grid, Container} from '@material-ui/core';
import '../../../style/css/Salas.css'

class Salas extends Component{
    componentDidMount(){
        SalaController.findByOrgId(this.props.id_organizacao, this.props.token).then((res) => {
            res.json().then(salas => {
                this.props.setSalas(salas);
            });
        },
        (erro) => console.log(erro));
    }
    renderSalas(){
        if(this.props.salas){
            const salas = this.props.salas || [];
            if(salas.length){
                return salas.map(sala => {
                    return(
                        <Grid item xl={3} xs={12} className='grid-item'>
                            <SalaCard sala={sala} adm={false}/>
                        </Grid>
                    );
                });
            }
        }
    }
    render(){
        return(
            <Fragment>
                <Container>
                    <Grid container xl={12} xs={12} spacing={2}>
                        <Grid item xl={12} xs={12}>
                            <h1>Lista de Salas</h1>
                        </Grid>
                        {this.renderSalas()}
                    </Grid>
                </Container>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({setSalas}, dispatch);
const mapStateToProps = state => ({salas: state.temp.salas.lista, id_organizacao: state.user.id_organizacao, token: state.user.token});
export default connect(mapStateToProps, mapDispatchToProps)(Salas);