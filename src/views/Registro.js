import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import BusinessIcon from '@material-ui/icons/Business';
import Typography from '@material-ui/core/Typography';
import { makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import OrganizacaoController from '../controllers/OrganizacaoController';
import { MenuItem } from '@material-ui/core';
import UsuarioController from '../controllers/UsuarioController';
import Usuario from '../models/Usuario';
import { useHistory } from "react-router-dom";
import { useDispatch, connect } from 'react-redux';
import { showSuccessToast } from '../_store/_actions/toastActions';
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

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loading:{
    display: 'inline',
    float: 'right'
  }
}));

function Registro() {
    const classes = useStyles();
    const history = useHistory();

    //Valores dos campos do registro
    const [email, setEmail] = React.useState('');
    const [nome, setNome] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [senhaConfirm, setSenhaConfirm] = React.useState('');
    //Select de organizações
    const [organizacoes, setOrganizacoes] = React.useState([]);
    //Valor de organização que vai ser usado para o submit
    const [organizacao, setOrganizacao] = React.useState('');
    //Ativação e desativação do select de Organizações
    const [selectDisabled, setSelectDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    //Validação do formulário
    const [emailValido, setEmailValido] = React.useState(false);
    const [organizacaoValida, setOrganizacaoValida] = React.useState(false);
    const [nomeValido, setNomeValido] = React.useState(false);
    const [senhaValida, setSenhaValida] = React.useState(false);
    const [senhaConfirmada, setSenhaConfirmada] = React.useState(false);

    const [helperEmail, setHelperEmail] = React.useState('');
    const [helperSenha, setHelperSenha] = React.useState('');
    const [helperConfirmSenha, setHelperConfirmSenha] = React.useState('');
    const [helperOrganizacao, setHelperOrganizacao] = React.useState('Escolha sua organização.');
    const [helperNome, setHelperNome] = React.useState('');

    const [btnDesativado, setBtnDesativado] = React.useState(false);

    const dispatch = useDispatch();

    const onTextChange = event => {
        const {name, value} = event.target;

        if(name === 'email'){
            setEmail(value);
        }
        else if (name === 'senha'){
            setSenha(value);
        }
        else if (name === 'nome'){
            setNome(value);
        }
        else if (name === 'senhaConfirm'){
            setSenhaConfirm(value);
        }
    }

    //Realizar solicitação de buscar organizações pelo domínio do email
    React.useEffect(() => {
        /* eslint-disable */
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        /* eslint-disable */
            setTimeout(function () {
                const dominio = email.split('@')[1];
                setLoading(true);
                OrganizacaoController.findOrgByDominio(dominio)
                .then((res => res.json().then(organizacoes => {
                    if(organizacoes.length){
                        setLoading(false);
                        setOrganizacoes(organizacoes);
                        setHelperOrganizacao('Escolha sua organização.');
                        setSelectDisabled(false);
                        const slOrg = document.querySelector('#outlined-select');
                        slOrg.focus();
                    }
                    else{
                        setSelectDisabled(true);
                        setLoading(false);
                    }
                })), (erro => {
                    console.log(erro);
                }));
            }, 1200);
        }
        else{
            setOrganizacoes([]);
            setSelectDisabled(true);
        }
    }, [email, setOrganizacoes, history]
    );
    //Validar campos
    React.useEffect(() => {
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
            setEmailValido(true);
        else
            setEmailValido(false);

        if(organizacao !== '')
            setOrganizacaoValida(true);
        else
            setOrganizacaoValida(false);

        if(nome.length >= 3)
            setNomeValido(true);
        else
            setNomeValido(false);

        if(senha.length >= 5)
            setSenhaValida(true);
        else
            setSenhaValida(false);

        if(senhaConfirm === senha)
            setSenhaConfirmada(true);
        else
            setSenhaConfirmada(false);


    }, [nome, email, organizacao, senha, senhaConfirm]
    );
    
    const organizacaoEscolhida = event => {
        setOrganizacao(event.target.value);
        console.log(event.target.value);
      };

    const submitForm = () => {
        setBtnDesativado(true);
        if(validarCampos()){
            UsuarioController.registro(new Usuario(organizacao.id, nome, email, senha))
            .then(
                (res) =>{
                    if(res.status === 201){
                        dispatch(showSuccessToast('Usuário cadastrado com sucesso!'));
                        setTimeout(() => { 
                            history.push('/login'); 
                        }, 1001);
                    }
                    else {
                        
                    }
                },
                (erro) => {
                    console.log(erro);
                }
            )
        }
    };

    const validarCampos = () => {
        //Checa se os campos estão vázios, depois se estão dentro dos padrões
        //e caso a variável 'validado' permaneça true até o fim, irá prosseguir
        //com o registro.
        var validado = true;


        if(email === ''){
            setHelperEmail('E-mail não pode ser vazio.');
            validado = false;
        }
        if(nome === ''){
            setHelperNome('Nome não pode ser vazio.');
            validado = false;
        }
        if(senha === ''){
            setHelperSenha('Senha não pode ser vazia');
            validado = false;
        }

        if(! emailValido && email !== '') {
            setHelperEmail('E-mail inválido!');
            validado = false;
        }
        if(! nomeValido && nome !== '') {
            setHelperNome('Nome precisa ter no mínimo 3 caracteres.');
            validado = false;
        }
        if(! senhaValida && senha !== '') {
            setHelperSenha('Senha precisa ter no mínimo 5 caracteres.');
            validado = false;
        }
        if(! organizacaoValida) {
            setHelperOrganizacao('Por favor escolha uma organização.');
            validado = false;
        }
        if(! senhaConfirmada && senhaValida) {
            setHelperConfirmSenha('As senhas não coincidem.');
            validado = false;
        }
        if(validado === false){
            return false;
        }
        return true;
    }

    return(
        <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <BusinessIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Registro
            </Typography>
            <form className={classes.form} noValidate>
            <Grid container spacing={0} className={classes.loading}>
                {loading && <LinearProgress variant="query" disabled />}
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={onTextChange}
                    helperText={helperEmail}
                    error={! emailValido && helperEmail ? true : false}
                    autoFocus
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="outlined-select"
                        select
                        fullWidth
                        disabled={selectDisabled}
                        label="Organização"
                        value={organizacao.nome}
                        onChange={organizacaoEscolhida}
                        helperText={helperOrganizacao}
                        variant="outlined"
                        error={! organizacaoValida && helperOrganizacao !== 'Escolha sua organização.' ? true : false}
                    >
                    {organizacoes.map(option => (
                        <MenuItem key={option.nome} value={option}>
                          {option.nome}
                        </MenuItem>
                      ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                <TextField
                    autoComplete="nome"
                    name="nome"
                    variant="outlined"
                    required
                    fullWidth
                    type="name"
                    id="nome"
                    label="Nome"
                    value={nome}
                    onChange={onTextChange}
                    helperText={helperNome}
                    error={! nomeValido && helperNome}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="senha"
                    label="Senha"
                    type="password"
                    id="senha"
                    autoComplete="senha"
                    value={senha}
                    onChange={onTextChange}
                    helperText={helperSenha}
                    error={! senhaValida && helperNome ? true : false}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="senhaConfirm"
                    label="Confirme sua senha"
                    type="password"
                    id="senha"
                    value={senhaConfirm}
                    onChange={onTextChange}
                    helperText={helperConfirmSenha}
                    error={senhaValida && ! senhaConfirmada ? true : false}
                />
                </Grid>
            </Grid>
            <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={submitForm}
                disabled={btnDesativado}
            >
                Cadastrar-se
            </Button>
            <Grid container justify="flex-end">
                <Grid item>
                <Typography variant="body2" style={{display: 'inline'}}>
                    Já possui uma conta?
                </Typography>
                <Link href="/login" variant="body2">
                    &nbsp; Entrar.
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        <Box mt={5}>
            
        </Box>
        </Container>
    );
}

class RegisterScreen extends Component {
    componentWillMount(){
        const { history } = this.props;
        if (this.props.token){
            history.push('/');
        }
    }
    render(){
        return(
            <Registro/>
        )
    }
}

const mapStateToProps = state => ({token: state.user.token});

export default connect(mapStateToProps)(RegisterScreen);