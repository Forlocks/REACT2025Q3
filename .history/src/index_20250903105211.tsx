import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ColumnsState } from './providers/ColumnsState';
import { MainPage } from './pages/MainPage/MainPage';
import './index.scss';

const rootContainer = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootContainer).render(
  <Suspense>
    <ColumnsState>
      <MainPage />
    </ColumnsState>
  </Suspense>
);
