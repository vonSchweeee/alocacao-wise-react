import React from 'react';
import ReactDOM from 'react-dom';
import './style/css/index.css';
import App from './views/App'
import Login from './views/Login';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import Cookies from 'universal-cookie';
import Registro from './views/Registro';

function hasToken(){
    const cookies = new Cookies();
    const token = cookies.get('token');
    if(token) {
        return true;
    }
    else {
        return false;
    }
} 

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path='/login' exact={true} component={Login}/>
            <Route path='/registro' exact={true} component={Registro}/>
            <PrivateRoute hasToken={hasToken}><App/></PrivateRoute>
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
