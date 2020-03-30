import { combineReducers} from 'redux';
import salaReducer from './temp/salaReducer';
import alocacaoReducer from './temp/alocacaoReducer';

const tempReducer = combineReducers({
    salas: salaReducer,
    alocacoes: alocacaoReducer
});

export default tempReducer;