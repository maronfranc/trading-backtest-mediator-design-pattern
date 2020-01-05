import { Strategy, Order } from "../../../../typescript";
import { ChartData } from "../../../../typescript/ChartData";
import SimpleMovingAverage from "../../indicators/SimpleMovingAverage";
import ExponentialMovingAverage from "../../indicators/ExponentialMovingAverage";
import { ChartDataStrategy } from "../ChartDataStrategy";

class MAxEMAHandler extends ChartDataStrategy {
  public MAData = new SimpleMovingAverage(23);
  public EMAData = new ExponentialMovingAverage(9);

  conditionTo = {
    buy: (value: ChartData) =>
      value.close > this.MAData.indicator &&
      value.close > this.EMAData.indicator,
    sell: (value: ChartData) =>
      value.close < this.MAData.indicator &&
      value.close < this.EMAData.indicator,
    takeProfit: (value: ChartData) => +value.high >= this.target,
    stopLimit: (value: ChartData) => +value.low <= this.stop
  };

  updateIndicators(value: ChartData) {
    this.MAData.pushData(value.close);
    this.EMAData.pushData(value.close);
  }
}

export default new MAxEMAHandler();
