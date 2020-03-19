import React from 'react';
import { AppBar, Toolbar} from '@material-ui/core';
import logoWise from '../../img/logowise.png';
import '../../css/App.css'

const Header = () => {
    return(
        <AppBar position="sticky">
            <Toolbar id={"toolbar"}>
                <img src={logoWise} alt="logo"/>
            </Toolbar>
        </AppBar>
    );
}

export default Header;