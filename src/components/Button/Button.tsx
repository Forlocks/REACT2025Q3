import { Component } from 'react';
import './Button.scss';

interface ButtonProps {
  children: React.ReactNode;
  onButtonClick: () => void;
}

export class Button extends Component<ButtonProps> {
  render() {
    return (
      <button className="button" onClick={this.props.onButtonClick}>
        {this.props.children}
      </button>
    );
  }
}
