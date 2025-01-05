// src/actions/recentOrdersFetch.js
import { recentOrdersFailure, recentOrdersRequest, recentOrdersSuccess } from '../recentOrdersAction';
import { fetchFromApi } from '../../../../services/apiService';

export const fetchRecentOrders = (query) => (dispatch) => {
    // console.log(query)
    fetchFromApi(
        'recentOrders',
        '',
        () => dispatch(recentOrdersRequest()),
        (data) => dispatch(recentOrdersSuccess(data)),
        (error) => dispatch(recentOrdersFailure(error)),
        false, // notification
        `_page=${query}`,
    );
};
