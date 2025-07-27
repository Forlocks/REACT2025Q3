export interface Ship {
  uid: string;
  name: string;
  registry: string | null;
  status: string | null;
  dateStatus: string | null;
  spacecraftClass: NestedShipProperty | null;
  owner: NestedShipProperty | null;
  operator: NestedShipProperty | null;
}

interface NestedShipProperty {
  uid: string;
  name: string;
}
