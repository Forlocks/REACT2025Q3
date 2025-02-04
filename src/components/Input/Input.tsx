import { ChangeEvent, Component } from 'react';
import './Input.scss';

interface InputProps {
  inputValue: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export class Input extends Component<InputProps> {
  handleEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.props.onSearch();
    }
  };

  render() {
    return (
      <input
        className="input"
        placeholder="Ship name"
        value={this.props.inputValue}
        onChange={this.props.onInputChange}
        onKeyDown={this.handleEnterKeyDown}
      />
    );
  }
}
