import React, {Fragment, useEffect } from 'react';
import Navbar from './components/containers/Navbar';
import UsuarioController from '../controllers/UsuarioController';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorToast } from '../_store/_actions/toastActions';
import { logout } from '../_store/_actions/userActions';
import { useHistory } from 'react-router';
import Sidebar from './components/containers/Sidebar';
import Content from './components/Content';
import AppRoutes from '../routes/AppRoutes';

export default function App() {

  const [authenticated, setAuthenticated] = React.useState(false);
  const { token} = useSelector(
    state => state.user
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() =>{
    document.title = 'Wise Systems';
    // window.addEventListener("beforeunload", (e) => 
    //   {  
    //       e.preventDefault();
    //       dispatch(clear());
    //       return;
    //   });
    if(! authenticated){
      UsuarioController.verifyToken(token)
        .then((res) => {
          if(res.status !== 200){
            dispatch(showErrorToast('Sessão expirada!'));
            dispatch(logout());
            setTimeout(() => {
              history.push('/'); 
            }, 2501);
          }
          else{
            setAuthenticated(true);
          }
        },
        (erro) => {
          dispatch(showErrorToast('Erro.'))
        });
    }
  });

  return(
    <Fragment>
      <Navbar/>
      <Sidebar/>
      <Content>
        <AppRoutes/>
      </Content>
    </Fragment>
  );
};
