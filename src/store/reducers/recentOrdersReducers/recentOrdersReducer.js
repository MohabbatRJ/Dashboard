import { RECENT_ORDERS_FAILURE, RECENT_ORDERS_REQUEST, RECENT_ORDERS_SUCCESS } from "../../actions/recentOrdersAction/recentOrdersActionTypes"

const initialState = {
    loading: true,
    error: false,
    recentOrders: [],
    pagination: {
        first: 1,
        prev: 0,
        next: 2,
        last: 0,
        pages: 1,
        items: 0,
    }
};

const recentOrdersReducer = (state = initialState, action) => {
    const { payload } = action;
    const data = action.payload?.data;
    const pagination = {
        first: payload?.first,
        prev: action.payload?.prev,
        next: payload?.next,
        last: payload?.last,
        pages: payload?.pages,
        items: payload?.items,
    };
    switch (action.type) {
        case RECENT_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case RECENT_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                recentOrders: data || [],
                pagination: pagination || {}
            };
        case RECENT_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default recentOrdersReducer;
