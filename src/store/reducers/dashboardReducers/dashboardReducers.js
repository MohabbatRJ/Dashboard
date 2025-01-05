import { DASHBOARD_METRICS_FAILURE, DASHBOARD_METRICS_REQUEST, DASHBOARD_METRICS_SUCCESS } from "../../actions/dashboardActions/dashboardActionTypes";

const initialState = {
    loading: false,
    error: false,
    metrics: {
        summaryMetrics: [],
        topSalesMetrics:{},
        salesByCountry: [],
        topSellingProducts: [],
        monthlyRevenue: [],
    },
};

const dashboardReducer = (state = initialState, action) => {
    const data = action.payload;
    switch (action.type) {
        case DASHBOARD_METRICS_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case DASHBOARD_METRICS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                metrics: {
                    summaryMetrics: data.summaryMetrics || [],
                    topSalesMetrics: data.topSalesMetrics || {},
                    salesByCountry: data.salesByCountry || [],
                    topSellingProducts: data.topSellingProducts || [],
                    monthlyRevenue: data.monthlyRevenue || []
                }
            };
        case DASHBOARD_METRICS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default dashboardReducer;
