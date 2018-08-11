import { PubSub } from "aws-amplify";

export function isAuthenticated(bool) {
    return {
        type: 'IS_AUTHENTICATED',
        isAuthenticated: bool
    };
}

export function isAuthenticating(bool) {
    return {
        type: 'IS_AUTHENTICATING',
        isAuthenticating: bool
    };
}

export function authValidation(credentials) {
    return (dispatch) => {
        dispatch(isAuthenticating(true));

        PubSub.subscribe(`/redux/${PubSub._pluggables[0].clientId}/authValidated`).subscribe({
            next: (result) => {
                console.log('Auth validation received', result);
                dispatch(isAuthenticated(result.validation));
                dispatch(isAuthenticating(false));
            },
            error: error => {
                dispatch(isAuthenticated(false));
                dispatch(isAuthenticating(false));
            },
            close: () => console.log('Done'),
        })

        PubSub.publish('/redux/api/authValidation', {
            action: {
                type: 'AUTH_VALIDATION',
                credentials,
            },
            cid: PubSub._pluggables[0].clientId
        });
    }
}

