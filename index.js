import vi_VN from 'antd/lib/locale/vi_VN';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../src/store/store';
import  App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';




ReactDOM.render(
  <Provider store={store} locale={vi_VN}>
    <PersistGate loading={null} persistor={persistor} />
      <App />
  </Provider>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
