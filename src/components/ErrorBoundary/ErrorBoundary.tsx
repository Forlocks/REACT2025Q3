import { Component, ReactNode } from 'react';
import './ErrorBoundary.scss';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorStatus {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state: ErrorStatus = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-message">
          Error in the system operation
          <div>
            Please try&nbsp;
            <a className="error-message__link" href={window.location.href}>
              reload
            </a>
            &nbsp;this page or change page in URL
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
