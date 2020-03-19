import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import logoWise from '../../img/logowise.png';
import '../../style/css/navbar.css'
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom";

export default function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const history = useHistory();
  

    const handleMenu = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const sair = () => {
        const cookies = new Cookies();
        cookies.remove('token');
        history.push('/login');
    };

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <img id="logo" src={logoWise} alt="logo"/>
                <IconButton
                  id="acct-circle"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle/>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Perfil</MenuItem>
                  <MenuItem onClick={sair}>Sair</MenuItem>
                </Menu>
          </Toolbar>
        </AppBar>
      </div>
    );
  }