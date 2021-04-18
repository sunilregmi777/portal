import { fork, put, all, call, takeEvery } from 'redux-saga/effects'

import { addDriverSuccessful, fetchDriverSuccessful ,fetchDriverFailed, addDriverFailed, deleteDriverSuccessful,
 deleteDriverFailed, updateDriverSuccessful, updateDriverFailed} from './actions';

import { ADD_DRIVER, FETCH_DRIVER, DELETE_DRIVER, DELETE_DRIVER_SUCCESSFUL,UPDATE_DRIVER, UPDATE_DRIVER_SUCCESSFUL  } from './actionTypes';
import API from '../../helpers/api';
import axios from 'axios';
import { useHistory } from "react-router-dom";


function* addDriver( {payload} ) {
    try {
        const data = yield call(API, "drivers", "post", payload.data);
            // yield put(addDriverSuccessful(data));
            payload.history.push('/driver-list');
        }
    catch (error) {
        yield put(addDriverFailed(error));
    }
}

export function* watchAddDriver() {
    yield takeEvery(ADD_DRIVER, addDriver);
}

export function* addDriverSaga() {
    yield all([fork(watchAddDriver)]);
}

function* fetchDriver() {
    try {
        const data = yield call(API, "drivers", "get");
            yield put(fetchDriverSuccessful(data));
    }
    catch (error) {
        console.log(error)
        yield put(fetchDriverFailed(error));
    }
}

export function* watchFetchDriver() {
    yield takeEvery(FETCH_DRIVER, fetchDriver);
}


export function* fetchDriverSaga() {
    yield all([fork(watchFetchDriver)]);
}

function* deleteDriver({type, payload}) {
    try {
        yield call(API, `drivers/${payload.id}`, "delete");
        yield put(deleteDriverSuccessful(payload.id, payload.drivers))
        }
    catch (error) {
        yield put(deleteDriverFailed(error));
    }
}

export function* watchDeleteDriver() {
    yield takeEvery(DELETE_DRIVER, deleteDriver);
}

export function* deleteDriverSaga() {
    yield all([fork(watchDeleteDriver)]);
}

function* updateDriver({type, payload}) {
    try {
        // yield call(API, `drivers/${payload.id}`, "delete");
        // yield put(updateDriverSuccessful(payload.id, payload.drivers))
        }
    catch (error) {
        yield put(updateDriverFailed(error));
    }
}

export function* watchUpdateDriver() {
    yield takeEvery(UPDATE_DRIVER, updateDriver);
}

export function* updateDriverSaga() {
    yield all([fork(watchUpdateDriver)]);
}
