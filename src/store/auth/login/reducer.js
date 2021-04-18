import { LOGIN, LOGIN_SUCCESSFUL, LOGIN_ERROR, LOGOUT, LOGOUT_SUCCESSFUL } from "./actionTypes";

const initialState = {
    loading: null, isAuthenticated: false, errorMessage: null
}

const login = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            state = {
                ...state,
                isAuthenticated: true,
            }
            break;
        case LOGOUT:
            state = {
                ...state,
                loading: true,
            }
            break;
        case LOGIN_SUCCESSFUL:
            state = {
                ...state,
                isAuthenticated: true,
                loading: false,
                errorMessage: null
            }
            break;
        case LOGIN_ERROR:
            state = {
                ...state,
                isAuthenticated: false,
                loading: false,
                errorMessage: action.payload
            }
            break;
        case LOGOUT_SUCCESSFUL:
            state = {
                ...state,
                isAuthenticated: false,
                loading: false,
                errorMessage: null
            }
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}
export default login;