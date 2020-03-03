import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme } from './constants';
import { Provider } from 'react-redux';
import store from '@redux';

ReactDOM.render((
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
), document.getElementById('root'));

// window.addEventListener('beforeunload', (e) => {
//   e.returnValue = 'Are you sure to exit? This may lose your changes.';
// });
