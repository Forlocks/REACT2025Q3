import { Ship } from '../models/Ship';

export const mockShips: Ship[] = [
  {
    uid: '1',
    name: 'Enterprise',
    registry: 'NCC-1701',
    status: 'active',
    dateStatus: '2023-01-01',
    spacecraftClass: { uid: 'class1', name: 'Constitution' },
    owner: { uid: 'owner1', name: 'Starfleet' },
    operator: { uid: 'operator1', name: 'Starfleet' },
  },
];

export const mockShipResults = {
  spacecrafts: mockShips,
  totalPages: 5,
};

export const mockShipClass = {
  spacecraftClass: {
    numberOfDecks: '<p>15</p>',
    warpCapable: '<p>Yes</p>',
    alternateReality: '<p>No</p>',
    activeFrom: '<p>2285</p>',
    activeTo: '<p>2293</p>',
    species: { name: '<p>Human</p>' },
    affiliation: { name: '<p>Starfleet</p>' },
  }
};

export const mockSearchParams = {
  get: vi.fn(),
  delete: vi.fn(),
  append: vi.fn(),
  getAll: vi.fn(),
  has: vi.fn(),
  set: vi.fn(),
  sort: vi.fn(),
  toString: vi.fn(),
  entries: vi.fn(),
  keys: vi.fn(),
  values: vi.fn(),
  forEach: vi.fn(),
  size: 0,
  [Symbol.iterator]: function() {
    const params = new Map<string, string>([]);
    return params[Symbol.iterator]();
  },
};

export const setSearchParamsMock = vi.fn();

export const unknownShipClassResponse = {
  spacecraftClass: {
    numberOfDecks: null,
    warpCapable: undefined,
    alternateReality: '',
    activeFrom: '<p></p>',
    activeTo: null,
    species: null,
    affiliation: { name: null },
  }
};
