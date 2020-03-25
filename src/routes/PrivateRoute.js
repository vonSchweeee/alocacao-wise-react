import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({children, ...rest}) => {
    const { token} = useSelector(
        state => state.user
    );

    function hasToken(token){
        if(token){
            return true;
        }
        else{
            return false;
        }
    } 
    console.log(rest);
    return (
        <Route {...rest}
        render={({ location }) =>
            hasToken(token) === true ? (children) :
            <Redirect to={{pathname: "/login", state: { from: location }}}/>
        }
        />
    );
}
export default PrivateRoute;