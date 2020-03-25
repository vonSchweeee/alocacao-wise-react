import userReducer from './userReducer';
import uiReducer from './uiReducer';
import { combineReducers} from 'redux';
import salaReducer from './temp/salaReducer';

const rootReducer = combineReducers({
    user: userReducer,
    ui: uiReducer,
    temp: salaReducer
});

export default rootReducer;