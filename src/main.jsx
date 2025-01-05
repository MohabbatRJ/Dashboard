import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {ReactNotifications} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

import store from './store/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      
    <ReactNotifications/>
        <App />
    </Provider>
  </React.StrictMode>
  ,
)
