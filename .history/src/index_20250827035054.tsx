import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { MainPage } from './pages/MainPage/MainPage';
import './index.scss';

const rootContainer = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootContainer).render(
  <Provider store={store}>
    
  </Provider>
);
