import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Card, CardProps } from './Card';
import type { RootState } from '../../store';
import { baseApi } from '../../api/baseApi';
import * as reactRedux from 'react-redux';

const mockDispatch = vi.fn();
const mockSetSearchParams = vi.fn();

const baseApiInitialState = baseApi.reducer(undefined, { type: '' });

const mockState: RootState = {
  baseApi: baseApiInitialState,
  selectedCards: {
    selectedCards: [],
  },
};

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: (state: RootState) => unknown) => selector(mockState),
}));

vi.mock('react-router-dom', () => ({
  useSearchParams: () => [new URLSearchParams('foo=bar'), mockSetSearchParams],
}));

describe('Card component', () => {
  const cardProps: CardProps = {
    uid: '1',
    classId: 'class1',
    name: 'Test Ship',
    registry: 'Registry-1',
    status: 'Active',
    dateStatus: '2025-08-12',
    shipClass: 'Explorer',
    owner: 'Owner A',
    operator: 'Operator X',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders card info correctly', () => {
    render(<Card {...cardProps} />);
    expect(screen.getByText(cardProps.name)).toBeDefined();
    expect(screen.getByText(cardProps.registry)).toBeDefined();
    expect(screen.getByText(cardProps.status)).toBeDefined();
  });

  it('handleClick updates search params with classId', () => {
    render(<Card {...cardProps} />);
    fireEvent.click(screen.getByText(cardProps.name));
    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
    const newParams = mockSetSearchParams.mock.calls[0][0];
    expect(newParams.get('details')).toBe(cardProps.classId);
  });

  it('handleCheckboxClick dispatches addCard if not selected', () => {
    render(<Card {...cardProps} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'selectedCards/addCard',
      payload: cardProps,
    });
  });

  it('handleCheckboxClick dispatches removeCard if selected', () => {
    vi.spyOn(reactRedux, 'useSelector').mockImplementation((selector: (state: RootState) => unknown) =>
      selector({
        baseApi: baseApiInitialState,
        selectedCards: { selectedCards: [cardProps] },
      } as RootState)
    );

    render(<Card {...cardProps} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'selectedCards/removeCard',
      payload: cardProps.uid,
    });
  });
});
