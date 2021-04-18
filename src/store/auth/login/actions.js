import { LOGIN, LOGOUT, LOGIN_ERROR, LOGIN_SUCCESSFUL, LOGOUT_SUCCESSFUL } from './actionTypes';


export const login = (email, password, history) => {
    return {
        type: LOGIN,
        payload: { email, password, history }
    }
}

export const logout = (history) => {
    console.log("test")
    return {
        type: LOGOUT,
        history: history
    }
}

export const loginSuccessful = () => {
    return {
        type: LOGIN_SUCCESSFUL
    }
}

export const logoutSuccessful = () => {
    return {
        type: LOGOUT_SUCCESSFUL
    }
}

export const loginError = (error) => {
    return {
        type: LOGIN_ERROR,
        payload: { error }
    }
}