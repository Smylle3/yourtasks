import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'
import App from 'App';
import { GlobalStyle } from 'globalStyles';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root')
);