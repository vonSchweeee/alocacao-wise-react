import React, {Fragment, useEffect, Component} from 'react';
import {Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography} from '@material-ui/core';
import loginStyles from '../style/js/login';
import Cookies from 'universal-cookie';
import UsuarioController from '../controllers/UsuarioController';
import { useHistory } from "react-router-dom";
import { useDispatch, connect} from 'react-redux';
import { showSuccessToast, showErrorToast } from '../_store/_actions/toastActions';
import { setUser, setToken } from '../_store/_actions/userActions';
import Copyright from './components/Copyright';
import setUsers from '../_store/_actions/organizacaoActions';


const FormLogin = props => {
    const {email, senha} = props;
    return (
        <Grid container component="main" className={props.loginStyles.root}>
            <CssBaseline />
            <Grid item xs={false} sm={false} md={8} className={props.loginStyles.image} />
                <Grid item xs={12} sm={12} md={4} component={Paper} elevation={6} square>
                    <div className={props.loginStyles.paper}>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <form name="login" className={props.loginStyles.form} id="form-login">
                        <TextField ref={props.txtEmail} error={ props.txtErro === '' || props.txtErro === 'Senha incorreta.' || props.txtErro === 'Senha não pode ser vazia.'
                        ? false : true } helperText={props.txtErro === 'Senha incorreta.' || props.txtErro === 'Senha não pode ser vazia.' ? '' : props.txtErro} variant="outlined" margin="normal" fullWidth id="inputEmail"  label="Email"
                        name="email" autoComplete="email" autoFocus value={email} onChange={props.onTextChange} />
                        <TextField ref={props.txtSenha} error={ props.txtErro === '' || props.txtErro === 'Usuário não encontrado.' || props.txtErro === 'E-mail não pode ser vazio.'
                        ? false : true } helperText={props.txtErro === 'Usuário não encontrado.' || props.txtErro === 'E-mail não pode ser vazio.' || props.txtErro === 'Digite um endereço de e-mail válido.'
                        ? '' : props.txtErro} variant="outlined" margin="normal" fullWidth id="inputSenha" name="senha" label="Senha"
                        type="password" autoComplete="senha" value={senha} onChange={props.onTextChange} />
                        <FormControlLabel control={<Checkbox onClick={props.rememberme} value="remember" color="primary" />} label="Lembre-se de mim"/>
                        <Button type="button" fullWidth variant="contained"
                        color="primary" className={props.loginStyles.submit} onClick={props.submitForm}> 
                            Entrar
                        </Button>
                        <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                            Esqueceu a senha?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/registro" variant="body2">
                            {"Não tem uma conta? Cadastre-se."}
                            </Link>
                        </Grid>
                        </Grid>
                        <Box mt={5}>
                        <Copyright/>
                        </Box>
                    </form>
                    </div>
                </Grid>
            </Grid>
    );
}

function Login() {
    const loginStyle = loginStyles();
    //Form login
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');

    const history = useHistory();
    //Campos de texto
    const [txtErro, setTxtErro] = React.useState('')
    //Usuario usou lembre-se de mim
    const [session, setSession] = React.useState(false);

    const dispatch = useDispatch();

    //Alterar o nome da página
    useEffect(() =>{
        document.title = 'Login'
    });

    //Adicionar ao state o email e a senha
    const onTextChange = event => {
        const {name, value} = event.target;
        
        setTxtErro('');

        if(name === 'email'){
            setEmail(value);
        }
        else if (name === 'senha'){
            setSenha(value);
        }
    }
    

    const rememberMe = () => {
        if(session)
            setSession(false);
        else
            setSession(true);
    }

    //Evento de submissão do formulário
    const submitForm = () => {
        if(email === '' && senha === '') {
            setTxtErro("Os campos não podem ser vazios.");
            document.querySelector('#inputEmail').focus();
        }
        else if(email === '') {
            setTxtErro("E-mail não pode ser vazio.");
            document.querySelector('#inputEmail').focus();
        }
        else if(senha === '') {
            setTxtErro("Senha não pode ser vazia.");
            document.querySelector('#inputSenha').focus();
        }
        /* eslint-disable */
        else if(! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        /* eslint-disable */
            setTxtErro("Digite um endereço de e-mail válido.");
            document.querySelector('#inputEmail').focus();
        }
        else {
            UsuarioController.login(JSON.stringify({email, senha}))
                .then((result) => {
                    if(result) {
                        if (result.status === 401) {    
                            dispatch(showErrorToast('Senha incorreta.'));
                            setSenha('');
                            setTxtErro("Senha incorreta.");
                            document.querySelector('#inputSenha').focus();
                        }
                        if (result.status === 500 || result.status === 404) {
                            dispatch(showErrorToast('Usuario não encontrado!'));
                            setEmail('');
                            setSenha('');
                            setTxtErro("Usuário não encontrado.")
                            document.querySelector('#inputEmail').focus();
                        }
                        else {
                            result.json().then(resultado => {
                                if(result.status === 200) {
                                    console.log(result);
                                    const cookies = new Cookies();
                                    cookies.set('token', 'Bearer ' + resultado.token, { path: '/' });
                                    const userData = atob(resultado.token.split('.')[1]);
                                    const userDataObj = JSON.parse(userData);
                                    dispatch(setUser(userDataObj));
                                    dispatch(setToken(resultado.token));
                                    dispatch(showSuccessToast('Autenticado com sucesso!'));
                                    setTimeout(() => { 
                                        history.push('/'); 
                                    }, 1001);
                                    UsuarioController.findByOrgId(userDataObj.id_organizacao, resultado.token)
                                        .then(res => res.json()
                                        .then(usuarios => dispatch(setUsers(usuarios))));
                                }
                            });
                        }
                    }
                },
                (erro) => {
                    dispatch(showErrorToast('Erro.'));
                    document.querySelector('#inputEmail').focus();
                });
        }
    }

    return(
        <Fragment>
            <FormLogin loginStyles={loginStyle} submitForm={submitForm} email={email}
            senha={senha} onTextChange={onTextChange} txtErro={txtErro} rememberme={rememberMe}/>
        </Fragment>
    );
};

class LoginScreen extends Component {
    componentWillMount(){
        const { history } = this.props;
        if (this.props.token){
            history.push('/');
        }
    }
    render(){
        return(
            <Login/>
        )
    }
}

const mapStateToProps = state => ({token: state.user.token});

export default connect(mapStateToProps)(LoginScreen);