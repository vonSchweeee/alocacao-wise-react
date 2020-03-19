import React, {Fragment, useEffect} from 'react';
import {Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography, Snackbar} from '@material-ui/core';
import loginStyles from '../style/js/login';
import Cookies from 'universal-cookie';
import UsuarioController from '../controllers/UsuarioController';
import { useHistory } from "react-router-dom";
import MuiAlert from '@material-ui/lab/Alert';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

function Alert (props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Toast (props) {
    return(
        <Snackbar open={props.open} autoHideDuration={props.autoHide} onClose={props.toastClose}>
            <Alert onClose={props.toastClose} severity={props.severity}>
                {props.message}
            </Alert>
        </Snackbar>
    )
}


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
                        <Toast open={props.toast.open} autoHide={props.toast.autoHide} toastClose={props.toastClose} 
                        severity={props.toast.severity} message={props.toast.message} />
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
                        {/* <Copyright />*/}
                        </Box>
                    </form>
                    </div>
                </Grid>
            </Grid>
    );
}

export default function Login () {
    const loginStyle = loginStyles();
    //Form login
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [autenticado, setAutenticado] = React.useState(false);
    //Toast
    const [open, setOpen] = React.useState(false);
    const [autoHide, setAutohide] = React.useState(1500);
    const [severity, setSeverity] = React.useState('error');
    const [message, setMessage] = React.useState('error');
    const history = useHistory();
    //Campos de texto
    const [txtErro, setTxtErro] = React.useState('')
    //Usuario usou lembre-se de mim
    const [session, setSession] = React.useState(false);

    const [sessaoVerif, setSessaoVerif] = React.useState(false);

    //Alterar o nome da página
    useEffect(() =>{
        document.title = 'Login'
        const cookies = new Cookies();
        const token = cookies.get('token');
        if(token && email==='' && ! sessaoVerif) {
            setSessaoVerif(true);
            UsuarioController.verifyToken(token)
            .then(res => { 
                if(res.status === 200)
                    history.push('/');
                else if (res.status === 401) {
                    cookies.remove('token');
                }
            });
            
        }
    }, [email, sessaoVerif, history]
    );

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
        else if(! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            setTxtErro("Digite um endereço de e-mail válido.");
            document.querySelector('#inputEmail').focus();
        }
        else {
            UsuarioController.login(JSON.stringify({email, senha}))
                .then((result) => {
                    if(result) {
                        result.json().then(resultado => {
                            console.log(resultado);
                            console.log(result);
                            if(result.status === 200) {
                                const cookies = new Cookies();
                                cookies.set('token', 'Bearer ' + resultado.token, { path: '/' });
                                setOpen(true);
                                setMessage('Autenticado, seja bem-vindo!');
                                setAutohide('1000');
                                setSeverity('success');
                                setAutenticado(true);
                            }
                            else if (result.status === 400) {    
                                setOpen(true);
                                setMessage('Senha incorreta!');
                                setAutohide('2000');
                                setSeverity('error');
                                setSenha('');
                                setTxtErro("Senha incorreta.")
                                setAutenticado(false);
                                document.querySelector('#inputSenha').focus();
                            }
                            else if (result.status === 500 || result.status === 404) {
                                setOpen(true);
                                setMessage('Usuario não encontrado!');
                                setAutohide('2000');
                                setSeverity('error');
                                setEmail('');
                                setSenha('');
                                setTxtErro("Usuário não encontrado.")
                                setAutenticado(false);
                                document.querySelector('#inputEmail').focus();
                            }
                        });
                    }
                },
                (erro) => {
                    setOpen(true);
                    setAutenticado(false);
                    setMessage('Erro.');
                    setAutohide('2000');
                    setSeverity('error');
                    setEmail('');
                    setSenha('');
                });
        }
    }

    //Função para lidar com o evento de fechar do Toast
    const toastClose = () => {
        if(autenticado) {
            history.push('/');
        }
        setOpen(false);
    };

    return(
        <Fragment>
            <FormLogin loginStyles={loginStyle} toast={{open, autoHide, severity, message}} toastClose={toastClose} submitForm={submitForm} email={email}
            senha={senha} onTextChange={onTextChange} txtErro={txtErro} rememberme={rememberMe}/>
        </Fragment>
    );
};