import ReactDOM from 'react-dom/client';
import Col
import { MainPage } from './pages/MainPage/MainPage';
import './index.scss';

const rootContainer = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootContainer).render(
  <ColumnsState>
    <MainPage />
  </ColumnsState>
);
