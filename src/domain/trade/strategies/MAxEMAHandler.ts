import { Strategy } from "../../../typescript";
import { ChartData } from "../../../typescript/ChartData";
import SimpleMovingAverage from "../indicators/SimpleMovingAverage";
import ExponentialMovingAverage from "../indicators/ExponentialMovingAverage";

class MAxEMAHandler implements Strategy<ChartData> {
  public MAData = new SimpleMovingAverage(23);
  public EMAData = new ExponentialMovingAverage(9);

  public canHandle(chartData: ChartData): boolean {
    this.MAData.push(chartData.close);
    this.EMAData.push(chartData.close);
    return (
      chartData.close > this.MAData.indicator &&
      chartData.close > this.EMAData.indicator
    );
  }

  public handle(index: string, chartData: ChartData): any {
    return {
      pair: index,
      amount: chartData,
      order: `Price closed above MA and EMA: Buy ${index}!`
    };
  }
}

export default new MAxEMAHandler();
