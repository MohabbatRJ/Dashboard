import axios from "axios";
import { signupFailure, signupRequest, signupSuccess } from "../authAction";

export const signupUserAction = (userData) => {
    return async (dispatch) => {
  
      dispatch(signupRequest());
      try {
        const existingUsers = await axios.get(`${import.meta.env.VITE_APP_API_URL}/users`);
        const emailExists = await existingUsers.data.some(user => user.data.email === userData.data.email);

        if (emailExists) {
          throw new Error('Email already exists! Try another email');
        }
  
        const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/users`, userData);
        dispatch(signupSuccess(response.data));
      }
      catch (error) {
        dispatch(signupFailure(error.message));
      };
    };
  };