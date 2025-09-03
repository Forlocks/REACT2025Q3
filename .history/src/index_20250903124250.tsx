import { Suspense, Profiler } from 'react';
import ReactDOM from 'react-dom/client';
import { ColumnsState } from './providers/ColumnsState';
import { MainPage } from './pages/MainPage/MainPage';
import './index.scss';
import spinner from './assets/images/spinner.webp';

const rootContainer = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootContainer).render(
  <Profiler id="CountriesList" onRender={onRender}>
    <Suspense fallback={<div className="spinner"><img src={spinner} alt="Loading spinner" /></div>}>
      <ColumnsState>
        <MainPage />
      </ColumnsState>
    </Suspense>
  </Profiler>
);
