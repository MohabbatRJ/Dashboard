import { DASHBOARD_METRICS_FAILURE, DASHBOARD_METRICS_REQUEST, DASHBOARD_METRICS_SUCCESS } from "./dashboardActionTypes";


export const dashboardMetricsRequest = () => ({
    type: DASHBOARD_METRICS_REQUEST,
});

export const dashboardMetricsSuccess = (metrics) => ({
    type: DASHBOARD_METRICS_SUCCESS,
    payload: metrics,
});

export const dashboardMetricsFailure = (error) => ({
    type: DASHBOARD_METRICS_FAILURE,
    payload: error,
});