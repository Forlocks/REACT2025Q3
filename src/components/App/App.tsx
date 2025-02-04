import { ChangeEvent, Component } from 'react';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { Header } from '../Header/Header';
import { CardsContainer } from '../CardsContainer/CardsContainer';
import { getShips } from '../../controllers/getShips';
import { Ship } from '../../models/Ship';
import './App.scss';
import spinner from '../../assets/images/spinner.webp';

interface StateApp {
  inputValue: string;
  ships: Ship[] | null;
  isLoading: boolean;
}

export class App extends Component {
  state: StateApp = {
    inputValue: '',
    ships: [],
    isLoading: false,
  };

  componentDidMount = async () => {
    const lastRequest = localStorage.getItem('STS last request') || '';

    this.setState(
      {
        inputValue: lastRequest,
        ships: [],
        isLoading: false,
      },
      () => {
        this.handleSearch();
      }
    );
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: event.target.value,
      ships: this.state.ships,
      isLoading: this.state.isLoading,
    });
  };

  handleSearch = async () => {
    this.setState({
      inputValue: this.state.inputValue,
      ships: this.state.ships,
      isLoading: true,
    });

    const shipResults = await getShips(this.state.inputValue.trim());

    this.setState({
      inputValue: this.state.inputValue,
      ships: shipResults,
      isLoading: false,
    });
  };

  render() {
    let content;

    if (this.state.ships === null) {
      content = (
        <div className="app__error-message">
          An error has occurred
          <br />
          Check your network connection, you may need a VPN.
        </div>
      );
    } else if (this.state.isLoading) {
      content = (
        <div className="app__spinner">
          <img src={spinner} />
        </div>
      );
    } else if (this.state.ships.length) {
      content = <CardsContainer ships={this.state.ships} />;
    } else {
      content = <div className="app__error-message">No results found</div>;
    }

    return (
      <ErrorBoundary>
        <div className="app">
          <Header
            inputValue={this.state.inputValue}
            onInputChange={this.handleInputChange}
            onSearch={this.handleSearch}
          />
          {content}
        </div>
      </ErrorBoundary>
    );
  }
}
