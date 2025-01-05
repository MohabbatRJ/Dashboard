// reducers/authReducer.js

import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE
} from '../../actions/authActions/authActionTypes';

const initialState = {
  loading: false,
  error: false,
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
  userData: {
      emial: '',
      password: '',
      remember: false,
  }
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        userData: action.payload,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isLoggedIn: true,
        userData: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        isLoggedIn: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isLoggedIn: false,
        userData: action.payload,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
