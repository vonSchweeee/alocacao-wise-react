import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Salas from '../views/components/containers/Salas';
import Alocacoes from '../views/components/containers/Alocacoes';

export default props => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact={true} component={Salas}/>
                <Route path='/alocacoes' exact={true} component={Alocacoes}/>
            </Switch>
        </BrowserRouter>
    )
}
