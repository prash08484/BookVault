// import React from 'react';
// import ReactDOM from 'react-dom/client';  
// import { Provider } from 'react-redux';
// import './index.css';
// import App from './App';
// import { store } from './redux/store/store.js';  

// const root = ReactDOM.createRoot(document.getElementById('root'));  

// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();