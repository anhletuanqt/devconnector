import * as _ from 'lodash';

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
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: false,
  errors: null
};

const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_POST_SUCCESS:
      return { ...state, posts: [...state.posts, payload.data], errors: null };
    case ADD_POST_FAIL:
      return { ...state, errors: payload.data };
    case GET_ALL_POST_SUCCESS:
      return { ...state, posts: payload.data };
    case GET_ALL_POST_FAIL:
      return { ...state, errors: payload.data };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload.data._id),
        errors: null
      };
    case DELETE_POST_FAIL:
      return { ...state, errors: payload.data };
    case LIKE_POST_SUCCESS:
      const index = _.findIndex(
        state.posts,
        post => post._id === payload.data._id
      );
      state.posts.splice(index, 1, payload.data);

      return { ...state, posts: state.posts, post: payload.data };
    case LIKE_POST_FAIL:
      return { ...state, errors: payload.data };
    case GET_POST_SUCCESS:
      return { ...state, post: payload.data };
    case GET_POST_FAIL:
      return { ...state, errors: payload.data };
    case ADD_COMMENT_SUCCESS:
      return { ...state, post: payload.data };
    case ADD_COMMENT_FAIL:
      return { ...state, errors: payload.data };
    default:
      return state;
  }
};

export default postReducer;
