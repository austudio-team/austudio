import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme } from './constants';
import { Provider } from 'react-redux';
import store from '@redux';
import { initKeyEvent } from '@utils/keyevent';

initKeyEvent();

ReactDOM.render((
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
), document.getElementById('root'));

window.addEventListener('contextmenu', e => {
  e.preventDefault();
});

// window.addEventListener('beforeunload', (e) => {
//   e.returnValue = 'Are you sure to exit? This may lose your changes.';
// });
