import { combineReducers } from 'redux';
import { isAuthenticated, isAuthenticating } from './authenticate';
import { signUp } from './register';

export default combineReducers({
    isAuthenticated,
    isAuthenticating,
    signUp
});