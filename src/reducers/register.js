const initialState = { 
    signup: {
        isLoading: false,
        form: {
            email: "",
            password: "",
            confirmPassword: "",
            confirmationCode: "",
        },
        newUser: null
    }
}

export const signUp = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGNUP/IS_LOADING':
            return {
                signup: {
                    ...signup,
                    isLoading: action.isLoading
                }
            }
        
        case 'SIGNUP/HANDLE_CHANGE':
            return {
                signup: {
                    ...signup,
                    form: action.form
                }
            }

        case 'SIGNUP/SIGNED_UP':
            return {
                signup: {
                    ...signup,
                    newUser: action.newUser
                }
            }
        
        default:
            return state;
    }
}
