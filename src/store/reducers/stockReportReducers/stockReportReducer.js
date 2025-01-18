import { STOCK_REPORT_FAILURE, STOCK_REPORT_REQUEST, STOCK_REPORT_SUCCESS } from "../../actions/stockReportAction/stockReportActionTypes"

const initialState = {
    loading: true,
    error: false,
    stockReport: [],
    pagination: {
        first: 1,
        prev: 0,
        next: 2,
        last: 0,
        pages: 1,
        items: 0,
    }
};

const stockReportReducer = (state = initialState, action) => {
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
        case STOCK_REPORT_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case STOCK_REPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                stockReport: data || [],
                pagination: pagination || {}
            };
        case STOCK_REPORT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default stockReportReducer;
