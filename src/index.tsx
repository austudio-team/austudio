import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme } from './constants';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './redux/reducers';

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

(window as any).appStore = store;

ReactDOM.render((
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
), document.getElementById('root'));
