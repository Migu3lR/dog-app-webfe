import { PubSub, Auth } from "aws-amplify";
import { browserHistory } from 'react-router'
import { isAuthenticated } from "./authenticate";

export const isLoading = (bool) => ({
    type: 'SIGNUP/IS_LOADING',
    isLoading: bool
})

export const handleChange = (event) => ({
    type: 'SIGNUP/HANDLE_CHANGE',
    form: {
        [event.target.id]: event.target.value
    }
})

export const signedUp = (newUser) => ({
    type: 'SIGNUP/SIGNED_UP',
    newUser
})

export function handleSignup(credentials) {
    return (dispatch) => {
        dispatch(isLoading(true));
        
        PubSub.subscribe(`/redux/${PubSub._pluggables[0].clientId}/SignUp/signedup`).subscribe({
            next: (result) => {
                console.log('Sign Up received', result);
                dispatch(signedUp(result.value));
                dispatch(isLoading(false));
            },
            error: error => {
                dispatch(signedUp(null));
                dispatch(isLoading(false));
            },
            close: () => console.log('Done signedUp'),
        })

        PubSub.publish('/redux/api/signUp', {
            action: {
                type: 'SIGN_UP',
                credentials,
            },
            cid: PubSub._pluggables[0].clientId
        });
    }
}

export async function handleConfirmation(credentials) {
    return (dispatch) => {
        dispatch(isLoading(true));
        
        PubSub.subscribe(`/redux/${PubSub._pluggables[0].clientId}/SignUp/confirmed`).subscribe({
            next: (result) => {
                console.log('Confirmation received', result);
                await Auth.signIn(credentials.email, credentials.password);
                dispatch(isAuthenticated(true))
                dispatch(isLoading(false));
                browserHistory.push("/");
            },
            error: error => {
                alert(error);
                dispatch(isLoading(false));
            },
            close: () => console.log('Done Confirmation'),
        })

        PubSub.publish('/redux/api/signUp/confirm', {
            action: {
                type: 'SIGNUP_CONFIRM',
                credentials,
            },
            cid: PubSub._pluggables[0].clientId
        });
    }
}


export function errorSignup() {
    return (dispatch) => {
        dispatch(isAuthenticated(false));
        dispatch(isAuthenticating(false));
    }
}
