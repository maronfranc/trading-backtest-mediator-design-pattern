import { ChartData } from "../../../../typescript/ChartData";
import SimpleMovingAverage from "../../indicators/SimpleMovingAverage";
import { ChartDataStrategy } from "../ChartDataStrategy";

class MAHandler extends ChartDataStrategy {
  public MAData = new SimpleMovingAverage(23);

  conditionTo = {
    buy: (value: ChartData) => value.close > this.MAData.indicator,
    sell: (value: ChartData) => value.close < this.MAData.indicator,
    takeProfit: (value: ChartData) => +value.high >= this.target,
    stopLimit: (value: ChartData) => +value.low <= this.stop
  };

  updateIndicators(data: ChartData) {
    this.MAData.pushData(data.close);
  }
}

export default new MAHandler();
