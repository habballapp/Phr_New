import { combineReducers } from 'redux';
import DoctorsReducer from './DoctorsReducer';

export default combineReducers({
    doctors: DoctorsReducer
})