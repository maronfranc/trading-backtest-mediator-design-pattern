import { TickerStrategy } from "../TickerStrategy";

import { TickerData } from "../../../../typescript/TickerData";

class PercentHandler extends TickerStrategy {
  conditionTo = {
    buy: (value: TickerData) => +value.percentChange < +"-0.02",
    sell: (value: TickerData) => +value.percentChange > +"0.02",
    takeProfit: (value: TickerData) => +value.highestBid >= this.target,
    stopLimit: (value: TickerData) => +value.lowestAsk <= this.stop
  };
}
export default new PercentHandler();
