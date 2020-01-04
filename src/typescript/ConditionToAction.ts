export interface ConditionToAction<DataType> {
  buy: (value: DataType) => boolean;
  sell: (value: DataType) => boolean;
  takeProfit: (value: DataType) => boolean;
  stopLimit: (value: DataType) => boolean;
}

export type actionTypes =
  | "BUY"
  | "SELL"
  | "TAKE_PROFIT"
  | "STOP_LIMIT"
  | "NONE";
