import React from 'react'

import { useDispatch, useSelector } from "react-redux";
import { hideSidebar } from '../../../_store/_actions/sidebarActions';
import { Drawer } from '@material-ui/core';

export default function Sidebar() {
  const dispatch = useDispatch();

  const { sidebarOpen } = useSelector(
    state => state.ui.sidebar
  );

  function handleClose() {
    dispatch(hideSidebar());
  }

  return (
    <Drawer anchor='left' open={sidebarOpen} onClose={handleClose}>
        &nbrsp; Teste
    </Drawer>
  );
}