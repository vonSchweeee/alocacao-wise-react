import { makeStyles } from '@material-ui/core/styles';

const loginStyles = makeStyles(theme => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://i.imgur.com/XKsQaRN.png)',
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'black',
      backgroundSize: '26% 33%',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      paddingTop: '10%',
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default loginStyles;