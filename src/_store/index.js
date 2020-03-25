import { createStore, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';
import multi from 'redux-multi';
import reducers from './_reducers/reducers';

import { persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['ui', 'temp']
};

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const persistedReducer = persistReducer(persistConfig, reducers);
const store = applyMiddleware(thunk, multi)(createStore)(persistedReducer, devTools);
const persistor = persistStore(store);


export { store, persistor}