import { ChangeEvent, Component } from 'react';
import { Form } from '../Form/Form';
import { Button } from '../Button/Button';
import { ErrorStatus } from '../ErrorBoundary/ErrorBoundary';
import './Header.scss';

interface HeaderProps {
  inputValue: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export class Header extends Component<HeaderProps> {
  state: ErrorStatus = { hasError: false };

  handleError = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Custom error');
    }

    return (
      <div className="header">
        <div className="header__title">Star Trek Ships</div>
        <div className="header__right-bar">
          <Form
            inputValue={this.props.inputValue}
            onInputChange={this.props.onInputChange}
            onSearch={this.props.onSearch}
          />
          <Button onButtonClick={this.handleError}>Get error</Button>
        </div>
      </div>
    );
  }
}
