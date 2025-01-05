import { RECENT_ORDERS_FAILURE, RECENT_ORDERS_REQUEST, RECENT_ORDERS_SUCCESS } from "./recentOrdersActionTypes";


export const recentOrdersRequest = () => ({
    type: RECENT_ORDERS_REQUEST,
});

export const recentOrdersSuccess = (recentOrders) => ({
    type: RECENT_ORDERS_SUCCESS,
    payload: recentOrders,
});

export const recentOrdersFailure = (error) => ({
    type: RECENT_ORDERS_FAILURE,
    payload: error,
});