import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import { ColorTheme } from './providers/ColorTheme';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { MainPage } from './pages/MainPage/MainPage';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import './index.scss';

const rootContainer = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootContainer).render(
    <ErrorBoundary>
      <ColorTheme>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/:page/*" element={<MainPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ColorTheme>
    </ErrorBoundary>
);
