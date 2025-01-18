// store/reducers/index.js

import { combineReducers } from 'redux';
import authReducer from '../reducers/authReducers/authReducer'
import uiReducer from '../reducers/uiReducers/uiReducers';
import sidebarMenuReducer from './sidebarMenuReducers/sidebarMenuReducer';
import dashboardReducer from './dashboardReducers/dashboardReducers';
import recentOrdersReducer from './recentOrdersReducers/recentOrdersReducer';
import stockReportReducer from './stockReportReducers/stockReportReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  sidebarMenu: sidebarMenuReducer,
  dashboard: dashboardReducer,
  recentOrders: recentOrdersReducer,
  stockReport: stockReportReducer
  // other reducers...
});

export default rootReducer;
