import userReducer from './userReducer';
import uiReducer from './uiReducer';
import { combineReducers} from 'redux';
import tempReducer from './tempReducer';
import organizacaoReducer from './temp/organizacaoReducer';

const rootReducer = combineReducers({
    user: userReducer,
    ui: uiReducer,
    organizacao: organizacaoReducer,
    temp: tempReducer
});

export default rootReducer;