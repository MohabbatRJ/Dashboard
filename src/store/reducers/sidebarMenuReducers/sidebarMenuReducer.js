// reducers/sidebarMenuReducer.js

import {
    SIDEBAR_MENU_FAILURE,
    SIDEBAR_MENU_REQUEST,
    SIDEBAR_MENU_SUCCESS
} from '../../actions/menuAction/sidebarMenuActionTypes';

const initialState = {
    loading: false,
    error: false,
    sidebarMenus:[],
    menuFetched: false,
};

const sidebarMenuReducer = (state = initialState, action) => {
    const data = action.payload;
    switch (action.type) {
        case SIDEBAR_MENU_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case SIDEBAR_MENU_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                sidebarMenus: data || [],
                menuFetched: true,
            };
        case SIDEBAR_MENU_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                menuFetched: false, 
            };
        default:
            return state;
    }
};

export default sidebarMenuReducer;
