import ReactDOM from 'react-dom/client';
import { MainPage } from './pages/MainPage/MainPage';
import './index.scss';
import { Provider } from 'react-redux';

const rootContainer = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootContainer).render(
  <Provider store={store}>
    <MainPage />
  </Provider>
);
