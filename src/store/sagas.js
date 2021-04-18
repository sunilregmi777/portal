import { all } from "redux-saga/effects";

import { loginSaga, logoutSaga } from './auth/login/saga'
import { fetchDriverSaga, addDriverSaga ,deleteDriverSaga,updateDriverSaga} from './driver/saga'


export default function* rootSaga() {
    yield all([
        loginSaga(),logoutSaga(), fetchDriverSaga(), addDriverSaga(),deleteDriverSaga(),updateDriverSaga()
    ]);
}