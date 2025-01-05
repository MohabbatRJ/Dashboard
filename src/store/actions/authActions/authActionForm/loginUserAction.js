import axios from "axios";
import { loginFailure, loginRequest, loginSuccess } from "../authAction";
import { showNotification } from "../../../../utils/notificationUtils";

export const loginUserAction = (userData, navigate) => {
    return async (dispatch) => {
      console.log('login')
      dispatch(loginRequest());
      
      try {
        const response = await axios.post(`${import.meta.env.VITE_APP_LOGIN_API_URL}/auth/login`, {
          username: userData.data.email,
          password: userData.data.password,
        });
  
        let { token, refreshToken, ...userDataFromServer } = response.data;
        userDataFromServer.remember = userData.data.remember;
        // localStorage.setItem('accessToken', token);
        // localStorage.setItem('refreshToken', refreshToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        document.cookie = `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Strict`;

        
        if (response.status === 200) {
          dispatch(loginSuccess(userDataFromServer)); 
          localStorage.setItem('isLoggedIn', 'true');
          showNotification("Success", "Logged in successfully!", "success");
          navigate(userData.data.from.pathname);
          if(userData.data.remember){
            localStorage.setItem('email', userData.data.email);
            localStorage.setItem('password', userData.data.password);
          }

        } else {
          throw new Error('Login failed'); 
        }
      }
      catch (error) {
        if (error.response) {
          dispatch(loginFailure('User error: ' + error.response.data.message));
          showNotification("User error", error.response.data.message, "danger");
        }
         else if (error.request) {
          dispatch(loginFailure('No response from server'));
          console.error('error.request', error.request);
          showNotification("Error", error.request, "danger");
        } else {
          console.error('error.message', error.message);
          dispatch(loginFailure('Request setup error: ' + error.message));
          showNotification("Error", error.message, "danger");
        }
      }
    };
  };