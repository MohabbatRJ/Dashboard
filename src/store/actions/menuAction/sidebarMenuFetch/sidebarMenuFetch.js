// src/actions/sidebarMenuFetch.js
import { sidebarMenuFailure, sidebarMenuRequest, sidebarMenuSuccess } from '../sidebarMenuAction';
import { fetchFromApi } from '../../../../services/apiService';

export const fetchSidebarMenu = () => (dispatch) => {
  fetchFromApi(
    'sidebarMenu',
    'Sidebar Menu',
    () => dispatch(sidebarMenuRequest()),
    (data) => dispatch(sidebarMenuSuccess(data)),
    (error) => dispatch(sidebarMenuFailure(error)),
    false // notification
  );
};
