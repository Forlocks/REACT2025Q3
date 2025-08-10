import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AboutPage } from './AboutPage';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('AboutPage', () => {
  it('renders description and avatar', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AboutPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/my name is Aleksey/i)).toBeInTheDocument();
    expect(screen.getByAltText('Avatar')).toBeInTheDocument();
    expect(screen.getByAltText('School logo')).toBeInTheDocument();
  });
});
