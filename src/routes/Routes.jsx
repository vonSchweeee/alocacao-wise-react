import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import App from '../views/App'
import Login from '../views/Login';
import Registro from '../views/Registro';

import PrivateRoute from './PrivateRoute';

export default props => (
    <BrowserRouter>
        <Switch>
            <Route path='/login' exact={true} component={Login}/>
            <Route path='/registro' exact={true} component={Registro}/>
            <PrivateRoute><App/></PrivateRoute>
        </Switch>
    </BrowserRouter>
)
