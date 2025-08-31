import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ColumnsState } from './providers/ColumnsState';
import { MainPage } from './pages/MainPage/MainPage';
import './index.scss';
import './MainPage.scss';

const rootContainer = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootContainer).render(
  <Suspense fallback={<div className="spinner">
          <img src={spinner} alt="Loading spinner" />
        </div>}>
    <ColumnsState>
      <MainPage />
    </ColumnsState>
  </Suspense>
);
