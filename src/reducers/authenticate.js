export function isAuthenticated(state = false, action) {
    switch (action.type) {
        case 'IS_AUTHENTICATED':
            return action.isAuthenticated;
        
        default:
            return state;
    }
}

export function isAuthenticating(state = true, action) {
    switch (action.type) {
        case 'IS_AUTHENTICATING':
            return action.isAuthenticating;
        
        default:
            return state;
    }
}