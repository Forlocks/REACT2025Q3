import reducer, {
  addCard,
  removeCard,
  clearCards,
  selectAllSelectedCards,
} from './selectedCardsSlice';
import { CardProps } from '../components/Card/Card';

describe('selectedCardsSlice', () => {
  const card1: CardProps = {
    uid: '1',
    classId: undefined,
    name: 'One',
    registry: '',
    status: '',
    dateStatus: '',
    shipClass: '',
    owner: '',
    operator: ''
  };
  const card2: CardProps = {
    uid: '2',
    classId: undefined,
    name: 'Two',
    registry: '',
    status: '',
    dateStatus: '',
    shipClass: '',
    owner: '',
    operator: ''
  };

  const initialState = {
    selectedCards: [],
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should add a card if not already present', () => {
    const stateAfterAdd = reducer(initialState, addCard(card1));
    expect(stateAfterAdd.selectedCards).toHaveLength(1);
    expect(stateAfterAdd.selectedCards[0]).toEqual(card1);

    const stateAfterAddDuplicate = reducer(stateAfterAdd, addCard(card1));
    expect(stateAfterAddDuplicate.selectedCards).toHaveLength(1);
  });

  it('should remove a card by uid', () => {
    const stateWithCards = {
      selectedCards: [card1, card2],
    };

    const stateAfterRemove = reducer(stateWithCards, removeCard('1'));
    expect(stateAfterRemove.selectedCards).toHaveLength(1);
    expect(stateAfterRemove.selectedCards[0]).toEqual(card2);
  });

  it('should clear all cards', () => {
    const stateWithCards = {
      selectedCards: [card1, card2],
    };

    const stateAfterClear = reducer(stateWithCards, clearCards());
    expect(stateAfterClear.selectedCards).toHaveLength(0);
  });

  it('selector selectAllSelectedCards should return selectedCards array', () => {
    const state = {
      selectedCards: {
        selectedCards: [card1, card2],
      },
    };

    expect(selectAllSelectedCards(state)).toEqual([card1, card2]);
  });
});
