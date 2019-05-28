import {
  REGISTER_PROFILE_SUCCESS,
  REGISTER_PROFILE_FAIL,
  REGISTER_PROFILE,
  RESET_PROFILE,
  GET_ALL_PROFILE_SUCCESS,
  GET_ALL_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  GET_ALL_PROFILE,
  ADD_EDUCATION_SUCCESS,
  ADD_EDUCATION_FAIL,
  ADD_EDUCATION,
  ADD_EXPERIENCE_SUCCESS,
  ADD_EXPERIENCE_FAIL,
  ADD_EXPERIENCE,
  DELETE_EXPERIENCE_SUCCESS,
  DELETE_EXPERIENCE_FAIL,
  DELETE_EDUCATION_SUCCESS,
  DELETE_EDUCATION_FAIL
} from '../actions/types';

const initialState = {
  loading: false,
  me: null,
  profiles: null,
  errors: null
};

const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_PROFILE:
      return { ...state, errors: null };
    case RESET_PROFILE:
      return { ...state, errors: null };
    case REGISTER_PROFILE_SUCCESS:
      return { ...state, errors: null };
    case REGISTER_PROFILE_FAIL:
      return { ...state, errors: payload.data };
    case GET_PROFILE_SUCCESS:
      return { ...state, errors: null, me: payload.data };
    case GET_PROFILE_FAIL:
      return { ...state, me: null, errors: payload.data };
    case GET_ALL_PROFILE:
      return { ...state, loading: true };
    case GET_ALL_PROFILE_SUCCESS:
      return { ...state, errors: null, profiles: payload.data, loading: false };
    case GET_ALL_PROFILE_FAIL:
      return { ...state, me: null, errors: payload.data, loading: false };
    // Add experience
    case ADD_EXPERIENCE:
    case ADD_EXPERIENCE_SUCCESS:
      return { ...state, errors: null };
    case ADD_EXPERIENCE_FAIL:
      return { ...state, errors: payload.data };
    // Add education
    case ADD_EDUCATION:
    case ADD_EDUCATION_SUCCESS:
      return { ...state, errors: null };
    case ADD_EDUCATION_FAIL:
      return { ...state, errors: payload.data };
    // Delete experience
    case DELETE_EXPERIENCE_SUCCESS:
      return { ...state, me: payload.data, errors: null };
    case DELETE_EXPERIENCE_FAIL:
      return { ...state, errors: payload.data };
    // Delete education
    case DELETE_EDUCATION_SUCCESS:
      return { ...state, me: payload.data, errors: null };
    case DELETE_EDUCATION_FAIL:
      return { ...state, errors: payload.data };
    default:
      return state;
  }
};

export default profileReducer;
