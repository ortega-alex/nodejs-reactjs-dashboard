import { combineReducers } from 'redux';
import _usuario from './user.reducers';
import _indicador from './indicador.reducers';

export default combineReducers({
    _usuario,
    _indicador
});