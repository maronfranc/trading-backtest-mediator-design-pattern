import { Strategy, Order } from "../../../typescript";
import { ChartData } from "../../../typescript/ChartData";
import SimpleMovingAverage from "../indicators/SimpleMovingAverage";

class MAHandler implements Strategy<ChartData> {
  public MAData = new SimpleMovingAverage(23);
  /**
   * Ponto inicial para os metodos buyHandle e sellHandle, se false
   * eles não serão executados dentro do Mediator.request
   */
  public canHandle(chartData: ChartData): boolean {
    this.MAData.push(chartData.close);
    return chartData.close > this.MAData.indicator;
  }

  public buyHandle(index: string, chartData: ChartData): Order {
    return {
      pair: index,
      order: {buy: true}
    };
  }

  public sellHandle(index: string, chartData: ChartData): Order {
    return {
      pair: index,
      order: {sell: true}
    };
  }
}

export default new MAHandler();
