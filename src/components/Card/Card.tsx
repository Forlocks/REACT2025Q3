import { Component } from 'react';
import './Card.scss';

interface CardProps {
  name: string;
  registry: string;
  status: string;
  dateStatus: string;
  class: string;
  owner: string;
  operator: string;
}

export class Card extends Component<CardProps> {
  render() {
    return (
      <div className="card">
        <div className="card__name">{this.props.name}</div>
        <div className="card__description">
          <div className="card__property">
            <span>Registry:</span>
            <span>{this.props.registry}</span>
          </div>
          <div className="card__property">
            <span>Status:</span>
            <span>{this.props.status}</span>
          </div>
          <div className="card__property">
            <span>Date status:</span>
            <span>{this.props.dateStatus}</span>
          </div>
          <div className="card__property">
            <span>Class:</span>
            <span>{this.props.class}</span>
          </div>
          <div className="card__property">
            <span>Owner:</span>
            <span>{this.props.owner}</span>
          </div>
          <div className="card__property">
            <span>Operator:</span>
            <span>{this.props.operator}</span>
          </div>
        </div>
      </div>
    );
  }
}
