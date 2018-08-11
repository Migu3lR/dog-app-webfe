import { combineReducers } from 'redux';
import { isAuthenticated, isAuthenticating } from './authenticate';

export default combineReducers({
    isAuthenticated,
    isAuthenticating
});