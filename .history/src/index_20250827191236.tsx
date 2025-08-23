import ReactDOM from 'react-dom/client';
import { MainPage } from './pages/MainPage/MainPage';
import { Provider } from 'react-redux';
import { store } from './store';

const rootContainer = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootContainer).render(
  <Provider store={store}>
    <MainPage />
  </Provider>
);
