import axios from "axios";
import { logoutFailure, logoutRequest, logoutSuccess } from "../authAction";

export const logoutUserAction = (navigate, isLoggedIn) => {
  return async (dispatch) => {
    dispatch(logoutRequest());
    try {
    //   const accessToken = localStorage.getItem('accessToken');
    //   const refreshToken = localStorage.getItem('refreshToken');

    //   const response = await axios.post(`${import.meta.env.VITE_APP_LOGIN_API_URL}/auth/logout`, {
    //     accessToken,
    //     refreshToken,
    //   });
      if (isLoggedIn) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('isLoggedIn');
        // localStorage.removeItem('email');
        // localStorage.removeItem('password');
        dispatch(logoutSuccess());
        navigate('/'); 
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      if (error.response) {
        dispatch(logoutFailure('Server error: ' + error.response.data.message));
      } else if (error.request) {
        dispatch(logoutFailure('No response from server'));
      } else {
        dispatch(logoutFailure('Request setup error: ' + error.message));
      }
    }
  };
};
