import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.js';
import store from './app/store.js';
import { Provider } from 'react-redux';

const root = createRoot(document.getElementById('root'));

if (module.hot) module.hot.accept();

root.render(
  <React.StrictMode>
  	<Provider store={store}>
  		<App />
  	</Provider>
  </React.StrictMode>
);