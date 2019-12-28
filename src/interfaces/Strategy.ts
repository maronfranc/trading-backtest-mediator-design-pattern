import { Ticker } from ".";

export interface Strategy {
  canHandle: (index: string, value: Ticker) => boolean;
  handle: (index: string, value: Ticker) => any;
}
