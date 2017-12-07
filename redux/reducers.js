import { combineReducers } from 'redux';
import LoginReducer from './modules/login.js';

export default combineReducers({
  login: LoginReducer
});
