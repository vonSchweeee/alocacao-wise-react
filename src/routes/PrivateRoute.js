import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({children, ...rest}) => {

    console.log(rest);
    return (
        <Route {...rest}
        render={({ location }) =>
            rest.hasToken() === true ? (children) :
            <Redirect to={{pathname: "/login", state: { from: location }}}/>
        }
        />
    );
}
export default PrivateRoute;