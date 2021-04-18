import { ADD_DRIVER , ADD_DRIVER_SUCCESSFUL, ADD_DRIVER_FAILED, UPDATE_DRIVER,UPDATE_DRIVER_SUCCESSFUL,UPDATE_DRIVER_FAILED,
    FETCH_DRIVER, FETCH_DRIVER_SUCCESSFUL , FETCH_DRIVER_FAILED, DELETE_DRIVER, DELETE_DRIVER_FAILED, DELETE_DRIVER_SUCCESSFUL, EDIT_MODE} from './actionTypes';
import driver from './reducer';

export const addDriver = (data, history) => {
    return {
        type: ADD_DRIVER,
        payload: { data, history }
    }
}
export const addDriverSuccessful = (driver) => {
    return {
        type: ADD_DRIVER_SUCCESSFUL,
        payload:driver
    }
}

export const addDriverFailed= () => {
    return {
        type: ADD_DRIVER_FAILED
    }
}

export const fetchDriver= () => {
    return {
        type: FETCH_DRIVER
    }
}

export const fetchDriverSuccessful = (data) => {
    return {
        type: FETCH_DRIVER_SUCCESSFUL,
        data: data
    }
}

export const fetchDriverFailed= (error) => {
    return {
        type: FETCH_DRIVER_FAILED
    }
}

export const deleteDriver = (id, drivers) =>{
    return{
        type:DELETE_DRIVER,
        payload:{id, drivers}
    }
}

export const deleteDriverSuccessful = (id, drivers) => {
    return {
        type: DELETE_DRIVER_SUCCESSFUL,
        payload: {id, drivers}
    }
}

export const deleteDriverFailed= () => {
    return {
        type: DELETE_DRIVER_FAILED
    }
}

export const switchEditMode = () => {
    return {
        type: EDIT_MODE
    }
}

export const updateDriver = (id, drivers) =>{
    return{
        type:UPDATE_DRIVER,
        payload:{id, drivers}
    }
}

export const updateDriverSuccessful = (id, drivers) => {
    return {
        type: UPDATE_DRIVER_SUCCESSFUL,
        payload: {id, drivers}
    }
}

export const updateDriverFailed= () => {
    return {
        type: UPDATE_DRIVER_FAILED
    }
}