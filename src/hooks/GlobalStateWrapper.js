import React from 'react';

const defaultGlobalState = {
    acceptedCookie: false
};
const [globalState, setGlobalState] = React.useState(defaultGlobalState);

export {globalState, setGlobalState};
  