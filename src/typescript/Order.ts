export interface Order {
  pair: string;
  price: number;
  buy: boolean;
  sell: boolean;
  takeProfit?: boolean;
  stopLimit?: boolean;
  error?: string;
}
