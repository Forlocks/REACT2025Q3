export interface ShipClass {
  numberOfDecks: string,
  warpCapable: string,
  alternateReality: string,
  activeFrom: string,
  activeTo: string,
  species: nestedProperty,
  affiliation: nestedProperty,
}

interface nestedProperty {
  name: string;
}
