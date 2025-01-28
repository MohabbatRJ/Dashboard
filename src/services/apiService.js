// src/services/apiService.js
import axios from 'axios';
// import { showNotification } from '../utils/notificationUtils';

export const fetchFromApi = async (url, title, requestAction, successAction, failureAction, showNotificationFlag = true, query) => {
  requestAction();

  const queryParams = new URLSearchParams(query).toString();
  const fullUrl = `${import.meta.env.VITE_APP_API_URL}/${url}?${queryParams}`;
  // console.log('fullUrl',fullUrl)
  try {
    const response = await axios.get(fullUrl);
    successAction(response.data);
    // console.log('successAction(response.data);', successAction(response.data))
    // const { status, message } = response.data.meta;
    if (showNotificationFlag) {
      // showNotification("Success", message, status);
    }
  } catch (error) {
    console.log('error',error)
    if (showNotificationFlag) {
      if (error.response) {
        // const { data } = error.response;
        // showNotification("Error", data, "danger");
      } else if (error.request) {
        // showNotification("Error", error.message, "danger");
      } else {
        // showNotification("Error", error.statusText, "danger");
      }
    }
    failureAction(error.message);
  }
};
