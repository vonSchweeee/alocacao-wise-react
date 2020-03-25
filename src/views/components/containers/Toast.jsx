import React from 'react'

import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import { clearToast } from '../../../_store/_actions/toastActions';
import MuiAlert from '@material-ui/lab/Alert';

function Alert (props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Toast() {
  const dispatch = useDispatch();

  const { toastMessage, toastOpen, toastSeverity, toastAutoHide } = useSelector(
    state => state.ui.toast
  );

  function handleClose() {
    dispatch(clearToast());
  }

  return (
    <Snackbar open={toastOpen} autoHideDuration={toastAutoHide} 
      onClose={handleClose}>
        <Alert onClose={handleClose} severity={toastSeverity}>
            {toastMessage}
        </Alert>
    </Snackbar>
  );
}