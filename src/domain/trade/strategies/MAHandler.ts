import { Strategy } from "../../../typescript";
import { ChartData } from "../../../typescript/ChartData";
import SimpleMovingAverage from "../indicators/SimpleMovingAverage";

class MAHandler implements Strategy<ChartData> {
  public MAData = new SimpleMovingAverage(23);
  public canHandle(chartData: ChartData): boolean {
    this.MAData.push(chartData.close);
    return chartData.close > this.MAData.indicator;
  }

  public handle(index: string, chartData: ChartData): any {
    return {
      pair: index,
      order: `Price closed above MA: Buy ${index}!`
    };
  }
}

export default new MAHandler();
