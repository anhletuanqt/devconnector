import { call, put } from 'redux-saga/effects';

import {
  ADD_POST_SUCCESS,
  ADD_POST_FAIL,
  GET_ALL_POST_SUCCESS,
  GET_ALL_POST_FAIL,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAIL,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL
} from '../redux/actions/types';
import {
  addPost,
  getAllPost,
  deletePost,
  likePost,
  getPost,
  addComment
} from '../services/api';

export function* handleAddPost(action) {
  try {
    const res = yield call(addPost, action.payload);
    yield put({
      type: ADD_POST_SUCCESS,
      payload: res
    });
  } catch (error) {
    yield put({
      type: ADD_POST_FAIL,
      payload: error
    });
  }
}

export function* handleGetAllPost() {
  try {
    const res = yield call(getAllPost);
    yield put({
      type: GET_ALL_POST_SUCCESS,
      payload: res
    });
  } catch (error) {
    yield put({
      type: GET_ALL_POST_FAIL,
      payload: error
    });
  }
}

export function* handleDeletePost(action) {
  try {
    const res = yield call(deletePost, action.payload);
    yield put({
      type: DELETE_POST_SUCCESS,
      payload: res
    });
  } catch (error) {
    yield put({
      type: DELETE_POST_FAIL,
      payload: error
    });
  }
}

export function* handleLikePost(action) {
  try {
    const res = yield call(likePost, action.payload);
    yield put({
      type: LIKE_POST_SUCCESS,
      payload: res
    });
  } catch (error) {
    yield put({
      type: LIKE_POST_FAIL,
      payload: error
    });
  }
}

export function* handleGetPost(action) {
  try {
    const res = yield call(getPost, action.payload);
    yield put({
      type: GET_POST_SUCCESS,
      payload: res
    });
  } catch (error) {
    yield put({
      type: GET_POST_FAIL,
      payload: error
    });
  }
}

export function* handleAddComment(action) {
  try {
    const res = yield call(addComment, action.payload);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      payload: res
    });
  } catch (error) {
    yield put({
      type: ADD_COMMENT_FAIL,
      payload: error
    });
  }
}
