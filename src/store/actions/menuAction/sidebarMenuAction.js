// actions/sidebarMenuActioin.js

import {
  SIDEBAR_MENU_FAILURE,
  SIDEBAR_MENU_REQUEST,
  SIDEBAR_MENU_SUCCESS
} from "./sidebarMenuActionTypes";

export const sidebarMenuRequest = () => ({
  type: SIDEBAR_MENU_REQUEST,
});

export const sidebarMenuSuccess = (sidebarMenu) => ({
  type: SIDEBAR_MENU_SUCCESS,
  payload: sidebarMenu,
});

export const sidebarMenuFailure = (error) => ({
  type: SIDEBAR_MENU_FAILURE,
  payload: error,
});



