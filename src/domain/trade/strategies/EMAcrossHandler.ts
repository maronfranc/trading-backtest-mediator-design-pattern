import { Strategy, Order } from "../../../typescript";
import { ChartData } from "../../../typescript/ChartData";
import ExponentialMovingAverage from "../indicators/ExponentialMovingAverage";

class EMAcrossHandler implements Strategy<ChartData> {
  public EMA20 = new ExponentialMovingAverage(20);
  public EMA50 = new ExponentialMovingAverage(50);

  /**
   * Ponto inicial para os metodos buyHandle e sellHandle, se false
   * eles não serão executados dentro do Mediator.request
   */
  public canHandle(chartData: ChartData): boolean {
    this.EMA20.push(chartData.close);
    this.EMA50.push(chartData.close);
    return (
       this.EMA20.indicator > this.EMA50.indicator
    );
  }

  public buyHandle(index: string, chartData: ChartData): Order {
    return {
      pair: index,
      order: { buy: true }
    };
  }

  public sellHandle(index: string, chartData: ChartData): Order {
    return {
      pair: index,
      order: { sell: true }
    };
  }
}

export default new EMAcrossHandler();
