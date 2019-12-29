import { Strategy } from "../../../typescript";
import { ChartData } from "../../../typescript/ChartData";
import MA from "../indicators/SimpleMovingAverage";

class MAHandler implements Strategy<ChartData> {
  public MAData = new MA(23);
  public canHandle(index: string, chartData: ChartData): boolean {
    this.MAData.push(chartData.close);
    return chartData.close > this.MAData.value;
  }

  public handle(index: string, chartData: ChartData): any {
    return {
      pair: index,
      order: `Price closed above MA: Buy ${index}!`
    };
  }
}

export default new MAHandler();
