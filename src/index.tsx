import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import { App } from './components/App/App';
import { NotFoundError } from './components/NotFoundError/NotFoundError';
import './index.scss';

const rootContainer = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootContainer).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:page" element={<App />} />
        <Route path="*" element={<NotFoundError />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
