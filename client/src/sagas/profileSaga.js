import { call, put } from 'redux-saga/effects';

import {
  getProfile,
  getAllProfile,
  registerProfile,
  addEducation,
  addExperience,
  deleteExperience,
  deleteEducation
} from '../services/api';

import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  GET_ALL_PROFILE_SUCCESS,
  GET_ALL_PROFILE_FAIL,
  REGISTER_PROFILE_SUCCESS,
  REGISTER_PROFILE_FAIL,
  ADD_EXPERIENCE_SUCCESS,
  ADD_EXPERIENCE_FAIL,
  ADD_EDUCATION_SUCCESS,
  ADD_EDUCATION_FAIL,
  DELETE_EXPERIENCE_SUCCESS,
  DELETE_EXPERIENCE_FAIL,
  DELETE_EDUCATION_SUCCESS,
  DELETE_EDUCATION_FAIL
} from '../redux/actions/types';

export function* handleGetProfile(action) {
  try {
    const res = yield call(getProfile, action.payload);
    yield put({
      type: GET_PROFILE_SUCCESS,
      payload: res
    });
  } catch (error) {
    yield put({
      type: GET_PROFILE_FAIL,
      payload: error
    });
  }
}

export function* handleGetAllProfile() {
  try {
    const res = yield call(getAllProfile);
    yield put({
      type: GET_ALL_PROFILE_SUCCESS,
      payload: res
    });
  } catch (error) {
    yield put({
      type: GET_ALL_PROFILE_FAIL,
      payload: error
    });
  }
}

export function* handleRegisterProfile(action) {
  try {
    const res = yield call(registerProfile, action.payload);
    action.history.push('/dashboard');
    yield put({
      type: REGISTER_PROFILE_SUCCESS,
      payload: res
    });
  } catch (error) {
    yield put({
      type: REGISTER_PROFILE_FAIL,
      payload: error
    });
  }
}

export function* handleAddExperience(action) {
  try {
    const res = yield call(addExperience, action.payload);
    action.history.push('/dashboard');
    yield put({
      type: ADD_EXPERIENCE_SUCCESS,
      payload: res
    });
  } catch (error) {
    yield put({
      type: ADD_EXPERIENCE_FAIL,
      payload: error
    });
  }
}

export function* handleAddEducation(action) {
  try {
    const res = yield call(addEducation, action.payload);
    action.history.push('/dashboard');
    yield put({
      type: ADD_EDUCATION_SUCCESS,
      payload: res
    });
  } catch (error) {
    yield put({
      type: ADD_EDUCATION_FAIL,
      payload: error
    });
  }
}

export function* handleDeleteExperience(action) {
  try {
    const res = yield call(deleteExperience, action.payload);
    yield put({
      type: DELETE_EXPERIENCE_SUCCESS,
      payload: res
    });
  } catch (error) {
    yield put({
      type: DELETE_EXPERIENCE_FAIL,
      payload: error
    });
  }
}

export function* handleDeleteEducation(action) {
  try {
    const res = yield call(deleteEducation, action.payload);
    yield put({
      type: DELETE_EDUCATION_SUCCESS,
      payload: res
    });
  } catch (error) {
    yield put({
      type: DELETE_EDUCATION_FAIL,
      payload: error
    });
  }
}
