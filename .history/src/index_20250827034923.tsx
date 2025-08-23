import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from 'react-redux';
import { store } from './store';
import { ColorTheme } from './providers/ColorTheme';
import { MainPage } from './pages/MainPage/MainPage';
import './index.scss';

const rootContainer = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootContainer).render(
  <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:page/*" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
  </Provider>
);
