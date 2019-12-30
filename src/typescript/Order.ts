export interface Order {
  pair: string;
  order: { buy?: boolean; sell?: boolean };
}
