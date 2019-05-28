import { put, call } from 'redux-saga/effects';
import jwt_decode from 'jwt-decode';

import { setAuthToken } from '../utils';
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../redux/actions/types';

import { registerUser, userLogin } from '../services/api';

export function* handleRegisterUser(action) {
  try {
    const response = yield call(registerUser, action.payload);
    action.history.push('/login');
    yield put({
      type: REGISTER_USER_SUCCESS,
      payload: response
    });
  } catch (error) {
    yield put({ type: REGISTER_USER_FAIL, payload: error });
  }
}

export function* handleUserLogin(action) {
  try {
    const response = yield call(userLogin, action.payload);

    const token = response.data.token;
    localStorage.setItem('token', token);
    setAuthToken(token);
    yield put({ type: LOGIN_SUCCESS, payload: jwt_decode(token) });
  } catch (error) {
    yield put({ type: LOGIN_FAIL, payload: error });
  }
}
