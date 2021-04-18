import { fork, put, all, call, takeEvery } from 'redux-saga/effects'

import { loginError, loginSuccessful, logoutSuccessful } from './actions';

import { LOGIN ,LOGOUT} from './actionTypes'

import loginData from '../../../assets/login-info.json'
import token from '../../../token'

function* login({ payload: { email, password, history } }) {
    try {
        //const response = yield call();

            localStorage.setItem("token", token);
            yield put(loginSuccessful());
            history.push("/dashboard");
        }
    catch (error) {
        yield put(loginError(error));
    }
}

export function* watchUserLogin() {
    yield takeEvery(LOGIN, login);
}

export function* loginSaga() {
    yield all([fork(watchUserLogin)]);
}

function* logout({ history:  history }) {
    console.log("i am here")
    //const response = yield call();
    localStorage.clear();
    yield put(logoutSuccessful());
    history.push("/login");
}

export function* watchUserLogout() {
    yield takeEvery(LOGOUT, logout);
}

export function* logoutSaga() {
    yield all([fork(watchUserLogout)]);
}