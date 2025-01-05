// src/actions/dashboardMetricsfetch.js
import { dashboardMetricsFailure, dashboardMetricsRequest, dashboardMetricsSuccess } from '../dashboardAction';
import { fetchFromApi } from '../../../../services/apiService';

export const fetchDashboardMetrics = () => (dispatch) => {
    fetchFromApi(
        'dashboardMetrics',
        'Dashboard Total Metrics',
        () => dispatch(dashboardMetricsRequest()),
        (data) => dispatch(dashboardMetricsSuccess(data)),
        (error) => dispatch(dashboardMetricsFailure(error)),
        true // notification
    );
};
