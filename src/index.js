import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App/App.jsx';
import './index.css';

const root = createRoot(document.getElementById('root'));

if (module.hot) module.hot.accept();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);