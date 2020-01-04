import { ChartData } from "../../../../typescript/ChartData";
import ExponentialMovingAverage from "../../indicators/ExponentialMovingAverage";
import { ChartDataStrategy } from "./ChartDataStrategy";

class EMAcrossHandler extends ChartDataStrategy {
  public EMA20 = new ExponentialMovingAverage(20);
  public EMA50 = new ExponentialMovingAverage(50);

  conditionTo = {
    buy: () => this.EMA20.indicator > this.EMA50.indicator,
    sell: () => this.EMA20.indicator < this.EMA50.indicator,
    takeProfit: (value: ChartData) => +value.high >= this.target,
    stopLimit: (value: ChartData) => +value.low <= this.stop
  };
}

export default new EMAcrossHandler();
