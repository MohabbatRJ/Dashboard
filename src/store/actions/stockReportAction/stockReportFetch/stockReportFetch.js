// src/actions/stockReportFetch.js
import { stockReportFailure, stockReportRequest, stockReportSuccess } from '../stockReportAction';
import { fetchFromApi } from '../../../../services/apiService';

export const fetchStockReport = (query) => (dispatch) => {
    // console.log(query)
    fetchFromApi(
        'stocks',
        '',
        () => dispatch(stockReportRequest()),
        (data) => dispatch(stockReportSuccess(data)),
        (error) => dispatch(stockReportFailure(error)),
        false, // notification
        `_page=${query}`,
    );
};
