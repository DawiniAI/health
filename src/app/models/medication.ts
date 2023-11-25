export interface Medication {
  id: string;
  tradename: string;
  activeingredient: string;
  company: string;
  group: string;
  info: string;
  form: string;
  price: number;
  palette: string;
}

export type SearchableKeys =
| 'id'
  | 'tradename'
  | 'activeingredient'
  | 'company'
  | 'group'
  | 'info'
  | 'form'
  | 'price'
  | 'palette';
