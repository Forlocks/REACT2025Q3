import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { MainPage } from './pages/MainPage/MainPage';
import './index.scss';

const rootContainer = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootContainer).render(
    <MainPage />
);
