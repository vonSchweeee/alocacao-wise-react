import React, {Fragment } from 'react';
import Navbar from './components/Navbar';
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom";
import UsuarioController from '../controllers/UsuarioController';

export default function App() {

  const [tokenVerif, setTokenVerif] = React.useState(false);
  const history = useHistory();

  React.useEffect(() =>{
    document.title = 'Home'
    const cookies = new Cookies();
    const token = cookies.get('token');
    if(token && ! tokenVerif) {
        UsuarioController.verifyToken(token)
        .then(res => { 
            if(res.status === 200){
                history.push('/');
                setTokenVerif(true);
            }
            else if (res.status === 401) {
                cookies.remove('token');
                history.push('/login');
            }
        });
        
    }
  });

  return(
    <Fragment>
      <Navbar/>
    </Fragment>
  );
};
