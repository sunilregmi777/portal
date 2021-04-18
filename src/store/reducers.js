import { combineReducers } from 'redux';

import login from './auth/login/reducer'
import driver from './driver/reducer'


const rootReducer = combineReducers({ login , driver});

export default rootReducer;