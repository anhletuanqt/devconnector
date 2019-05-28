import {
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_CURRENT_USER,
  LOG_OUT
} from '../actions/types';

const initialState = {
  isAuthenticate: false,
  user: null,
  errors: null,
  loginErrors: null
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        errors: null
      };
    case REGISTER_USER_FAIL:
      return { ...state, errors: payload.data };
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticate: true, user: payload, errors: null };
    case LOGIN_FAIL:
      return { ...state, loginErrors: payload.data, errors: null };
    case SET_CURRENT_USER:
      return { ...state, user: payload, isAuthenticate: true };
    case LOG_OUT:
      return { ...state, isAuthenticate: false, user: null, errors: null };
    default:
      return state;
  }
};

export default authReducer;
