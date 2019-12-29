import { Strategy } from "../../../typescript";
import { ChartData } from "../../../typescript/ChartData";
import MA from "../indicators/SimpleMovingAverage";
import EMA from "../indicators/ExponentialMovingAverage";

class MAxEMAHandler implements Strategy<ChartData> {
  public MAData = new MA(23);
  public EMAData = new EMA(9);

  public canHandle(index: string, chartData: ChartData): boolean {
    this.MAData.push(chartData.close);
    this.EMAData.push(chartData.close);
    return (
      chartData.close > this.MAData.value &&
      chartData.close > this.EMAData.value
    );
  }

  public handle(index: string, chartData: ChartData): any {
    return {
      pair: index,
      order: `Price closed above MA and EMA: Buy ${index}!`
    };
  }
}

export default new MAxEMAHandler();
