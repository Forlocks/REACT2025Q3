import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import { App } from './components/App/App';
import { PageProvider } from './providers/Page/PageProvider';
import './index.scss';

const rootContainer = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootContainer).render(
  <React.StrictMode>
    <BrowserRouter>
      <PageProvider>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </PageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
