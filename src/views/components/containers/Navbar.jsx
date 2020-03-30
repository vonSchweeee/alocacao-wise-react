import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import logoWise from '../../../img/logowise.png';
import '../../../style/css/navbar.css'
import { useHistory } from "react-router-dom";
import { logout } from '../../../_store/_actions/userActions';
import { useDispatch, useSelector } from "react-redux";
import { showSidebar, hideSidebar } from '../../../_store/_actions/sidebarActions';
import { clear } from '../../../_store/_actions/tempActions';

export default function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const history = useHistory();
    const dispatch = useDispatch();

    const { sidebarOpen } = useSelector(
      state => state.ui
    );


    const handleMenu = event => {
      setAnchorEl(event.currentTarget);
      console.log(anchorEl);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const sair = () => {
        history.push('/login');
        dispatch(logout());
        dispatch(clear());
    };

    const handleSidebar = () => {
      if(sidebarOpen){
        dispatch(hideSidebar());
      }
      else{
        dispatch(showSidebar());
      }
    };

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={handleSidebar} edge="start" color="inherit" aria-label="menu">
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