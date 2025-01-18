import { STOCK_REPORT_FAILURE, STOCK_REPORT_REQUEST, STOCK_REPORT_SUCCESS } from "./stockReportActionTypes";


export const stockReportRequest = () => ({
    type: STOCK_REPORT_REQUEST,
});

export const stockReportSuccess = (stockReport) => ({
    type: STOCK_REPORT_SUCCESS,
    payload: stockReport,
});

export const stockReportFailure = (error) => ({
    type: STOCK_REPORT_FAILURE,
    payload: error,
});