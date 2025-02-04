import { Component, ChangeEvent } from 'react';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import './Form.scss';

interface FormProps {
  inputValue: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export class Form extends Component<FormProps> {
  render() {
    return (
      <div className="form">
        <Input
          inputValue={this.props.inputValue}
          onInputChange={this.props.onInputChange}
          onSearch={this.props.onSearch}
        />
        <Button onButtonClick={this.props.onSearch}>Search</Button>
      </div>
    );
  }
}
