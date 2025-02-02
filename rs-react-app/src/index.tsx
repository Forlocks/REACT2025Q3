import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App/App';
import './index.scss';

const rootContainer = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootContainer).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
