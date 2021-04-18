import { ADD_DRIVER, ADD_DRIVER_SUCCESSFUL, ADD_DRIVER_FAILED, FETCH_DRIVER, FETCH_DRIVER_SUCCESSFUL, DELETE_DRIVER_SUCCESSFUL,
    FETCH_DRIVER_FAILED, DELETE_DRIVER, UPDATE_DRIVER, UPDATE_DRIVER_SUCCESSFUL, EDIT_MODE } from "./actionTypes";

const initialState = {
    loading: null, errorMessage: null, drivers:null, editMode:false
}

const driver = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DRIVER:
            state = {
                ...state,
                loading:true,
                isAuthenticated: true,
            }
            break;
        case ADD_DRIVER_SUCCESSFUL:
            state = {
                ...state,
                loading: false,
                errorMessage: null,
                // drivers:action.data
            }
            break;
        case ADD_DRIVER_FAILED:
            state = {
                ...state,
                loading: false,
                errorMessage: null
            }
            break;
        case FETCH_DRIVER:
            state = {
                ...state,
                loading: true,
                errorMessage: null
            }
            break;
        case FETCH_DRIVER_SUCCESSFUL:
            state = {
                ...state,
                loading: false,
                errorMessage: null,
                drivers:action.data
            }
            break;
        case FETCH_DRIVER_FAILED:
            state = {
                ...state,
                loading: false,
                errorMessage: null
            }
            break;
        case DELETE_DRIVER_SUCCESSFUL:
            state = {
                loading: false,
                errorMessage: null,
                drivers: action.payload.drivers.filter((item) => item.id != action.payload.id)
            }
            break;
        case DELETE_DRIVER:
            state = {
                ...state,
                loading: false,
                errorMessage: null,
                drivers:action.data
            }
            break;
        case EDIT_MODE:
            state = {
                ...state,
                loading: false,
                errorMessage: null,
                editMode:!state.editMode
            }
            break;
        
        case UPDATE_DRIVER:
            state = {
                ...state,
                loading: false,
                errorMessage: null,
                drivers:action.data
            }
            break;
        case UPDATE_DRIVER_SUCCESSFUL:
            state = {
                loading: false,
                errorMessage: null,
                drivers: action.payload.drivers.filter((item) => item.id != action.payload.id)
            }
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}
export default driver;