import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import { Component } from 'react';

describe('ErrorBoundary Component', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child-component">Test Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('child-component')).toBeInTheDocument();
    expect(
      screen.queryByText('Error in the system operation')
    ).not.toBeInTheDocument();
  });

  it('displays error message when child component throws', () => {
    const ErrorThrowingComponent = () => {
      throw new Error('Test Error');
    };

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByText('Error in the system operation')
    ).toBeInTheDocument();
    expect(screen.getByText(/Please try/)).toBeInTheDocument();
    expect(screen.getByText(/reload/)).toBeInTheDocument();
    expect(screen.getByText(/this page/)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveClass('error-message__link');
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      window.location.href
    );
  });

  it('updates state when error occurs', () => {
    class TestComponent extends Component {
      componentDidMount() {
        throw new Error('Test Error');
      }
      render() {
        return null;
      }
    }

    const wrapper = render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );

    expect(
      wrapper.container.querySelector('.error-message')
    ).toBeInTheDocument();
  });
});
